import { NgClass, NgIf } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-data-not-found",
  standalone: true,
  imports: [NgClass, NgIf, TranslateModule],
  templateUrl: "./data-not-found.component.html",
  styleUrl: "./data-not-found.component.scss",
})
export class DataNotFoundComponent {
  @Input() isShowText = false;
  @Input() isSearch = false;
  categoryMenu = [
    "General Questions",
    "Investment Process",
    "Security and Transparency",
    "Returns and Withdrawals",
    "Legal and Compliance",
    "Support",
  ];
  selectedItem: number = 0;
  constructor(private _router: Router) {}
  selectItem(index: number) {
    this.selectedItem = index;
    switch (this.selectedItem) {
      case 0:
        this._router.navigate(["faqs/category/general-questions"]);
        break;
      case 1:
        this._router.navigate(["faqs/category/investment-process"]);
        break;
      case 2:
        this._router.navigate(["faqs/category/security-and-transparency"]);
        break;
      case 3:
        this._router.navigate(["faqs/category/returns-and-withdrawals"]);
        break;
      case 4:
        this._router.navigate(["faqs/category/legal-and-compliance"]);
        break;
      case 5:
        this._router.navigate(["faqs/category/support"]);
        break;
    }
  }
}
