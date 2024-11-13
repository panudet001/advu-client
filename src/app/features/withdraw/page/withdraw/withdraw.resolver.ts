import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";

import { FaqsService } from "@shared/services/faqs/faqs.service";
import { UserService } from "@shared/services/user/user-v2.service";
import { WithdrawService } from "@shared/services/withdraw-v2/withdraw.service";

import { forkJoin } from "rxjs";

export const WithdrawResolver: ResolveFn<object> = () => {
  const faqsService = inject(FaqsService);
  const withdrawService = inject(WithdrawService);
  const userService = inject(UserService);

  return forkJoin([
    userService.getProfile(),
    withdrawService.getWithdraws(),
    withdrawService.getCryptos(),
    faqsService.getFaqCategoryDetail("returns-and-withdrawals"),
  ]);
};
