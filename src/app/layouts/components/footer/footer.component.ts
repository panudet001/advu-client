import { NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";

import { LocalizeRouterPipe } from "@gilsdav/ngx-translate-router";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-footer",
  standalone: true,
  templateUrl: "./footer.component.html",
  styleUrl: "./footer.component.scss",
  imports: [LocalizeRouterPipe, NgOptimizedImage, TranslateModule],
})
export class FooterComponent {}
