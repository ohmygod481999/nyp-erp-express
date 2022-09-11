import { hash } from 'bcrypt';
import { EntityRepository, In, Repository } from 'typeorm';
import { CreateUserDto } from '@dtos/users.dto';
import { UserEntity } from '@entities/users.entity';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import { CompanyEntity } from '@/entities/company.entity';
import { Company } from '@/interfaces/company.interface';
import { CreateCompanyDto } from '@/dtos/company.dto';
import { OrderEntity } from '@/entities/order.entity';
import { CreateOrderDto } from '@/dtos/order.dto';
import { Order, OrderStatus } from '@/interfaces/order.interface';

class SameOrderCreatePreventer {
  tables = {};

  public createOrderWithTable(table_id: number) {
    this.tables[table_id] = true;

    setTimeout(() => {
      delete this.tables[table_id];
    }, 1000);
  }

  public isOrderCreated(table_id: number) {
    if (this.tables[table_id]) {
      return true;
    }
    return false;
  }
}

@EntityRepository()
class OrderService extends Repository<OrderEntity> {
  sameOrderCreatePreventer = new SameOrderCreatePreventer();

  public async findUnDoneOrder(company_id: number, store_id: number, table_id: number): Promise<Order> {
    return await OrderEntity.findOne({
      where: {
        company_id,
        store_id,
        table_id,
        status: In([OrderStatus.CREATED, OrderStatus.PEDNING]),
      },
    });
  }

  public async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    if (isEmpty(createOrderDto)) throw new HttpException(400, 'payload is empty');

    if (this.sameOrderCreatePreventer.isOrderCreated(createOrderDto.table_id)) {
      throw new HttpException(400, 'Order cũ chưa xử lý');
    }
    this.sameOrderCreatePreventer.createOrderWithTable(createOrderDto.table_id)

    const unDoneOrder = await this.findUnDoneOrder(createOrderDto.company_id, createOrderDto.store_id, createOrderDto.table_id);

    console.log(unDoneOrder);
    if (unDoneOrder) throw new HttpException(400, 'Order cũ chưa xử lý');

    const { company_id, store_id, table_id } = createOrderDto;

    const createOrderData: Order = await OrderEntity.create({
      company_id,
      store_id,
      table_id,
      status: OrderStatus.CREATED,
    }).save();

    return createOrderData;
  }
}

export default OrderService;
