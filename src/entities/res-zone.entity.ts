import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { StoreEntity } from './store.entity';

@Entity('res_zone')
export class ResZoneEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

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
