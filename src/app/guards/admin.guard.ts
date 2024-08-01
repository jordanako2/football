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
    router.navigate(['/login']);
    return false;
  }

  if (user['role'] !== 'Admin' && user['role'] !== 'Super Admin') {
    console.warn('Unauthorized role:', user['role']);
    router.navigate(['/admin']);
    return false;
  }

  return true;
};
