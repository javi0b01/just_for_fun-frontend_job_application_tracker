import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SignService } from '../services/sign.service';
import { StoreService } from '../services/store.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const signServ = inject(SignService);
  const storeServ = inject(StoreService);

  const isLoggedIn = signServ.getIsLoggedIn();
  const profile = storeServ.getProfile();

  if (isLoggedIn && (profile === 100 || profile === 200)) return true;
  else if (isLoggedIn && profile === 300) router.navigate(['/account']);
  else router.navigate(['/sign-in']);
  return false;
};
