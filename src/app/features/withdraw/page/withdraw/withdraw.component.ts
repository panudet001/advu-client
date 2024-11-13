import { AsyncPipe, DatePipe, NgForOf, NgIf } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import {
  MatAutocompleteModule,
  MatAutocompleteTrigger,
} from "@angular/material/autocomplete";
import { MatDialog } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { Router } from "@angular/router";

import { DataNotFoundComponent } from "@features/history/components/data-not-found/data-not-found.component";
import { ConfirmWithdrawComponent } from "@features/withdraw/components/modal-confirm/modal-confirm";
import { StepWithdrawComponent } from "@features/withdraw/components/step-withdraw/step-withdraw.component";
import { WithdrawStepEnums } from "@features/withdraw/components/step-withdraw/withdraw.enum";

import { ProfilesComponent } from "@shared/components/profile/profile.component";
import { SidebarComponent } from "@shared/components/sidebar/sidebar.component";
import { ErrorConstants } from "@shared/constants/error.constants";
import { ToastConstants } from "@shared/constants/toast.constants";
import { AddCommaPipe } from "@shared/pipes/add-comma.pipe";
import { SplitTextPipe } from "@shared/pipes/split-text.pipe";
import { statusName } from "@shared/pipes/status-lable";
import { TransformErrorCodePipe } from "@shared/pipes/transform-error-code.pipe";
import { TransformToastPipe } from "@shared/pipes/transform-toast.pipe";
import { FaqsService } from "@shared/services/faqs/faqs.service";
import { FaqsCategoryDetail } from "@shared/services/faqs/faqs.types";
import { FileService } from "@shared/services/file/file.service";
import { UserService } from "@shared/services/user/user-v2.service";
import { UserV2 } from "@shared/services/user/user.types";
import { WithdrawService } from "@shared/services/withdraw-v2/withdraw.service";
import {
  Networks,
  OtpResponse,
  Withdraw,
  WithdrawCrypto,
  WithdrawRequest,
  WithdrawResetOTPRequest,
} from "@shared/services/withdraw-v2/withdraw.types";

import { environment } from "@environments/environment";

import { LocalizeRouterPipe } from "@gilsdav/ngx-translate-router";
import { QRCodeModule } from "angularx-qrcode";
import { ClipboardModule } from "ngx-clipboard";
import { ToastrService } from "ngx-toastr";
import { Observable, Subject, takeUntil } from "rxjs";

import { StepConfirmEnums } from "../../components/step-confirm/step-confirm-enum";

