import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import {  mergeMap, map, withLatestFrom, filter, concatMap } from 'rxjs/operators';
import {  forkJoin, of } from 'rxjs';
import { CategoryActionsTypes, AllCategoriesLoaded } from '../actions/category.actions';
import { CategoryService } from 'src/app/shared/services/category.service';
import { PositionService } from 'src/app/shared/services/positions.service';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/shared/redux/reducers';
import { PositionsActionsTypes, AllPositionsLoaded } from '../actions/positions.actions';
import { selectPositionLoaded } from '../selector/positions.selector';
import { Position } from 'src/app/shared/model/interface';
import { selectCategoryLoaded } from '../selector/category.selector';
import { OrderActionsTypes, OrderRequested, OrderLoaded } from '../actions/order.actions';
import { selectOrderLoaded } from '../selector/order.selector';
import { OrderService } from 'src/app/shared/services/order.service';


@Injectable({
  providedIn: 'root'
})

export class CategoryEffect {
  @Effect() loadAllCategories$ = this.actions$.pipe(
    ofType(CategoryActionsTypes.AllCategoriesReguseted),
    withLatestFrom(this.store.pipe(select(selectCategoryLoaded))),
    filter(([action, categoriesLoaded]) => !categoriesLoaded),
    mergeMap( action => this.categoryService.getAllCategory()),
    map( (categories) => new AllCategoriesLoaded({categories}))
  )

  @Effect() loadAllPositions$ = this.actions$.pipe(
    ofType(PositionsActionsTypes.AllPositionsRequested),
    withLatestFrom(this.store.pipe(select(selectPositionLoaded))),
    filter( ([action, positionsLoaded]) =>  !positionsLoaded),
    mergeMap(action => this.positionsService.getAllPosition()),
    map( (positions) => new AllPositionsLoaded({positions}))
  )

  @Effect() loadOrder$ = this.actions$.pipe(
    ofType(OrderActionsTypes.OrderRequested),
    withLatestFrom(this.store.pipe(select(selectOrderLoaded))),
    mergeMap( action => this.orderService.getOrder()),
    map( (order) => new OrderLoaded({order}))
  )

  // @Effect() loadAllCategories$ = this.actions$.pipe(
  //   ofType(CategoryActionsTypes.AllCategoriesReguseted),
  //   withLatestFrom(this.store.pipe(select(allCategoryLoaded))),
  //   filter(([action,allCategoryLoaded]) => !allCategoryLoaded),
  //   mergeMap( (allCategoryLoaded) => {
  //     return forkJoin(
  //       this.positionsService.getAllPosition(),
  //       this.categoryService.getAllCategory(),
  //     )
  //   }),
  //   map( ([positions,cat]) => {
  //     const  categories = [];
  //      for(let value of positions){
  //        const arr = cat.filter(itemCat => itemCat.positions === value._id)
  //        const result = {
  //          position: value.name,
  //          _id: value._id,
  //          data: arr
  //        }
  //        categories.push(result);
  //      }
  //     this.store.dispatch(new AllCategoriesLoaded({categories}))
  //     this.store.dispatch(new AllPositionsLoaded({positions}))
  //   })

  // )

  constructor(
    private actions$: Actions,
    private categoryService: CategoryService,
    private positionsService: PositionService,
    private orderService: OrderService,
    private store: Store<AppState>
  ) {}
}
