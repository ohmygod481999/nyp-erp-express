import { ProductStatus } from '@/interfaces/product.interface';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateGalleryFileDto {
  @IsString()
  public path: string;

  @IsNumber()
  public company_id: number;
}

export class DeleteGalleryFilesDto {
  @IsNumber()
  public company_id: number;

  public image_ids: number[];
}
