import { CommonModule, NgOptimizedImage } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { TranslateModule } from "@ngx-translate/core";
import { NgOtpInputModule } from "ng-otp-input";
import { Observable, map, takeWhile, timer } from "rxjs";

@Component({
  selector: "app-form-otp-verify",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatProgressSpinnerModule,
    NgOptimizedImage,
    NgOtpInputModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: "./form-otp-verify.component.html",
  styleUrls: ["./form-otp-verify.component.scss"],
})
export class FormOtpVerifyComponent implements OnInit, OnChanges {
  @Input() isShowAlertError = false;
  @Input() alertError = "";
  @Input() email!: string;
  @Input() codeRefWithTime!: string;
  @Input() isLoading!: boolean;
  @Input() otpRef!: string;
  @Input() isModal!: boolean;

  @Output() submitOTP = new EventEmitter<string>();
  @Output() submitOTPModal = new EventEmitter<string>();
  @Output() resendOTP = new EventEmitter();
  @Output() btnBack = new EventEmitter();

  otpForm!: FormGroup;
  otpCode!: string;
  timeRemaining$: Observable<number> | undefined;
  timeRemaining = 0;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.startTimer();
    this.subscribeTimer();
  }

  startTimer() {
    this.timeRemaining = parseInt(this.codeRefWithTime.split("_")[1]!);
    this.timeRemaining$ = timer(0, 1000).pipe(
      map(n => (this.timeRemaining - n) * 1000),
      takeWhile(n => n >= 0)
    );
  }

  subscribeTimer() {
    this.timeRemaining$?.subscribe(value => {
      if (value === 0) {
        this.codeRefWithTime = "key_0";
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["codeRefWithTime"]) {
      this.startTimer();
      this.subscribeTimer();
    }
  }

  onOtpChange(value: string) {
    this.otpCode = value;
    this.submitOTPModal.emit(this.otpCode);
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
    this.submitOTP.emit(this.otpCode);
  }

  goBack() {
    this.btnBack.emit();
  }
}
