import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import {
  CreateProductRequestDto,
  FindOneRequestDto,
  DecreaseStockRequestDto,
} from './product.dto';

@Injectable()
export class ProductService {
  @InjectRepository(Product)
  private readonly repository: Repository<Product>;

  public async findOne({ id }: FindOneRequestDto): Promise<any> {
    const product: Product = await this.repository.findOne({ where: { id } });

    if (!product) {
      return {
        data: null,
        error: ['Product not found'],
        status: HttpStatus.NOT_FOUND,
      };
    }

    return { data: product, error: null, status: HttpStatus.OK };
  }

  public async findMany(payload: any): Promise<any> {
    const products: Product[] = await this.repository.find();

    if (!products) {
      return {
        data: null,
        error: ['Product not found'],
        status: HttpStatus.NOT_FOUND,
      };
    }

    return { data: products, error: null, status: HttpStatus.OK };
  }

  public async createProduct(payload: CreateProductRequestDto): Promise<any> {
    const product: Product = new Product();

    product.name = payload.name;
    product.sku = payload.sku;
    product.stock = payload.stock;
    product.price = payload.price;

    try {
      await this.repository.save(product);
    } catch (err) {
      throw new HttpException(
        `sku ${payload.sku} is already created.`,
        HttpStatus.CONFLICT,
      );
    }

    return { id: product.id, error: null, status: HttpStatus.OK };
  }

  public async decreaseStock({
    id,
    quantity,
  }: DecreaseStockRequestDto): Promise<any> {
    const product: Product = await this.repository.findOne({
      select: ['id', 'stock'],
      where: { id },
    });

    if (!product) {
      return { error: ['Product not found'], status: HttpStatus.NOT_FOUND };
    } else if (product.stock <= 0) {
      return { error: ['Stock too low'], status: HttpStatus.CONFLICT };
    } else if (product.stock < quantity) {
      return { error: ['Stock too low'], status: HttpStatus.CONFLICT };
    }

    await this.repository.update(product.id, {
      stock: product.stock - quantity,
    });

    return { error: null, status: HttpStatus.OK };
  }
}
