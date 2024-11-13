import { Routes } from "@angular/router";

import { DetailResolver } from "@features/blog/pages/detail/detail.resovler";
import { BlogListComponent } from "@features/blog/pages/list/list.component";
import { BlogListResolver } from "@features/blog/pages/list/list.resolver";
import { SearchResultComponent } from "@features/blog/pages/search-result/search-result.component";
import { SearchResultResolver } from "@features/blog/pages/search-result/search-result.resolver";

import { DetailComponent } from "./pages/detail/detail.component";

export default [
  {
    path: "",
    component: BlogListComponent,
    resolve: {
      blogListResolver: BlogListResolver,
    },
  },
  {
    path: "blog-detail/:slug",
    component: DetailComponent,
    resolve: {
      detailResolver: DetailResolver,
    },
  },
  {
    path: "blog-search",
    component: SearchResultComponent,
    resolve: {
      searchResultResolver: SearchResultResolver,
    },
  },
  {
    path: ":type",
    component: BlogListComponent,
    resolve: {
      blogListResolver: BlogListResolver,
    },
  },
] as Routes;
