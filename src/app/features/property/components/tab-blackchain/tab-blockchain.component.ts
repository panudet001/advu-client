import { Component, EventEmitter, Input, Output } from "@angular/core";

import { AddCommaPipe } from "@shared/pipes/add-comma.pipe";
import { GalleryService } from "@shared/services/gallery/gallery.service";
import { ContractAddress } from "@shared/services/investment-v2/investment.types";

import { ClipboardModule, IClipboardResponse } from "ngx-clipboard";

@Component({
  selector: "app-tab-blockchain",
  templateUrl: "./tab-blockchain.component.html",
  styleUrls: ["./tab-blockchain.component.scss"],
  standalone: true,
  imports: [AddCommaPipe, ClipboardModule],
})
export class TabBlockchainComponent {
  @Input()
  investmentContractAddress!: ContractAddress;
  @Output() emitCopy: EventEmitter<IClipboardResponse> =
    new EventEmitter<IClipboardResponse>();

  constructor(private _galleryService: GalleryService) {}

  getImage(fileName: string) {
    return this._galleryService.getImagUrlV2(fileName);
  }

  handleCopy(event: IClipboardResponse): void {
    this.emitCopy.emit(event);
  }
}
