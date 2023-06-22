import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { OrderService } from './order.service';
import {
  CancelOrderRequestDto,
  CreateOrderRequestDto,
  DetailsRequestDto,
  HistoryRequestDto,
} from './order.dto';

const ORDER_SERVICE_NAME = 'OrderService';

@Controller('order')
export class OrderController {
  @Inject(OrderService)
  private readonly service: OrderService;

  @GrpcMethod(ORDER_SERVICE_NAME, 'CreateOrder')
  private async createOrder(data: CreateOrderRequestDto): Promise<any> {
    return this.service.createOrder(data);
  }

  @GrpcMethod(ORDER_SERVICE_NAME, 'CancelOrder')
  private async cancelOrder(data: CancelOrderRequestDto): Promise<any> {
    return this.service.cancelOrder(data);
  }

  @GrpcMethod(ORDER_SERVICE_NAME, 'GetDetails')
  private async getDetails(data: DetailsRequestDto): Promise<any> {
    return this.service.getDetails(data);
  }

  @GrpcMethod(ORDER_SERVICE_NAME, 'GetHistory')
  private async getHistory(data: HistoryRequestDto): Promise<any> {
    return this.service.getHistory(data);
  }
}
