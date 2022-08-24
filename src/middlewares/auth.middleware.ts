import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { UserEntity } from '@entities/users.entity';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithAccount } from '@interfaces/auth.interface';
import OAuthService from '@/services/oauth.service';

const authMiddleware = async (req: RequestWithAccount, res: Response, next: NextFunction) => {
  try {
    console.log(req.header('Authorization'))
    const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);

    if (Authorization) {
      const oAuthService = new OAuthService()
      
      const accountInfo = await oAuthService.getAccountInfo(Authorization)

      if (accountInfo) {
        req.account = accountInfo;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
