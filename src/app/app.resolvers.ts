import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";

import { AuthService } from "@core/auth.service";

import { UserService } from "@shared/services/user/user.service";

import { forkJoin } from "rxjs";

export const initialDataResolver: ResolveFn<object> = () => {
  const authService = inject(AuthService);

  if (authService.accessToken) {
    return forkJoin([inject(UserService).getProfile()]);
  }

  return [];
};
