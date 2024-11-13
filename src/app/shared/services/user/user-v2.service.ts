import { HttpClient } from "@angular/common/http";
import { Injectable, afterRender } from "@angular/core";

import { CookieConstant } from "@app/shared/constants/cookie.constants";

import { UserV2 } from "@shared/services/user/user.types";

import { environment } from "@environments/environment";

import { Observable, ReplaySubject, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  accessToken!: string;

  constructor(private _httpClient: HttpClient) {
    afterRender(() => {
      this.accessToken = localStorage.getItem(CookieConstant.accessToken) ?? "";
    });
  }

  header = {
    Authorization: `Bearer ${this.accessToken}`,

    Accept: "application/json",
  };

  private _user: ReplaySubject<UserV2> = new ReplaySubject<UserV2>(1);

  set user(value: UserV2) {
    this._user.next(value);
  }

  get user$(): Observable<UserV2> {
    return this._user.asObservable();
  }

  getProfile(): Observable<UserV2> {
    return this._httpClient
      .get<UserV2>(`${environment.apiUrl}/v2/profile`)
      .pipe(
        tap(user => {
          this._user.next(user);
        })
      );
  }
}
