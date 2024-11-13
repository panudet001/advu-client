import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { PrivacyPolicy } from "@shared/services/privacy-policy/privacy-policy.type";

import { environment } from "@environments/environment";

import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PrivacyPolicyService {
  constructor(private _httpClient: HttpClient) {}

  private _privacy$: BehaviorSubject<PrivacyPolicy> =
    new BehaviorSubject<PrivacyPolicy>({} as PrivacyPolicy);

  get privacy$(): Observable<PrivacyPolicy> {
    return this._privacy$.asObservable();
  }

  getPrivacyPolicy(): Observable<PrivacyPolicy> {
    return this._httpClient
      .get<PrivacyPolicy>(`${environment.apiUrl}/privacy-policy`)
      .pipe(
        tap(response => {
          this._privacy$.next(response);
        })
      );
  }
}
