import { CommonModule, NgOptimizedImage } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { AuthService } from "@app/core/auth.service";
import { AuthSignInRequest, OtpResponse } from "@app/core/auth.types";
import { ErrorConstants } from "@app/shared/constants/error.constants";
import { TransformErrorCodePipe } from "@app/shared/pipes/transform-error-code.pipe";

import { FormOtpVerifyComponent } from "@shared/components/form-otp-verify/form-otp-verify.component";
import { CookieConstant } from "@shared/constants/cookie.constants";
import { LocalizationService } from "@shared/services/localization/localization-service";
import { UserService } from "@shared/services/user/user.service";

import { LocalizeRouterPipe } from "@gilsdav/ngx-translate-router";
import { TranslateModule } from "@ngx-translate/core";
import { SsrCookieService } from "ngx-cookie-service-ssr";

@Component({
  selector: "app-sign-in",
  standalone: true,
  imports: [
    CommonModule,
    FormOtpVerifyComponent,
    LocalizeRouterPipe,
    NgOptimizedImage,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: "./sign-in.component.html",
  styleUrl: "./sign-in.component.scss",
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;
  authSignInRequest!: AuthSignInRequest;

  alertError = "";
  isShowAlertError = false;
  isFirstSubmit = false;
  isShowPassword = false;
  redirectURL =
    this._activatedRoute.snapshot.queryParamMap.get("redirectURL") || "";

  isOpenOtpForm = false;
  isShowAlertErrorOTP!: boolean;
  alertErrorOTP!: string;
  otpKey!: string;
  email!: string;
  countryCode!: number;
  refWithTime!: string;
  isLoadingOTP!: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService,
    private _transformErrorCodePipe: TransformErrorCodePipe,
    private _ssrCookieService: SsrCookieService,
    private _localizeRouterService: LocalizationService,
    private _userSerivce: UserService
  ) {}

  get fUsername() {
    return this.signInForm?.get("username");
  }

  get fPassword() {
    return this.signInForm?.get("password");
  }

  get fIsRemember() {
    return this.signInForm?.get("isRemember");
  }

  ngOnInit(): void {
    this.signInForm = this._formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(6)]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      isRemember: [false],
    });

    if (this._ssrCookieService.get(CookieConstant.isRemember)) {
      this.fIsRemember?.setValue(true);
      this.fUsername?.setValue(
        this._ssrCookieService.get(CookieConstant.rememberUsername)
      );
      this.fPassword?.setValue(
        this._ssrCookieService.get(CookieConstant.rememberPassword)
      );
    }
  }

  sendOtp() {
    this.isFirstSubmit = true;
    this.signInForm.invalid;
    if (this.signInForm.invalid) {
      for (const control of Object.keys(this.signInForm.controls)) {
        this.signInForm.controls[control]?.markAsTouched();
      }
      return;
    }

    this.authSignInRequest = {
      username: this.fUsername?.value,
      password: this.fPassword?.value,
    };

    this.signInForm.disable();
    this._authService.signInSendOtp(this.authSignInRequest).subscribe({
      next: (value: OtpResponse) => {
        this._ssrCookieService.set(
          CookieConstant.otpLogin,
          JSON.stringify(value)
        );
        this.formVerifyOtp(value);
        this.isShowAlertError = false;
      },
      error: err => {
        if (err.error.title.split(",")[0] == ErrorConstants.otpTimeNotYet) {
          this.formVerifyOtp(
            JSON.parse(this._ssrCookieService.get(CookieConstant.otpLogin))
          );
        } else {
          this.signInForm.enable();
          this.isShowAlertError = true;
          this.alertError = this._transformErrorCodePipe.transform(
            err.error.title
          );
        }
      },
    });
  }

  togglePassword() {
    this.isShowPassword = !this.isShowPassword;
  }

  formVerifyOtp(value: OtpResponse) {
    this.isOpenOtpForm = true;
    this.isLoadingOTP = false;
    this.otpKey = value.otpKey;
    this.refWithTime = value.otpKey + "_" + value.expired;
    this.email = value.email;
  }

  goBack() {
    this.signInForm.enable();
    this.isOpenOtpForm = false;
    this.isShowAlertErrorOTP = false;
  }

  verifyOtp(otpCode: string) {
    this.isLoadingOTP = true;
    this.authSignInRequest = {
      username: this.fUsername?.value,
      password: this.fPassword?.value,
      otpCode: otpCode,
    };

    this._authService.signIn(this.authSignInRequest).subscribe({
      next: () => {
        if (this.fIsRemember?.value) {
          this._ssrCookieService.set(CookieConstant.isRemember, "true");
          this._ssrCookieService.set(
            CookieConstant.rememberUsername,
            this.fUsername?.value
          );
          this._ssrCookieService.set(
            CookieConstant.rememberPassword,
            this.fPassword?.value
          );
        } else {
          this._ssrCookieService.delete(CookieConstant.isRemember);
          this._ssrCookieService.delete(CookieConstant.rememberUsername);
          this._ssrCookieService.delete(CookieConstant.rememberPassword);
        }

        this._userSerivce.getProfile().subscribe();
        this._router.navigate([
          this._localizeRouterService.translateRoute(this.redirectURL),
        ]);
      },
      error: err => {
        this.isLoadingOTP = false;
        this.isShowAlertErrorOTP = true;
        this.alertErrorOTP = this._transformErrorCodePipe.transform(
          err.error.title
        );
      },
    });
  }

  resendOtp() {
    this._authService.signInResendOtp(this.authSignInRequest).subscribe({
      next: value => {
        this._ssrCookieService.set(
          CookieConstant.otpLogin,
          JSON.stringify(value)
        );
        this.formVerifyOtp(value);
        this.isShowAlertErrorOTP = false;
      },
      error: err => {
        if (err.error.title.split(",")[0] == ErrorConstants.otpTimeNotYet) {
          // const minutes = Number(err.error.title.split(",")[1]);
          // const seconds = Number(err.error.title.split(",")[2]);
          this.formVerifyOtp(
            JSON.parse(this._ssrCookieService.get(CookieConstant.otpLogin))
          );
          this.isShowAlertErrorOTP = true;
          this.alertErrorOTP = this._transformErrorCodePipe.transform(
            err.error.title
          );
        } else {
          this.isShowAlertErrorOTP = true;
          this.alertErrorOTP = this._transformErrorCodePipe.transform(
            err.error.title
          );
        }
      },
    });
  }
}
