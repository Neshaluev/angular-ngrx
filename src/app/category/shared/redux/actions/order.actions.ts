import { Order } from 'src/app/shared/model/interface';
import { Action } from '@ngrx/store';

export enum OrderActionsTypes {
  OrderRequested = '[Получениен значений] Order Requested',
  OrderLoaded = '[Загрузка значений] Order Loaded',
  OrderPageRequested = '[Загрузка значений на странице] Order Page Requested',

}

export interface PageQuery {
  pageIndex: number;
  pageSize: number;
}

export class OrderRequested{
  readonly type =  OrderActionsTypes.OrderRequested;
}
export class OrderLoaded{
  readonly type =  OrderActionsTypes.OrderLoaded;
  constructor(
    public payload: {order: Order[]}
  ) {}
}

export class OrderPageRequested implements Action {
  readonly type = OrderActionsTypes.OrderPageRequested;
  constructor(public payload: { page: PageQuery}) {}
}

export type OrdersActions = OrderRequested | OrderLoaded | OrderPageRequested;
