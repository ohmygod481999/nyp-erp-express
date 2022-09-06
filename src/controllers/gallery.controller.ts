import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import ProductService from '@/services/product.service';
import { CreateProductDto } from '@/dtos/products.dto';
import { Product } from '@/interfaces/product.interface';
import { MulterRequest, MulterRequestWithAccount } from '@/interfaces/global.interface';
import GalleryService from '@/services/gallery.service';
import { RequestWithAccount } from '@/interfaces/auth.interface';
import { DeleteObjectCommand, DeleteObjectsCommand } from '@aws-sdk/client-s3';
import { S3_BUCKET } from '@/config';
import path from 'path';
import { s3Client } from '@/parties/s3';

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

  public deleteImages = async (req: RequestWithAccount, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { company_id } = req.account;
      const { imageIds } = req.body;

      const galleryFiles = await this.galleryService.findGalleryFiles(imageIds);

      if (galleryFiles.length === 0) {
        res.status(400).json({
          data: {},
          success: false,
          message: 'Ảnh xóa không hợp lệ',
        });
        return
      }

      await this.galleryService.deleteGalleryFiles({
        company_id: req.account.company_id,
        image_ids: galleryFiles.map(file => file.id),
      });

      const deleteObjectsCommand = new DeleteObjectsCommand({
        Bucket: S3_BUCKET,
        Delete: {
          Objects: galleryFiles.map(file => ({
            Key: `erp/gallery/${company_id}/${path.basename(file.path)}`,
          })),
        },
      });

      const deleteS3Res = await s3Client.send(deleteObjectsCommand);

      console.log(deleteS3Res);

      res.status(201).json({
        data: {},
        success: true,
        message: 'success',
      });
    } catch (error) {
      next(error);
    }
  };
}

export default GalleryController;
