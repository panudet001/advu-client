import { Routes } from "@angular/router";

import { FaqCategoryComponent } from "@features/faq/pages/category/category.component";
import { FaqCategoryResolver } from "@features/faq/pages/category/category.resolver";
import { DetailComponent } from "@features/faq/pages/detail/detail.component";
import { FaqDetailResolver } from "@features/faq/pages/detail/detail.resolver";
import { FaqOverviewResolver } from "@features/faq/pages/overview/faq-overview.resolver";
import { FaqComponent } from "@features/faq/pages/overview/faq.component";
import { SearchResultComponent } from "@features/faq/pages/search-result/search-result.component";
import { SearchResultResolver } from "@features/faq/pages/search-result/search-result.resolver";

export default [
  {
    path: "",
    component: FaqComponent,
    resolve: {
      createResolver: FaqOverviewResolver,
    },
  },
  {
    path: "category/:slug",
    component: FaqCategoryComponent,
    resolve: {
      createResolver: FaqCategoryResolver,
    },
  },
  {
    path: "question/:slug",
    component: DetailComponent,
    resolve: {
      createResolver: FaqDetailResolver,
    },
  },
  {
    path: "search-faq",
    component: SearchResultComponent,
    resolve: {
      createResolver: SearchResultResolver,
    },
  },
] as Routes;
