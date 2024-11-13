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
import { InvestmentEnums } from "@shared/services/investment-v2/investment.enums";
import { Investment } from "@shared/services/investment-v2/investment.types";

import { LocalizeRouterPipe } from "@gilsdav/ngx-translate-router";
import { TranslateModule } from "@ngx-translate/core";

import { GalleryService } from "../../services/gallery/gallery.service";

@Component({
  selector: "app-card-investment",
  templateUrl: "./card-investment.component.html",
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

  styleUrls: ["./card-investment.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardInvestmentComponent {
  @Input() investment!: Investment;
  @Input() isShowBtnCancel!: boolean;
  @Input() isShowBtnInvest!: boolean;
  @Input() investmentType!: InvestmentEnums;
  @Input() amount?: number;
  @Output() clickCancelInvest = new EventEmitter<string>();
  protected readonly InvestmentType = InvestmentEnums;

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
