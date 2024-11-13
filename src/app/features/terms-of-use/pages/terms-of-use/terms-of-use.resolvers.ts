import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";

import { TermsOfUseService } from "@app/shared/services/terms-of-use/terms-of-use.service";

import { forkJoin } from "rxjs";

export const TermsOfUseResolver: ResolveFn<object> = () => {
  return forkJoin([inject(TermsOfUseService).getTermsOfUse()]);
};
