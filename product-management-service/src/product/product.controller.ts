import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateProductRequestDto,
  FindOneRequestDto,
  DecreaseStockRequestDto,
  FindManyRequestDto,
} from './product.dto';
import { ProductService } from './product.service';

const PRODUCT_SERVICE_NAME = 'ProductService';

@Controller()
export class ProductController {
  @Inject(ProductService)
  private readonly service: ProductService;

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'CreateProduct')
  private createProduct(payload: CreateProductRequestDto): Promise<any> {
    return this.service.createProduct(payload);
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'FindOne')
  private findOne(payload: FindOneRequestDto): Promise<any> {
    return this.service.findOne(payload);
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'FindMany')
  private findMany(payload: FindManyRequestDto): Promise<any> {
    return this.service.findMany(payload);
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'DecreaseStock')
  private decreaseStock(payload: DecreaseStockRequestDto): Promise<any> {
    return this.service.decreaseStock(payload);
  }
}
