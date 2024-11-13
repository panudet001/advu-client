import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Currency } from "@shared/services/currency/currency.types";

import { environment } from "@environments/environment";

import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CurrencyService {
  constructor(private _httpClient: HttpClient) {}

  private _currency$: BehaviorSubject<Currency> = new BehaviorSubject<Currency>(
    {} as Currency
  );

  get currency$(): Observable<Currency> {
    return this._currency$.asObservable();
  }

  private _currencies$: BehaviorSubject<Currency[]> = new BehaviorSubject<
    Currency[] | []
  >([]);

  get currencies$(): Observable<Currency[]> {
    return this._currencies$.asObservable();
  }

  getCurrencies(): Observable<Currency[]> {
    return this._httpClient
      .get<Currency[]>(`${environment.apiUrl}/currencies`)
      .pipe(
        tap(response => {
          this._currencies$.next(response);
        })
      );
  }
}
