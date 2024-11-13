import { NgClass, NgIf, NgOptimizedImage } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

export interface ResidentialAddressInterface {
  address: string;
  city: string;
  zip: string;
  country: string;
}

enum ResidentialInformationEnums {
  address,
  example,
}

@Component({
  selector: "app-residential-address",
  templateUrl: "./residential-address.component.html",
  styleUrls: ["./residential-address.component.scss"],
  standalone: true,
  imports: [NgClass, NgIf, NgOptimizedImage, ReactiveFormsModule],
})
export class ResidentialAddressComponent implements OnInit {
  @Output() nextStep = new EventEmitter<ResidentialAddressInterface>();
  @Output() backStep = new EventEmitter();
  @Input() formDataIdentity!: FormGroup;
  protected readonly ResidentialInformationEnums = ResidentialInformationEnums;

  residentialStep: ResidentialInformationEnums =
    ResidentialInformationEnums.address;
  residentialInForm!: FormGroup;
  isInvalidForm = true;

  constructor(private _formBuilder: FormBuilder) {}

  get fAddress() {
    return this.residentialInForm?.get("address");
  }

  get fCity() {
    return this.residentialInForm?.get("city");
  }

  get fZip() {
    return this.residentialInForm?.get("zip");
  }

  ngOnInit(): void {
    this.initialForm();
    this.residentialInForm.valueChanges.subscribe(() => {
      this.isInvalidForm = !(
        !this.fAddress?.invalid &&
        !this.fCity?.invalid &&
        !this.fZip?.invalid &&
        !this.residentialInForm.invalid
      );
    });
  }

  initialForm(): void {
    this.residentialInForm = this._formBuilder.group({
      address: [
        this.formDataIdentity.get("address")?.value,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      city: [
        this.formDataIdentity.get("city")?.value,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      zip: [
        this.formDataIdentity.get("zip")?.value,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      country: [this.formDataIdentity.get("country")?.value],
    });
    if (!this.formDataIdentity.invalid) {
      this.isInvalidForm = false;
    }
  }

  handleNext(): void {
    const data = {
      address: this.residentialInForm.get("address")?.value,
      city: this.residentialInForm.get("city")?.value,
      zip: this.residentialInForm.get("zip")?.value,
      country: this.residentialInForm.get("country")?.value,
    } as ResidentialAddressInterface;
    this.nextStep.emit(data);
  }

  handleBack() {
    this.backStep.emit();
  }
}
