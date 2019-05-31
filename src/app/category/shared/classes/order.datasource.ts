import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, of} from "rxjs";
import {Order} from "src/app/shared/model/interface";
import { Store, select } from "@ngrx/store";
import { AppState } from 'src/app/shared/redux/reducers';
import {catchError, tap} from "rxjs/operators";
import { selectOrderPage } from '../redux/selector/order.selector';
import { PageQuery } from '../redux/actions/order.actions';

export class OrderDataSource implements DataSource<Order> {
  private orderSubject = new BehaviorSubject<Order[]>([]);
  constructor(
    private store: Store<AppState>
  ){}

  loadLessons(page: PageQuery) {
  // loadLessons() {
    this.store.pipe(
        select(selectOrderPage(page)),
        tap( lessons => {
          // заносим в поток как я понял если курсы есть
          if (lessons.length > 0) {
            this.orderSubject.next(lessons);
          } else {
            // если курсов нету то диспачим их
            //this.store.dispatch(new LessonsPageRequested({courseId, page}));
          }
        }),
        catchError( () => of([]) )
      )
    .subscribe()
}

  connect(collectionViewer: CollectionViewer): Observable<Order[]> {
    return this.orderSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.orderSubject.complete();
  }
}
