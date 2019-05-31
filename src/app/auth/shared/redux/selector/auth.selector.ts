import { createSelector } from '@ngrx/store';


export const selectAuthState = state => state.auth;

export const isLoggedIn = createSelector(
  selectAuthState,
  auth => auth.loggedIn
);
export const token = createSelector(
  selectAuthState,
  auth => auth.token
);
export const isLoggedOut = createSelector(
  isLoggedIn,
  isLoggedIn => !isLoggedIn
);
