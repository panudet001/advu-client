import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";

import { BlogService } from "@shared/services/blog/blog.service";

export const DetailResolver: ResolveFn<object> = (
  route: ActivatedRouteSnapshot
) => {
  const _blogService = inject(BlogService);
  const slug = route.paramMap.get("slug");
  return _blogService.getBlogById(slug);
};
