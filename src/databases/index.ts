import { join } from 'path';
import { ConnectionOptions } from 'typeorm';
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE, DB_CERT } from '@config';
import { CompanyEntity } from '@/entities/company.entity';
import { GalleryEntity } from '@/entities/gallery.entity';
import { OrderItemsEntity } from '@/entities/order-items.entity';
import { OrderEntity } from '@/entities/order.entity';
import { ProductCategoryEntity } from '@/entities/product-category.entity';
import { ProductEntity } from '@/entities/product.entity';
import { ResTableEntity } from '@/entities/res-table.entity';
import { ResZoneEntity } from '@/entities/res-zone.entity';
import { RoleEntity } from '@/entities/role.entity';
import { StoreEntity } from '@/entities/store.entity';
import { UserRoleEntity } from '@/entities/user-role.entity';
import { UserEntity } from '@/entities/users.entity';

export const dbConnection: ConnectionOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  ssl: {
    ca: DB_CERT,
    rejectUnauthorized: false,
  },
  // dropSchema: true, // restart server remove all data in database
  synchronize: false,
  logging: false,
  entities: [
    CompanyEntity,
    GalleryEntity,
    OrderItemsEntity,
    OrderEntity,
    ProductCategoryEntity,
    ProductEntity,
    ResTableEntity,
    ResZoneEntity,
    RoleEntity,
    StoreEntity,
    UserRoleEntity,
    UserEntity
  ],
  // entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '../**/*.migration{.ts,.js}')],
  subscribers: [join(__dirname, '../**/*.subscriber{.ts,.js}')],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
