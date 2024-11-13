import { DatePipe, NgIf } from "@angular/common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from "@angular/material/core";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle,
} from "@angular/material/datepicker";
import { MatDialog } from "@angular/material/dialog";
import { MatFormField, MatSuffix } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatSelect } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { Router, RouterLink } from "@angular/router";

import { DataNotFoundComponent } from "@features/history/components/data-not-found/data-not-found.component";
import { DetailDepositComponent } from "@features/history/page/deposit/components/detail-history/detail-deposit.component";
import { SearchTransactionComponent } from "@features/history/page/deposit/components/search-transaction/search-transaction.component";

import { PaginationComponent } from "@shared/components/pagination/pagination.component";
import { ProfilesComponent } from "@shared/components/profile/profile.component";
import { SidebarComponent } from "@shared/components/sidebar/sidebar.component";
import { ToastConstants } from "@shared/constants/toast.constants";
import { AddCommaPipe } from "@shared/pipes/add-comma.pipe";
import { SplitTextPipe } from "@shared/pipes/split-text.pipe";
import { TransformToastPipe } from "@shared/pipes/transform-toast.pipe";
import {
  DepositHistories,
  DepositHistoryPagination,
} from "@shared/services/history-v2/history";
import { HistoryService } from "@shared/services/history-v2/history.service";
import { UserService } from "@shared/services/user/user-v2.service";
import { UserV2 } from "@shared/services/user/user.types";

import { TranslateModule } from "@ngx-translate/core";
import moment from "moment";
import { ClipboardModule } from "ngx-clipboard";
import { ToastrService } from "ngx-toastr";
import { Subject, debounceTime, switchMap, takeUntil } from "rxjs";

@Component({
  selector: "app-deposit",
  templateUrl: "./deposit.component.html",
  styleUrls: ["./deposit.component.scss"],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [
    AddCommaPipe,
    ClipboardModule,
    DataNotFoundComponent,
    DatePipe,
    MatBottomSheetModule,
    MatButtonModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerModule,
    MatDatepickerToggle,
    MatFormField,
    MatIcon,
    MatInput,
    MatNativeDateModule,
    MatSelect,
    MatSuffix,
    MatTableModule,
    NgIf,
    PaginationComponent,
    ProfilesComponent,
    ReactiveFormsModule,
    RouterLink,
    SearchTransactionComponent,
    SidebarComponent,
    SplitTextPipe,
    TranslateModule,
  ],
})
export class DepositComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$: Subject<void> = new Subject();
  user?: UserV2;
  transactionForm!: FormGroup;
  displayedColumns: string[] = [
    "createdAt",
    "amount",
    "network",
    "txnHash",
    "from",
    "status",
  ];
  dataSource!: DepositHistoryPagination;

  pageSize = "30";
  page = 0;
  selectPage: FormControl = new FormControl("30");
  dataNotFound = "It looks like your account hasn't deposit transaction";

  constructor(
    private _userService: UserService,
    private _formBuilder: FormBuilder,
    private _historyService: HistoryService,
    private _toastr: ToastrService,
    private _transformToastPipe: TransformToastPipe,
    private _dialog: MatDialog,
    private _router: Router
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

    this._historyService.depositHistory$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => {
        this.dataSource = value;
      });
    this.initSearchForm();
    this.transactionForm.valueChanges
      .pipe(
        debounceTime(500),
        switchMap(value => {
          return this._historyService.getDepositHistory(
            0,
            parseInt(this.pageSize),
            value.startDate ? moment(value.startDate).format("YYYY-MM-DD") : "",
            value.endDate ? moment(value.endDate).format("YYYY-MM-DD") : "",
            "Success"
          );
        })
      )
      .subscribe();

    this.selectPage.valueChanges
      .pipe(
        debounceTime(500),
        switchMap(value => {
          this.pageSize = value;
          return this._historyService.getDepositHistory(0, parseInt(value));
        })
      )
      .subscribe(() => {
        this.transactionForm.reset();
      });
  }

  initSearchForm() {
    this.transactionForm = this._formBuilder.group({
      status: [""],
      startDate: [""],
      endDate: [""],
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  statusName(status: string): string {
    if (status == "Success") {
      return (
        '<label class="badge rounded-pill color-fresh-green  bg-bright-fresh-green">' +
        "Success" +
        "</label>"
      );
    }

    return (
      '<label class="badge rounded-pill color-dark-blue  bg-bright-blue">' +
      "Contact admin" +
      "</label>"
    );
  }

  handleCopy(e: { isSuccess: boolean }): void {
    if (e.isSuccess) {
      const alert = this._transformToastPipe.transform(
        ToastConstants.copiedSuccess
      );
      this._toastr.success(alert);
    }
  }

  handleDetail(data: DepositHistories): void {
    const dialogRef = this._dialog.open(DetailDepositComponent, {
      width: "788px",
    });
    dialogRef.componentInstance.depositHistory = data;
    dialogRef.componentInstance.emitClose.subscribe(value => {
      if (value) {
        dialogRef.close();
      }
    });
  }

  onPageChange(page: number): void {
    this.page = page;
    this._historyService
      .getDepositHistory(this.page - 1, parseInt(this.pageSize), "", "", "")
      .pipe()
      .subscribe();
  }
}
