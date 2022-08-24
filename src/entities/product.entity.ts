import { Product, ProductStatus } from '@/interfaces/product.interface';
import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { ProductCategoryEntity } from './product-category.entity';
import { StoreEntity } from './store.entity';

@Entity('product')
export class ProductEntity extends BaseEntity implements Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.ACTIVE,
  })
  @IsNotEmpty()
  status: ProductStatus;

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

  @ManyToOne(type => ProductCategoryEntity)
  @JoinColumn({
    name: 'category_id',
  })
  category: ProductCategoryEntity;

  @Column({
    type: "float"
  })
  @IsNotEmpty()
  price: number;

  @Column()
  @IsNotEmpty()
  thumbnail: string;

  @Column()
  @IsNotEmpty()
  description: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
