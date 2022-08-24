import { hash } from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { CreateProductDto } from '@dtos/products.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import { ProductEntity } from '@/entities/product.entity';
import { Product } from '@/interfaces/product.interface';

@EntityRepository()
class ProductService extends Repository<ProductEntity> {
  public async createUser(productData: CreateProductDto): Promise<Product> {
    if (isEmpty(productData)) throw new HttpException(400, 'productData is empty');

    const createUserData: Product = await ProductEntity.create({ ...productData }).save();

    return createUserData;
  }
}

export default ProductService;
