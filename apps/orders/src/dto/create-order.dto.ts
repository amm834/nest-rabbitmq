import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsPositive()
  @Type(() => Number)
  price: number;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;
}
