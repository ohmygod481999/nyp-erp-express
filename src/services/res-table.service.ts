import { EntityRepository, FindConditions, FindOneOptions, getRepository, ObjectID, Repository } from 'typeorm';
import { ResTableEntity } from '@/entities/res-table.entity';


const ResTableService = new Repository<ResTableEntity>()

export default ResTableService;
