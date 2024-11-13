import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";

import { FaqsService } from "@shared/services/faqs/faqs.service";

export const SearchResultResolver: ResolveFn<object> = (
  route: ActivatedRouteSnapshot
) => {
  const keyword = route.queryParamMap.get("q");
  const _faqsService = inject(FaqsService);
  return _faqsService.getFaqSearchResult(keyword!);
};
