import { IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  public company_id: number;

  @IsNumber()
  public store_id: number;

  @IsNumber()
  public table_id: number;
}
