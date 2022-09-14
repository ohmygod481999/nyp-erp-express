import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import TableController from '@/controllers/table.controller';

class TableRoute implements Routes {
  public path = '/table';
  public router = Router();
  public tableController = new TableController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/qrcode`, this.tableController.getTableQrCode);
  }
}

export default TableRoute;
