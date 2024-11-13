import {
  NgForOf,
  NgIf,
  NgOptimizedImage,
  NgStyle,
  isPlatformBrowser,
} from "@angular/common";
import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Output,
  PLATFORM_ID,
  ViewChild,
  signal,
} from "@angular/core";
import { MatIcon } from "@angular/material/icon";

import { PaginationComponent } from "@shared/components/pagination/pagination.component";
import { AddCommaPipe } from "@shared/pipes/add-comma.pipe";
import { GalleryService } from "@shared/services/gallery/gallery.service";
import {
  TokenWalletPaginationResponse,
  TokenWalletResponses,
} from "@shared/services/wallet-v2/wallet.types";

import { LocalizeRouterPipe } from "@gilsdav/ngx-translate-router";
import { TranslateModule } from "@ngx-translate/core";
import "tippy.js/dist/tippy.css";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  labels: any;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  options: any;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  dataLabels: any;
  colors: any;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  plotOptions: any;
  legend: {
    show: boolean;
  };
  theme: ApexTheme;
};

@Component({
  selector: "app-chat-property",
  templateUrl: "./chart-property.component.html",
  styleUrls: ["./chart-property.component.scss"],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    AddCommaPipe,
    LocalizeRouterPipe,
    MatIcon,
    NgForOf,
    NgIf,
    NgOptimizedImage,
    NgStyle,
    PaginationComponent,
    TranslateModule,
  ],
})
export class ChatPropertyComponent implements AfterViewInit {
  public chartOptions!: Partial<ChartOptions>;
  isBrowser = signal(false);
  @Input() series: Array<number> = [0];
  @Input() labels: Array<string> = ["-"];
  @Input() walletResponses!: TokenWalletPaginationResponse;
  @Output() pageEmit = new EventEmitter<number>();
  ApexCharts: any;
  page!: number;
  propertyWalletResponses!: TokenWalletResponses[];
  @ViewChild("tooltipButton") tooltipButton!: ElementRef;

  ngAfterViewInit(): void {
    this.propertyWalletResponses = this.walletResponses.tokenWalletResponses;
  }

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    private _galleryService: GalleryService
  ) {
    this.isBrowser.set(isPlatformBrowser(platformId));
    // Dynamically import ApexCharts on the client-side

    if (this.isBrowser()) {
      import("apexcharts").then(ApexChartsModule => {
        this.ApexCharts = ApexChartsModule.default;
        this.initChart();
      });
    }
  }

  initChart(): void {
    this.chartOptions = {
      series: this.series,
      chart: {
        type: "donut",
      },

      labels: this.labels,
      colors: this.generateMonochromeColors(this.series.length),

      legend: {
        show: false,
      },
    };

    const chart = new this.ApexCharts(
      document.querySelector("#chart"),
      this.chartOptions
    );
    chart.render();
  }

  baseColor = "#2486AF";

  // Function to convert hex to HSL
  hexToHSL(hex: string) {
    let r = 0,
      g = 0,
      b = 0;
    if (hex.length == 4) {
      r = parseInt(hex[1]! + hex[1], 16);
      g = parseInt(hex[2]! + hex[2], 16);
      b = parseInt(hex[3]! + hex[3], 16);
    } else if (hex.length == 7) {
      r = parseInt(hex[1]! + hex[2], 16);
      g = parseInt(hex[3]! + hex[4], 16);
      b = parseInt(hex[5]! + hex[6], 16);
    }
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h = 0,
      s = 0;
    const p = (max + min) / 2;
    if (max != min) {
      const d = max - min;
      s = p > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return { h, s, p };
  }

  // Function to get HSL color with different lightness based on index
  getBackgroundColor(index: number) {
    const hsl = this.hexToHSL(this.baseColor);
    const lightness = Math.min(hsl.p * 100 + index * 10, 100);
    return {
      "background-color": `hsl(${hsl.h * 360}, ${hsl.s * 100}%, ${lightness}%)`,
    };
  }

  generateMonochromeColors(seriesCount: number): string[] {
    const colors = [];
    for (let i = 0; i < seriesCount; i++) {
      const hsl = this.hexToHSL(this.baseColor);
      const lightness = Math.min(hsl.p * 100 + i * 10, 100);
      const code = `hsl(${hsl.h * 360}, ${hsl.s * 100}%, ${lightness}%)`;
      colors.push(code);
    }
    return colors;
  }

  getImage(fileName: string): string {
    return this._galleryService.getImagUrlV2(fileName);
  }

  public onPageChange(page: number): void {
    this.page = page - 1;
    this.pageEmit.emit(this.page);
  }
}
