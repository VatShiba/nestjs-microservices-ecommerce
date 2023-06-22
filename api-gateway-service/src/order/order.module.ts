import { Module, forwardRef } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrderController } from './order.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'OrderService',
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50053',
          package: 'order',
          protoPath: 'proto/order.proto',
        },
      },
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [OrderController],
})
export class OrderModule {}
