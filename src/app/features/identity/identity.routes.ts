import { Routes } from "@angular/router";

import { IdentityComponent } from "@features/identity/pages/list/identity.component";

import { IdentityResolver } from "./pages/list/identity.resolvers";

export default [
  {
    path: "",
    pathMatch: "full",
    resolve: {
      homeResolver: IdentityResolver,
    },
    component: IdentityComponent,
  },
] as Routes;
