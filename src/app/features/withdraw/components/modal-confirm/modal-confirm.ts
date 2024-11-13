import { NgIf } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatDialogActions, MatDialogContent } from "@angular/material/dialog";

import { StepConfirmEnums } from "@features/withdraw/components/step-confirm/step-confirm-enum";
import { StepConfirmComponent } from "@features/withdraw/components/step-confirm/step-confirm.component";

import { FormOtpVerifyComponent } from "@shared/components/form-otp-verify/form-otp-verify.component";
import { ToastConstants } from "@shared/constants/toast.constants";
import { SplitTextPipe } from "@shared/pipes/split-text.pipe";
import { TransformToastPipe } from "@shared/pipes/transform-toast.pipe";

import { environment } from "@environments/environment";

import { TranslateModule } from "@ngx-translate/core";
import { ClipboardModule } from "ngx-clipboard";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-confirm-withdraw",
  templateUrl: "./modal-confirm.html",
  styleUrls: ["./modal-confirm.scss"],
  standalone: true,
  imports: [
    ClipboardModule,
    FormOtpVerifyComponent,
    MatDialogActions,
    MatDialogContent,
    NgIf,
    SplitTextPipe,
    StepConfirmComponent,
    TranslateModule,
  ],
})
export class ConfirmWithdrawComponent {
  @Output() handleSendClose = new EventEmitter<boolean>();
  @Output() handleSendVerifyOtp = new EventEmitter<string>();
  @Output() resendOtp = new EventEmitter<object>();
  @Output() goBack = new EventEmitter<object>();
  @Output() submitOTP = new EventEmitter<string>();

  @Input() walletAddress!: string;
  @Input() networkChain!: string;
  @Input() free!: number;
  @Input() amountWithFree!: number;
  @Input() amount!: number;
  @Input() stepConfirm!: StepConfirmEnums;

  @Input() link!: string;

  @Input() isShowAlertErrorOTP!: boolean;
  @Input() alertErrorOTP!: string;
  @Input() otpKey!: string;
  @Input() email!: string;
  @Input() countryCode!: number;
  @Input() refWithTime!: string;
  @Input() isLoadingOTP!: boolean;
  otp!: string;
  protected readonly environment = environment;
  protected readonly StepConfirmEnums = StepConfirmEnums;

  constructor(
    private _toastr: ToastrService,
    private _transformToastPipe: TransformToastPipe
  ) {}

  handleClose(): void {
    this.handleSendClose.emit(false);
  }

  handleConfirm(): void {
    this.handleSendClose.emit(true);
  }

  handleCopy(e: { isSuccess: boolean }): void {
    if (e.isSuccess) {
      const alert = this._transformToastPipe.transform(
        ToastConstants.copiedSuccess
      );
      this._toastr.success(alert);
    }
  }

  submitOTPModal(otpCode: string) {
    this.otp = otpCode;
  }

  verifyOtp() {
    this.submitOTP.emit(this.otp);
  }
}
