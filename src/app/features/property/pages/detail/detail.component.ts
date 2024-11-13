import {
  DatePipe,
  DecimalPipe,
  NgClass,
  NgForOf,
  NgIf,
  NgStyle,
} from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { MatCell, MatTableModule } from "@angular/material/table";
import { Router } from "@angular/router";

import { ToastConstants } from "@app/shared/constants/toast.constants";
import { TransformToastPipe } from "@app/shared/pipes/transform-toast.pipe";

import { DataNotFoundComponent } from "@features/history/components/data-not-found/data-not-found.component";
import { CountDownComponent } from "@features/property/components/count-down/count-down.component";
import { ModalConfirmComponent } from "@features/property/components/modal-confirm/modal-confirm.component";
import { StepperInvestmentEnums } from "@features/property/components/step-confirm/stepper-investment-enum";
import { TabBlockchainComponent } from "@features/property/components/tab-blackchain/tab-blockchain.component";
import { TabManagementComponent } from "@features/property/components/tab-management/tab-management.component";
import { TabOverviewComponent } from "@features/property/components/tab-overview/tab-overview.component";
import { StepConfirmEnums } from "@features/withdraw/components/step-confirm/step-confirm-enum";

import { CardInvestmentComponent } from "@shared/components/card-investment/card-investment.component";
import { PaginationComponent } from "@shared/components/pagination/pagination.component";
import { ErrorConstants } from "@shared/constants/error.constants";
import { AddCommaPipe } from "@shared/pipes/add-comma.pipe";
import { statusName } from "@shared/pipes/status-lable";
import { TransformErrorCodePipe } from "@shared/pipes/transform-error-code.pipe";
import { GalleryService } from "@shared/services/gallery/gallery.service";
import { InvestmentOrderService } from "@shared/services/investment-order-v2/investment-order.service";
import {
  InvestmentOrder,
  InvestmentOrderRequest,
} from "@shared/services/investment-order-v2/investment-order.types";
import { InvestmentEnums } from "@shared/services/investment-v2/investment.enums";
import { InvestmentService } from "@shared/services/investment-v2/investment.service";
import { Investment } from "@shared/services/investment-v2/investment.types";
import { MetaService } from "@shared/services/seo/seo.service";
import { UserService } from "@shared/services/user/user.service";
import { User } from "@shared/services/user/user.types";

import { environment } from "@environments/environment";

import { LocalizeRouterPipe } from "@gilsdav/ngx-translate-router";
import {
  NgbCarouselModule,
  NgbPaginationModule,
} from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { LazyLoadImageModule } from "ng-lazyload-image";
import { ClipboardModule } from "ngx-clipboard";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { ToastrService } from "ngx-toastr";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-list",
  standalone: true,
  imports: [
    AddCommaPipe,
    CardInvestmentComponent,
    ClipboardModule,
    CountDownComponent,
    DataNotFoundComponent,
    DatePipe,
    DecimalPipe,
    FormsModule,
    LazyLoadImageModule,
    LocalizeRouterPipe,
    MatCell,
    MatSelectModule,
    MatTableModule,
    NgClass,
    NgForOf,
    NgIf,
    NgStyle,
    NgbCarouselModule,
    NgbPaginationModule,
    PaginationComponent,
    ReactiveFormsModule,
    SlickCarouselModule,
    TabBlockchainComponent,
    TabManagementComponent,
    TabOverviewComponent,
    TranslateModule,
  ],
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"],
})
export class DetailComponent implements OnDestroy, OnInit {
  private _unsubscribe$ = new Subject<void>();
  protected readonly InvestmentTypeEnums = InvestmentEnums;
  isLoading = false;
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  dialogRef: any;
  defaultImage = "assets/img/lazyload.jpeg";
  investment!: Investment;
  previewImage!: string;
  investForm!: FormGroup;
  alertError = "";
  isShowAlertError = false;
  investmentOrderRequest!: InvestmentOrderRequest;
  investmentOrders!: InvestmentOrder[];
  displayedColumns: string[] = ["walletAddress", "amount", "status", "date"];
  slideConfig = {
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: false,
    infinite: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };
  user!: User;
  myInvestmentAmount = 0;

