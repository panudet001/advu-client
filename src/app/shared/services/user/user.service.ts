import { HttpClient } from "@angular/common/http";
import { Injectable, afterRender } from "@angular/core";

import { OtpResponse } from "@app/core/auth.types";
import { CookieConstant } from "@app/shared/constants/cookie.constants";

import {
  ChangeEmailRequest,
  ChangePasswordRequest,
  ResendOtpRequest,
  SendOtpNewEmailRequest,
  User,
  verifyOtpRequest,
} from "@shared/services/user/user.types";

import { environment } from "@environments/environment";

import { BehaviorSubject, Observable, ReplaySubject, tap } from "rxjs";

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

  private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

  set user(value: User) {
    this._user.next(value);
  }

  get user$(): Observable<User> {
    return this._user.asObservable();
  }

  private _username$: BehaviorSubject<User> = new BehaviorSubject<User>(
    {} as User
  );

  get username$(): Observable<User> {
    return this._username$.asObservable();
  }

  getProfile(): Observable<User> {
    return this._httpClient.get<User>(`${environment.apiUrl}/users/me`).pipe(
      tap(user => {
        this._user.next(user);
      })
    );
  }

  getUsername(username: string): Observable<User> {
    return this._httpClient
      .get<User>(`${environment.apiUrl}/user/get-username/${username}`)
      .pipe(
        tap(user => {
          this._username$.next(user);
        })
      );
  }

  updateUser(updateUser: FormData): Observable<Response> {
    return this._httpClient.put<Response>(
      `${environment.apiUrl}/users`,
      updateUser
    );
  }

  createUserKyc(formData: FormData): Promise<void> {
    return this._httpClient
      .post<void>(`${environment.apiUrl}/users/kyc`, formData, {
        headers: this.header,
      })
      .toPromise();
  }

  updateUserKyc(formData: FormData): Promise<void> {
    return this._httpClient
      .put<void>(`${environment.apiUrl}/users/kyc`, formData, {
        headers: this.header,
      })
      .toPromise();
  }

  sendOtpChangePassword(): Observable<OtpResponse> {
    return this._httpClient.post<OtpResponse>(
      `${environment.apiUrl}/users/change-password/send-otp`,
      {
        headers: this.header,
      }
    );
  }

  reSendOtpChangePassword(
    resendOtpRequest: ResendOtpRequest
  ): Observable<OtpResponse> {
    return this._httpClient.post<OtpResponse>(
      `${environment.apiUrl}/users/change-password/resend-otp`,
      resendOtpRequest
    );
  }

  verifyOtpChangePassword(
    verifyOtpRequest: verifyOtpRequest
  ): Observable<void> {
    return this._httpClient.post<void>(
      `${environment.apiUrl}/users/change-password/verify-otp`,
      verifyOtpRequest,
      {
        headers: this.header,
      }
    );
  }

  changePassword(
    changePasswordRequest: ChangePasswordRequest
  ): Observable<void> {
    return this._httpClient.put<void>(
      `${environment.apiUrl}/users/change-password`,
      changePasswordRequest,
      {
        headers: this.header,
      }
    );
  }

  sendOtpOldEmail(): Observable<OtpResponse> {
    return this._httpClient.post<OtpResponse>(
      `${environment.apiUrl}/users/verify-old-email/send-otp`,
      {
        headers: this.header,
      }
    );
  }

  reSendOtpOldEmail(
    resendOtpRequest: ResendOtpRequest
  ): Observable<OtpResponse> {
    return this._httpClient.post<OtpResponse>(
      `${environment.apiUrl}/users/verify-old-email/resend-otp`,
      resendOtpRequest
    );
  }

  verifyOtpOldEmail(verifyOtpRequest: verifyOtpRequest): Observable<void> {
    return this._httpClient.post<void>(
      `${environment.apiUrl}/users/verify-old-email`,
      verifyOtpRequest,
      {
        headers: this.header,
      }
    );
  }

  sendOtpNewEmail(
    sendOtpNewEmailRequest: SendOtpNewEmailRequest
  ): Observable<OtpResponse> {
    return this._httpClient.post<OtpResponse>(
      `${environment.apiUrl}/users/change-email/send-otp`,
      sendOtpNewEmailRequest,
      {
        headers: this.header,
      }
    );
  }

  reSendOtpNewEmail(
    resendOtpRequest: ResendOtpRequest
  ): Observable<OtpResponse> {
    return this._httpClient.post<OtpResponse>(
      `${environment.apiUrl}/users/change-email/resend-otp`,
      resendOtpRequest
    );
  }

  changeEmail(changeEmailRequest: ChangeEmailRequest): Observable<OtpResponse> {
    return this._httpClient.put<OtpResponse>(
      `${environment.apiUrl}/users/change-email`,
      changeEmailRequest,
      {
        headers: this.header,
      }
    );
  }
}
