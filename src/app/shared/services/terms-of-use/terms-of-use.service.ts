import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { TermsOfUse } from "@shared/services/terms-of-use/terms-of-use.type";

import { environment } from "@environments/environment";

import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TermsOfUseService {
  constructor(private _httpClient: HttpClient) {}

  private _termsOfUse$: BehaviorSubject<TermsOfUse> =
    new BehaviorSubject<TermsOfUse>({} as TermsOfUse);

  get termsOfUse$(): Observable<TermsOfUse> {
    return this._termsOfUse$.asObservable();
  }

  getTermsOfUse(): Observable<TermsOfUse> {
    return this._httpClient
      .get<TermsOfUse>(`${environment.apiUrl}/terms-of-use`)
      .pipe(
        tap(response => {
          this._termsOfUse$.next(response);
        })
      );
  }
}
