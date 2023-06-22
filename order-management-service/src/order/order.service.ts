import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientGrpc } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { Observable, firstValueFrom } from 'rxjs';
import { Order } from './order.entity';

const PRODUCT_SERVICE_NAME = 'ProductService';

interface ProductServiceClient {
  findOne(data: { id: number }): Observable<any>;
  decreaseStock(data: { id: number; quantity: number }): Observable<any>;
}

@Injectable()
export class OrderService implements OnModuleInit {
  private productSvc: ProductServiceClient;

  @Inject(PRODUCT_SERVICE_NAME)
  private readonly client: ClientGrpc;

  @InjectRepository(Order)
  private readonly repository: Repository<Order>;

  public onModuleInit(): void {
    this.productSvc =
      this.client.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME);
  }

  public async createOrder(data: any): Promise<any> {
    const product: any = await firstValueFrom(
      this.productSvc.findOne({ id: data.productId }),
    );

    if (product.status == HttpStatus.NOT_FOUND) {
      return { id: null, error: ['Product not found'], status: product.status };
    } else if (product.data.stock < data.quantity) {
      return {
        id: null,
        error: ['Stock not enough'],
        status: HttpStatus.CONFLICT,
      };
    }

    const order: Order = new Order();

    order.price = product.data.price;
    order.productId = product.data.id;
    order.userId = data.userId;
    order.quantity = data.quantity;

    await this.repository.save(order);

    await firstValueFrom(
      this.productSvc.decreaseStock({
        id: data.productId,
        quantity: data.quantity,
      }),
    );

    return { id: order.id, error: null, status: HttpStatus.OK };
  }

  public async cancelOrder(data: any): Promise<any> {
    const order: Order = await Order.findOne({
      where: { id: data.id, userId: data.userId },
    });
    if (!order)
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);

    order.canceled_at = new Date();
    order.isCanceld = true;
    await order.save();
    return { id: order.id, error: null, status: HttpStatus.OK };
  }

  public async getDetails(data: any): Promise<any> {
    const order: Order = await Order.findOne({
      where: { id: data.id, userId: data.userId },
    });
    if (!order)
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    const product: any = await firstValueFrom(
      this.productSvc.findOne({ id: order.productId }),
    );

    return {
      order: {
        product: product.data,
        id: order.id,
        price: order.price,
        quantity: order.quantity,
      },
      error: null,
      status: HttpStatus.OK,
    };
  }

  public async getHistory(data: any): Promise<any> {
    const orders: Order[] = await Order.find({
      where: { userId: data.userId },
    });
    const populatedOrders: object[] = await Promise.all(
      orders.map(async (order) => {
        const product: any = await firstValueFrom(
          this.productSvc.findOne({ id: order.productId }),
        );
        return {
          id: order.id,
          price: order.price,
          product: product.data,
          quantity: order.quantity,
        };
      }),
    );
    return { data: populatedOrders, error: null, status: HttpStatus.OK };
  }
}
