import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { DepositHistories } from "@shared/services/deposit/deposit.type";

import { environment } from "@environments/environment";

import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DepositService {
  private _depositHistory$: BehaviorSubject<DepositHistories[]> =
    new BehaviorSubject<DepositHistories[]>([]);

  get depositHistory$(): Observable<DepositHistories[]> {
    return this._depositHistory$.asObservable();
  }

  constructor(private _httpClient: HttpClient) {}

  getDepositHistory(limit = 30): Observable<DepositHistories[]> {
    return this._httpClient
      .get<DepositHistories[]>(`${environment.apiUrl}/deposits`, {
        params: {
          limit,
        },
      })
      .pipe(
        tap(response => {
          this._depositHistory$.next(response);
        })
      );
  }
}
