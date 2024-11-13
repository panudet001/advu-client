import { Routes } from "@angular/router";

import { DepositComponent } from "@features/history/page/deposit/deposit.component";
import { DepositHistoryResolver } from "@features/history/page/deposit/deposit.resolvers";

export default [
  {
    pathMatch: "full",
    path: "",
    component: DepositComponent,
    resolve: {
      homeResolver: DepositHistoryResolver,
    },
  },
] as Routes;
