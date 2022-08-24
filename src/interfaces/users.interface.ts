import { CompanyEntity } from "@/entities/company.entity";

export interface User {
  id: string;
  company: CompanyEntity;
  company_id: number;
  ory_id: string;
  created_at: Date;
  updated_at: Date;
}
