import { DatePipe, NgIf } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";

import { ToastConstants } from "@shared/constants/toast.constants";
import { AddCommaPipe } from "@shared/pipes/add-comma.pipe";
import { SplitTextPipe } from "@shared/pipes/split-text.pipe";
import { statusOrderName } from "@shared/pipes/status-lable";
import { TransformToastPipe } from "@shared/pipes/transform-toast.pipe";
import { FileService } from "@shared/services/file/file.service";
import { OrderHistories } from "@shared/services/history-v2/history";

import { TranslateModule } from "@ngx-translate/core";
import { ClipboardModule } from "ngx-clipboard";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-detail-order",
  templateUrl: "./detail-order.component.html",
  styleUrls: ["./detail-order.component.scss"],
  standalone: true,
  imports: [
    AddCommaPipe,
    ClipboardModule,
    DatePipe,
    MatIconModule,
    NgIf,
    RouterLink,
    SplitTextPipe,
    TranslateModule,
  ],
})
export class DetailOrderComponent {
  @Input() orderHistories!: OrderHistories;
  @Output() emitClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  protected readonly statusOrderName = statusOrderName;

  constructor(
    private _toastr: ToastrService,
    private _fileService: FileService,
    private _transformToastPipe: TransformToastPipe
  ) {}

  handleClose() {
    this.emitClose.emit(true);
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

  getImage(path: string): string {
    return this._fileService.getImageV2(path);
  }
}
