import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";

import { CookiePolicyService } from "@shared/services/cookie-policy/cookie-policy.service";

import { forkJoin } from "rxjs";

export const CookiePolicyResolver: ResolveFn<object> = () => {
  return forkJoin([inject(CookiePolicyService).getCookiePolicy()]);
};
