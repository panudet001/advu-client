import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";

import { ChangePasswordRequest } from "@app/shared/services/user/user.types";
import { passwordWithUpperLower8CharAndSpecialValidator } from "@app/shared/utils/validator";

import { ProfileStoreService } from "@features/profile/profile-store.service";

import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-dialog-confirm-new-password",
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: "./dialog-confirm-new-password.component.html",
  styleUrl: "./dialog-confirm-new-password.component.scss",
})
export class DialogConfirmNewPasswordComponent implements OnInit {
  isShowNewPassword = false;

  isShowConfirmPassword = false;

  isNotMatch = false;

  err = "";

  isDisable = false;

  form!: FormGroup;

  @Output() save = new EventEmitter<ChangePasswordRequest>();

  constructor(
    private _profileStoreService: ProfileStoreService,
    private _formBuilder: FormBuilder
  ) {}

  get newPassword() {
    return this.form?.get("newPassword");
  }

  get confirmPassword() {
    return this.form?.get("confirmPassword");
  }
  ngOnInit(): void {
    this.initForm();
    this.confirmPassword?.valueChanges.subscribe(() => {
      this.isNotMatch = false;
    });
    this._profileStoreService.err$.subscribe(result => {
      this.err = result;
    });

    this._profileStoreService.disableSubmit$.subscribe(result => {
      this.isDisable = result;
    });
  }

  initForm() {
    this.form = this._formBuilder.group({
      newPassword: [
        "",
        [Validators.required, passwordWithUpperLower8CharAndSpecialValidator],
      ],
      confirmPassword: [
        "",
        [Validators.required, passwordWithUpperLower8CharAndSpecialValidator],
      ],
    });
  }

  toggleNewPassword() {
    this.isShowNewPassword = !this.isShowNewPassword;
  }

  toggleConfirmPassword() {
    this.isShowConfirmPassword = !this.isShowConfirmPassword;
  }

  change() {
    if (this.newPassword?.invalid || this.confirmPassword?.invalid) {
      this.newPassword?.markAllAsTouched();
      this.confirmPassword?.markAllAsTouched();
      return;
    } else if (this.newPassword?.value !== this.confirmPassword?.value) {
      this.isNotMatch = true;
      return;
    }
    this.isNotMatch = false;
    const changePasswordRequest = {
      password: this.newPassword?.value,
    } as ChangePasswordRequest;
    this.isDisable = true;
    this.save.emit(changePasswordRequest);
  }
}
