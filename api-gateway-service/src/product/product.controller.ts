import {
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  ParseIntPipe,
  UseGuards,
  Post,
  Body,
  Query,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AuthGuard } from '../auth/auth.guard';

interface ProductServiceClient {
  createProduct(data: {
    name: string;
    sku: number;
    userId: number;
    price: number;
  }): Observable<any>;
  findOne(data: { id }): Observable<any>;
  findMany(data: object): Observable<any>;
}

@Controller('product')
export class ProductController implements OnModuleInit {
  private svc: ProductServiceClient;

  @Inject('ProductService')
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<ProductServiceClient>('ProductService');
  }

  @Post()
  @UseGuards(AuthGuard)
  private async createProduct(@Body() body: any): Promise<Observable<any>> {
    return this.svc.createProduct(body);
  }

  @Get('all')
  @UseGuards(AuthGuard)
  private async findMany(@Query() query: any): Promise<any> {
    return this.svc.findMany({});
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  private async findOne(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.svc.findOne({ id });
  }
}
