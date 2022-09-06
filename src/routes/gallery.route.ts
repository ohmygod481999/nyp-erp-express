import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import ProductController from '@/controllers/product.controller';
import { S3_BUCKET, S3_MAX_FILE_SIZE } from '@/config';
import { s3Client } from '@/parties/s3';
import GalleryController from '@/controllers/gallery.controller';
import authMiddleware from '@/middlewares/auth.middleware';
import { RequestWithAccount } from '@/interfaces/auth.interface';
var multer = require('multer');
var multerS3 = require('multer-s3');

class GalleryRoute implements Routes {
  public path = '/gallery';
  public router = Router();
  public galleryController = new GalleryController();
  public upload = multer({
    storage: multerS3({
      s3: s3Client,
      bucket: S3_BUCKET,
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req: RequestWithAccount, file, cb) {
        const userId = req.account.user_erp_id;
        const companyId = req.account.company_id;
        const newFileName = Date.now() + '-' + file.originalname;
        const fullPath = `erp/gallery/${companyId}/` + newFileName;

        cb(null, fullPath);
      },
    }),
    limits: {
      fileSize: S3_MAX_FILE_SIZE,
    },
  });

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, authMiddleware, this.upload.single('file'), this.galleryController.uploadSingleImage);
    this.router.post(`${this.path}/delete`, authMiddleware, this.galleryController.deleteImages);
  }
}

export default GalleryRoute;
