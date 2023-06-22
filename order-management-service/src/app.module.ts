import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './order/order.module';
import { Order } from './order/order.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'order_service',
      username: 'postgres',
      password: 'password',
      entities: [Order],
      synchronize: process.env.NODE_ENV != 'production',
    }),
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
