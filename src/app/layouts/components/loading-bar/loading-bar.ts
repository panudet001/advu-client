import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";

import { LoadingService } from "@shared/services/loading-service/loading-service";

import { Observable } from "rxjs";

@Component({
  standalone: true,
  selector: "app-loading-bar",
  templateUrl: "./loading-bar.html",
  styleUrls: ["./loading-bar.scss"],
  imports: [CommonModule, MatProgressBarModule],
})
export class LoadingBarComponent {
  loading$: Observable<boolean>;

  constructor(private loadingService: LoadingService) {
    this.loading$ = this.loadingService.loading$;
  }
}
