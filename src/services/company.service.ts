import { hash } from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from '@dtos/users.dto';
import { UserEntity } from '@entities/users.entity';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import { CompanyEntity } from '@/entities/company.entity';
import { Company } from '@/interfaces/company.interface';
import { CreateCompanyDto } from '@/dtos/company.dto';

@EntityRepository()
class CompanyService extends Repository<CompanyEntity> {
  public async createCompany(companyData: CreateCompanyDto): Promise<Company> {
    if (isEmpty(companyData)) throw new HttpException(400, 'companyData is empty');

    const createUserData: Company = await CompanyEntity.create({
      name: companyData.name,
    }).save();

    return createUserData;
  }
}

export default CompanyService;
