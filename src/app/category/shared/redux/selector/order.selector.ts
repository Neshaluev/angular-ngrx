import { createSelector, createFeatureSelector } from '@ngrx/store';
import { OrderState } from '../reducer/order.reducer';
import * as fromOrderReducer from '../reducer/order.reducer';
import { PageQuery } from '../actions/order.actions';

export const selectOrderState = createFeatureSelector<OrderState>('order')

export const selectOrderLoaded = createSelector(
  selectOrderState,
  order => order.orderLoaded
)

export const selectOrder = createSelector(
  selectOrderState,
  fromOrderReducer.selectAll
)

export const selectOrderPage = (page: PageQuery) => createSelector(
  selectOrder,
  order => {
  const start = page.pageIndex * page.pageSize,
          end = start + page.pageSize ;
  return order.slice(start, end);
  }
)

