import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.services';
import { tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../shared/redux/reducers';
import { Login } from '../shared/redux/actions/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;


  constructor(
    private auth: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {


  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl ('admin@admin.com', [Validators.required, Validators.email]),
      password: new FormControl('123456', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
    const value = this.form.value;
    this.auth.login(value.email, value.password).pipe(
      tap( ({token, user}) => {
        this.store.dispatch(new Login({user, token}))
      } )
    ).subscribe(
      (res) => {
        this.router.navigate(['/category']);
        console.log('ok', res)
      },
      (err) => {console.log('error', err)}
    )
  }

}
