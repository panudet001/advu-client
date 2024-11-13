import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";

import { BlogService } from "@shared/services/blog/blog.service";

export const SearchResultResolver: ResolveFn<object> = (
  route: ActivatedRouteSnapshot
) => {
  const _blogService = inject(BlogService);
  const query = route.queryParamMap.get("q");
  return _blogService.getBlogList(0, 7, "", "desc", "", query!);
};
