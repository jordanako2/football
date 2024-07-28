import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const cookieService = inject(CookieService);
  const authToken = cookieService.get('key');

  if (authToken) {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes(environment.apiUrl+'/auth/refresh')) {
        return authService.refreshToken().pipe(
          switchMap(() => {
            const newAccessToken = cookieService.get('key');
            if (newAccessToken) {
              const authReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${newAccessToken}`)
              });
              return next(authReq);
            }
            return throwError(() => new Error('Failed to refresh token'));
          }),
          catchError((err) => {
            // authService.logout();
            return throwError(() => new Error('Failed to refresh token and logout'));
          })
        );
      }
      return throwError(() => new Error(error.message));
    })
  );
};
























// import { HttpInterceptorFn } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { AuthService } from '../services/auth.service';


// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   const authService = inject(AuthService);
//   const authToken = authService.getToken();

//   const authReq = req.clone({
//     headers: req.headers.set('Authorization', `Bearer ${authToken}`)
//   });

//   return next(authReq);
// };
