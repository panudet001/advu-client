import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";

import { PrivacyPolicyService } from "@app/shared/services/privacy-policy/privacy-policy.service";

import { forkJoin } from "rxjs";

export const PrivacyPolicyResolver: ResolveFn<object> = () => {
  return forkJoin([inject(PrivacyPolicyService).getPrivacyPolicy()]);
};
