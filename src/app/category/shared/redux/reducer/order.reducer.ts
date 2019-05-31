import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Order } from 'src/app/shared/model/interface';
import { OrdersActions, OrderActionsTypes } from '../actions/order.actions';

export interface OrderState extends EntityState<Order>{
  orderLoaded: boolean
}

export const adapter: EntityAdapter<Order> = createEntityAdapter<Order>();

export const initialOrderState: OrderState = adapter.getInitialState({
  orderLoaded: false
})

export function reducer(state = initialOrderState, action: OrdersActions): OrderState {
  switch(action.type) {
    case OrderActionsTypes.OrderPageRequested:
      return {
        ...state,
        orderLoaded: true
      };
    case OrderActionsTypes.OrderLoaded:
      return adapter.addAll(action.payload.order, {
        ...state,
        orderLoaded: true
      });
    default: {
      return state;
    }
  }
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
