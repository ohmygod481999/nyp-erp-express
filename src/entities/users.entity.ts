import { IsEmpty, IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '@interfaces/users.interface';
import { CompanyEntity } from './company.entity';

@Entity()
export class UserEntity extends BaseEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  ory_id: string;

  @Column({
    nullable: true,
  })
  company_id: number;

  @ManyToOne(type => CompanyEntity)
  @JoinColumn({
    name: 'company_id',
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
