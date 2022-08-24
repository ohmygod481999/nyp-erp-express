import { Request } from 'express';
import { User } from '@interfaces/users.interface';

export interface DataStoredInToken {
  id: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithAccount extends Request {
  account: AccountInfo;
}

export interface AccountInfo {
  id: number;
  ory_id: string;
  email: string;
  facebook: string;
  name: string;
  phone: string;
  avatar: string;
  company_id?: number;
  user_erp_id?: string;
}
