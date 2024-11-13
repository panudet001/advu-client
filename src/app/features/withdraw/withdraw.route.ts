import { Routes } from "@angular/router";

import { WithdrawComponent } from "@features/withdraw/page/withdraw/withdraw.component";
import { WithdrawResolver } from "@features/withdraw/page/withdraw/withdraw.resolver";

export default [
  {
    path: "",
    pathMatch: "full",
    component: WithdrawComponent,
    resolve: {
      depositResolver: WithdrawResolver,
    },
  },
] as Routes;
