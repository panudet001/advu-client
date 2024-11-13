import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";

import { BannerService } from "@shared/services/banner/banner.service";
import { InvestmentEnums } from "@shared/services/investment-v2/investment.enums";
import { InvestmentService } from "@shared/services/investment-v2/investment.service";

import { forkJoin } from "rxjs";

export const ListResolver: ResolveFn<object> = () => {
  return forkJoin([
    inject(InvestmentService).getInvestments(InvestmentEnums.live, 0, 12),
    inject(BannerService).getBanners(),
  ]);
};
