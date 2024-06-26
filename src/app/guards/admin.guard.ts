import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AdminGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getUser();

  if (!user) {
    console.error('User not found');
    return false;
  }

  console.log('User role:', user['role']);

  if (user['role'] !== 'Admin' && user['role'] !== 'Super Admin') {
    console.warn('Unauthorized role:', user['role']);
    return false;
  }

  return true;
};
