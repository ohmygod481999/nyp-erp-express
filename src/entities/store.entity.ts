import { Store } from "@/interfaces/store.interface";
import { IsNotEmpty } from "class-validator";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CompanyEntity } from "./company.entity";

@Entity("store")
export class StoreEntity extends BaseEntity implements Store{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @ManyToOne(type => CompanyEntity)
  @JoinColumn({
    name: "company_id",
  })
  @IsNotEmpty()
  company: CompanyEntity;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}