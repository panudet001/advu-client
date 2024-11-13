import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.scss"],
  standalone: true,
  imports: [FaIconComponent, MatIconModule, NgbPaginationModule],
})
export class PaginationComponent {
  @Input() total = 0;
  @Input() totalItems!: number;
  @Input() pageSize!: number;
  @Input() currentPage!: number;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  public onPageChange(page: number): void {
    this.pageChange.emit(page);
  }

  protected readonly faChevronLeft = faChevronLeft;
  protected readonly faChevronRight = faChevronRight;
}
