import { Component, EventEmitter, Input, Output, inject } from "@angular/core";

import { AddCommaPipe } from "@shared/pipes/add-comma.pipe";
import { FileService } from "@shared/services/file/file.service";
import { WalletAddresses, Wallets } from "@shared/services/user/user.types";

import { ClipboardModule } from "ngx-clipboard";

@Component({
  selector: "app-my-wallet",
  templateUrl: "./wallet.component.html",
  styleUrls: ["./wallet.component.scss"],
  standalone: true,
  imports: [AddCommaPipe, ClipboardModule],
})
export class MyWalletComponent {
  @Input() wallet!: Wallets;
  @Input() walletAddress?: WalletAddresses | null;
  @Output() emitCopy: EventEmitter<boolean> = new EventEmitter<boolean>();

  readonly fileService = inject(FileService);

  handleCopy(e: { isSuccess: boolean }): void {
    if (e.isSuccess) {
      this.emitCopy.emit(true);
    }
  }
}
