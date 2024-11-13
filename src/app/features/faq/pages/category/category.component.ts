import { NgClass, NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";

import { Error404Component } from "@features/error/pages/error-404/error-404.component";
import { BreadcrumbComponent } from "@features/faq/components/breadcrumb/breadcrumb.component";
import { Breadcrumb } from "@features/faq/components/breadcrumb/breadcrumb.types";
import { DataNotFoundComponent } from "@features/faq/components/data-not-found/data-not-found.component";

import { FaqsService } from "@shared/services/faqs/faqs.service";
import {
  FaqsCategory,
  FaqsCategoryDetail,
} from "@shared/services/faqs/faqs.types";

import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { LocalizeRouterPipe } from "@gilsdav/ngx-translate-router";

@Component({
  selector: "app-faqs-categories",
  standalone: true,
  imports: [
    BreadcrumbComponent,
    DataNotFoundComponent,
    Error404Component,
    FaIconComponent,
    FormsModule,
    LocalizeRouterPipe,
    NgClass,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: "./category.component.html",
  styleUrl: "./category.component.scss",
})
export class FaqCategoryComponent implements OnInit {
  faqsCategory!: FaqsCategory[];
  categoryDetail?: FaqsCategoryDetail[];
  category: string = "";
  selectedCategory?: string;
  selectedItem: number = 0;
  isSelected: boolean = false;
  searchValue: string = "";
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
      title: this.selectedCategory,
    },
  ];
  isCategory!: boolean;

  constructor(
    private _faqsService: FaqsService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._faqsService.faqCategory$.subscribe(value => {
      this.faqsCategory = value;
    });
    this._faqsService.faqCategoryDetail$.subscribe(value => {
      this.categoryDetail = value;
    });
    this._route.paramMap.subscribe(paramMap => {
      this.category = paramMap.get("slug")!;
      this.isCategory = true;
      switch (this.category) {
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
        default:
          this.isCategory = false;
      }
    });
    this.breadCrumb[2]!.title = this.selectedCategory;
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
