import { DOCUMENT, NgIf } from "@angular/common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";

import { ProfilesComponent } from "@app/shared/components/profile/profile.component";
import { UserService } from "@app/shared/services/user/user-v2.service";

import { ChatPropertyComponent } from "@features/portfolio/components/chart-property/chart-property.component";
import { ModalConfirmComponent } from "@features/portfolio/components/modal-confirm/modal-confirm.component";
import { OverallComponent } from "@features/portfolio/components/overall/overall.componenet";
import { MyPropertyComponent } from "@features/portfolio/components/properties/properties.component";
import { MyWalletComponent } from "@features/portfolio/components/wallet/wallet.component";

import { AuthMenuComponent } from "@shared/components/auth-menu/auth-menu.component";
import { SidebarComponent } from "@shared/components/sidebar/sidebar.component";
import { ToastConstants } from "@shared/constants/toast.constants";
import { TransformToastPipe } from "@shared/pipes/transform-toast.pipe";
import {
  UserV2,
  WalletAddresses,
  Wallets,
} from "@shared/services/user/user.types";
import { TokenWalletPaginationResponse } from "@shared/services/wallet-v2/wallet.types";

import { TranslateModule } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { Subject, takeUntil } from "rxjs";
import { InvestmentOrderService } from "src/app/shared/services/investment-order-v2/investment-order.service";
import { InvestmentOrder } from "src/app/shared/services/investment-order-v2/investment-order.types";
import { WalletService } from "src/app/shared/services/wallet-v2/wallet.service";

@Component({
  selector: "app-portfolio",
  templateUrl: "./portfolio.component.html",
  styleUrls: ["./portfolio.component.scss"],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    AuthMenuComponent,
    ChatPropertyComponent,
    MyPropertyComponent,
    MyWalletComponent,
    NgIf,
    OverallComponent,
    ProfilesComponent,
    SidebarComponent,
    TranslateModule,
  ],
})
export class PortfolioComponent implements OnInit {
  walletAddress?: WalletAddresses | null;
  investmentOrder!: InvestmentOrder[];
  pendingInvestment = 0;
  colors: string[] = [];
  wallet!: TokenWalletPaginationResponse;
  user!: UserV2;
  myWallet!: Wallets;
  private _unsubscribeAll = new Subject();
  investmentId = "";
  amountOrder = 0;
  balanceTotal = 0;
  investmentName = "";
  cryptoCode = "";
  series: number[] = [];
  labels: string[] = [];
  constructor(
    private _walletService: WalletService,
    private _investmentOrderService: InvestmentOrderService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _userService: UserService,
    public _dialog: MatDialog,
    private _toastr: ToastrService,
    private _transformToastPipe: TransformToastPipe,
    @Inject(DOCUMENT) private _document: Document,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._userService.user$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(value => {
        if (!value.isKyc) {
          this._router.navigate(["/identity-verification"]).then(() => {
            this._toastr.warning("Please confirm your identity.");
          });
        }
        this.user = value;
        this.myWallet = value.wallets.wallets.find(e => e.isDefault)!;
        this.walletAddress =
          value.wallets.walletAddresses.length > 0
            ? value.wallets.walletAddresses[0]
            : null;
      });

    this._investmentOrderService.investmentOrderByUser$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(value => {
        this.investmentOrder = value;
      });

    this._walletService.wallets$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(value => {
        if (value) {
          this.wallet = value.tokenWalletPaginationResponse;
          value.tokenWalletPaginationResponse.tokenWalletResponses.forEach(
            e => {
              this.balanceTotal = this.balanceTotal + e.balance;
              this.series.push(e.balance);
              this.labels.push(e.cryptoSymbol);
            }
          );
        }
      });
  }

  cancelInvestment(id: string): void {
    this.investmentId = "";
    this.cryptoCode = "";
    this.amountOrder = 0;

    this.findInvestmentOrderLive(id);
    if (this.investmentId) {
      const dialogRef = this._dialog.open(ModalConfirmComponent, {
        disableClose: true,
        data: {
          investmentId: this.investmentName,
          amount: this.amountOrder,
          cryptoCode: this.cryptoCode,
        },
      });

      dialogRef.componentInstance.submitClicked.subscribe(() => {
        this.cancelInvest(id);
      });
      dialogRef.componentInstance.closeClicked.subscribe(() => {
        this._dialog.closeAll();
      });
    }
  }

  findInvestmentOrderLive(slug: string): void {
    this.investmentOrder.forEach(value => {
      if (slug == value.slug) {
        this.amountOrder = value.orderAmount;
        this.cryptoCode = value.cryptoSymbol;
        this.investmentId = value.slug;
        this.investmentName = value.title;
      }
    });
  }

  cancelInvest(id: string): void {
    this._investmentOrderService.cancelInvest(this.investmentId).subscribe({
      next: () => {
        this.getInvestmentLive();
        this.investmentName = "";
        this.amountOrder = 0;
        this.cryptoCode = "";
        const alert = this._transformToastPipe.transform(
          ToastConstants.cancelInvestSuccess
        );
        this._toastr.success(alert);
        this._dialog.closeAll();
        window.location.reload();
        this._document.getElementById("card-" + id)?.classList.add("d-none");
      },
      error: err => {
        const alert = this._transformToastPipe.transform(err.error.title);
        this._toastr.error(alert);
      },
    });
  }

  getInvestmentLive(): void {
    this._investmentOrderService.investmentOrderByLive$.subscribe(result => {
      if (result) {
        this.investmentOrder = result;
        this.investmentOrder.forEach(value => {
          this.pendingInvestment += value.orderAmount;
        });
      }
      this._changeDetectorRef.markForCheck();
    });
  }

  handleCopy(data: boolean) {
    if (data) {
      const alert = this._transformToastPipe.transform(
        ToastConstants.copiedSuccess
      );
      this._toastr.success(alert);
    }
  }

  pageEmit(page: number): void {
    this._walletService.getWallet(page).pipe();
  }
}
