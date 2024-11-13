import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";

import { ProfileStoreService } from "@features/profile/profile-store.service";

import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-dialog-delete-account",
  templateUrl: "./dialog-delete-account.component.html",
  styleUrl: "./dialog-delete-account.component.scss",
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class DialogDeleteAccountComponent implements OnInit {
  isSubmit = false;
  isShowPassword = false;
  password = new FormControl("", [Validators.required]);
  consent = new FormControl(false, [Validators.required]);
  err = "";
  isDisable = false;

  @Output() save = new EventEmitter<string>();

  constructor(private _profileStoreService: ProfileStoreService) {}

  ngOnInit(): void {
    this._profileStoreService.err$.subscribe(err => {
      this.err = err;
    });
    this._profileStoreService.disableSubmit$.subscribe(result => {
      this.isDisable = result;
    });
  }

  togglePassword() {
    this.isShowPassword = !this.isShowPassword;
  }

  confirm() {
    this.isSubmit = true;
    if (this.password.invalid || !this.consent.value) {
      this.password.markAsTouched();
      this.consent.markAsTouched();
      return;
    }

    this.isDisable = true;
    this.save.emit(this.password.value!);
  }
}
