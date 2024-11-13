import { NgForOf, NgIf, NgOptimizedImage } from "@angular/common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";

import { CardInvestmentOrderComponent } from "@features/portfolio/components/card-investment-order/card-investment-order.component";

import { CardInvestmentComponent } from "@shared/components/card-investment/card-investment.component";
import { InvestmentOrder } from "@shared/services/investment-order-v2/investment-order.types";

import { LocalizeRouterPipe } from "@gilsdav/ngx-translate-router";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-my-properties",
  templateUrl: "./properties.component.html",
  styleUrls: ["./properties.component.scss"],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CardInvestmentComponent,
    CardInvestmentOrderComponent,
    LocalizeRouterPipe,
    NgForOf,
    NgIf,
    NgOptimizedImage,
    TranslateModule,
  ],
})
export class MyPropertyComponent {
  @Input() investmentOrdersByLive!: InvestmentOrder[];
  @Input() investmentTypeLive!: string;
  @Output() cancelInvestment = new EventEmitter<string>();

  openCancelInvestment(id: string): void {
    this.cancelInvestment.emit(id);
  }
}
