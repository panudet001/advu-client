import { CommonModule, NgOptimizedImage } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

import { AuthService } from "@app/core/auth.service";
import { ForgotPasswordRequest, SetIp } from "@app/core/auth.types";

import { LocalizeRouterPipe } from "@gilsdav/ngx-translate-router";
import { TranslateModule } from "@ngx-translate/core";
import { AngularDeviceInformationService } from "angular-device-information";
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
  templateUrl: "./forgot-password.component.html",
  styleUrl: "./forgot-password.component.scss",
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  isFirstSubmit = false;
  isShowAlertError = false;
  forgotPasswordRequest!: ForgotPasswordRequest;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _toastrService: ToastrService,
    private deviceInformationService: AngularDeviceInformationService
  ) {}

  get fEmail() {
    return this.forgotPasswordForm?.get("email");
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.forgotPasswordForm = this._formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
    });
  }

  requestForgotPassword() {
    this.isFirstSubmit = true;
    if (this.forgotPasswordForm.invalid) {
      for (const control of Object.keys(this.forgotPasswordForm.controls)) {
        this.forgotPasswordForm.controls[control]?.markAsTouched();
      }
      return;
    }

    this.forgotPasswordForm.disable();
    this.forgotPasswordRequest = {
      email: this.fEmail?.value,
    };

    this._authService.getIp().subscribe({
      next: result => {
        const setIp = {
          ip: result.ip_address,
          device: this.deviceInformationService.getDeviceInfo().browser,
          browser: this.deviceInformationService.getDeviceInfo().os,
        } as SetIp;

        this._authService
          .forgotPassword(this.forgotPasswordRequest, setIp)
          .subscribe({
            complete: () => {
              this.forgotPasswordForm.enable();
              this._toastrService.success(
                "Email sent successfully.",
                "Success",
                {
                  closeButton: true,
                }
              );
              this.forgotPasswordForm.reset();
            },
            error: () => {
              this.forgotPasswordForm.enable();
              this.isShowAlertError = true;
              this._toastrService.error("No data found.", "Error");
            },
          });
      },
    });
  }
}
