import { Routes } from "@angular/router";

import { DepositComponent } from "@features/history/page/deposit/deposit.component";
import { DepositHistoryResolver } from "@features/history/page/deposit/deposit.resolvers";
import { OrderComponent } from "@features/history/page/order/order.component";
import { OrderHistoryResolver } from "@features/history/page/order/order.resolver";
import { ProfitHistoryComponent } from "@features/history/page/profit/profit.component";
import { ProfitHistoryResolver } from "@features/history/page/profit/profit.resolvers";
import { WithdrawComponent } from "@features/history/page/withdraw/withdraw.component";
import { WithdrawHistoryResolver } from "@features/history/page/withdraw/withdraw.resolvers";

export default [
  {
    path: "profit",
    component: ProfitHistoryComponent,
    resolve: {
      homeResolver: ProfitHistoryResolver,
    },
  },
  {
    path: "withdraw",
    component: WithdrawComponent,
    resolve: {
      homeResolver: WithdrawHistoryResolver,
    },
  },
  {
    path: "deposit",
    component: DepositComponent,
    resolve: {
      homeResolver: DepositHistoryResolver,
    },
  },
  {
    path: "order",
    component: OrderComponent,
    resolve: {
      homeResolver: OrderHistoryResolver,
    },
  },
] as Routes;
