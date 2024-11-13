import { DatePipe } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";

import { ToastConstants } from "@shared/constants/toast.constants";
import { AddCommaPipe } from "@shared/pipes/add-comma.pipe";
import { SplitTextPipe } from "@shared/pipes/split-text.pipe";
import { statusName } from "@shared/pipes/status-lable";
import { TransformToastPipe } from "@shared/pipes/transform-toast.pipe";
import { WithdrawHistories } from "@shared/services/history-v2/history";

import { TranslateModule } from "@ngx-translate/core";
import { ClipboardModule } from "ngx-clipboard";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-detail-withdraw",
  templateUrl: "./detail-withdraw.component.html",
  styleUrls: ["./detail-withdraw.component.scss"],
  standalone: true,
  imports: [
    AddCommaPipe,
    ClipboardModule,
    DatePipe,
    MatIconModule,
    RouterLink,
    SplitTextPipe,
    TranslateModule,
  ],
})
export class DetailWithdrawComponent {
  @Input() withdrawHistories!: WithdrawHistories;
  @Output() emitClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private _toastr: ToastrService,
    private _transformToastPipe: TransformToastPipe
  ) {}

  handleClose(): void {
    this.emitClose.emit(true);
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
}
