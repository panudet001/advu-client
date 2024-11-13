import { Routes } from "@angular/router";

import { DeleteAccountSuccessComponent } from "./pages/delete-account-success/delete-account-success.component";
import { ProfileComponent } from "./pages/profile/profile.component";

export default [
  {
    path: "",
    pathMatch: "full",
    component: ProfileComponent,
  },
  {
    path: "deleted",
    pathMatch: "full",
    component: DeleteAccountSuccessComponent,
  },
] as Routes;
