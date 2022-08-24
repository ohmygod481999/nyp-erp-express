import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import ProductService from '@/services/product.service';
import { CreateProductDto } from '@/dtos/products.dto';
import { Product } from '@/interfaces/product.interface';
import { MulterRequest } from '@/interfaces/global.interface';
import { RequestWithAccount } from '@/interfaces/auth.interface';

class ProductController {
  public productService = new ProductService();

  public createProduct = async (req: RequestWithAccount, res: Response, next: NextFunction): Promise<void> => {
    try {
      const productData: CreateProductDto = req.body;
      productData.company_id = req.account.company_id;
      const createProductData: Product = await this.productService.createUser(productData);

      res.status(201).json({ data: createProductData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}

export default ProductController;
