import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";

import { FaqsService } from "@app/shared/services/faqs/faqs.service";

import { forkJoin } from "rxjs";

export const IdentityResolver: ResolveFn<object> = () => {
  const historyService = inject(FaqsService);
  return forkJoin([historyService.getFaqCategoryDetail("identity-and-policy")]);
};
