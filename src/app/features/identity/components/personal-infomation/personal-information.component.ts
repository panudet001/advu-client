import { NgClass, NgIf } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

import {
  ResidentialAddressComponent,
  ResidentialAddressInterface,
} from "@features/identity/components/residential-address/residential-address.component";
import { IdentityEnums } from "@features/identity/identity.enums";

export interface PersonalInterface {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zip: string;
  country: string;
}

enum PersonalInformationEnums {
  personal,
  address,
}

@Component({
  selector: "app-personal-information",
  templateUrl: "./personal-information.component.html",
  styleUrls: ["./personal-information.component.scss"],
  standalone: true,
  imports: [NgClass, NgIf, ReactiveFormsModule, ResidentialAddressComponent],
})
export class PersonalInformationComponent implements OnInit {
  @Output() nextStep = new EventEmitter<PersonalInterface>();
  @Output() backStep = new EventEmitter<IdentityEnums>();
  @Input() formDataIdentity!: FormGroup;

  personalInForm!: FormGroup;
  isInvalidForm = true;
  personalStep: PersonalInformationEnums = PersonalInformationEnums.personal;
  protected readonly PersonalInformationEnums = PersonalInformationEnums;

  constructor(private _formBuilder: FormBuilder) {}

  get fFirstName() {
    return this.personalInForm?.get("firstName");
  }

  get fLastname() {
    return this.personalInForm?.get("lastName");
  }

  ngOnInit(): void {
    this.initialForm();
    if (!this.personalInForm.invalid) this.isInvalidForm = false;

    this.personalInForm.valueChanges.subscribe(() => {
      this.isInvalidForm = !(
        !this.fFirstName?.invalid &&
        !this.fLastname?.invalid &&
        !this.personalInForm.invalid
      );
    });
  }

  initialForm(): void {
    this.personalInForm = this._formBuilder.group({
      firstName: [
        this.formDataIdentity.get("firstName")?.value,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      lastName: [
        this.formDataIdentity.get("lastName")?.value,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  moveStepAddress(): void {
    this.personalStep = PersonalInformationEnums.address;
  }

  moveStepPersonal(): void {
    this.personalStep = PersonalInformationEnums.personal;
  }

  next(residentialAddressInterface: ResidentialAddressInterface): void {
    const data = {
      firstName: this.personalInForm.get("firstName")?.value,
      lastName: this.personalInForm.get("lastName")?.value,
      address: residentialAddressInterface.address,
      city: residentialAddressInterface.city,
      zip: residentialAddressInterface.zip,
      country: residentialAddressInterface.country,
    } as PersonalInterface;
    this.nextStep.emit(data);
  }

  handleBack(): void {
    this.backStep.emit(IdentityEnums.identityVerification);
  }
}
