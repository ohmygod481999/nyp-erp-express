import OrderService from '@/services/order.service';
import { NextFunction, Request, Response } from 'express';

class OrderController {
  public orderService = new OrderService();

  public createOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { company_id, store_id, table_id } = req.body;
      const order = await this.orderService.createOrder({
        company_id,
        store_id,
        table_id,
      });

      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  };
}

export default OrderController;
