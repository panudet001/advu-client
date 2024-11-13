import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";

import { ErrorConstants } from "@app/shared/constants/error.constants";
import { TransformErrorCodePipe } from "@app/shared/pipes/transform-error-code.pipe";
import { TransformToastPipe } from "@app/shared/pipes/transform-toast.pipe";
import { ContactUsService } from "@app/shared/services/contact-us/contact.service";
import { ContactUs } from "@app/shared/services/contact-us/contact.type";

import { environment } from "@environments/environment";

import { TranslateModule } from "@ngx-translate/core";
import { RecaptchaComponent, RecaptchaModule } from "ng-recaptcha";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-contact-us",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecaptchaModule,
    TranslateModule,
  ],
  templateUrl: "./contact-us.component.html",
  styleUrl: "./contact-us.component.scss",
})
export class ContactUsComponent implements OnInit {
  isSubmit = false;
  contactForm!: FormGroup;
  captchaResponse = "";
  keyReCaptcha: string = environment.captchaKey;
  showErrorAlert!: boolean;
  errorMessage!: string;
  contactUs!: ContactUs;
  mapUrl!: object;
  @ViewChild(RecaptchaComponent) recaptcha?: RecaptchaComponent;

  constructor(
    private _formBuilder: FormBuilder,
    private _transformErrorCodePipe: TransformErrorCodePipe,
    private _contactUsService: ContactUsService,
    private _toastr: ToastrService,
    private _transformToastPipe: TransformToastPipe,
    public _sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.mapUrl = this._sanitizer.bypassSecurityTrustResourceUrl(
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.6471962700425!2d98.3384076779718!3d7.8271141942422595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30502fe26dbdb50b%3A0x251c2ec59f91c504!2sBlockchain%20Technology%20Center%20(BTC)%20Phuket!5e0!3m2!1sth!2sth!4v1724687118409!5m2!1sth!2sth"
    );
  }

  get name() {
    return this.contactForm?.get("name");
  }

  get email() {
    return this.contactForm?.get("email");
  }

  get detail() {
    return this.contactForm?.get("detail");
  }

  initForm() {
    this.contactForm = this._formBuilder.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      detail: ["", [Validators.required]],
    });
  }

  submit() {
    this.isSubmit = true;
    if (this.contactForm.invalid) {
      for (const control of Object.keys(this.contactForm.controls)) {
        this.contactForm.controls[control]?.markAsTouched();
      }
      this.isSubmit = false;
      return;
    }
    if (this.captchaResponse) {
      this.contactUs = {
        name: this.name?.value,
        email: this.email?.value,
        detail: this.detail?.value,
      };
      this._contactUsService.contactUs(this.contactUs).subscribe({
        next: () => {
          this._toastr.success("Save success");
          this.showErrorAlert = false;
          this.contactForm.reset();
          if (this.recaptcha) {
            this.recaptcha.reset();
          }
        },
        error: err => {
          const alert = this._transformToastPipe.transform(err.error.title);
          this._toastr.error(alert);
          this.isSubmit = false;
        },
      });
    } else {
      this.showErrorAlert = true;
      this.errorMessage = this._transformErrorCodePipe.transform(
        ErrorConstants.reCaptcha
      );
    }
    this.isSubmit = false;
  }

  onResolved(captchaResponse: string) {
    this.captchaResponse = captchaResponse;
  }
}
