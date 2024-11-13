import { NgForOf, NgIf } from "@angular/common";
import { Component, Input } from "@angular/core";

import { AddCommaPipe } from "@shared/pipes/add-comma.pipe";
import { GalleryService } from "@shared/services/gallery/gallery.service";
import { Managements } from "@shared/services/investment-v2/investment.types";

@Component({
  selector: "app-tab-management",
  templateUrl: "./tab-management.component.html",
  styleUrls: ["./tab-management.component.scss"],
  standalone: true,
  imports: [AddCommaPipe, NgForOf, NgIf],
})
export class TabManagementComponent {
  @Input() managements!: Managements[];
  constructor(private _galleryService: GalleryService) {}

  getImage(fileName: string) {
    return this._galleryService.getImageUrl(fileName);
  }
}
