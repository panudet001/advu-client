import { NgClass, NgForOf, NgIf } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";

import { BannerService } from "@app/shared/services/banner/banner.service";
import { Banner } from "@app/shared/services/banner/banner.types";

import { DataNotFoundComponent } from "@features/home/components/data-not-found/data-not-found.component";

import { CardInvestmentComponent } from "@shared/components/card-investment/card-investment.component";
import { PaginationComponent } from "@shared/components/pagination/pagination.component";
import { InvestmentEnums } from "@shared/services/investment-v2/investment.enums";
import { InvestmentService } from "@shared/services/investment-v2/investment.service";
import { Investment } from "@shared/services/investment-v2/investment.types";
import { MetaService } from "@shared/services/seo/seo.service";
import { Pagination } from "@shared/types/core.types";

import { environment } from "@environments/environment";

import { LocalizeRouterPipe } from "@gilsdav/ngx-translate-router";
import {
  NgbCarouselModule,
  NgbPaginationModule,
} from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { Subject, combineLatest, of, switchMap, takeUntil } from "rxjs";

@Component({
  selector: "app-list",
  standalone: true,
  imports: [
    CardInvestmentComponent,
    DataNotFoundComponent,
    FormsModule,
    LocalizeRouterPipe,
    MatSelectModule,
    NgClass,
    NgForOf,
    NgIf,
    NgbCarouselModule,
    NgbPaginationModule,
    PaginationComponent,
    TranslateModule,
  ],
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit, OnDestroy {
  banners!: Banner[];
  investments!: Investment[];
  pagination!: Pagination;
  isShowLoading = false;
  investmentType = InvestmentEnums.live;
  private _unsubscribe$ = new Subject<void>();

  sortByTypes: Array<{
    code: string;
    name: string;
  }> = [
    {
      code: "newest",
      name: "Newest",
    },
    {
      code: "oldest",
      name: "Oldest",
    },
    {
      code: "lowHigh",
      name: "Min: Low-High",
    },
    {
      code: "highLow",
      name: "Min: High-Low",
    },
  ];

  page = 0;
  size = 10;
  sort = "updatedAt";
  order = "desc";
  total = 0;
  totalItems = 0;

  constructor(
    private _estateService: InvestmentService,
    private _bannerService: BannerService,
    private _metaService: MetaService
  ) {
    this._metaService.updateTitle("Investment");
    this._metaService.updateDescription({
      title: "Investment",
      keywords: "ADAVU,adavu",
      description: "INVEST WITH US, WITHOUT EXPENSE OF MANAGING PROPERTY",
      author: "ADAVU HOME",
      image: "",
      url: environment.baseUrl,
    });
    this._metaService.createLinkForCanonicalURL();
  }

  ngOnInit(): void {
    this._bannerService.banners$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(value => {
        this.banners = value;
      });

    combineLatest([
      this._estateService.pagination$,
      this._estateService.investments$,
    ])
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(value => {
        this.isShowLoading = false;
        this.pagination = value[0];
        this.investments = value[1];
      });
  }

  queryInvestment(
    estateTypeEnums: InvestmentEnums,
    page: number,
    sort: string
  ) {
    this.isShowLoading = true;
    this.investments = [];

    of(estateTypeEnums)
      .pipe(
        switchMap(value =>
          this._estateService.getInvestments(value, page, 12, sort)
        ),
        takeUntil(this._unsubscribe$)
      )
      .subscribe();
  }

  public onPageChange(page: number): void {
    this.page = page - 1;
    this.queryInvestment(this.investmentType, this.page, this.sort);
  }

  public onTypeChange(type: InvestmentEnums): void {
    this.investmentType = type;
    this.queryInvestment(this.investmentType, this.page, this.sort);
  }

  public onSortChange(
    sort: "updatedAt" | "newest" | "oldest" | "lowHigh" | "highLow"
  ): void {
    this.sort = sort;
    this.queryInvestment(this.investmentType, this.page, this.sort);
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  protected readonly InvestmentTypes = InvestmentEnums;
}
