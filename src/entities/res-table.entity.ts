import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { ResZoneEntity } from './res-zone.entity';
import { StoreEntity } from './store.entity';

@Entity('res_table')
export class ResTableEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @ManyToOne(type => ResZoneEntity)
  @JoinColumn({
    name: 'zone_id',
  })
  @IsNotEmpty()
  store: ResZoneEntity;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
