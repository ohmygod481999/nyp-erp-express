import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import ProductController from '@/controllers/product.controller';
import { S3_BUCKET, S3_MAX_FILE_SIZE } from '@/config';
import { s3Client } from '@/parties/s3';
import authMiddleware from '@/middlewares/auth.middleware';
import OrderController from '@/controllers/order.controller';
var multer = require('multer');
var multerS3 = require('multer-s3');

class OrderRoute implements Routes {
  public path = '/order';
  public router = Router();
  public orderController = new OrderController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.orderController.createOrder);
  }
}

export default OrderRoute;
