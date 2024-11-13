import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { LoadingBarComponent } from "@layouts/components/loading-bar/loading-bar";
import { LoadingIndicatorComponent } from "@layouts/components/loading-indicator/loading-indicator.component";

import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    LoadingBarComponent,
    LoadingIndicatorComponent,
    RouterOutlet,
    TranslateModule,
  ],
  templateUrl: "./app.component.html",
})
export class AppComponent {}
