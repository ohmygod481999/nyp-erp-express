import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import OAuthController from '@/controllers/oauth.controller';

class OAuthRoute implements Routes {
  public path = '/oauth';
  public router = Router();
  public oauthController = new OAuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.oauthController.getAuthUrl);
    this.router.get(`${this.path}/callback`, this.oauthController.callback);
    this.router.get(`${this.path}/logout`, this.oauthController.logout);
    this.router.get(`${this.path}/userinfo`, authMiddleware, this.oauthController.getUserInfo);
    this.router.post(`${this.path}/refresh_token`, this.oauthController.refreshToken);
    this.router.post(`${this.path}/register_new_account`, this.oauthController.registerNewAccount);
    this.router.post(`${this.path}/register_new_account_exist_company`, this.oauthController.registerNewAccountExistCompany);
  }
}

export default OAuthRoute;
