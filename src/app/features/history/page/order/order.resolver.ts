import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";

import { HistoryService } from "@shared/services/history-v2/history.service";

import { forkJoin } from "rxjs";

export const OrderHistoryResolver: ResolveFn<object> = () => {
  const historyService = inject(HistoryService);
  return forkJoin([historyService.getOrderHistory()]);
};
