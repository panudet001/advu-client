import { isPlatformBrowser } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";

import { CookieConstant } from "@shared/constants/cookie.constants";

import { environment } from "@environments/environment";

import { jwtDecode } from "jwt-decode";
import {
  BehaviorSubject,
  Observable,
  catchError,
  of,
  switchMap,
  tap,
  throwError,
} from "rxjs";

import {
  Auth,
  AuthResendOtpRequest,
  AuthResendResetPasswordRequest,
  AuthSendOtpRequest,
  AuthSignInRequest,
  DeleteAccountRequest,
  ForgotPasswordRequest,
  IpLocation,
  OtpResponse,
  SetIp,
  SignUpResponse,
} from "./auth.types";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  signUpResponse!: SignUpResponse;
  isRefreshing = false;
  authToken$: BehaviorSubject<Auth | null> = new BehaviorSubject<Auth | null>(
    null
  );

  constructor(
    private _httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  get accessToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(CookieConstant.accessToken);
    }
    return null;
  }

  set accessToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(CookieConstant.accessToken, token);
    }
  }

  get refreshToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(CookieConstant.refreshToken);
    }
    return null;
  }

  set refreshToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(CookieConstant.refreshToken, token);
    }
  }

  signIn(authSignInRequest: AuthSignInRequest): Observable<Auth> {
    return this._httpClient
      .post<Auth>(`${environment.apiUrl}/auth/sign-in`, authSignInRequest)
      .pipe(
        tap((value: Auth) => {
          this.accessToken = value.accessToken;
          this.refreshToken = value.refreshToken;
        })
      );
  }

  signOut(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(CookieConstant.accessToken);
      localStorage.removeItem(CookieConstant.refreshToken);
    }
  }

  sendOtp(authSendOtpType: AuthSendOtpRequest): Observable<OtpResponse> {
    return this._httpClient.post<OtpResponse>(
      `${environment.apiUrl}/auth/sign-up/send-otp`,
      authSendOtpType
    );
  }

  resendOtp(
    authResendOtpRequest: AuthResendOtpRequest
  ): Observable<OtpResponse> {
    return this._httpClient.patch<OtpResponse>(
      `${environment.apiUrl}/auth/sign-up/resend-otp`,
      authResendOtpRequest
    );
  }

  signUp(authSendOtpType: AuthSendOtpRequest): Observable<SignUpResponse> {
    return this._httpClient
      .post<SignUpResponse>(
        `${environment.apiUrl}/auth/sign-up`,
        authSendOtpType
      )
      .pipe(
        tap((value: SignUpResponse) => {
          this.accessToken = value.accessToken;
          this.refreshToken = value.refreshToken;
        })
      );
  }

  signInSendOtp(authSignInRequest: AuthSignInRequest): Observable<OtpResponse> {
    return this._httpClient.post<OtpResponse>(
      `${environment.apiUrl}/auth/sign-in/send-otp`,
      authSignInRequest
    );
  }

  signInResendOtp(
    authSignInRequest: AuthSignInRequest
  ): Observable<OtpResponse> {
    return this._httpClient.patch<OtpResponse>(
      `${environment.apiUrl}/auth/sign-in/resend-otp`,
      authSignInRequest
    );
  }

  forgotPassword(
    forgotPasswordRequest: ForgotPasswordRequest,
    setIp: SetIp
  ): Observable<Response> {
    const header = {
      ip: setIp.ip,
      browser: setIp.browser,
      device: setIp.device,
    };

    return this._httpClient.post<Response>(
      `${environment.apiUrl}/auth/forgot-password`,
      forgotPasswordRequest,
      {
        headers: header,
      }
    );
  }

  getIp(): Observable<IpLocation> {
    return this._httpClient.get<IpLocation>(
      "https://ipgeolocation.abstractapi.com/v1/?api_key=334a0075cb454b609d8c48283dc02adb"
    );
  }

  resendOtpForgotPassword(
    authResendOtpRequest: AuthResendOtpRequest
  ): Observable<OtpResponse> {
    return this._httpClient.patch<OtpResponse>(
      `${environment.apiUrl}/auth/forgot-password/resend-otp`,
      authResendOtpRequest
    );
  }

  getResetPassword(token: string): Observable<Response> {
    return this._httpClient.post<Response>(
      `${environment.apiUrl}/auth/forgot-password/${token}`,
      ""
    );
  }

  resetPassword(
    authResendOtpRequest: AuthResendResetPasswordRequest,
    token: string
  ): Observable<Response> {
    const header = {
      token: token,
    };
    return this._httpClient.patch<Response>(
      `${environment.apiUrl}/auth/reset-password`,
      authResendOtpRequest,
      {
        headers: header,
      }
    );
  }

  isAuthenticated(): boolean {
    return this.accessToken !== null && !this.isTokenExpired(this.accessToken);
  }

  isTokenExpired(token: string): boolean {
    try {
      const jwtPayload = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      /* eslint-disable */
      // @ts-ignore
      return jwtPayload.exp < currentTime;
    } catch (error) {
      return true; // If there's an error in decoding, consider the token expired
    }
  }

  signInUsingRefreshToken(
    refreshToken: string | null,
    accessToken: string | null
  ): Observable<Auth> {
    return this._httpClient
      .post<Auth>(`${environment.apiUrl}/auth/refresh-token`, {
        refreshToken: refreshToken,
        accessToken: accessToken,
      })
      .pipe(
        switchMap((response: Auth) => {
          if (response.accessToken) {
            this.accessToken = response.accessToken;
            this.refreshToken = response.accessToken;
            return of(response);
          }
          return of(response);
        })
      );
  }

  deleteAccount(
    deleteAccountRequest: DeleteAccountRequest
  ): Observable<Response> {
    return this._httpClient.delete<Response>(
      `${environment.apiUrl}/auth/delete-account`,
      { body: deleteAccountRequest }
    );
  }

  handleTokenRefresh(req: any, next: any): Observable<any> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.authToken$.next(null);
      let refreshToken = this.refreshToken;
      let accessToken = this.accessToken;

      return this.signInUsingRefreshToken(refreshToken, accessToken).pipe(
        switchMap(value => {
          this.isRefreshing = false;
          this.accessToken = value.accessToken;
          this.refreshToken = value.refreshToken;
          this.authToken$.next(value);

          return next(
            req.clone({
              setHeaders: {
                Authorization: `Bearer ${value.accessToken}`,
              },
            })
          );
        }),
        catchError(err => {
          this.isRefreshing = false;
          this.signOut();
          return throwError(() => err);
        })
      );
    } else {
      return this.authToken$.pipe(
        switchMap(value => {
          return next(
            req.clone({
              setHeaders: {
                Authorization: `Bearer ${value?.accessToken}`,
              },
            })
          );
        })
      );
    }
  }
}
