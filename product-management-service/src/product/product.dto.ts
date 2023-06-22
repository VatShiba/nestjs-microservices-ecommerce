import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class FindOneRequestDto {
  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly id: number;
}

export class FindManyRequestDto {}

export class CreateProductRequestDto {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsString()
  @IsNotEmpty()
  public readonly sku: string;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  @Min(0, { message: 'Stock must not be below zero.' })
  public readonly stock: number;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  @Min(0, { message: 'Price must not be below zero.' })
  public readonly price: number;
}

export class DecreaseStockRequestDto {
  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly id: number;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly quantity: number;
}
