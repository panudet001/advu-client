import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, Router } from "@angular/router";

import { AuthService } from "@app/core/auth.service";

import { catchError, map, of } from "rxjs";

export const RestPasswordResolver: ResolveFn<object> = (
  _route: ActivatedRouteSnapshot
) => {
  const token = _route.paramMap.get("token");
  const router = inject(Router);

  return inject(AuthService)
    .getResetPassword(token ?? "")
    .pipe(
      map(val => {
        return val;
      }),
      catchError(() => {
        router.navigate([""]);
        return of(null);
      })
    );
};
