import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { MyWallet } from "@shared/services/wallet/wallet.types";

import { environment } from "@environments/environment";

import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WalletService {
  constructor(private _httpClient: HttpClient) {}

  private _wallets$: BehaviorSubject<MyWallet> = new BehaviorSubject<MyWallet>(
    {} as MyWallet
  );

  get wallets$(): Observable<MyWallet> {
    return this._wallets$.asObservable();
  }

  getWallet(
    page = 0,
    size = 10,
    sort = "updatedAt",
    order: "asc" | "desc" | "" = "desc"
  ): Observable<MyWallet> {
    return this._httpClient
      .get<MyWallet>(`${environment.apiUrl}/wallets`, {
        params: {
          page,
          size,
          sort,
          order,
        },
      })
      .pipe(
        tap(wallet => {
          this._wallets$.next(wallet);
        })
      );
  }

  createWallet(): Promise<void> {
    return this._httpClient
      .post<void>(`${environment.apiUrl}/wallets/generate-wallet`, {})
      .toPromise();
  }
}
