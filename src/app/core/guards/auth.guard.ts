import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

import { AuthService } from "@core/auth.service";
import { Auth } from "@core/auth.types";

import { Observable, catchError, map, of } from "rxjs";

export const authGuard: CanActivateFn = (): Observable<boolean> | boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (
    authService.accessToken &&
    !authService.isTokenExpired(authService.accessToken)
  ) {
    // Token exists and is not expired, allow access
    return true;
  } else if (
    authService.accessToken &&
    authService.isTokenExpired(authService.accessToken)
  ) {
    const refreshToken = authService.refreshToken;
    const accessToken = authService.accessToken;
    // Token is expired, try to refresh the token

    return authService.signInUsingRefreshToken(refreshToken, accessToken).pipe(
      map((value: Auth) => {
        if (value) {
          return true; // Allow access
        }
        router.navigate(["/sign-in"]); // Redirect to sign-in page
        return false;
      }),
      catchError(() => {
        // If refresh token fails, redirect to the login page
        authService.signOut();
        router.navigate(["/sign-in"]);
        return of(false);
      })
    );
  } else {
    // No token, redirect to the login page
    router.navigate(["/sign-in"]);
    return false;
  }
};
