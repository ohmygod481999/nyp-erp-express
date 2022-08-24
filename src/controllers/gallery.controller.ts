import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import ProductService from '@/services/product.service';
import { CreateProductDto } from '@/dtos/products.dto';
import { Product } from '@/interfaces/product.interface';
import { MulterRequest, MulterRequestWithAccount } from '@/interfaces/global.interface';
import GalleryService from '@/services/gallery.service';

class GalleryController {
  public galleryService = new GalleryService();

  public uploadSingleImage = async (req: MulterRequestWithAccount, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log(req.file);

      const galleryFile = await this.galleryService.createGalleryFile({
        company_id: req.account.company_id,
        path: req.file.location,
      });

      res.status(201).json({
        data: {
          id: galleryFile.id,
          filename: req.file.originalname,
          size: req.file.size,
          mimetype: req.file.mimetype,
          localtion: req.file.location,
        },
        message: 'success',
      });
    } catch (error) {
      next(error);
    }
  };
}

export default GalleryController;
