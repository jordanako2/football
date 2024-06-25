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
  console.log(user['role'])
  if (user['role'] !== 'Admin' && user['role'] !== 'Super Admin') {
    
    router.navigate(['forbidden']);
    return false;
  }
  return true;
};
