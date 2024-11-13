import { NgClass, NgForOf, NgIf } from "@angular/common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";

import { IdentityEnums } from "@features/identity/identity.enums";

import countryCodeJson from "@assets/nationalities.json";

export interface IdentityInterface {
  nationality: string;
  type: number;
}

export interface NationalityInterface {
  name: string;
  dialCode: string;
  code: string;
  img: string;
}

@Component({
  selector: "app-identity-verification",
  templateUrl: "./identity-verification.component.html",
  styleUrls: ["./identity-verification.component.scss"],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    MatFormField,
    MatSelectModule,
    NgClass,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
  ],
})
export class IdentityVerificationComponent implements OnInit {
  @Output() nextStep = new EventEmitter<IdentityInterface>();
  @Output() backStep = new EventEmitter<IdentityEnums>();
  @Input() formDataIdentity!: FormGroup;
  identityInForm!: FormGroup;

  isInvalidFrom = true;
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  nationalities?: any;
  nameNationality!: string;
  imageNationality!: string;

  constructor(private _formBuilder: FormBuilder) {}

  get fNationality() {
    return this.identityInForm?.get("nationality");
  }

  get fType() {
    return this.identityInForm?.get("type");
  }

  ngOnInit(): void {
    this.nationalities = countryCodeJson;
    this.initialForm();
    if (!this.identityInForm.invalid) this.isInvalidFrom = false;

    this.identityInForm.valueChanges.subscribe(() => {
      this.isInvalidFrom = !(
        !this.fNationality?.invalid &&
        !this.fType?.invalid &&
        !this.identityInForm.invalid
      );
    });
  }

  initialForm(): void {
    this.identityInForm = this._formBuilder.group({
      nationality: [
        this.formDataIdentity.get("nationality")?.value,
        [Validators.required],
      ],
      type: [this.formDataIdentity.get("type")?.value, [Validators.required]],
    });

    if (this.formDataIdentity.get("nationality")?.value) {
      this.nameNationality = this.formDataIdentity.get("nationality")?.value;
    }
  }

  handleNext(): void {
    const identity = {
      nationality: this.identityInForm.get("nationality")?.value,
      type: this.identityInForm.get("type")?.value,
    } as IdentityInterface;
    this.nextStep.emit(identity);
  }

  handleBack(): void {
    this.backStep.emit(IdentityEnums.stepIdentity);
  }

  selectNationality(value: string) {
    this.nameNationality = value;
  }
}
