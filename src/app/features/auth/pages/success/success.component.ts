import { NgIf, NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";

import { LocalizeRouterPipe } from "@gilsdav/ngx-translate-router";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-success",
  templateUrl: "./success.component.html",
  styleUrls: ["./success.component.scss"],
  standalone: true,
  imports: [LocalizeRouterPipe, NgIf, NgOptimizedImage, TranslateModule],
})
export class SuccessComponent {}
