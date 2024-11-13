import { CommonModule, NgOptimizedImage } from "@angular/common";
import { Component, EventEmitter, Inject, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { User } from "@app/shared/services/user/user.types";

import { ProfileStoreService } from "@features/profile/profile-store.service";

import { TranslateModule } from "@ngx-translate/core";
import { NgOtpInputModule } from "ng-otp-input";
import { Observable, map, takeWhile, timer } from "rxjs";

@Component({
  selector: "app-dialog-otp",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    NgOptimizedImage,
    NgOtpInputModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: "./dialog-otp.component.html",
  styleUrl: "./dialog-otp.component.scss",
})
export class DialogOtpComponent implements OnInit {
  isShowAlertError = false;
  alertError = "";
  email!: string;
  secondRemaining = 300;
  isLoading!: boolean;
  otpRef!: string;
  isInvalid = false;

  @Output() submitOTP = new EventEmitter<string>();
  @Output() resendOTP = new EventEmitter();
  @Output() btnBack = new EventEmitter();

  otpForm!: FormGroup;
  otpCode!: string;
  timeRemaining$: Observable<number> | undefined;
  timeRemaining = 0;

  constructor(
    private _formBuilder: FormBuilder,
    private _profileStoreService: ProfileStoreService,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}
  ngOnInit(): void {
    this.email = this.data.email;
    this.initForm();
    this.valueChange();
  }

  valueChange() {
    this._profileStoreService.sendDialogOtpParams$.subscribe(result => {
      this.isShowAlertError = result.isShowAlertError;
      this.alertError = result.alertError;
      this.email = result.email;
      this.timeRemaining = parseInt(result.secondRemaining.split("_")[1]!);
      this.secondRemaining = parseInt(result.secondRemaining.split("_")[1]!);
      this.isLoading = result.isLoading;
      this.otpRef = result.otpRef;
      this.startTimer();
      this.subscribeTimer();
    });
  }

  startTimer() {
    this.timeRemaining = this.secondRemaining;
    this.timeRemaining$ = timer(0, 1000).pipe(
      map(n => (this.timeRemaining - n) * 1000),
      takeWhile(n => n >= 0)
    );
  }

  subscribeTimer() {
    this.timeRemaining$?.subscribe(value => {
      if (value === 0) {
        this.secondRemaining = 0;
      }
    });
  }

  onOtpChange(value: string) {
    this.otpCode = value;
  }

  initForm() {
    this.otpForm = this._formBuilder.group({
      otpCode: [
        "",
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
    });
  }

  resendOtp() {
    this.resendOTP.emit();
  }

  verifyOtp() {
    if (!this.otpCode || this.otpCode.length < 6) {
      this.isInvalid = true;
      return;
    } else if (!this.secondRemaining) {
      this.alertError = "otp.otpIsExpired";
      this.isShowAlertError = true;
      this.isInvalid = false;

      return;
    }
    this.isInvalid = false;
    this.isShowAlertError = false;
    this.submitOTP.emit(this.otpCode);
  }
}
