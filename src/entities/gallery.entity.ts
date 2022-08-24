import { GalleryFile } from '@/interfaces/gallery.interface';
import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CompanyEntity } from './company.entity';

@Entity('gallery')
export class GalleryEntity extends BaseEntity implements GalleryFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  path: string;

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
