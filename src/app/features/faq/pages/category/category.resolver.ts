import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";

import { FaqsService } from "@shared/services/faqs/faqs.service";

import { forkJoin } from "rxjs";

export const FaqCategoryResolver: ResolveFn<object> = (
  route: ActivatedRouteSnapshot
) => {
  const _faqsService = inject(FaqsService);
  const slug = route.paramMap.get("slug");
  return forkJoin([
    _faqsService.getFaqCategory(),
    _faqsService.getFaqCategoryDetail(slug!),
  ]);
};
