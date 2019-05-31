import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {debounceTime, distinctUntilChanged, startWith, tap, delay} from 'rxjs/operators';
import {merge, fromEvent, Observable} from "rxjs";
import { Store, select } from '@ngrx/store';
import { OrderService } from 'src/app/shared/services/order.service';
import { AppState } from 'src/app/shared/redux/reducers';
import { OrderRequested, PageQuery } from '../shared/redux/actions/order.actions';
import { selectOrder, selectOrderLoaded } from '../shared/redux/selector/order.selector';
import { OrderDataSource } from '../shared/classes/order.datasource';


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
// export class ItemListComponent implements OnInit {
export class ItemListComponent  {
  order$: Observable<any>

  // course:Course;

  dataSource: OrderDataSource;

  // displayedColumns= ["seqNo", "description", "duration"];
  displayedColumns= ["id","firstName", "lastName", "capital"];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  loading$: Observable<boolean>

  constructor(
    private store: Store<AppState>,
    private orderService: OrderService
    ) {

  }

  ngOnInit() {
    this.store.dispatch(new OrderRequested());

      this.loading$ = this.store.pipe(
        select(selectOrderLoaded)
      )

      this.dataSource = new OrderDataSource(this.store);

      const initialPage: PageQuery = {
        pageIndex: 0,
        pageSize: 5
      }
      this.dataSource.loadLessons(initialPage);
      //this.dataSource.loadLessons();

  }

  ngAfterViewInit() {

      this.paginator.page
      .pipe(
          tap(() => this.loadLessonsPage())
      )
      .subscribe();

  }

  loadLessonsPage() {
      const newPage: PageQuery = {
        pageIndex: this.paginator.pageIndex,
        pageSize: this.paginator.pageSize
      }

      this.dataSource.loadLessons(newPage);
  }



}
