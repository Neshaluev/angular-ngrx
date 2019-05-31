import {Action} from '@ngrx/store';
import { User, Token } from 'src/app/shared/model/interface';

export enum AuthActionTypes {
  LoginAction = '[Логин] Action',
  RegisterAction = '[Регистрация] Action',
  LogoutAction = '[Выход] Action'
}

export class Login{
  readonly type = AuthActionTypes.LoginAction;
  constructor(
    public payload: {user: User, token: Token}
  ) {}
}
export class Register{
  readonly type = AuthActionTypes.RegisterAction;
  constructor(
    public payload: {user: User}
  ) {}
}
export class Logout{
  readonly type = AuthActionTypes.LogoutAction;
}

export type AuthActions = Login | Logout | Register;
