import {
  DatePipe,
  NgClass,
  NgForOf,
  NgIf,
  NgStyle,
  SlicePipe,
} from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

import { AddCommaPipe } from "@shared/pipes/add-comma.pipe";
import { FormatNumberPipe } from "@shared/pipes/format-number.pipe";
import { GalleryService } from "@shared/services/gallery/gallery.service";
import { InvestmentOrder } from "@shared/services/investment-order-v2/investment-order.types";
import { InvestmentEnums } from "@shared/services/investment-v2/investment.enums";

import { LocalizeRouterPipe } from "@gilsdav/ngx-translate-router";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-card-investment-order",
  templateUrl: "card-investment-order.component.html",
  standalone: true,
  imports: [
    AddCommaPipe,
    DatePipe,
    FormatNumberPipe,
    LocalizeRouterPipe,
    MatIconModule,
    NgClass,
    NgForOf,
    NgIf,
    NgStyle,
    SlicePipe,
    TranslateModule,
  ],

  styleUrls: ["./card-investment-order.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardInvestmentOrderComponent {
  @Input() idOrder!: string;
  @Input() myInvestment!: number;
  @Input() investment!: InvestmentOrder;
  @Input() isShowBtnCancel!: boolean;
  @Input() isShowBtnInvest!: boolean;
  @Input() investmentTypeEnums!: InvestmentEnums;
  @Input() amount?: number;
  @Output() clickCancelInvest = new EventEmitter<string>();
  protected readonly InvestmentTypeEnums = InvestmentEnums;

  constructor(private _galleryService: GalleryService) {}

  getImage(fileName: string) {
    return this._galleryService.getImagUrlV2(fileName);
  }

  cancelInvestment(id: string) {
    this.clickCancelInvest.emit(id);
  }

  showNewInvest(startDate: Date) {
    const now = new Date(startDate);
    now.setDate(now.getDate() + 7);
    return now > new Date();
  }
}
