import { CommonModule, isPlatformBrowser } from "@angular/common";
import { Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";

@Component({
  standalone: true,
  selector: "app-loading-indicator",
  templateUrl: "./loading-indicator.component.html",
  styleUrls: ["./loading-indicator.component.scss"],
  imports: [CommonModule],
})
export class LoadingIndicatorComponent implements OnInit {
  isServer = true;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.isServer = false;
      });
    }
  }
}
