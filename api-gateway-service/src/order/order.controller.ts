import {
  Controller,
  Inject,
  Post,
  OnModuleInit,
  UseGuards,
  Req,
  Get,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, firstValueFrom } from 'rxjs';
import { AuthGuard } from '../auth/auth.guard';
import { RequestWithUserRole } from 'src/auth/auth.request.interface';

interface OrderServiceClient {
  createOrder(data: {
    productId: number;
    quantity: number;
    userId: number;
  }): Observable<any>;
  cancelOrder(data: { id: number; userId: number }): Observable<any>;
  getDetails(data: { id: number; userId: number }): Observable<any>;
  getHistory(data: { userId: number }): Observable<any>;
}

@Controller('order')
export class OrderController implements OnModuleInit {
  private svc: OrderServiceClient;

  @Inject('OrderService')
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<OrderServiceClient>('OrderService');
  }

  @Post()
  @UseGuards(AuthGuard)
  private async createOrder(@Req() req: RequestWithUserRole): Promise<any> {
    const { productId, quantity } = req.body;
    const userId = <number>req.user;
    return this.svc.createOrder({ productId, quantity, userId });
  }

  @Get('details')
  @UseGuards(AuthGuard)
  private async getDetails(@Req() req: RequestWithUserRole): Promise<any> {
    const { id } = req.query;
    const userId = <number>req.user;
    const details = await firstValueFrom(
      this.svc.getDetails({ id: Number(id), userId }),
    );
    return { status: 200, error: null, order: details.order };
  }

  @Get('history')
  @UseGuards(AuthGuard)
  private async cancelOrder(@Req() req: RequestWithUserRole): Promise<any> {
    const userId = <number>req.user;
    return this.svc.getHistory({ userId });
  }
}
