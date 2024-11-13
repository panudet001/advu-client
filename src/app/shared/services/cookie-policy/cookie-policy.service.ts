import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { CookiePolicy } from "@shared/services/cookie-policy/cookie-policy.types";

import { environment } from "@environments/environment";

import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CookiePolicyService {
  constructor(private _httpClient: HttpClient) {}

  private _cookiePolicy$: BehaviorSubject<CookiePolicy> =
    new BehaviorSubject<CookiePolicy>({} as CookiePolicy);
  get cookiePolicy$(): Observable<CookiePolicy> {
    return this._cookiePolicy$.asObservable();
  }

  getCookiePolicy(): Observable<CookiePolicy> {
    return this._httpClient
      .get<CookiePolicy>(`${environment.apiUrl}/cookies-policy`)
      .pipe(
        tap(response => {
          this._cookiePolicy$.next(response);
        })
      );
  }
}
