import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";

import { BlogService } from "@shared/services/blog/blog.service";

export const BlogListResolver: ResolveFn<object> = (
  route: ActivatedRouteSnapshot
) => {
  const _blogService = inject(BlogService);
  const type = route.paramMap.get("type");
  if (!type || type == "") {
    return _blogService.getBlogList();
  } else if (type == "news") {
    return _blogService.getBlogList(0, 7, "", "desc", "News");
  } else if (type == "events") {
    return _blogService.getBlogList(0, 7, "", "desc", "Events");
  } else if (type == "articles") {
    return _blogService.getBlogList(0, 7, "", "desc", "Articles");
  }
  return [];
};
