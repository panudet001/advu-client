import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Content } from "@shared/services/content/content.types";

import { environment } from "@environments/environment";

import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ContentService {
  constructor(private _httpClient: HttpClient) {}

  private _content$: BehaviorSubject<Content> = new BehaviorSubject<Content>(
    {} as Content
  );
  get content$(): Observable<Content> {
    return this._content$.asObservable();
  }

  getTermsOfUse(): Observable<Content> {
    return this._httpClient
      .get<Content>(`${environment.apiUrl}/terms-of-use`)
      .pipe(
        tap(response => {
          this._content$.next(response);
        })
      );
  }

  getPrivacyPolicy(): Observable<Content> {
    return this._httpClient
      .get<Content>(`${environment.apiUrl}/privacy-policy`)
      .pipe(
        tap(response => {
          this._content$.next(response);
        })
      );
  }

  getCookiesPolicy(): Observable<Content> {
    return this._httpClient
      .get<Content>(`${environment.apiUrl}/cookies-policy`)
      .pipe(
        tap(response => {
          this._content$.next(response);
        })
      );
  }
}
