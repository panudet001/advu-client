import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { Router, RouterLink } from "@angular/router";

import { BreadcrumbComponent } from "@features/faq/components/breadcrumb/breadcrumb.component";
import { Breadcrumb } from "@features/faq/components/breadcrumb/breadcrumb.types";
import { DataNotFoundComponent } from "@features/faq/components/data-not-found/data-not-found.component";

import { FaqsService } from "@shared/services/faqs/faqs.service";
import { FaqsCategory, FaqsMostTopic } from "@shared/services/faqs/faqs.types";

import { LocalizeRouterPipe } from "@gilsdav/ngx-translate-router";

@Component({
  selector: "app-faq-overview",
  standalone: true,
  imports: [
    BreadcrumbComponent,
    CommonModule,
    DataNotFoundComponent,
    FormsModule,
    LocalizeRouterPipe,
    MatFormField,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: "./faq.component.html",
  styleUrl: "./faq.component.scss",
})
export class FaqComponent implements OnInit {
  faqMostTopic?: FaqsMostTopic[];
  faqsCategory?: FaqsCategory[];
  searchValue: string = "";
  breadCrumb: Array<Breadcrumb> = [
    {
      url: "/",
      title: "Home",
    },
    {
      url: "",
      title: "FAQs",
    },
  ];
  constructor(
    private _faqsService: FaqsService,
    private _router: Router
  ) {}

  ngOnInit() {
    this._faqsService.faqMostTopic$.subscribe(value => {
      this.faqMostTopic = value;
    });
    this._faqsService.faqCategory$.subscribe(value => {
      this.faqsCategory = value;
    });
  }

  onSearch(value: string): void {
    this._router.navigate(["faqs/search-faq"], {
      queryParams: { q: value },
    });
  }
}
