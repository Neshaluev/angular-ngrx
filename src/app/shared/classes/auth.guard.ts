import { Injectable } from "@angular/core";
import { CanActivateChild, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store, select } from "@ngrx/store";
import { AppState } from '../redux/reducers';
import { isLoggedIn } from 'src/app/auth/shared/redux/selector/auth.selector';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanActivateChild{
    constructor(
      private store: Store<AppState>,
      private router: Router
      ) {}

    canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
      return this.store.pipe(
        select(isLoggedIn),
        tap(isLoggedIn => {
          if (!isLoggedIn) {
            this.router.navigate(['auth/login']);
          }
        })
      )
    }

    canActivateChild(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
      return this.canActivate(router, state)
    }
}
