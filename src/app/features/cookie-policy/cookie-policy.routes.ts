import { Routes } from "@angular/router";

import { CookiePolicyComponent } from "./pages/cookie-policy/cookie-policy.component";
import { CookiePolicyResolver } from "./pages/cookie-policy/cookie-policy.resolvers";

export default [
  {
    path: "",
    component: CookiePolicyComponent,
    resolve: {
      createResolver: CookiePolicyResolver,
    },
  },
] as Routes;
