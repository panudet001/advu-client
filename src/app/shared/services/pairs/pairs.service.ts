import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { pair } from "@shared/services/pairs/pairs";

import { environment } from "@environments/environment";

import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PairService {
  constructor(private _httpClient: HttpClient) {}

  private _pair$: BehaviorSubject<pair> = new BehaviorSubject<pair>({} as pair);

  get pair$(): Observable<pair> {
    return this._pair$.asObservable();
  }

  getPair(cryptoSymbol: string, chainSymbol: string): Observable<pair> {
    return this._httpClient
      .get<pair>(`${environment.apiUrl}/pairs/${cryptoSymbol}/${chainSymbol}`)
      .pipe(
        tap(response => {
          this._pair$.next(response);
        })
      );
  }
}
