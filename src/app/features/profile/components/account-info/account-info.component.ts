import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

import { User } from "@app/shared/services/user/user.types";

import { ProfileStoreService } from "@features/profile/profile-store.service";

import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-account-info",
  templateUrl: "./account-info.component.html",
  styleUrls: ["./account-info.component.scss"],
  standalone: true,
  imports: [CommonModule, TranslateModule],
})
export class AccountInfoComponent {
  isDisable = false;
  @Input() user!: User;

  @Output() sendOtpChangePassword = new EventEmitter();

  @Output() sendOtpOldEmail = new EventEmitter();

  constructor(private _profileStoreService: ProfileStoreService) {
    this._profileStoreService.disableOpenDialog$.subscribe(value => {
      this.isDisable = value;
    });
  }
}
