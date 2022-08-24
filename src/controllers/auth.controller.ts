import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { RequestWithAccount } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';
import UserService from '@/services/users.service';
import { RegisterDto } from '@/dtos/auth.dto';
import CompanyService from '@/services/company.service';
import { HttpException } from '@/exceptions/HttpException';

class AuthController {
  public authService = new AuthService();
  public userService = new UserService();
  public companyService = new CompanyService();

  public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const registerData: RegisterDto = req.body;

      const existUser = await this.userService.findOneByOryId(registerData.ory_id);

      if (existUser) {
        throw new HttpException(400, 'user has exist');
      }

      const company = await this.companyService.createCompany({
        name: 'Company Name',
      });

      const user: User = await this.userService.createUser({
        ory_id: registerData.ory_id,
        company_id: company.id,
      });

      res.status(201).json({ data: user, message: 'register' });
    } catch (error) {
      next(error);
    }
  };

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.authService.signup(userData);

      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const { cookie, findUser } = await this.authService.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithAccount, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).json({ data: {}, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
