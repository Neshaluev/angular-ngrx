
import { User, Token } from 'src/app/shared/model/interface';
import { AuthActionTypes, AuthActions } from '../actions/auth.actions';

type AuthState = {
  user: User,
  loggedIn: boolean
}


export const  initialState: AuthState  = {
  user: undefined,
  loggedIn: false,
}

export function reducer(state: AuthState = initialState, action: AuthActions){
  switch (action.type) {
    case AuthActionTypes.LoginAction:
      return {
        user: action.payload.user,
        loggedIn: true
      }
    case AuthActionTypes.LogoutAction:
      return {
        loggedIn: false,
        user: undefined
      }
    case AuthActionTypes.RegisterAction:
      return {
        user: action.payload.user
      }
    default: return state;
  }
}