  selectedTab = 0;
  tabs = [
    { label: "Overview" },
    { label: "Blockchain" },
    { label: "Investors" },
    { label: "Management" },
  ];

  //OTP
  otpRef!: string;
  email!: string;
  isLoadingOtp!: boolean;
  refWithTime!: string;

  constructor(
    private _estateService: InvestmentService,
    private _investmentOrderService: InvestmentOrderService,
    private _metaService: MetaService,
    private _galleryService: GalleryService,
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _matDialog: MatDialog,
    private _transformErrorCodePipe: TransformErrorCodePipe,
    private _toastrService: ToastrService,
    private _router: Router,
    private _transformToastPipe: TransformToastPipe
  ) {
    this._metaService.updateTitle("Investment");
    this._metaService.updateDescription({
      title: "Investment",
      keywords: "ADAVU,adavu",
      description: "INVEST WITH US, WITHOUT EXPENSE OF MANAGING PROPERTY",
      author: "ADAVU HOME",
      image: "",
      url: environment.baseUrl,
    });
    this._metaService.createLinkForCanonicalURL();
  }

  ngOnInit(): void {
    this._investmentOrderService.investmentOrders$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((investmentOrders: InvestmentOrder[]) => {
        this.investmentOrders = investmentOrders;
      });
    this._estateService.investment$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(value => {
        this._metaService.updateTitle(value.title);
        this._metaService.updateDescription({
          title: value.title,
          keywords: value.title,
          description: "INVEST WITH US, WITHOUT EXPENSE OF MANAGING PROPERTY",
          author: "ADAVU HOME",
          image: "",
          url: environment.baseUrl,
        });
        this._metaService.createLinkForCanonicalURL();

        this.investment = value;
        const maxInvest =
          this.investment.investment.investmentBalance >
          this.investment?.investment.maximumInvest
            ? this.investment?.investment.maximumInvest
            : this.investment?.investment.investmentBalance;

        this.investForm = this._formBuilder.group({
          amount: [
            null,
            [
              Validators.required,
              Validators.min(this.investment.investment?.minimumInvest),
              Validators.max(maxInvest),
            ],
          ],
        });

        this.previewImage = this.investment.galleryPaths[0]!;

        if (this.investment.type === InvestmentEnums.full) {
          this.investForm.disable();
        }
      });

    this._userService.user$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(value => {
        this.user = value;
      });
  }

  sendOtp() {
    this.dialogRef.componentInstance.isLoadingConfirm = true;
    this.email = this.user.email;
    this._investmentOrderService
      .requestOTPInvestmentOrder(
        this.investmentOrderRequest,
        this.investment.slug
      )
      .subscribe({
        next: value => {
          this.dialogRef.componentInstance.selectStep =
            StepperInvestmentEnums.verify;
          this.otpRef = value.otpKey;
          this.refWithTime = value.otpKey + "_" + value.expired;
          this.dialogRef.componentInstance.isShowAlertErrorOTP = false;
          this.dialogRef.componentInstance.selectStep =
            StepperInvestmentEnums.verify;
          this.dialogRef.componentInstance.refWithTime = this.refWithTime;
          this.dialogRef.componentInstance.email = this.email;
          this.dialogRef.componentInstance.otpRef = this.otpRef;
          this.dialogRef.componentInstance.isLoadingConfirm = false;
        },
        error: err => {
          this.handleError(err);
          this.dialogRef.componentInstance.isLoadingConfirm = false;
        },
      });
  }

  resendOtp() {
    this.dialogRef.componentInstance.isLoadingOtp = true;
    this._investmentOrderService
      .resetOTPInvestmentOrder(
        {
          email: this.user.email,
          otpKey: this.otpRef,
        },
        this.investment.slug
      )
      .subscribe({
        next: value => {
          this.otpRef = value.otpKey;
          this.refWithTime = value.otpKey + "_" + value.expired;
          this.dialogRef.componentInstance.isShowAlertErrorOTP = false;
          this.dialogRef.componentInstance.refWithTime = this.refWithTime;
          this.dialogRef.componentInstance.otpRef = this.otpRef;
          this.dialogRef.componentInstance.isLoadingOtp = false;
        },
        error: err => {
          this.handleError(err);
          this.dialogRef.componentInstance.isLoadingOtp = false;
        },
      });
  }

