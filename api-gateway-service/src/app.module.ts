import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, ProductModule, OrderModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
