import { Routes } from "@angular/router";

import { ResetPasswordComponent } from "./reset-password.component";
import { RestPasswordResolver } from "./reset-password.resolvers";

export default [
  {
    path: "",
    resolve: {
      listResolver: RestPasswordResolver,
    },
    component: ResetPasswordComponent,
  },
] as Routes;
