import { Component, OnDestroy, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";

import { ContactUsComponent } from "@features/home/components/contact-us/contact-us.component";
import { HandleResponse } from "@features/home/components/contact-us/contact-us.types";
import { HeroComponent } from "@features/home/components/hero/hero.component";
import { KnowUsComponent } from "@features/home/components/know-us/know-us.component";
import { MarketPlaceComponent } from "@features/home/components/market-place/market-place.component";
import { NewsComponent } from "@features/home/components/news/news.component";
import { OurRoadmapComponent } from "@features/home/components/our-roadmap/our-roadmap.component";

import { ContactUsService } from "@shared/services/contact-us/contact.service";
import { ContactUs } from "@shared/services/contact-us/contact.type";
import { InvestmentEnums } from "@shared/services/investment-v2/investment.enums";
import { InvestmentService } from "@shared/services/investment-v2/investment.service";
import { Investment } from "@shared/services/investment-v2/investment.types";
import { MetaService } from "@shared/services/seo/seo.service";
import { Pagination } from "@shared/types/core.types";

import { environment } from "@environments/environment";

import { TranslateModule } from "@ngx-translate/core";
import { Subject, combineLatest, of, switchMap, takeUntil } from "rxjs";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    ContactUsComponent,
    HeroComponent,
    KnowUsComponent,
    MarketPlaceComponent,
    NewsComponent,
    OurRoadmapComponent,
    RouterLink,
    TranslateModule,
  ],
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit, OnDestroy {
  investments!: Investment[];
  isShowLoadingMarket = false;
  pagination!: Pagination;
  investmentType = InvestmentEnums.live;
  private _unsubscribe$ = new Subject<void>();
  contactUsHandleResponse?: HandleResponse;

  constructor(
    private _estateService: InvestmentService,
    private _contactUsService: ContactUsService,
    private _metaService: MetaService
  ) {
    this._metaService.updateTitle("ADAVU HOME");
    this._metaService.updateDescription({
      title: "ADAVU HOME",
      keywords: "ADAVU,adavu",
      description: "INVEST WITH US, WITHOUT EXPENSE OF MANAGING PROPERTY",
      author: "ADAVU HOME",
      image: "",
      url: environment.baseUrl,
    });
    this._metaService.createLinkForCanonicalURL();
  }

  ngOnInit(): void {
    combineLatest([
      this._estateService.investmentsLive$,
      this._estateService.investmentFunded$,
    ])
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(value => {
        this.isShowLoadingMarket = false;
        if (this.investmentType == InvestmentEnums.live) {
          this.investments = value[0];
        } else {
          this.investments = value[1];
        }
      });
  }

  changeInvestmentType(estateTypeEnums: InvestmentEnums) {
    this.isShowLoadingMarket = true;
    this.investments = [];
    this.investmentType = estateTypeEnums;
    this.queryInvestmentType(estateTypeEnums);
  }

  queryInvestmentType(estateTypeEnums: InvestmentEnums) {
    of(estateTypeEnums)
      .pipe(
        switchMap(value => this._estateService.getInvestments(value, 0, 6)),
        takeUntil(this._unsubscribe$)
      )
      .subscribe();
  }

  submitForm(contactUs: ContactUs) {
    of(contactUs)
      .pipe(
        switchMap(value => this._contactUsService.contactUs(value)),
        takeUntil(this._unsubscribe$)
      )
      .subscribe({
        next: () => {
          this.contactUsHandleResponse = {
            type: "success",
            value: " ส่งอีเมลล์สำเร็จ",
          } as HandleResponse;
        },
        error: () => {
          this.contactUsHandleResponse = {
            type: "error",
            value: " ส่งอีเมลล์สำเร็จ",
          } as HandleResponse;
        },
      });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
