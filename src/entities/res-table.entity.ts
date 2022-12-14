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


  @Column()
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
  zone_id: number;

  @ManyToOne(type => ResZoneEntity)
  @JoinColumn({
    name: 'zone_id',
  })
  @IsNotEmpty()
  zone: ResZoneEntity;

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

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
