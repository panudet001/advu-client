import { NgIf } from "@angular/common";
import { Component, Input } from "@angular/core";

import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-data-not-found",
  standalone: true,
  imports: [NgIf, TranslateModule],
  templateUrl: "./data-not-found.component.html",
  styleUrl: "./data-not-found.component.scss",
})
export class DataNotFoundComponent {
  @Input() isShowText = false;
}
