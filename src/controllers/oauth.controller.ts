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
import CompanyService from '@/services/company.service';
import { HttpException } from '@/exceptions/HttpException';

class OAuthController {
  public userService = new UserService();
  public oAuthService = new OAuthService();
  public companyService = new CompanyService();

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

      // if (!accountInfo) {
      //   // user chua tao trong he thong
      // }

      // console.log(accountInfo);

      // const user = await this.userService.findOneByOryId(accountInfo.ory_id);

      // if (!user) {
      //   this.userService.createUser({
      //     ory_id: accountInfo.ory_id,
      //   });
      // }

      res.cookie('access_token', access_token, {
        secure: true,
        domain: ".smartcardnp.vn"
      });
      res.cookie('id_token', id_token, {
        secure: true,
        domain: ".smartcardnp.vn"
      });

      // do something with refresh token
      // here: refresh_token
      res.cookie('refresh_token', refresh_token, {
        secure: true,
        domain: ".smartcardnp.vn"
      });

      res.redirect(302, `${CLIENT_HOST}/#/dashboard`);
      // res.jsonp(tokenRes.data);
      return;
    } catch (error) {
      next(error);
    }
  };

  public refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    const { refresh_token } = req.body;
    try {
      const tokenRes = await axios.post(
        `${OAUTH_URL}/oauth2/token`,
        querystring.stringify({
          refresh_token: String(refresh_token),
          grant_type: 'refresh_token',
          // redirect_uri: `${HOST}/oauth/callback`,
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
      res.jsonp(tokenRes.data);
    } catch (err) {
      console.log(err);
      next(err);
    }

    // console.log(tokenRes.data);
  };

  public getUserInfo = async (req: RequestWithAccount, res: Response, next: NextFunction) => {
    console.log('req.account', req.account);
    const user = await this.userService.findOneByOryId(req.account.ory_id);
    console.log(user);
    if (!user) {
      res.jsonp(null);
      return;
    }
    res.jsonp({
      ...req.account,
      // company_id: user.company_id,
      company: user.company,
      user_erp_id: user.id,
    });
    return;
  };

  public registerNewAccount = async (req: RequestWithAccount, res: Response, next: NextFunction) => {
    // create company
    const { company_name, ory_id } = req.body;
    if (!company_name || !ory_id) {
      next(new HttpException(400, 'Company_name or ory_id not found'));
      return;
    }

    const existAccount = await this.userService.findOneByOryId(ory_id);
    console.log('existAccount', existAccount);
    if (existAccount) {
      next(new HttpException(400, 'User has been registerd'));
      return;
    }

    const company = await this.companyService.createCompany({
      name: company_name,
    });

    const account = this.userService.createUser({
      ory_id: ory_id,
      company_id: company.id,
    });

    res.jsonp({
      success: true,
      data: {},
      message: 'Thành công',
    });
  };

  public logout = async (req: Request, res: Response, next: NextFunction) => {};
}

export default OAuthController;
