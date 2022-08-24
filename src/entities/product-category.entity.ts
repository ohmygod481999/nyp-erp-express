import { ProductStatus } from '@/interfaces/product.interface';
import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { StoreEntity } from './store.entity';

@Entity('product_category')
export class ProductCategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column({
    nullable: false,
  })
  company_id: number;

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
