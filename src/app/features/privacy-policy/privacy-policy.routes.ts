import { Routes } from "@angular/router";

import { PrivacyPolicyComponent } from "./pages/privacy-policy/privacy-policy.component";
import { PrivacyPolicyResolver } from "./pages/privacy-policy/privacy-policy.resolvers";

export default [
  {
    path: "",
    component: PrivacyPolicyComponent,
    resolve: {
      createResolver: PrivacyPolicyResolver,
    },
  },
] as Routes;
