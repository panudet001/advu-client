import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import {
  OtpResponse,
  Withdraw,
  WithdrawRequest,
  WithdrawResetOTPRequest,
} from "@shared/services/withdraw-v2/withdraw.types";
import { WithdrawCrypto } from "@shared/services/withdraw-v2/withdraw.types";

import { environment } from "@environments/environment";

import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WithdrawService {
  constructor(private _httpClient: HttpClient) {}

  private _withdraw$: BehaviorSubject<Withdraw[]> = new BehaviorSubject<
    Withdraw[]
  >([]);

  get withdraw$(): Observable<Withdraw[]> {
    return this._withdraw$.asObservable();
  }

  private _crypto$: BehaviorSubject<WithdrawCrypto[]> = new BehaviorSubject<
    WithdrawCrypto[]
  >([]);

  get crypto$(): Observable<WithdrawCrypto[]> {
    return this._crypto$.asObservable();
  }

  getCryptos(): Observable<WithdrawCrypto[]> {
    return this._httpClient
      .get<WithdrawCrypto[]>(`${environment.apiUrl}/v2/cryptos/withdraw`)
      .pipe(
        tap(response => {
          this._crypto$.next(response);
        })
      );
  }

  getWithdraws(): Observable<Withdraw[]> {
    return this._httpClient
      .get<Withdraw[]>(`${environment.apiUrl}/v2/withdraws`)
      .pipe(
        tap(response => {
          this._withdraw$.next(response);
        })
      );
  }

  requestOTPWithdraw(
    withdrawRequest: WithdrawRequest
  ): Observable<OtpResponse> {
    return this._httpClient.post<OtpResponse>(
      `${environment.apiUrl}/v2/withdraws/send-otp`,
      withdrawRequest
    );
  }

  resendOTPInvestmentOrder(
    withdrawResetOTPRequest: WithdrawResetOTPRequest
  ): Observable<OtpResponse> {
    return this._httpClient.post<OtpResponse>(
      `${environment.apiUrl}/v2/withdraws/resend-otp`,
      withdrawResetOTPRequest
    );
  }

  createWithdraw(withdrawRequest: WithdrawRequest): Observable<Response> {
    return this._httpClient.post<Response>(
      `${environment.apiUrl}/v2/withdraws`,
      withdrawRequest
    );
  }
}
