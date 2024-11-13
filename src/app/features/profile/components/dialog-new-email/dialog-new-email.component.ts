import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Inject, Output } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";

import { User } from "@app/shared/services/user/user.types";

import { ProfileStoreService } from "@features/profile/profile-store.service";

import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-dialog-new-email",
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: "./dialog-new-email.component.html",
  styleUrl: "./dialog-new-email.component.scss",
})
export class DialogNewEmailComponent {
  email = new FormControl("", [Validators.required, Validators.email]);
  isDisable = false;

  @Output() save = new EventEmitter<string>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,
    private _profileStoreService: ProfileStoreService
  ) {
    this._profileStoreService.disableOpenDialog$.subscribe(value => {
      this.isDisable = value;
    });
  }

  confirm() {
    if (this.email.invalid) {
      this.email.markAsTouched();
      return;
    }
    this.save.emit(this.email.value!);
  }
}
