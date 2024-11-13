import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";

import { FaqsService } from "@shared/services/faqs/faqs.service";

import { forkJoin } from "rxjs";

export const FaqDetailResolver: ResolveFn<object> = (
  route: ActivatedRouteSnapshot
) => {
  const _faqsService = inject(FaqsService);
  const slug = route.paramMap.get("slug");
  return forkJoin([
    _faqsService.getBySlugFaq(slug!),
    _faqsService.getFaqCategory(),
  ]);
};
