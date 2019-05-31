import { Action } from '@ngrx/store';
import { CategoriesAction, CategoryActionsTypes } from '../actions/category.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { Category } from 'src/app/shared/model/interface';


export interface CategoryState extends  EntityState<Category>{
  allCategoryLoaded: boolean;
}

export const adapter: EntityAdapter<Category> = createEntityAdapter<Category>();

export const initialState: CategoryState = adapter.getInitialState({
  allCategoryLoaded: false
});

export function reducer(state = initialState, action: CategoriesAction): CategoryState {
  switch (action.type) {
    case CategoryActionsTypes.AllCategoriesLoaded:
      return adapter.addAll(action.payload.categories,
        {
        ...state,
        allCategoryLoaded: true
        }
      )
    case CategoryActionsTypes.CategorySave:
      return adapter.updateOne(action.payload.categories, state)
    default:
      return state;
  }
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
