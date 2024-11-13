import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import {
  OtpResponse,
  Withdraw,
  WithdrawRequest,
  WithdrawResetOTPRequest,
} from "@shared/services/withdraw/withdraw.types";

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

  requestOTPWithdraw(
    withdrawRequest: WithdrawRequest
  ): Observable<OtpResponse> {
    return this._httpClient.post<OtpResponse>(
      `${environment.apiUrl}/withdraw/send-otp`,
      withdrawRequest
    );
  }

  resendOTPInvestmentOrder(
    withdrawResetOTPRequest: WithdrawResetOTPRequest
  ): Observable<OtpResponse> {
    return this._httpClient.patch<OtpResponse>(
      `${environment.apiUrl}/withdraw/resend-otp`,
      withdrawResetOTPRequest
    );
  }

  createWithdraw(withdrawRequest: WithdrawRequest): Observable<Response> {
    return this._httpClient.post<Response>(
      `${environment.apiUrl}/withdraw`,
      withdrawRequest
    );
  }

  getWithdraws(limit = 30): Observable<Withdraw[]> {
    return this._httpClient
      .get<Withdraw[]>(`${environment.apiUrl}/withdraw`, {
        params: {
          limit,
        },
      })
      .pipe(
        tap(response => {
          this._withdraw$.next(response);
        })
      );
  }
}
