import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { defer, of } from 'rxjs';

import { LocalStorage } from 'src/app/shared/services/localStorage.services';
import { Login, AuthActionTypes, Logout, Register } from '../actions/auth.actions';


@Injectable({
  providedIn: 'root'
})

export class AuthEffect {
  @Effect({dispatch: false}) login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.LoginAction),
    tap( action => {
      this._localStorage.setLocalStorage('user', action.payload.user)
      this._localStorage.setLocalStorage('token', action.payload.token)
      console.log('Action', action)
    })
  )

  @Effect({dispatch:false}) logout$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.LogoutAction),
    tap( () => {
      this._localStorage.removeLocalStorage("user")
      this._localStorage.removeLocalStorage("token")
      this.router.navigate(['auth/login'])
    })
  )

  @Effect()
  init$ = defer(() => {
    const user = this._localStorage.getLocalStorage('user');
    const token = this._localStorage.getLocalStorage('token');
    if (user && token) {
      return of(new Login({user, token}));
    }else {
      return <any> of(new Logout());
    }

  });


  constructor(
    private actions$: Actions,
    private router: Router,
    private _localStorage: LocalStorage,
  ) {}
}
