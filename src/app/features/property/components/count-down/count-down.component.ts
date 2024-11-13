import { NgClass, isPlatformBrowser } from "@angular/common";
import {
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from "@angular/core";

import { InvestmentEnums } from "@shared/services/investment-v2/investment.enums";

@Component({
  selector: "app-count-down",
  templateUrl: "./count-down.component.html",
  styleUrls: ["./count-down.component.scss"],
  standalone: true,
  imports: [NgClass],
})
export class CountDownComponent implements OnInit, OnDestroy {
  @Input() startDate!: Date;
  @Input() endDate!: Date;
  @Input() investmentTypeEnums!: InvestmentEnums;

  days!: number;
  hours!: number;
  minutes!: number;
  countdownColor: string = "time-box-green";
  isShowCountdown = false;
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  intervalRef: any; //
  countdownActive: boolean = true;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit() {
    this.updateCountdown();
    if (isPlatformBrowser(this.platformId)) {
      this.intervalRef = setInterval(() => this.updateCountdown(), 1000);
    }
  }

  updateCountdown() {
    if (!this.countdownActive) {
      return;
    }

    if (this.investmentTypeEnums == InvestmentEnums.funded) {
      return;
    }

    const startTime = new Date(this.startDate).getTime();
    const nowTime = new Date().getTime();
    const endTime = new Date(this.endDate).getTime();
    const distanceTime = endTime - nowTime;

    if (nowTime < startTime) {
      this.isShowCountdown = false;
      return;
    }

    if (distanceTime < 0) {
      this.days = 0;
      this.hours = 0;
      this.minutes = 0;
      this.countdownColor = "time-box-red";
      this.stopCountdown();
      return;
    }

    this.isShowCountdown = true;

    this.days = Math.floor(distanceTime / (1000 * 60 * 60 * 24));
    this.hours = Math.floor(
      (distanceTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    this.minutes = Math.floor((distanceTime % (1000 * 60 * 60)) / (1000 * 60));

    // Calculate remaining percentage
    const totalDuration = endTime - nowTime;
    const remainingPercent = (distanceTime / totalDuration) * 100;

    if (remainingPercent > 50) {
      this.countdownColor = "time-box-green";
    } else if (remainingPercent > 30) {
      this.countdownColor = "time-box-yellow";
    } else {
      this.countdownColor = "time-box-red";
    }
  }

  stopCountdown() {
    this.countdownActive = false;
    clearInterval(this.intervalRef);
  }

  ngOnDestroy() {
    this.stopCountdown();
  }
}
