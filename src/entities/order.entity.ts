import { Order, OrderStatus } from '@/interfaces/order.interface';
import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { ResTableEntity } from './res-table.entity';
import { ResZoneEntity } from './res-zone.entity';
import { StoreEntity } from './store.entity';

@Entity('order')
export class OrderEntity extends BaseEntity implements Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.CREATED,
  })
  @IsNotEmpty()
  status: OrderStatus;

  @Column({
    nullable: false,
  })
  company_id: number;

  @ManyToOne(type => CompanyEntity)
  @JoinColumn({
    name: 'company_id',
  })
  @IsNotEmpty()
  company: CompanyEntity;

  @Column({
    nullable: false,
  })
  store_id: number;

  @ManyToOne(type => StoreEntity)
  @JoinColumn({
    name: 'store_id',
  })
  @IsNotEmpty()
  store: StoreEntity;

  @Column({
    nullable: false,
  })
  table_id: number;

  @ManyToOne(type => ResTableEntity)
  @JoinColumn({
    name: 'table_id',
  })
  @IsNotEmpty()
  table: ResTableEntity;

  @Column()
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
