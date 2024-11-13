import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";

import { HistoryService } from "@shared/services/history-v2/history.service";
import { UserService } from "@shared/services/user/user-v2.service";

import { forkJoin } from "rxjs";

export const WithdrawHistoryResolver: ResolveFn<object> = () => {
  const historyService = inject(HistoryService);
  const userService = inject(UserService);

  return forkJoin([
    historyService.getWithdrawHistory(),
    userService.getProfile(),
  ]);
};
