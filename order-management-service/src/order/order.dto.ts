import { IsNumber, Min } from 'class-validator';

export class CreateOrderRequestDto {
  @IsNumber()
  public productId: number;

  @IsNumber()
  @Min(1)
  public quantity: number;

  @IsNumber()
  public userId: number;
}

export class CancelOrderRequestDto {
  @IsNumber()
  public id: number;

  @IsNumber()
  public userId: number;
}

export class DetailsRequestDto {
  @IsNumber()
  public id: number;

  @IsNumber()
  public userId: number;
}

export class HistoryRequestDto {
  @IsNumber()
  public userId: number;
}
