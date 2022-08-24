import { IsEmail, IsNumber, IsString, IsEmpty } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  public name?: string;
}
