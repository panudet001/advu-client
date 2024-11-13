import { NgClass, NgIf } from "@angular/common";
import { Component, Input } from "@angular/core";

import { IdentityEnums } from "@features/identity/identity.enums";

@Component({
  selector: "app-step-form",
  templateUrl: "./step-form.component.html",
  styleUrls: ["./step-form.component.scss"],
  standalone: true,
  imports: [NgClass, NgIf],
})
export class StepFormComponent {
  @Input() identityStep!: IdentityEnums;
  protected readonly IdentityEnums = IdentityEnums;
}
