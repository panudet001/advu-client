import { Routes } from "@angular/router";

import { TermsOfUseComponent } from "./pages/terms-of-use/terms-of-use.component";
import { TermsOfUseResolver } from "./pages/terms-of-use/terms-of-use.resolvers";

export default [
  {
    path: "",
    component: TermsOfUseComponent,
    resolve: {
      createResolver: TermsOfUseResolver,
    },
  },
] as Routes;
