export enum OrderStatus {
  CREATED = 'created',
  PEDNING = 'pending',
  SUCCESS = 'success',
}

export enum OrderItemStatus {
  CREATED = 'created',
  PROCESSING = 'processing',
  SUCCESS = 'success',
}

export interface Order {
  id: number;
  status: OrderStatus;
  company_id: number;
  store_id: number;
  table_id: number;
  created_at: Date;
  updated_at: Date;
}