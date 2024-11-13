import { Component } from "@angular/core";

import { LocalizeRouterPipe } from "@gilsdav/ngx-translate-router";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-know-us",
  templateUrl: "./know-us.component.html",
  styleUrls: ["./know-us.component.scss"],
  standalone: true,
  imports: [LocalizeRouterPipe, TranslateModule],
})
export class KnowUsComponent {}
