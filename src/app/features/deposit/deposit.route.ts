import { Routes } from "@angular/router";

import { DepositComponent } from "@features/deposit/page/deposit/deposit.component";
import { DepositResolver } from "@features/deposit/page/deposit/deposit.resolver";

export default [
  {
    path: "",
    pathMatch: "full",
    component: DepositComponent,
    resolve: {
      depositResolver: DepositResolver,
    },
  },
] as Routes;
