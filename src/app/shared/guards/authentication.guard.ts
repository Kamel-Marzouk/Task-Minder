import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const authenticationGuard: CanActivateFn = () => {
  const authenticationService: AuthenticationService = inject(AuthenticationService);
  const isAuth = authenticationService.isAuthenticated();
  if (isAuth) return true;
  authenticationService.logout();
  return false;
};
