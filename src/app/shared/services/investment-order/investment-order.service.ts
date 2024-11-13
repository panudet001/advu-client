import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import {
  InvestmentOrder,
  InvestmentOrderRequest,
  InvestmentResetOTPRequest,
  MyInvestmentAmountResponse,
  OtpResponse,
} from "@shared/services/investment-order/investment-order.types";

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

  resetOTPInvestmentOrder(
    investmentResetOTPRequest: InvestmentResetOTPRequest
  ): Observable<OtpResponse> {
    return this._httpClient.post<OtpResponse>(
      `${environment.apiUrl}/investment-orders/resend-otp`,
      investmentResetOTPRequest
    );
  }

  requestOTPInvestmentOrder(
    investmentOrderRequest: InvestmentOrderRequest
  ): Observable<OtpResponse> {
    return this._httpClient.post<OtpResponse>(
      `${environment.apiUrl}/investment-orders/send-otp`,
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
    investmentOrderRequest: InvestmentOrderRequest
  ): Observable<Response> {
    return this._httpClient.post<Response>(
      `${environment.apiUrl}/investment-orders`,
      investmentOrderRequest
    );
  }

  getInvestmentOrders(slug: string): Observable<InvestmentOrder[]> {
    return this._httpClient
      .get<
        InvestmentOrder[]
      >(`${environment.apiUrl}/investment-orders/investment/` + slug)
      .pipe(
        tap(response => {
          this._investmentOrders$.next(response);
        })
      );
  }

  getInvestmentOrdersByUser(): Observable<InvestmentOrder[]> {
    return this._httpClient
      .get<InvestmentOrder[]>(`${environment.apiUrl}/investment-orders/user`)
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

  cancelInvest(id: string): Observable<Response> {
    return this._httpClient.patch<Response>(
      `${environment.apiUrl}/investment-orders/cancel`,
      {
        id: id,
      }
    );
  }
}
