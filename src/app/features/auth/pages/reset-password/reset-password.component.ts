import { CommonModule, NgOptimizedImage } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { AuthService } from "@app/core/auth.service";
import { AuthResendResetPasswordRequest } from "@app/core/auth.types";
import { TransformErrorCodePipe } from "@app/shared/pipes/transform-error-code.pipe";
import { passwordWithUpperLower8CharAndSpecialValidator } from "@app/shared/utils/validator";

import {
  LocalizeRouterPipe,
  LocalizeRouterService,
} from "@gilsdav/ngx-translate-router";
import { TranslateModule } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-forgot-password",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LocalizeRouterPipe,
    NgOptimizedImage,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: "./reset-password.component.html",
  styleUrl: "./reset-password.component.scss",
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  isFirstSubmit = false;
  isShowAlertError = false;
  alertError = "";
  resetPasswordRequest!: AuthResendResetPasswordRequest;
  isShowPassword = false;
  isSubmit = false;
  isShowConfirmPassword = false;
  token?: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private route: ActivatedRoute,
    private _transformErrorCodePipe: TransformErrorCodePipe,
    private _router: Router,
    private _localizeRouterService: LocalizeRouterService,
    private _toastrService: ToastrService
  ) {}

  get fPassword() {
    return this.resetPasswordForm?.get("password");
  }

  get fConfirmPassword() {
    return this.resetPasswordForm?.get("confirmPassword");
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get("token") ?? "";
    this.initForm();
  }

  initForm() {
    this.resetPasswordForm = this._formBuilder.group({
      password: [
        "",
        [Validators.required, passwordWithUpperLower8CharAndSpecialValidator],
      ],
      confirmPassword: [
        "",
        [Validators.required, passwordWithUpperLower8CharAndSpecialValidator],
      ],
    });
  }

  requestResetPassword() {
    this.isSubmit = true;
    if (this.resetPasswordForm.invalid) {
      for (const control of Object.keys(this.resetPasswordForm.controls)) {
        this.resetPasswordForm.controls[control]?.markAsTouched();
      }

      return;
    }

    if (this.fPassword?.value != this.fConfirmPassword?.value) {
      this.resetPasswordForm.enable();
      this.isShowAlertError = true;
      this.alertError = "resetPasswordPage.error.passwordNotMatch";
      return;
    }

    this.resetPasswordForm.disable();
    this.resetPasswordRequest = {
      password: this.fPassword?.value,
    };

    this._authService
      .resetPassword(this.resetPasswordRequest, this.token ?? "")
      .subscribe({
        complete: () => {
          this._toastrService.success("Send successfully", "Success", {
            closeButton: true,
          });
          this.resetPasswordForm.enable();
          this.isShowAlertError = false;
          this._router.navigate([
            this._localizeRouterService.translateRoute("/sign-in"),
          ]);
        },
        error: err => {
          this.resetPasswordForm.enable();
          this.isShowAlertError = true;
          this.alertError = this._transformErrorCodePipe.transform(
            err.error.title
          );
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
