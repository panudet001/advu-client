import { NgForOf, NgIf } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

import { Breadcrumb } from "@features/faq/components/breadcrumb/breadcrumb.types";

import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-breadcrumb",
  standalone: true,
  imports: [NgForOf, NgIf, TranslateModule],
  templateUrl: "./breadcrumb.component.html",
  styleUrl: "./breadcrumb.component.scss",
})
export class BreadcrumbComponent {
  @Output() link = new EventEmitter<string>();
  @Input() breadCrumb: Array<Breadcrumb> = [];

  constructor() {}
}
