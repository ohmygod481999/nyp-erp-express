import { ProductStatus } from '@/interfaces/product.interface';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  public name: string;

  @IsEnum(ProductStatus)
  public status: ProductStatus;

  @IsNumber()
  public company_id: number;

  @IsNumber()
  public category_id: number;

  @IsNumber()
  public price: number;

  @IsString()
  public thumbnail: string;
}
