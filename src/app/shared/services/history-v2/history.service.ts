import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import {
  DepositHistoryPagination,
  OrderHistoryPagination,
  ProfitHistoryPagination,
  WithdrawHistoryPagination,
} from "@shared/services/history-v2/history";

import { environment } from "@environments/environment";

import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HistoryService {
  private _profitHistory$: BehaviorSubject<ProfitHistoryPagination> =
    new BehaviorSubject<ProfitHistoryPagination>({} as ProfitHistoryPagination);

  get profitHistory$(): Observable<ProfitHistoryPagination> {
    return this._profitHistory$.asObservable();
  }

  private _withdrawHistory$: BehaviorSubject<WithdrawHistoryPagination> =
    new BehaviorSubject<WithdrawHistoryPagination>(
      {} as WithdrawHistoryPagination
    );

  get withdrawHistory$(): Observable<WithdrawHistoryPagination> {
    return this._withdrawHistory$.asObservable();
  }

  private _depositHistory$: BehaviorSubject<DepositHistoryPagination> =
    new BehaviorSubject<DepositHistoryPagination>(
      {} as DepositHistoryPagination
    );

  get depositHistory$(): Observable<DepositHistoryPagination> {
    return this._depositHistory$.asObservable();
  }

  private _orderHistory$: BehaviorSubject<OrderHistoryPagination> =
    new BehaviorSubject<OrderHistoryPagination>({} as OrderHistoryPagination);

  get orderHistory$(): Observable<OrderHistoryPagination> {
    return this._orderHistory$.asObservable();
  }

  constructor(private _httpClient: HttpClient) {}

  geProfitHistory(
    page = 0,
    size = 30,
    startAt = "",
    endAt = "",
    status = "",
    sort = "updatedAt",
    order = "asc",
    search = ""
  ): Observable<ProfitHistoryPagination> {
    return this._httpClient
      .get<ProfitHistoryPagination>(
        `${environment.apiUrl}/v2/histories/profit`,
        {
          params: {
            page,
            size,
            startAt,
            endAt,
            status,
            sort,
            order,
            search,
          },
        }
      )
      .pipe(
        tap(response => {
          this._profitHistory$.next(response);
        })
      );
  }

  getWithdrawHistory(
    page = 0,
    size = 30,
    startAt = "",
    endAt = "",
    status = "",
    sort = "updatedAt",
    order = "asc",
    searchValue = ""
  ): Observable<WithdrawHistoryPagination> {
    return this._httpClient
      .get<WithdrawHistoryPagination>(
        `${environment.apiUrl}/v2/histories/withdraw`,
        {
          params: {
            page,
            size,
            startAt,
            endAt,
            status,
            sort,
            order,
            searchValue,
          },
        }
      )
      .pipe(
        tap(response => {
          this._withdrawHistory$.next(response);
        })
      );
  }

  getDepositHistory(
    page = 0,
    size = 30,
    startAt = "",
    endAt = "",
    status = "",
    sort = "updatedAt",
    order = "asc",
    search = ""
  ): Observable<DepositHistoryPagination> {
    return this._httpClient
      .get<DepositHistoryPagination>(
        `${environment.apiUrl}/v2/histories/deposit`,
        {
          params: {
            page,
            size,
            startAt,
            endAt,
            status,
            sort,
            order,
            search,
          },
        }
      )
      .pipe(
        tap(response => {
          this._depositHistory$.next(response);
        })
      );
  }

  getOrderHistory(
    page = 0,
    size = 30,
    startAt = "",
    endAt = ""
  ): Observable<OrderHistoryPagination> {
    return this._httpClient
      .get<OrderHistoryPagination>(`${environment.apiUrl}/v2/histories/order`, {
        params: {
          page,
          size,
          startAt,
          endAt,
        },
      })
      .pipe(
        tap(response => {
          this._orderHistory$.next(response);
        })
      );
  }
}
