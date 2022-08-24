import { Company } from "./company.interface";
import { Store } from "./store.interface";

export enum ProductStatus {
  ACTIVE = 'active',
  UNACTIVE = 'unactive',
}


export interface Product {
  id: number;
  name: string;
  status: ProductStatus;
  thumbnail: string;
  company: Company;
  price: number;
  created_at: Date;
  updated_at: Date;
}