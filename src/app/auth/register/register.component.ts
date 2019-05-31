import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.services';
import { User } from 'src/app/shared/model/interface';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/redux/reducers';
import { Register } from '../shared/redux/actions/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: new FormControl ('test@test.com', [Validators.required, Validators.email]),
      password: new FormControl('123456', [Validators.required, Validators.minLength(6)])
    });
  }


  onSubmit() {
    console.log('ok', this.form.value)
    const user: User = this.form.value;
    this.auth.registration(user).pipe(
      tap( user => {
        this.store.dispatch( new Register({user}));
      })
    ).subscribe(
      (res) => {
        this.router.navigate(['auth/login']);
      },
      (err) => {console.log('Error', err)}
    )
  }

}
