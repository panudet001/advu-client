import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";

import { InvestmentOrderService } from "@shared/services/investment-order-v2/investment-order.service";
import { UserService } from "@shared/services/user/user-v2.service";
import { WalletService } from "@shared/services/wallet-v2/wallet.service";

import { forkJoin } from "rxjs";

export const PortfolioResolver: ResolveFn<object> = () => {
  const userService = inject(UserService);
  const investmentOrderService = inject(InvestmentOrderService);
  const walletService = inject(WalletService);

  return forkJoin([
    userService.getProfile(),
    investmentOrderService.getInvestmentOrdersByUser(),
    walletService.getWallet(),
  ]);
};
