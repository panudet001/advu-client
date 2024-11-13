import { CommonModule, NgClass, NgIf } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

import { HandleResponse } from "@features/home/components/contact-us/contact-us.types";

import { ContactUs } from "@shared/services/contact-us/contact.type";

import { TranslateModule } from "@ngx-translate/core";
import { RecaptchaModule } from "ng-recaptcha";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-contact-us",
  templateUrl: "./contact-us.component.html",
  standalone: true,
  imports: [
    CommonModule,
    NgClass,
    NgIf,
    ReactiveFormsModule,
    RecaptchaModule,
    TranslateModule,
  ],
  styleUrls: ["./contact-us.component.scss"],
})
export class ContactUsComponent implements OnInit, OnChanges {
  @Output() clickSubmit = new EventEmitter<ContactUs>();
  @Input() handleResponse?: HandleResponse;
  isLoading = false;
  contactForm!: FormGroup;
  isShowAlertError = false;
  alertError = "";
  contactUsRequest!: ContactUs;

  constructor(
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["handleResponse"] && !changes["handleResponse"]?.firstChange) {
      if (changes["handleResponse"].currentValue.type == "success") {
        this.contactForm.reset();
        this.contactForm.enable();
        this.isShowAlertError = false;
        this._toastrService.success(
          "สำเร็จ",
          changes["handleResponse"].currentValue.value
        );
      }

      if (changes["handleResponse"].currentValue.type == "error") {
        this.contactForm.enable();
        this.isShowAlertError = true;
        this.alertError = changes["handleResponse"].currentValue.value;
      }
    }
  }

  get fName() {
    return this.contactForm?.get("name");
  }

  get fEmail() {
    return this.contactForm?.get("email");
  }

  get fDetail() {
    return this.contactForm?.get("detail");
  }

  initForm() {
    this.contactForm = this._formBuilder.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      detail: ["", [Validators.required]],
    });
  }

  submitForm() {
    this.isLoading = true;
    if (this.contactForm.invalid) {
      for (const control of Object.keys(this.contactForm.controls)) {
        this.contactForm.controls[control]?.markAsTouched();
      }
      this.isLoading = false;
      return;
    }

    this.contactUsRequest = {
      name: this.fName?.value,
      email: this.fEmail?.value,
      detail: this.fDetail?.value,
    };

    // this.contactForm.disable();
    this.clickSubmit.emit(this.contactUsRequest);
  }
}
