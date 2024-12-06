import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SignService } from '../services/sign.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const signService = inject(SignService);

  if (signService.isLoggedIn()) return true;
  router.navigate(['/sign-in']);
  return false;
};
