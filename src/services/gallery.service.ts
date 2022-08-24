import { hash } from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { CreateProductDto } from '@dtos/products.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import { ProductEntity } from '@/entities/product.entity';
import { Product } from '@/interfaces/product.interface';
import { GalleryEntity } from '@/entities/gallery.entity';
import { GalleryFile } from '@/interfaces/gallery.interface';
import { CreateGalleryFileDto } from '@/dtos/gallery.dto';

@EntityRepository()
class GalleryService extends Repository<GalleryEntity> {
  public async createGalleryFile(galleryFileData: CreateGalleryFileDto): Promise<GalleryFile> {
    if (isEmpty(galleryFileData)) throw new HttpException(400, 'galleryFileData is empty');

    const createUserData: GalleryFile = await GalleryEntity.create({ ...galleryFileData }).save();

    return createUserData;
  }
}

export default GalleryService;
