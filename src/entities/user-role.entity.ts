import { IsNotEmpty } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEntity } from './role.entity';
import { UserEntity } from './users.entity';

@Entity('user_role')
export class UserRoleEntity extends BaseEntity {
  @ManyToOne(type => UserEntity, (user: UserEntity) => user.id, {
    primary: true,
  })
  @JoinColumn({
    name: 'user_id',
  })
  @IsNotEmpty()
  user: UserEntity;

  @ManyToOne(type => RoleEntity, (role: RoleEntity) => role.id, {
    primary: true,
  })
  @JoinColumn({
    name: 'role_id',
  })
  @IsNotEmpty()
  role: RoleEntity;
}
