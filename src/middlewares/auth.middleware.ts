import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { UserEntity } from '@entities/users.entity';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithAccount } from '@interfaces/auth.interface';
import OAuthService from '@/services/oauth.service';

const authMiddleware = async (req: RequestWithAccount, res: Response, next: NextFunction) => {
  try {
    console.log(req.header('Authorization'));

    let access_token = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);

    if (access_token) {
      const oAuthService = new OAuthService();

      let accountInfo;
      try {
        accountInfo = await oAuthService.getAccountInfo(access_token);
      } catch (err) {
        console.log(err)
        const current_refresh_token = req.header('refreshtoken') || null;
        console.log("current_refresh_token", current_refresh_token)

        if (current_refresh_token) {
          const tokenData = await oAuthService.refreshToken(current_refresh_token);
          console.log(tokenData)
          // const { access_token, id_token, refresh_token } = tokenData;
          res.cookie('access_token', tokenData.access_token, {
            secure: true,
            domain: ".smartcardnp.vn"
          });
          res.cookie('id_token', tokenData.id_token, {
            secure: true,
            domain: ".smartcardnp.vn"
          });

          // do something with refresh token
          // here: refresh_token
          res.cookie('refresh_token', tokenData.refresh_token, {
            secure: true,
            domain: ".smartcardnp.vn"
          });
          accountInfo = await oAuthService.getAccountInfo(tokenData.access_token);
        }
        else {
          next(new HttpException(401, "Wrong authentication token"))
        }
      }

      console.log("accountInfo", accountInfo);

      if (accountInfo) {
        req.account = accountInfo;
        next();
      } else {
        next(new HttpException(401, 'Tài khoản chưa kích hoạt'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
