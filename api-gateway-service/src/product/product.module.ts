import { Module, forwardRef } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductController } from './product.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ProductService',
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50052',
          package: 'product',
          protoPath: 'proto/product.proto',
        },
      },
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [ProductController],
})
export class ProductModule {}
