import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import ProductService from '@/services/product.service';
import { Product } from '@/interfaces/product.interface';
import { MulterRequest } from '@/interfaces/global.interface';
import { RequestWithAccount } from '@/interfaces/auth.interface';
import { IsNumber } from 'class-validator';
import CompanyService from '@/services/company.service';
import ResTableService from '@/services/res-table.service';
import { ResTableEntity } from '@/entities/res-table.entity';
import { HttpException } from '@/exceptions/HttpException';
import { StoreEntity } from '@/entities/store.entity';
import { ORDER_HOST } from '@/config';
import { getQrUrl } from '@/utils/util';

class GetTableQrCodeDto {
  @IsNumber()
  table_id: number;
}

class TableController {
  public productService = new ProductService();
  public companyService = new CompanyService();

  public getTableQrCode = async (req: RequestWithAccount, res: Response, next: NextFunction): Promise<void> => {
    try {
      const getTableQrCodeDto: GetTableQrCodeDto = req.body;

      const table = await ResTableEntity.findOne(getTableQrCodeDto.table_id);

      if (!table) throw new HttpException(400, 'Table id not found');

      const store_id = table.store_id;
      const zone_id = table.zone_id;
      const store = await StoreEntity.findOne(store_id);
      const company_id = store.company_id;

      const url = `${ORDER_HOST}/#/${company_id}/${zone_id}/${table.id}/home`
      const qrBase64 = await getQrUrl(url)
      res.status(200).json({
        url: qrBase64,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default TableController;
