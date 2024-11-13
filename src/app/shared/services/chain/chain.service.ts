import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "@environments/environment";

import { BehaviorSubject, Observable, tap } from "rxjs";

import { Chains } from "./chain.types";

@Injectable({
  providedIn: "root",
})
export class ChainService {
  constructor(private _httpClient: HttpClient) {}

  private _chains$: BehaviorSubject<Chains[]> = new BehaviorSubject<
    Chains[] | []
  >([]);

  get chains$(): Observable<Chains[]> {
    return this._chains$.asObservable();
  }

  getChains(): Observable<Chains[]> {
    return this._httpClient.get<Chains[]>(`${environment.apiUrl}/chains`).pipe(
      tap(response => {
        this._chains$.next(response);
      })
    );
  }
}
