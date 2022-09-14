import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import TableController from '@/controllers/table.controller';
import CompanyController from '@/controllers/company.controller';

class CompanyRoute implements Routes {
  public path = '/company';
  public router = Router();
  public companyController = new CompanyController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/check-exist`, this.companyController.checkCompanyIdExist);
  }
}

export default CompanyRoute;
