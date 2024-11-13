import { Routes } from "@angular/router";

import { SuccessComponent } from "@features/auth/pages/success/success.component";

import { SignUpComponent } from "./sign-up.component";

export default [
  {
    path: "",
    pathMatch: "full",
    component: SignUpComponent,
  },
  {
    path: "successfully",
    pathMatch: "full",
    component: SuccessComponent,
  },
] as Routes;
