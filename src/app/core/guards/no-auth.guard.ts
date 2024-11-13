import { inject } from "@angular/core";
import { CanActivateChildFn, CanActivateFn, Router } from "@angular/router";

import { AuthService } from "@core/auth.service";

export const noAuthGuard: CanActivateFn | CanActivateChildFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (
    authService.accessToken &&
    !authService.isTokenExpired(authService.accessToken)
  ) {
    router.navigate([""]);
    return false;
  } else {
    return true;
  }
};
