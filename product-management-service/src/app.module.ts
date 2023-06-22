import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { Product } from './product/product.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'product_service',
      username: 'postgres',
      password: 'password',
      entities: [Product],
      synchronize: process.env.NODE_ENV != 'production',
    }),
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