@Component({
  selector: "app-deposit",
  templateUrl: "./withdraw.component.html",
  styleUrls: ["./withdraw.component.scss"],
  standalone: true,
  imports: [
    AddCommaPipe,
    AsyncPipe,
    ClipboardModule,
    ConfirmWithdrawComponent,
    DataNotFoundComponent,
    DatePipe,
    LocalizeRouterPipe,
    MatAutocompleteModule,
    MatAutocompleteTrigger,
    MatInputModule,
    MatTableModule,
    NgForOf,
    NgIf,
    ProfilesComponent,
    QRCodeModule,
    ReactiveFormsModule,
    SidebarComponent,
    SplitTextPipe,
    StepWithdrawComponent,
  ],
})
export class WithdrawComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$: Subject<void> = new Subject();
  user?: UserV2;
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  filteredWallet?: Observable<any> | undefined;
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  filteredChain?: Observable<any> | undefined;
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  dialogRef: any;
  withdraw!: Withdraw[];
  isShowAlertError = false;
  alertError = "";
  selectCrypto: FormControl = new FormControl("");
  selectChain: FormControl = new FormControl("");
  inputAddress: FormControl = new FormControl("");
  inputAmount: FormControl = new FormControl("");
  withdrawStep: WithdrawStepEnums = WithdrawStepEnums.coin;
  stepConfirm: StepConfirmEnums = StepConfirmEnums.detail;
  isFormSubmit = true;
  walletAddress!: string;
  displayedColumns: string[] = [
    "asset",
    "createdAt",
    "amount",
    "network",
    "txnHash",
    "from",
    "status",
  ];
  qrData!: string;
  urlImageCoin!: string;

  amountWithFree = 0;
  balance = 0;
  free = 0;
  withdrawLimit = 0;
  withdrawResetOTPRequest!: WithdrawResetOTPRequest;
  withdrawRequest!: WithdrawRequest;
  isOpenOtpForm = false;
  isShowAlertErrorOTP!: boolean;
  alertErrorOTP!: string;
  otpKey!: string;
  email!: string;
  countryCode!: number;
  time!: number;
  isLoadingOTP!: boolean;
  refWithTime!: string;
  protected readonly environment = environment;
  protected readonly WithdrawStepEnums = WithdrawStepEnums;
  protected readonly statusName = statusName;
  protected readonly Number = Number;
  chainId!: string;
  cryptoId!: string;
  link!: string;
  dataNotFound =
    "It looks like your account hasn't recent withdraw transaction";
  faqs!: FaqsCategoryDetail[];
  cryptos!: WithdrawCrypto[];
  chains: Networks[] = [];

  constructor(
    private _userService: UserService,
    private _toastr: ToastrService,
    private _transformToastPipe: TransformToastPipe,
    public _matDialog: MatDialog,
    public _withdrawService: WithdrawService,
    private _transformErrorCodePipe: TransformErrorCodePipe,
    public _fileService: FileService,
    private _router: Router,
    private _faqsService: FaqsService
  ) {}

  ngOnInit(): void {
    this._userService.user$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => {
        if (!value.isKyc) {
          this._router.navigate(["/identity-verification"]).then(() => {
            this._toastr.warning("Please confirm your identity.");
          });
        }
        this.user = value;
        this.withdrawLimit = value.withdrawLimit;
      });

    this._faqsService.faqCategoryDetail$.subscribe(value => {
      this.faqs = value;
    });

    this._withdrawService.withdraw$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => {
        this.withdraw = value;
      });

    this._withdrawService.crypto$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => {
        this.cryptos = value;
      });

    // this.filteredWallet = this.selectCrypto.valueChanges.pipe(
    //   startWith(""),
    //   map(state =>
    //     state ? this.filterWallet(state) : this.user?.wallets.wallets?.slice()
    //   )
    // );
    this.selectChain.disable();
    this.inputAddress.disable();

    // this.filteredChain = this.selectChain.valueChanges.pipe(
    //   startWith(""),
    //   map(state =>
    //     state
    //       ? this.filterChain(state)
    //       : this.user?.wallets.walletAddresses?.slice()
    //   )
    // );

    this.inputAmount.valueChanges.subscribe(value => {
      if (!value) {
        this.isFormSubmit = true;
        this.amountWithFree = 0;
      } else {
        this.amountWithFree = value + this.free;
      }

      if (value >= 10) this.isFormSubmit = false;

      if (this.amountWithFree > this.balance) {
        this.isFormSubmit = true;
        this.amountWithFree = 0;
      }
    });
  }

  // filterWallet(name: string) {
  //   return this.user?.wallets.wallets.filter(
  //     state =>
  //       state.crypto.symbol.toLowerCase().indexOf(name.toLowerCase()) === 0
  //   );
  // }
  //
  // filterChain(name: string) {
  //   return this.user?.wallets.walletAddresses.filter(
  //     state => state.chain.name.toLowerCase().indexOf(name.toLowerCase()) === 0
  //   );
  // }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  handleCopy(e: { isSuccess: boolean }): void {
    if (e.isSuccess) {
      const alert = this._transformToastPipe.transform(
        ToastConstants.copiedSuccess
      );
      this._toastr.success(alert);
    }
  }

  handelImage(path: string): string {
    return environment.apiUrl + "/images/" + path;
  }

  handleWalletAddress(val: Networks) {
    this.withdrawStep = WithdrawStepEnums.detail;
    this.walletAddress = val.walletAddress;

    this.link = val!.chain.explorer;
    this.qrData = "ethereum:" + val!.walletAddress + "@" + val.chain.networkId;
    this.chainId = val!.chain.slug;
  }

  handleInputCrypto(value: string) {
    if (!value) {
      this.selectChain.disable();
      this.inputAddress.disable();
      this.withdrawStep = WithdrawStepEnums.coin;
      this.selectChain.reset();
      this.inputAddress.reset();
      this.urlImageCoin = "";
    }
  }

  handleInputChain(value: string) {
    if (!value && this.inputAddress.value) {
      this.withdrawStep = WithdrawStepEnums.coin;
    } else {
      this.withdrawStep = WithdrawStepEnums.coin;
    }
  }

  handleWalletCrypto(symbol: string) {
    if (symbol) {
      this.urlImageCoin =
        environment.apiUrl +
        "/images/" +
        this.cryptos.find(e => e.symbol == symbol)!.cryptoImagePath;
      this.withdrawStep = WithdrawStepEnums.chain;
      this.selectChain.enable();
      this.inputAddress.enable();
      this.cryptoId = this.cryptos.find(e => e.symbol == symbol)!.slug ?? "";
      this.balance =
        this.user?.wallets.wallets.find(e => e.cryptoSymbol == symbol)!
          .balance ?? 0;
      this.free = this.cryptos.find(e => e.symbol == symbol)!.fees ?? "";
      this.chains = this.cryptos.find(e => e.symbol == symbol)?.networks ?? [];
      // this._freeService
      //   .getFree(this.cryptoId)
      //   .pipe(takeUntil(this.unsubscribe$))
      //   .subscribe({
      //     next: value => {
      //       this.free = value.rate;
      //     },
      //     error: () => {},
      //   });
    } else {
      this.selectChain.disable();
      this.inputAddress.disable();
      this.selectChain.reset();
      this.inputAddress.reset();
      this.withdrawStep = WithdrawStepEnums.coin;
    }
  }

  handleMax() {
    if (this.balance != 0) {
      this.inputAmount.setValue(this.balance);
      this.amountWithFree =
        (this.inputAmount.value * this.free) / 100 + this.inputAmount.value;
    }
  }

  handelSubmit() {
    this.dialogRef = this._matDialog.open(ConfirmWithdrawComponent, {
      width: "788px",
    });
    this.dialogRef.componentInstance.walletAddress = this.inputAddress.value;
    this.dialogRef.componentInstance.networkChain = this.selectChain.value;
    this.dialogRef.componentInstance.free = this.free;
    this.dialogRef.componentInstance.amountWithFree = this.amountWithFree;
    this.dialogRef.componentInstance.stepConfirm = this.stepConfirm;
    this.dialogRef.componentInstance.amount = this.inputAmount.value;
    this.dialogRef.componentInstance.link = this.link;

    this.dialogRef.componentInstance.handleSendClose.subscribe(
      (value: boolean) => {
        if (value) {
          this.withdrawRequest = {
            amount: this.amountWithFree,
            cryptoSlug: this.cryptoId,
            chainSlug: this.chainId,
            toAddress: this.inputAddress.value,
          };

          console.log(this.withdrawRequest);

          this.sendOtp();
        } else {
          this.stepConfirm = this.dialogRef.componentInstance.stepConfirm =
            StepConfirmEnums.detail;
          this.dialogRef.close();
        }
      }
    );
    this.dialogRef.componentInstance.goBack.subscribe(() => {
      this.stepConfirm = this.dialogRef.componentInstance.stepConfirm =
        StepConfirmEnums.detail;
    });

    this.dialogRef.componentInstance.resendOtp.subscribe(() => {
      this.withdrawResetOTPRequest = {
        email: this.user?.email ?? "",
        otpKey: this.otpKey,
      };
      this.resendOtp();
    });
    this.dialogRef.componentInstance.submitOTP.subscribe((value: string) => {
      this.withdrawRequest = {
        amount: this.amountWithFree,
        cryptoSlug: this.cryptoId,
        chainSlug: this.chainId,
        toAddress: this.inputAddress.value,
        otpCode: value,
      };
      this.createWithdraw();
    });
  }

  handleAmount(value: string) {
    if (this.balance > parseInt(value)) {
      this.amountWithFree =
        (parseInt(value) * this.free) / 100 + parseInt(value);
    }
  }

  formVerifyOtp(value: OtpResponse) {
    this.isOpenOtpForm = true;
    this.isLoadingOTP = false;
    this.otpKey = value.otpKey;
    this.refWithTime = value.otpKey + "_" + value.expired;
    this.email = value.email;
  }

  createWithdraw(): void {
    this._withdrawService.createWithdraw(this.withdrawRequest).subscribe({
      next: () => {
        this.dialogRef.componentInstance.stepConfirm = StepConfirmEnums.success;
        this.selectCrypto.reset();
        this.selectChain.reset();
        this.inputAddress.reset();
        this.inputAmount.reset();
        this._withdrawService.getWithdraws().pipe().subscribe();
      },
      error: err => {
        this.alertErrorOTP = this._transformErrorCodePipe.transform(
          err.error.title
        );
        this.dialogRef.componentInstance.alertErrorOTP = this.alertErrorOTP;
        this._toastr.error("Otp is invalid.");
      },
    });
  }

  sendOtp() {
    this._withdrawService.requestOTPWithdraw(this.withdrawRequest).subscribe({
      next: (value: OtpResponse) => {
        this.formVerifyOtp(value);
        this.isShowAlertError = false;
        this.dialogRef.componentInstance.refWithTime = this.refWithTime;
        this.dialogRef.componentInstance.email = this.email;
        this.dialogRef.componentInstance.otpKey = this.refWithTime;
        this.dialogRef.componentInstance.stepConfirm = StepConfirmEnums.otp;
        this.dialogRef.componentInstance.isShowAlertErrorOTP = false;
      },
      error: err => this.handleError(err),
    });
  }

  resendOtp() {
    this._withdrawService
      .resendOTPInvestmentOrder(this.withdrawResetOTPRequest)
      .subscribe({
        next: value => {
          this.formVerifyOtp(value);
          this.isShowAlertErrorOTP = false;
          this.dialogRef.componentInstance.otpKey = value.otpKey;
          this.dialogRef.componentInstance.email = this.user?.email;
          this.dialogRef.componentInstance.refWithTime = this.refWithTime;
        },
        error: err => this.handleError(err),
      });
  }

  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  handleError(err: any) {
    if (err.error.title.split(",")[0] == ErrorConstants.otpTimeNotYet) {
      const minutes = Number(err.error.title.split(",")[1]);
      const seconds = Number(err.error.title.split(",")[2]);
      const otpKey = err.error.title.split(",")[3];
      this.time = minutes * 60 + seconds;
      this.dialogRef.componentInstance.otpKey = otpKey;
      this.dialogRef.componentInstance.email = this.user?.email;
      this.dialogRef.componentInstance.stepConfirm = StepConfirmEnums.otp;
      this.alertErrorOTP = this._transformErrorCodePipe.transform(
        err.error.title
      );
      this._toastr.error("Otp is invalid.");
    } else {
      this.alertError = this._transformErrorCodePipe.transform(err.error.title);
      this.dialogRef.componentInstance.alertErrorOTP = this.alertError;
      this.alertErrorOTP = this._transformErrorCodePipe.transform(
        err.error.title
      );
      this._toastr.error("Wallet is invalid.");
    }
  }
}
