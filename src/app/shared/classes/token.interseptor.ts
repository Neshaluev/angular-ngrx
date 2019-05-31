import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from '../redux/reducers';
import { isLoggedIn, token } from 'src/app/auth/shared/redux/selector/auth.selector';
import { LocalStorage } from '../services/localStorage.services';

@Injectable({
  providedIn: 'root'
})

export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private _localStorage: LocalStorage
    ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token: string = this._localStorage.getLocalStorage('token');
    if (token) {
      req = req.clone({ headers: req.headers.set('Authorization', token) });
    }
    return next.handle(req).pipe(
      catchError(
        (error: HttpErrorResponse) => this.handleAuthError(error)
      )
    )
  }

  private handleAuthError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 401) {
      this.router.navigate(['auth/login'], {
        queryParams: {
          sessionFailed: true
        }
      })
    }

    return throwError(error)
  }
}
