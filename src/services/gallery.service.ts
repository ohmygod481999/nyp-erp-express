import { hash } from 'bcrypt';
import { EntityRepository, In, Repository } from 'typeorm';
import { CreateProductDto } from '@dtos/products.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import { ProductEntity } from '@/entities/product.entity';
import { Product } from '@/interfaces/product.interface';
import { GalleryEntity } from '@/entities/gallery.entity';
import { GalleryFile } from '@/interfaces/gallery.interface';
import { CreateGalleryFileDto, DeleteGalleryFilesDto } from '@/dtos/gallery.dto';
import { s3Client } from '@/parties/s3';

@EntityRepository()
class GalleryService extends Repository<GalleryEntity> {
  public async findGalleryFiles(imagesIds: number[]): Promise<GalleryFile[]> {
    const galleryFile: GalleryFile[] = await GalleryEntity.find({
      where: {
        id: In(imagesIds),
      },
    });
    return galleryFile;
  }
  
  public async createGalleryFile(galleryFileData: CreateGalleryFileDto): Promise<GalleryFile> {
    if (isEmpty(galleryFileData)) throw new HttpException(400, 'galleryFileData is empty');

    const createUserData: GalleryFile = await GalleryEntity.create({ ...galleryFileData }).save();

    return createUserData;
  }

  public async deleteGalleryFiles(deleteGalleryFilesDto: DeleteGalleryFilesDto) {
    const { company_id, image_ids } = deleteGalleryFilesDto;

    await GalleryEntity.delete(image_ids);
  }
}

export default GalleryService;
