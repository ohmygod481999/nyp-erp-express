import { OrderStatus } from '@/interfaces/order.interface';
import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { ResZoneEntity } from './res-zone.entity';
import { StoreEntity } from './store.entity';

@Entity('order')
export class OrderEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.CREATED,
  })
  @IsNotEmpty()
  status: OrderStatus;

  @ManyToOne(type => StoreEntity)
  @JoinColumn({
    name: 'store_id',
  })
  @IsNotEmpty()
  store: StoreEntity;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
