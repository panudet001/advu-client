import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";

import { HistoryService } from "@shared/services/history-v2/history.service";
import { UserService } from "@shared/services/user/user-v2.service";

import { forkJoin } from "rxjs";

export const DepositHistoryResolver: ResolveFn<object> = () => {
  const depositHistoryService = inject(HistoryService);
  const userService = inject(UserService);

  return forkJoin([
    depositHistoryService.getDepositHistory(),
    userService.getProfile(),
  ]);
};
