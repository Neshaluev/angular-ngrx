import { Injectable } from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import { Category } from 'src/app/shared/model/interface';
import {Observable} from "rxjs";
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/shared/redux/reducers';
import { selectCategoryId } from '../redux/selector/category.selector';
import { tap, filter, first } from 'rxjs/operators';

@Injectable()

export class CategoryResolver implements Resolve<Category> {
  constructor(
    private store: Store<AppState>
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category> {
    const categoryId = route.params['id'];

    console.log('params', categoryId)
    return this.store.pipe(
      select((selectCategoryId(categoryId))),
      tap(category => {
        if(!category) {
          // если нету категорий то диспачим
        }
      }),
      filter( category => !!category),
      first()
    )
  }
}
