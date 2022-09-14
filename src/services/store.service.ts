import { EntityRepository, Repository } from 'typeorm';
import { StoreEntity } from '@/entities/store.entity';

@EntityRepository()
class StoreService extends Repository<StoreEntity> {
  
}

export default StoreService;
