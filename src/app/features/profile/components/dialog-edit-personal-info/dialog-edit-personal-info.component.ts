import { CommonModule } from "@angular/common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";

import { UpdateUserRequest, User } from "@app/shared/services/user/user.types";
import {
  charAndDashesValidator,
  mobileNumberTenDigitsValidator,
  validateDateOverCurrentDate,
} from "@app/shared/utils/validator";

import { ProfileStoreService } from "@features/profile/profile-store.service";

import countryCodes from "@assets/country-codes.json";

import { TranslateModule } from "@ngx-translate/core";

export interface CountryCode {
  name: string;
  dialCode: string;
  code: string;
  img: string;
}

@Component({
  selector: "app-dialog-edit-personal-info",
  templateUrl: "./dialog-edit-personal-info.component.html",
  styleUrl: "./dialog-edit-personal-info.component.scss",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class DialogEditPersonalInfoComponent implements OnInit {
  form!: FormGroup;
  countryCodes!: CountryCode[];
  countryCode = "66";
  code = "TH";
  img = "/assets/img/icon/flags/TH.svg";
  err = "";
  isDisable = false;
  @Output() save = new EventEmitter<UpdateUserRequest>();

  constructor(
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public user: User,
    private _profileStoreService: ProfileStoreService
  ) {}

  ngOnInit(): void {
    this.countryCodes = countryCodes;
    this.initForm();
    this._profileStoreService.err$.subscribe(err => {
      this.err = err;
    });
    this._profileStoreService.disableSubmit$.subscribe(result => {
      this.isDisable = result;
    });
  }

  get firstname() {
    return this.form?.get("firstname");
  }

  get lastname() {
    return this.form?.get("lastname");
  }

  get mobile() {
    return this.form?.get("mobile");
  }

  get date() {
    return this.form?.get("date");
  }

  get address() {
    return this.form?.get("address");
  }

  initForm() {
    this.form = this._formBuilder.group({
      firstname: [
        this.user.firstname,
        [Validators.required, charAndDashesValidator],
      ],
      lastname: [
        this.user.lastname,
        [Validators.required, charAndDashesValidator],
      ],
      countryCode: ["66", [Validators.required]],
      mobile: [
        this.user.mobile,
        [Validators.required, mobileNumberTenDigitsValidator],
      ],
      date: [
        this.user.dateOfBirth,
        [Validators.required, validateDateOverCurrentDate],
      ],
      address: [this.user.address, [Validators.required]],
    });
  }

  selectCode(code: string, dialCode: string, img: string) {
    this.code = code;
    this.countryCode = dialCode;
    this.img = img;
  }

  submit() {
    if (this.form.invalid) {
      for (const control of Object.keys(this.form.controls)) {
        this.form.controls[control]?.markAsTouched();
      }
      return;
    }

    const updateUserRequest = {
      firstName: this.firstname?.value,
      lastName: this.lastname?.value,
      countryCode: "66",
      mobile: this.mobile?.value,
      dateOfBirth: this.date?.value,
      address: this.address?.value,
    } as UpdateUserRequest;

    this.isDisable = true;
    this.save.emit(updateUserRequest);
  }
}
