import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class UpdateUserRequestDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public readonly email: string;

  @IsString()
  @IsNotEmpty()
  public readonly profileImage: string;

  @IsString()
  @IsNotEmpty()
  public readonly address: string;
}

export class FindUserRequestDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public readonly email: string;
}