  verifyOtp(otpCode: string) {
    const investRequest = {
      amount: this.investForm.value.amount,
      otpCode: otpCode,
    } as InvestmentOrderRequest;

    this.dialogRef.componentInstance.isLoadingOtp = true;
    this._investmentOrderService
      .createInvestmentOrder(investRequest, this.investment.slug)
      .subscribe({
        next: () => {
          this.isLoading = false;
          this._matDialog.closeAll();
          this._router.navigate(["/my-portfolio"]).then(() => {
            this._toastrService.success("Investment was successful.");
          });
        },
        error: err => {
          this.handleError(err);
          this.dialogRef.componentInstance.isLoadingOtp = false;
        },
      });
  }

  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  handleError(err: any) {
    if (err.error.title.split(",")[0] == ErrorConstants.otpTimeNotYet) {
      const minutes = Number(err.error.title.split(",")[1]);
      const seconds = Number(err.error.title.split(",")[2]);
      this.dialogRef.componentInstance.otpRef = err.error.title.split(",")[3];
      this.dialogRef.componentInstance.email = this.user?.email;
      this.dialogRef.componentInstance.time = minutes * 60 + seconds;
      this.dialogRef.componentInstance.stepConfirm = StepConfirmEnums.otp;
      this.dialogRef.componentInstance.isShowAlertErrorOtp = true;
      this.dialogRef.componentInstance.alertErrorOtp =
        this._transformErrorCodePipe.transform(err.error.title);
      this.dialogRef.componentInstance.selectStep =
        StepperInvestmentEnums.verify;
      this._toastrService.error(
        this._transformErrorCodePipe.transform(err.error.title)
      );
    } else {
      this.dialogRef.componentInstance.isShowAlertErrorOtp = true;
      this.dialogRef.componentInstance.alertErrorOtp =
        this._transformErrorCodePipe.transform(err.error.title);
      this._toastrService.error("OTP is invalid. Please try again.");
    }
  }

  clickInvest() {
    this.isLoading = true;

    if (this.investForm.invalid) {
      for (const control of Object.keys(this.investForm.controls)) {
        this.investForm.controls[control]?.markAsTouched();
      }

      this.isLoading = false;
      return;
    }

    this.investForm.disable();
    this.isShowAlertError = false;

    this.investmentOrderRequest = {
      amount: this.investForm.value.amount,
    } as InvestmentOrderRequest;

    this.dialogRef = this._matDialog.open(ModalConfirmComponent, {
      width: "514px",
    });

    this.dialogRef.componentInstance.investmentOrderRequest =
      this.investmentOrderRequest;
    this.dialogRef.componentInstance.selectStep =
      StepperInvestmentEnums.confirm;

    this.dialogRef.componentInstance.handleClose.subscribe(() => {
      this.isLoading = false;
      this.investForm.enable();
      this.dialogRef.close();
    });

    this.dialogRef.afterClosed().subscribe(() => {
      this.isLoading = false;
      this.investForm.enable();
    });

    this.dialogRef.componentInstance.handleSendOtp.subscribe(() => {
      this.sendOtp();
    });

    this.dialogRef.componentInstance.handleResendOtp.subscribe(() => {
      this.resendOtp();
    });

    this.dialogRef.componentInstance.handleVerifyOtp.subscribe(
      (otpCode: string) => {
        this.verifyOtp(otpCode);
      }
    );
  }

  selectTab(index: number) {
    this.selectedTab = index;
  }

  getImage(fileName: string) {
    return this._galleryService.getImagUrlV2(fileName);
  }

  get fAmount() {
    return this.investForm?.get("amount");
  }

  onSelectImage(image: string) {
    this.previewImage = image;
  }

  handleCopy(e: { isSuccess: boolean }): void {
    if (e.isSuccess) {
      const alert = this._transformToastPipe.transform(
        ToastConstants.copiedSuccess
      );
      this._toastrService.success(alert);
    }
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  protected readonly statusName = statusName;
}
