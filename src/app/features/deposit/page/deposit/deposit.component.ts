import { AsyncPipe, DatePipe, NgForOf, NgIf } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import {
  MatAutocompleteModule,
  MatAutocompleteTrigger,
} from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { Router } from "@angular/router";

import { DepositStepEnums } from "@features/deposit/component/step-deposit/deposit.enum";
import { StepDepositComponent } from "@features/deposit/component/step-deposit/step-deposit.component";
import { DataNotFoundComponent } from "@features/history/components/data-not-found/data-not-found.component";

import { ProfilesComponent } from "@shared/components/profile/profile.component";
import { SidebarComponent } from "@shared/components/sidebar/sidebar.component";
import { ToastConstants } from "@shared/constants/toast.constants";
import { AddCommaPipe } from "@shared/pipes/add-comma.pipe";
import { SplitTextPipe } from "@shared/pipes/split-text.pipe";
import { statusName } from "@shared/pipes/status-lable";
import { TransformToastPipe } from "@shared/pipes/transform-toast.pipe";
import { DepositService } from "@shared/services/deposit-v2/deposit.service";
import {
  DepositCrypto,
  Deposits,
  Networks,
} from "@shared/services/deposit-v2/deposit.type";
import { FaqsService } from "@shared/services/faqs/faqs.service";
import { FaqsCategoryDetail } from "@shared/services/faqs/faqs.types";
import { FileService } from "@shared/services/file/file.service";
import { UserService } from "@shared/services/user/user-v2.service";
import { UserV2 } from "@shared/services/user/user.types";

import { environment } from "@environments/environment";

import { LocalizeRouterPipe } from "@gilsdav/ngx-translate-router";
import { QRCodeModule } from "angularx-qrcode";
import { ClipboardModule } from "ngx-clipboard";
import { ToastrService } from "ngx-toastr";
import { Observable, Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-deposit",
  templateUrl: "./deposit.component.html",
  styleUrls: ["./deposit.component.scss"],
  standalone: true,
  imports: [
    AddCommaPipe,
    AsyncPipe,
    ClipboardModule,
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
    StepDepositComponent,
  ],
})
export class DepositComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$: Subject<void> = new Subject();
  user?: UserV2;
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  filteredWallet?: Observable<any> | undefined;
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  filteredChain?: Observable<any> | undefined;
  deposit!: Deposits[];
  selectCrypto: FormControl = new FormControl("");
  selectChain: FormControl = new FormControl("");
  depositStep: DepositStepEnums = DepositStepEnums.coin;
  walletAddress!: string;
  depositConfirmation = 0;
  minimumAmount = 0;
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
  link!: string;
  cryptoSymbol!: string;
  addressCrypto!: string;
  dataNotFound = "It looks like your account hasn't recent deposit transaction";
  faqs!: FaqsCategoryDetail[];
  cryptos: DepositCrypto[] = [];
  chains: Networks[] = [];
  constructor(
    private _userService: UserService,
    private _faqsService: FaqsService,
    private _toastr: ToastrService,
    private _transformToastPipe: TransformToastPipe,
    public _fileService: FileService,
    private _router: Router,
    private _depositService: DepositService
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
      });

    this._faqsService.faqCategoryDetail$.subscribe(value => {
      this.faqs = value;
    });

    this._depositService.crypto$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => {
        this.cryptos = value;
      });

    this._depositService.deposit$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => {
        this.deposit = value;
      });

    // this.filteredWallet = this.selectCrypto.valueChanges.pipe(
    //   startWith(""),
    //   map(state =>
    //     state ? this.filterWallet(state) : this.user?.wallets.wallets?.slice()
    //   )
    // );
    this.selectChain.disable();

    // this.filteredChain = this.selectChain.valueChanges.pipe(
    //   startWith(""),
    //   map(state =>
    //     state
    //       ? this.filterChain(state)
    //       : this.user?.wallets.walletAddresses?.slice()
    //   )
    // );
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

  protected readonly statusName = statusName;

  handelImage(path: string): string {
    return environment.apiUrl + "/images/" + path;
  }

  protected readonly Number = Number;

  handleWalletAddress(val: Networks) {
    this.depositStep = DepositStepEnums.detail;
    const walletAddress = this.user?.wallets.walletAddresses.find(
      e => e.walletAddress == val.walletAddress
    );
    this.walletAddress = val.walletAddress;
    this.link = walletAddress!.explorer;
    this.qrData =
      "ethereum:" + val!.chain.explorer + "@" + val!.chain.networkId;
    this.minimumAmount = val.minimumAmount;
    this.depositConfirmation = val!.confirmationPerSec;
    this.addressCrypto = val.contractAddress;
    // this._pairService
    //   .getPair(this.cryptoSymbol, walletAddress!.chain.symbol)
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe(value => {
    //     this.addressCrypto = value.contractAddress;
    //     this.link = value.chain.link;
    //   });
  }

  handleInputCrypto(value: string) {
    if (!value) {
      this.selectChain.disable();
      this.depositStep = DepositStepEnums.coin;
      this.selectChain.reset();
      this.urlImageCoin = "";
    }
  }

  handleInputChain(value: string) {
    if (!value) {
      this.depositStep = DepositStepEnums.coin;
    }
  }

  handleWalletCrypto(slug: string) {
    if (slug) {
      this.urlImageCoin =
        environment.apiUrl +
        "/images/" +
        this.cryptos.find(e => e.slug == slug)!.cryptoImagePath;
      this.depositStep = DepositStepEnums.chain;
      this.cryptoSymbol = this.cryptos.find(e => e.slug == slug)!.symbol ?? "";
      this.chains = this.cryptos.find(e => e.slug == slug)!.networks;
      this.selectChain.enable();
    } else {
      this.selectChain.disable();
      this.selectChain.reset();
      this.depositStep = DepositStepEnums.coin;
    }
  }

  protected readonly environment = environment;
  protected readonly DepositStepEnums = DepositStepEnums;
}
