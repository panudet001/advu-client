import { CommonModule, NgOptimizedImage } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { Router } from "@angular/router";

import { AuthService } from "@app/core/auth.service";
import {
  AuthResendOtpRequest,
  AuthSendOtpRequest,
  OtpResponse,
} from "@app/core/auth.types";
import { CookieConstant } from "@app/shared/constants/cookie.constants";
import { ErrorConstants } from "@app/shared/constants/error.constants";
import { TransformErrorCodePipe } from "@app/shared/pipes/transform-error-code.pipe";
import { TransformToastPipe } from "@app/shared/pipes/transform-toast.pipe";
import { passwordWithUpperLower8CharAndSpecialValidator } from "@app/shared/utils/validator";

import { FormOtpVerifyComponent } from "@shared/components/form-otp-verify/form-otp-verify.component";
import { ToastConstants } from "@shared/constants/toast.constants";

import {
  LocalizeRouterPipe,
  LocalizeRouterService,
} from "@gilsdav/ngx-translate-router";
import { TranslateModule } from "@ngx-translate/core";
import { RecaptchaModule } from "ng-recaptcha";
import { SsrCookieService } from "ngx-cookie-service-ssr";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-sign-up",
  standalone: true,
  imports: [
    CommonModule,
    FormOtpVerifyComponent,
    FormsModule,
    LocalizeRouterPipe,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    RecaptchaModule,
    TranslateModule,
  ],
  templateUrl: "./sign-up.component.html",
  styleUrl: "./sign-up.component.scss",
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  isSubmit = false;
  isShowAlertError = false;
  alertError = "";
  authSendOtpRequest!: AuthSendOtpRequest;
  authResendOtpRequest!: AuthResendOtpRequest;
  isShowPassword = false;
  isShowConfirmPassword = false;

  isOpenOtpForm = false;
  isShowAlertErrorOTP!: boolean;
  alertErrorOTP!: string;
  otpKey!: string;
  email!: string;
  countryCode!: number;
  refWithTime!: string;
  isLoadingOTP!: boolean;
  timeOTPLimit = 180;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
    private _transformErrorCodePipe: TransformErrorCodePipe,
    private _transformToastPipe: TransformToastPipe,
    private _ssrCookieService: SsrCookieService,
    private _toastrService: ToastrService,
    private _localizeRouterService: LocalizeRouterService
  ) {}

  get fUsername() {
    return this.signUpForm?.get("username");
  }

  get fCountryCode() {
    return this.signUpForm?.get("countryCode");
  }

  get fFirstName() {
    return this.signUpForm?.get("firstName");
  }

  get fLastName() {
    return this.signUpForm?.get("lastName");
  }

  get fEmail() {
    return this.signUpForm?.get("email");
  }

  get fPassword() {
    return this.signUpForm?.get("password");
  }

  get fConfirmPassword() {
    return this.signUpForm?.get("confirmPassword");
  }

  get fAgree() {
    return this.signUpForm?.get("agree");
  }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.signUpForm = this._formBuilder.group({
      username: [
        "",
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(16),
        ],
      ],
      firstName: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(32),
        ],
      ],
      lastName: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(32),
        ],
      ],
      email: ["", [Validators.required, Validators.email]],
      countryCode: ["66", [Validators.required]],
      password: [
        "",
        [Validators.required, passwordWithUpperLower8CharAndSpecialValidator],
      ],
      confirmPassword: [
        "",
        [Validators.required, passwordWithUpperLower8CharAndSpecialValidator],
      ],
      agree: [false, Validators.required],
    });
  }

  sendOTP(): void {
    this.isSubmit = true;
    if (this.signUpForm.invalid) {
      for (const control of Object.keys(this.signUpForm.controls)) {
        this.signUpForm.controls[control]?.markAsTouched();
      }
      return;
    }

    if (this.fPassword?.value != this.fConfirmPassword?.value) {
      this.signUpForm.enable();
      this.isShowAlertError = true;
      this.alertError = this._transformErrorCodePipe.transform(
        ErrorConstants.passwordNotMatch
      );
      return;
    }

    this.authSendOtpRequest = {
      firstname: this.fFirstName?.value,
      lastname: this.fLastName?.value,
      username: this.fUsername?.value,
      email: this.fEmail?.value,
      password: this.fPassword?.value,
    };

    this.signUpForm.disable();
    this._authService.sendOtp(this.authSendOtpRequest).subscribe({
      next: value => {
        this._ssrCookieService.set(
          CookieConstant.signUpOtpKey,
          JSON.stringify(value)
        );
        this.formVerifyOtp(value);
        this.isShowAlertError = false;
      },
      error: err => {
        if (err.error.title.split(",")[0] == ErrorConstants.otpTimeNotYet) {
          // const minutes = Number(err.error.title.split(",")[1]);
          // const seconds = Number(err.error.title.split(",")[2]);
          this.formVerifyOtp(
            JSON.parse(this._ssrCookieService.get(CookieConstant.otpLogin))
          );
        } else {
          this.signUpForm.enable();
          this.isShowAlertError = true;
          this.alertError = this._transformErrorCodePipe.transform(
            err.error.title
          );
        }
      },
    });
  }

  formVerifyOtp(value: OtpResponse) {
    this.isOpenOtpForm = true;
    this.isLoadingOTP = false;
    this.otpKey = value.otpKey;
    this.refWithTime = value.otpKey + "_" + value.expired;
    this.email = value.email;
  }

  goBack() {
    this.isOpenOtpForm = false;
    this.signUpForm.enable();
    this.isShowAlertErrorOTP = false;
  }

  verifyOtp(otpCode: string): void {
    this.authSendOtpRequest.otpCode = otpCode;
    this.isLoadingOTP = true;
    this._authService.signUp(this.authSendOtpRequest).subscribe({
      next: () => {
        this._router
          .navigate([
            this._localizeRouterService.translateRoute("sign-up/successfully"),
          ])
          .then(() => {
            const alert = this._transformToastPipe.transform(
              ToastConstants.signUpSuccess
            );
            this._toastrService.success(alert);
          });
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

  resendOTP(): void {
    const forgotOtpKey = JSON.parse(
      this._ssrCookieService.get(CookieConstant.signUpOtpKey)
    );
    this.authResendOtpRequest = {
      email: this.authSendOtpRequest.email,
      otpKey: forgotOtpKey.otpKey,
    };

    this._authService.resendOtp(this.authResendOtpRequest).subscribe({
      next: value => {
        this._ssrCookieService.set(
          CookieConstant.signUpOtpKey,
          JSON.stringify(value)
        );
        this.formVerifyOtp(value);
        this.isShowAlertErrorOTP = false;
      },
      error: err => {
        if (err.error.title.split(",")[0] == ErrorConstants.otpTimeNotYet) {
          this.formVerifyOtp(
            JSON.parse(this._ssrCookieService.get(CookieConstant.signUpOtpKey))
          );
          this.isShowAlertErrorOTP = true;
          this.alertErrorOTP = this._transformErrorCodePipe.transform(
            err.error.title
          );
        }
      },
    });
  }

  togglePassword(isConfirmPassword: boolean) {
    if (!isConfirmPassword) {
      this.isShowPassword = !this.isShowPassword;
    } else {
      this.isShowConfirmPassword = !this.isShowConfirmPassword;
    }
  }
}
