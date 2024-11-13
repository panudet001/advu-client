import { NgIf } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatDialogActions, MatDialogContent } from "@angular/material/dialog";

import { StepperInvestmentEnums } from "@features/property/components/step-confirm/stepper-investment-enum";
import { StepperInvestmentComponent } from "@features/property/components/step-confirm/stepper-investment.component";

import { FormOtpVerifyComponent } from "@shared/components/form-otp-verify/form-otp-verify.component";
import { SplitTextPipe } from "@shared/pipes/split-text.pipe";
import { InvestmentOrderRequest } from "@shared/services/investment-order/investment-order.types";

import { TranslateModule } from "@ngx-translate/core";
import { ClipboardModule } from "ngx-clipboard";

@Component({
  selector: "app-confirm-withdraw",
  templateUrl: "./modal-confirm.component.html",
  styleUrls: ["./modal-confirm.component.scss"],
  standalone: true,
  imports: [
    ClipboardModule,
    FormOtpVerifyComponent,
    MatDialogActions,
    MatDialogContent,
    NgIf,
    SplitTextPipe,
    StepperInvestmentComponent,
    TranslateModule,
  ],
})
export class ModalConfirmComponent {
  @Input() selectStep!: StepperInvestmentEnums;
  @Output() handleSendOtp = new EventEmitter<object>();
  @Output() handleVerifyOtp = new EventEmitter<string>();
  @Output() handleResendOtp = new EventEmitter<object>();
  @Output() handleClose = new EventEmitter<void>();
  protected readonly StepConfirmEnums = StepperInvestmentEnums;

  @Input() investmentOrderRequest!: InvestmentOrderRequest;
  @Input() isShowAlertErrorOtp!: boolean;
  @Input() alertErrorOtp!: string;
  @Input() otpRef!: string;
  @Input() email!: string;
  @Input() refWithTime!: string;
  @Input() isLoadingOtp = false;
  @Input() isLoadingConfirm = false;
  otp!: string;

  constructor() {}

  closeModal(): void {
    this.handleClose.emit();
  }

  sendOtp(): void {
    this.handleSendOtp.emit();
  }

  handleBack(): void {
    this.selectStep = StepperInvestmentEnums.confirm;
  }

  submitOTPModal(otpCode: string) {
    this.otp = otpCode;
  }

  verifyOtp() {
    this.handleVerifyOtp.emit(this.otp);
  }
}
