import { NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";

import { LocalizeRouterPipe } from "@gilsdav/ngx-translate-router";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-error",
  templateUrl: "./error-404.component.html",
  styleUrls: ["./error-404.component.scss"],
  standalone: true,
  imports: [LocalizeRouterPipe, NgOptimizedImage, TranslateModule],
})
export class Error404Component {}
