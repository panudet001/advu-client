import { NgClass } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";

import { Error404Component } from "@features/error/pages/error-404/error-404.component";
import { BreadcrumbComponent } from "@features/faq/components/breadcrumb/breadcrumb.component";
import { Breadcrumb } from "@features/faq/components/breadcrumb/breadcrumb.types";
import { DataNotFoundComponent } from "@features/faq/components/data-not-found/data-not-found.component";

import { FaqsService } from "@shared/services/faqs/faqs.service";
import { FaqDetail, FaqsCategory } from "@shared/services/faqs/faqs.types";

import { LocalizeRouterPipe } from "@gilsdav/ngx-translate-router";

@Component({
  selector: "app-detail",
  standalone: true,
  imports: [
    BreadcrumbComponent,
    DataNotFoundComponent,
    Error404Component,
    FormsModule,
    LocalizeRouterPipe,
    NgClass,
  ],
  templateUrl: "./detail.component.html",
  styleUrl: "./detail.component.scss",
})
export class DetailComponent implements OnInit {
  selectedItem: number = 0;
  selectedCategory?: string;
  isSelected: boolean = false;
  faqDetail?: FaqDetail;
  searchValue: string = "";
  faqsCategory?: FaqsCategory[];
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
      url: "/faqs/category",
      title: "Category",
    },
    {
      url: "",
      title: "Detail",
    },
  ];
  constructor(
    private _faqsService: FaqsService,
    private _router: Router
  ) {}

  ngOnInit() {
    this._faqsService.faqCategory$.subscribe(value => {
      this.faqsCategory = value;
    });
    this._faqsService.faqBySlug$.subscribe(value => {
      this.faqDetail = value;
    });
    this.breadCrumb[2]!.url = "/faqs/category/" + this.faqDetail?.category.slug;
    this.breadCrumb[2]!.title = this.faqDetail?.category.name;
    this.breadCrumb[3]!.title = this.faqDetail?.question;
    this.selectedCategory = this.faqDetail?.category?.slug;
    switch (this.selectedCategory) {
      case "general-questions":
        this.selectedItem = 0;
        this.selectedCategory = "General Questions";
        break;
      case "investment-process":
        this.selectedItem = 1;
        this.selectedCategory = "Investment Process";
        break;
      case "security-and-transparency":
        this.selectedItem = 2;
        this.selectedCategory = "Security and Transparency";
        break;
      case "returns-and-withdrawals":
        this.selectedItem = 3;
        this.selectedCategory = "Returns and Withdrawals";
        break;
      case "legal-and-compliance":
        this.selectedItem = 4;
        this.selectedCategory = "Legal and Compliance";
        break;
      case "support":
        this.selectedItem = 5;
        this.selectedCategory = "Support";
        break;
    }
  }

  selectItem(index: number) {
    this.selectedItem = index;
    this.isSelected = !this.isSelected;
  }
  onSearch(value: string): void {
    this._router.navigate(["faqs/search-faq"], {
      queryParams: { q: value },
    });
  }
}
