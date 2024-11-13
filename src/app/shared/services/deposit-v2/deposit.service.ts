import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Deposits } from "@shared/services/deposit-v2/deposit.type";
import { DepositCrypto } from "@shared/services/deposit-v2/deposit.type";

import { environment } from "@environments/environment";

import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DepositService {
  private _deposit$: BehaviorSubject<Deposits[]> = new BehaviorSubject<
    Deposits[]
  >([]);

  get deposit$(): Observable<Deposits[]> {
    return this._deposit$.asObservable();
  }

  private _crypto$: BehaviorSubject<DepositCrypto[]> = new BehaviorSubject<
    DepositCrypto[]
  >([]);

  get crypto$(): Observable<DepositCrypto[]> {
    return this._crypto$.asObservable();
  }

  constructor(private _httpClient: HttpClient) {}

  getCryptos(): Observable<DepositCrypto[]> {
    return this._httpClient
      .get<DepositCrypto[]>(`${environment.apiUrl}/v2/cryptos/deposit`)
      .pipe(
        tap(response => {
          this._crypto$.next(response);
        })
      );
  }

  getDeposit(): Observable<Deposits[]> {
    return this._httpClient
      .get<Deposits[]>(`${environment.apiUrl}/v2/deposits`)
      .pipe(
        tap(response => {
          this._deposit$.next(response);
        })
      );
  }
}
