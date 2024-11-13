import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "@core/auth.service";

import { environment } from "@environments/environment";

import { catchError, of, throwError } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router: Router = inject(Router);

  const publicPaths = [`${environment.apiUrl}/auth/refresh-token`];
  const isPublicPath = publicPaths.some(path => req.url.includes(path));

  if (!isPublicPath) {
    if (
      authService.accessToken &&
      authService.isTokenExpired(authService.accessToken)
    ) {
      // Token is expired, handle the token refresh in AuthService
      return authService.handleTokenRefresh(req, next).pipe(
        catchError(() => {
          router.navigate(["/sign-in"]);
          return next(req);
        })
      );
    } else {
      let authReq = req;
      if (authService.accessToken) {
        authReq = authReq.clone({
          setHeaders: {
            Authorization: `Bearer ${authService.accessToken}`,
          },
        });
      }
      return next(authReq).pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            authService.signOut();
            router.navigate(["/sign-in"]);
            return of();
          } else {
            return throwError(() => error);
          }
        })
      );
    }
  } else {
    return next(req);
  }
};
