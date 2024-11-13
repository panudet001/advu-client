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
import { DetailOrderComponent } from "@features/history/page/order/components/detail-order/detail-order.component";
import { SearchTransactionComponent } from "@features/history/page/order/components/search-transaction/search-transaction.component";

import { PaginationComponent } from "@shared/components/pagination/pagination.component";
import { ProfilesComponent } from "@shared/components/profile/profile.component";
import { SidebarComponent } from "@shared/components/sidebar/sidebar.component";
import { ToastConstants } from "@shared/constants/toast.constants";
import { AddCommaPipe } from "@shared/pipes/add-comma.pipe";
import { SplitTextPipe } from "@shared/pipes/split-text.pipe";
import { statusName, statusOrderName } from "@shared/pipes/status-lable";
import { TransformToastPipe } from "@shared/pipes/transform-toast.pipe";
import { FileService } from "@shared/services/file/file.service";
import {
  OrderHistories,
  OrderHistoryPagination,
} from "@shared/services/history-v2/history";
import { HistoryService } from "@shared/services/history-v2/history.service";
import { UserService } from "@shared/services/user/user.service";
import { User } from "@shared/services/user/user.types";

import { TranslateModule } from "@ngx-translate/core";
import { ClipboardModule } from "ngx-clipboard";
import { ToastrService } from "ngx-toastr";
import { Subject, debounceTime, switchMap, takeUntil } from "rxjs";

@Component({
  selector: "app-search-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.scss"],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
export class OrderComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$: Subject<void> = new Subject();
  user?: User;
  transactionForm!: FormGroup;
  displayedColumns: string[] = [
    "createdAt",
    "amount",
    "network",
    "txnHash",
    "from",
    "status",
  ];
  dataSource!: OrderHistoryPagination;

  pageSize = "30";
  page = 0;
  selectPage: FormControl = new FormControl("30");
  dataNotFound = "It looks like your account hasn't order transaction";
  protected readonly statusName = statusName;

  constructor(
    private _userService: UserService,
    private _formBuilder: FormBuilder,
    private _historyService: HistoryService,
    private _fileService: FileService,
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

    this._historyService.orderHistory$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => {
        this.dataSource = value;
      });
    this.initSearchForm();
    this.transactionForm.valueChanges
      .pipe(
        debounceTime(500),
        switchMap(value => {
          return this._historyService.getOrderHistory(
            0,
            parseInt(this.pageSize),
            value.startDate ? value.startDate.toISOString() : "",
            value.endDate ? value.endDate.toISOString() : ""
          );
        })
      )

      .subscribe();
    this.selectPage.valueChanges
      .pipe(
        debounceTime(500),
        switchMap(value => {
          this.pageSize = value;
          return this._historyService.getOrderHistory(
            0,
            parseInt(value),
            "",
            ""
          );
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

  handleCopy(e: { isSuccess: boolean }): void {
    if (e.isSuccess) {
      const alert = this._transformToastPipe.transform(
        ToastConstants.copiedSuccess
      );
      this._toastr.success(alert);
    }
  }

  handleDetail(data: OrderHistories): void {
    const dialogRef = this._dialog.open(DetailOrderComponent, {
      width: "788px",
    });
    dialogRef.componentInstance.orderHistories = data;
    dialogRef.componentInstance.emitClose.subscribe(value => {
      if (value) {
        dialogRef.close();
      }
    });
  }

  public onPageChange(page: number): void {
    this.page = page;
    this._historyService
      .getOrderHistory(this.page - 1, parseInt(this.pageSize), "", "")
      .pipe()
      .subscribe();
  }

  getImage(path: string): string {
    return this._fileService.getImageV2(path);
  }

  protected readonly statusOrderName = statusOrderName;
}
