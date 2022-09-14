import { CompanyEntity } from '@/entities/company.entity';
import { RequestWithAccount } from '@/interfaces/auth.interface';
import { IsNumber } from 'class-validator';
import { NextFunction, Response } from 'express';

class CheckCompanyIdExistDto {
  @IsNumber()
  company_id: number;
}

class CompanyController {
  public checkCompanyIdExist = async (req: RequestWithAccount, res: Response, next: NextFunction): Promise<void> => {
    try {
      const checkCompanyIdExistDto: CheckCompanyIdExistDto = req.body;

      const company = await CompanyEntity.findOne(checkCompanyIdExistDto.company_id);

      const exist = company ? true : false;

      res.status(200).json({
        exist,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default CompanyController;
