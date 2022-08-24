import { IsEmail, IsNumber, IsString, IsEmpty } from 'class-validator';

export class RegisterDto {
  @IsString()
  public ory_id: string;

}
