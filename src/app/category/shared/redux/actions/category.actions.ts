import { Category } from 'src/app/shared/model/interface';
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

export enum CategoryActionsTypes {
  AllCategoriesReguseted = '[Получение категорий] Category Requested',
  AllCategoriesLoaded = '[Загрузка категорий] Category Loaded',
  CategoryRequest = '[Получение категории] Category Request',
  CategoryLoaded = '[Загрузка категории] Category Loaded',
  CategorySave = '[Сохранение категории] Category Save',

}

export class AllCategoriesReguseted implements Action {
  readonly type = CategoryActionsTypes.AllCategoriesReguseted;
}
export class AllCategoriesLoaded implements Action {
  readonly type = CategoryActionsTypes.AllCategoriesLoaded;
  constructor(
    public payload: {categories: Category[]}
  ) {}
}
export class CategorySave implements Action {
  readonly type = CategoryActionsTypes.CategorySave;
  constructor(
    public payload: {categories: Update<Category>}
  ) {}
}



export type CategoriesAction = AllCategoriesReguseted | AllCategoriesLoaded | CategorySave;
