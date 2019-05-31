import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';
import { PositionService } from 'src/app/shared/services/positions.service';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/shared/redux/reducers';
import { AllCategoriesReguseted } from '../shared/redux/actions/category.actions';
import { Observable, Observer } from 'rxjs';
import { Category, Position } from 'src/app/shared/model/interface';
import { AllPositionsRequested } from '../shared/redux/actions/positions.actions';
import { selectPositionLoaded, selectAllPositions } from '../shared/redux/selector/positions.selector';
import { selectAllCategory, selectWestCategory, selectCentreCategory, selectEastCategory } from '../shared/redux/selector/category.selector';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy {

  west$: Observable<Category[]>;
  centre$: Observable<Category[]>;
  east$: Observable<Category[]>;

  loader$: Observable<Boolean>

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    //попробывать реализоавть фильтрацию через пайп или дерективу

    this.store.dispatch(new AllPositionsRequested());

    this.store.dispatch(new AllCategoriesReguseted())

    this.loader$ = this.store.pipe(select(selectPositionLoaded))

    this.loader$.subscribe(
      (value) => {
        if(value) {
          this.west$ = this.store.pipe(select(selectWestCategory))
          this.centre$ = this.store.pipe(select(selectCentreCategory))
          this.east$ = this.store.pipe(select(selectEastCategory))
        }
      }
    )

  }
  ngOnDestroy() {

  }
  trackByFn(index){

  }
}
