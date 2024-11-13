import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Crypto } from "@shared/services/crypto/crypto.types";

import { environment } from "@environments/environment";

import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CryptoService {
  constructor(private _httpClient: HttpClient) {}

  private _cryptos$: BehaviorSubject<Crypto[]> = new BehaviorSubject<
    Crypto[] | []
  >([]);

  get cryptos$(): Observable<Crypto[]> {
    return this._cryptos$.asObservable();
  }

  getCryptos(): Observable<Crypto[]> {
    return this._httpClient.get<Crypto[]>(`${environment.apiUrl}/cryptos`).pipe(
      tap(response => {
        this._cryptos$.next(response);
      })
    );
  }
}
