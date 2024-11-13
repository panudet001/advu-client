import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";

import { InvestmentOrderService } from "@shared/services/investment-order-v2/investment-order.service";
import { InvestmentService } from "@shared/services/investment-v2/investment.service";

import { forkJoin } from "rxjs";

export const DetailResolver: ResolveFn<object> = (
  _route: ActivatedRouteSnapshot
) => {
  const slug = _route.paramMap.get("slug");

  return forkJoin([
    inject(InvestmentService).getInvestmentBySlug(slug ?? ""),
    inject(InvestmentOrderService).getInvestmentOrders(slug ?? ""),
  ]);
};
