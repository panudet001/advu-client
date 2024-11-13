import { NgClass, NgForOf, NgIf } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";

import { DataNotFoundComponent } from "@features/home/components/data-not-found/data-not-found.component";

import { CardInvestmentComponent } from "@shared/components/card-investment/card-investment.component";
import { InvestmentEnums } from "@shared/services/investment-v2/investment.enums";
import { Investment } from "@shared/services/investment-v2/investment.types";

import { LocalizeRouterPipe } from "@gilsdav/ngx-translate-router";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: " app-market-place",
  templateUrl: "./market-place.component.html",
  styleUrls: ["./market-place.component.scss"],
  standalone: true,
  imports: [
    CardInvestmentComponent,
    DataNotFoundComponent,
    LocalizeRouterPipe,
    NgClass,
    NgForOf,
    NgIf,
    TranslateModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketPlaceComponent {
  @Input() isShowCancelBtn!: boolean;
  @Input() isShowLoading!: boolean;
  @Input() investments!: Investment[];
  @Input() investmentType!: InvestmentEnums;

  @Output() changeType = new EventEmitter<InvestmentEnums>();

  changeInvestmentType(estateTypeEnums: InvestmentEnums) {
    this.changeType.emit(estateTypeEnums);
  }

  protected readonly EstateTypeEnums = InvestmentEnums;
}
