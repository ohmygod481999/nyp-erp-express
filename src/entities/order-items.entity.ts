import { OrderItemStatus, OrderStatus } from '@/interfaces/order.interface';
import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { OrderEntity } from './order.entity';
import { ProductEntity } from './product.entity';
import { ResZoneEntity } from './res-zone.entity';
import { StoreEntity } from './store.entity';

@Entity('order_items')
export class OrderItemsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: OrderItemStatus,
    default: OrderItemStatus.CREATED,
    nullable: false
  })
  @IsNotEmpty()
  status: OrderItemStatus;

  @ManyToOne(type => OrderEntity)
  @JoinColumn({
    name: 'order_id',
  })
  @IsNotEmpty()
  store: OrderEntity;

  @ManyToOne(type => ProductEntity)
  @JoinColumn({
    name: 'product_id',
  })
  @IsNotEmpty()
  product: ProductEntity;

  @Column({
    type: 'int',
    nullable: false,
  })
  quantity: number;

  @Column({
    nullable: true,
  })
  note: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
