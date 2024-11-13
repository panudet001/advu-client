import { NgForOf, NgIf } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

import { Breadcrumb } from "@features/blog/components/breadcrumb/breadcrumb.types";

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
  @Input() breadcrumb: Array<Breadcrumb> = [];
  activeLang!: string;
  constructor() {}
  links(val: string) {
    this.link.emit(val);
  }
}
