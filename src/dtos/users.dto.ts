import { IsEmail, IsNumber, IsString, IsEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public ory_id: string;

  @IsNumber()
  public company_id?: number;


}
