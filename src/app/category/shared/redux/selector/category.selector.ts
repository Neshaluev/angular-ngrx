import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CategoryState } from '../reducer/category.reducer';
import * as fromCategoryReducer from '../reducer/category.reducer';

export const selectCategoryState = createFeatureSelector<CategoryState>('categories');

export const selectCategoryId = (categoryId: number) => createSelector(
  selectCategoryState,
  categoryState => categoryState.entities[categoryId]
)

export const selectAllCategory = createSelector(
  selectCategoryState,
  fromCategoryReducer.selectAll
)

export const selectCategoryLoaded = createSelector(
  selectCategoryState,
  categories => categories.allCategoryLoaded
)

export const selectWestCategory = createSelector(
  selectAllCategory,
  categories => categories.filter(item => item.positions === '5ce2c2c823692f0bd0cb28d0')
)
export const selectCentreCategory = createSelector(
  selectAllCategory,
  categories => categories.filter(item => item.positions === '5ce2c2f46c902803a474b202')
)
export const selectEastCategory = createSelector(
  selectAllCategory,
  categories => categories.filter(item => item.positions === '5ce2c30c9379c713504f4b7f')
)
