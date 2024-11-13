import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";

import { FaqsService } from "@shared/services/faqs/faqs.service";

import { forkJoin } from "rxjs";

export const FaqOverviewResolver: ResolveFn<object> = () => {
  const _faqsService = inject(FaqsService);
  return forkJoin([
    _faqsService.getFaqMostTopic(),
    _faqsService.getFaqCategory(),
  ]);
};
