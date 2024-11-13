import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";

import { DepositService } from "@shared/services/deposit-v2/deposit.service";
import { FaqsService } from "@shared/services/faqs/faqs.service";
import { UserService } from "@shared/services/user/user-v2.service";

import { forkJoin } from "rxjs";

export const DepositResolver: ResolveFn<object> = () => {
  const faqService = inject(FaqsService);
  const depositService = inject(DepositService);
  const userService = inject(UserService);

  return forkJoin([
    userService.getProfile(),
    faqService.getFaqCategoryDetail("general-questions"),
    depositService.getCryptos(),
    depositService.getDeposit(),
  ]);
};
