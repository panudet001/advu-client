import { NgClass } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { BreadcrumbComponent } from "@features/faq/components/breadcrumb/breadcrumb.component";
import { Breadcrumb } from "@features/faq/components/breadcrumb/breadcrumb.types";
import { DataNotFoundComponent } from "@features/faq/components/data-not-found/data-not-found.component";

import { FaqsService } from "@shared/services/faqs/faqs.service";
import { FaqDetail } from "@shared/services/faqs/faqs.types";

import { LocalizeRouterPipe } from "@gilsdav/ngx-translate-router";

@Component({
  selector: "app-search-result",
  standalone: true,
  imports: [
    BreadcrumbComponent,
    DataNotFoundComponent,
    FormsModule,
    LocalizeRouterPipe,
    NgClass,
  ],
  templateUrl: "./search-result.component.html",
  styleUrl: "./search-result.component.scss",
})
export class SearchResultComponent implements OnInit {
  searchKey?: string;
  breadCrumb: Array<Breadcrumb> = [
    {
      url: "/",
      title: "Home",
    },
    {
      url: "/faqs",
      title: "FAQs",
    },
    {
      url: "",
      title: this.searchKey,
    },
  ];
  searchValue: string = "";
  faqResult?: FaqDetail[];
  icon = "fa-regular fa-book-open";

  constructor(
    private _faqsService: FaqsService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.searchKey = this._route.snapshot.queryParamMap.get("q")!;
    this.breadCrumb[2]!.title = this.searchKey;
  }

  ngOnInit() {
    this._faqsService.faqResult$.subscribe(value => {
      this.faqResult = value;
    });
  }

  onSearch(value: string): void {
    this._router
      .navigate(["faqs/search-faq"], { queryParams: { q: value } })
      .then(() => {
        window.location.reload();
      });
    this.searchKey = this._route.snapshot.queryParamMap.get("q")!;
    this.breadCrumb[2]!.title = this.searchKey;
  }
}
