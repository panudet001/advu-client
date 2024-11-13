import { Routes } from "@angular/router";

import { DetailComponent } from "@features/property/pages/detail/detail.component";
import { DetailResolver } from "@features/property/pages/detail/detail.resolvers";
import { ListComponent } from "@features/property/pages/list/list.component";
import { ListResolver } from "@features/property/pages/list/list.resolvers";

export default [
  {
    path: "",
    pathMatch: "full",
    component: ListComponent,
    resolve: {
      listResolver: ListResolver,
    },
  },
  {
    path: ":slug",
    pathMatch: "full",
    component: DetailComponent,
    resolve: {
      listResolver: DetailResolver,
    },
  },
] as Routes;
