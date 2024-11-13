import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

import { LocalizeRouterPipe } from "@gilsdav/ngx-translate-router";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-about-us",
  standalone: true,
  imports: [LocalizeRouterPipe, MatIconModule, TranslateModule],
  templateUrl: "./about-us.component.html",
  styleUrl: "./about-us.component.scss",
})
export class AboutUsComponent {}
