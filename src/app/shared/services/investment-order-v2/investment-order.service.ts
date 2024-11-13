import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import {
  InvestmentOrder,
  InvestmentOrderPagination,
  InvestmentOrderRequest,
  InvestmentResetOTPRequest,
  MyInvestmentAmountResponse,
  OtpResponse,
} from "@shared/services/investment-order-v2/investment-order.types";
import { Pagination } from "@shared/types/core.types";

import { environment } from "@environments/environment";

import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class InvestmentOrderService {
  constructor(private _httpClient: HttpClient) {}

  private _investmentOrder$: BehaviorSubject<InvestmentOrder> =
    new BehaviorSubject<InvestmentOrder>({} as InvestmentOrder);

  get investmentOrder$(): Observable<InvestmentOrder> {
    return this._investmentOrder$.asObservable();
  }

  private _investmentOrders$: BehaviorSubject<InvestmentOrder[]> =
    new BehaviorSubject<InvestmentOrder[]>([]);

  get investmentOrders$(): Observable<InvestmentOrder[]> {
    return this._investmentOrders$.asObservable();
  }

  private _pagination$: BehaviorSubject<Pagination> =
    new BehaviorSubject<Pagination>({} as Pagination);

  get pagination$(): Observable<Pagination> {
    return this._pagination$.asObservable();
  }

  resetOTPInvestmentOrder(
    investmentResetOTPRequest: InvestmentResetOTPRequest,
    slug: string
  ): Observable<OtpResponse> {
    return this._httpClient.patch<OtpResponse>(
      `${environment.apiUrl}/v2/orders/${slug}/resend-otp`,
      investmentResetOTPRequest
    );
  }

  requestOTPInvestmentOrder(
    investmentOrderRequest: InvestmentOrderRequest,
    slug: string
  ): Observable<OtpResponse> {
    return this._httpClient.post<OtpResponse>(
      `${environment.apiUrl}/v2/orders/${slug}/send-otp`,
      investmentOrderRequest
    );
  }

  private _investmentOrderByUser$: BehaviorSubject<InvestmentOrder[]> =
    new BehaviorSubject<InvestmentOrder[]>([]);

  get investmentOrderByUser$(): Observable<InvestmentOrder[]> {
    return this._investmentOrderByUser$.asObservable();
  }

  private _investmentOrderByLive$: BehaviorSubject<InvestmentOrder[]> =
    new BehaviorSubject<InvestmentOrder[]>([]);

  get investmentOrderByLive$(): Observable<InvestmentOrder[]> {
    return this._investmentOrderByLive$.asObservable();
  }

  private _investmentOrderByFunded$: BehaviorSubject<InvestmentOrder[]> =
    new BehaviorSubject<InvestmentOrder[]>([]);

  get investmentOrderByFunded$(): Observable<InvestmentOrder[]> {
    return this._investmentOrderByFunded$.asObservable();
  }

  createInvestmentOrder(
    investmentOrderRequest: InvestmentOrderRequest,
    slug: string
  ): Observable<Response> {
    return this._httpClient.put<Response>(
      `${environment.apiUrl}/v2/orders/${slug}`,
      investmentOrderRequest
    );
  }

  getInvestmentOrders(slug: string): Observable<InvestmentOrderPagination> {
    return this._httpClient
      .get<InvestmentOrderPagination>(`${environment.apiUrl}/v2/orders/` + slug)
      .pipe(
        tap(response => {
          this._investmentOrders$.next(response.orders);
          this._pagination$.next(response.pagination);
        })
      );
  }

  getInvestmentOrdersByUser(): Observable<InvestmentOrder[]> {
    return this._httpClient
      .get<InvestmentOrder[]>(`${environment.apiUrl}/v2/investments/orders`)
      .pipe(
        tap(response => {
          this._investmentOrderByUser$.next(response);
        })
      );
  }

  getInvestmentOrdersByLive(): Observable<InvestmentOrder[]> {
    return this._httpClient
      .get<
        InvestmentOrder[]
      >(`${environment.apiUrl}/investment-orders/user/live`)
      .pipe(
        tap(response => {
          this._investmentOrderByLive$.next(response);
        })
      );
  }

  getInvestmentOrdersByFunded(): Observable<InvestmentOrder[]> {
    return this._httpClient
      .get<
        InvestmentOrder[]
      >(`${environment.apiUrl}/investment-orders/user/funded`)
      .pipe(
        tap(response => {
          this._investmentOrderByFunded$.next(response);
        })
      );
  }

  getAmountByInvestment(id: string): Observable<MyInvestmentAmountResponse> {
    return this._httpClient.get<MyInvestmentAmountResponse>(
      `${environment.apiUrl}/investment-orders/sum/` + id
    );
  }

  cancelInvest(slug: string): Observable<Response> {
    return this._httpClient.patch<Response>(
      `${environment.apiUrl}/v2/orders/${slug}/cancel`,
      ""
    );
  }
}
