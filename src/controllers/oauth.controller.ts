import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { RequestWithAccount } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';
import axios from 'axios';
import querystring from 'querystring';
import { CLIENT_HOST, HOST, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET, OAUTH_URL } from '@/config';
import { makeid } from '@/utils/util';
import OAuthService from '@/services/oauth.service';
import UserService from '@/services/users.service';

class OAuthController {
  public userService = new UserService();
  public oAuthService = new OAuthService();

  public getAuthUrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.jsonp({
        success: 'true',
        data: {
          url: `${OAUTH_URL}/oauth2/auth?audience=&client_id=${OAUTH_CLIENT_ID}&max_age=0&nonce=${makeid(
            24,
          )}&prompt=&redirect_uri=${HOST}/oauth/callback&response_type=code&scope=openid+offline&state=${makeid(24)}`,
        },
      });
      return;
    } catch (error) {
      next(error);
    }
  };
  public callback = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { code, scope, state } = req.query;
      const tokenRes = await axios.post(
        `${OAUTH_URL}/oauth2/token`,
        querystring.stringify({
          code: String(code),
          grant_type: 'authorization_code',
          redirect_uri: `${HOST}/oauth/callback`,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          auth: {
            username: OAUTH_CLIENT_ID,
            password: OAUTH_CLIENT_SECRET,
          },
        },
      );
      const { access_token, expires_in, id_token, refresh_token, token_type } = tokenRes.data;

      // const accountInfo = await this.oAuthService.getAccountInfo(access_token);

      // console.log(accountInfo);

      // const user = await this.userService.findOneByOryId(accountInfo.ory_id);

      // if (!user) {
      //   this.userService.createUser({
      //     ory_id: accountInfo.ory_id,
      //   });
      // }

      res.cookie('access_token', access_token);
      res.redirect(200, `${CLIENT_HOST}/dashboard`);
      // res.jsonp(tokenRes.data);
      return;
    } catch (error) {
      next(error);
    }
  };

  public getUserInfo = async (req: RequestWithAccount, res: Response, next: NextFunction) => {
    const user = await this.userService.findOneByOryId(req.account.ory_id);
    if (!user) {
      res.jsonp(null);
      return
    }
    res.jsonp({
      ...req.account,
      company_id: user.company_id,
      user_erp_id: user.id,
    });
    return;
  };

  public logout = async (req: Request, res: Response, next: NextFunction) => {};
}

export default OAuthController;
