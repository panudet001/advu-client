import { NgClass, NgIf } from "@angular/common";
import { Component, Input } from "@angular/core";

import { DepositStepEnums } from "@features/deposit/component/step-deposit/deposit.enum";
import { IdentityEnums } from "@features/identity/identity.enums";

@Component({
  selector: "app-step-deposit",
  templateUrl: "./step-deposit.component.html",
  styleUrls: ["./step-deposit.component.scss"],
  standalone: true,
  imports: [NgClass, NgIf],
})
export class StepDepositComponent {
  @Input() depositStep!: DepositStepEnums;
  protected readonly depositStepEnums = DepositStepEnums;
  protected readonly DepositStepEnums = DepositStepEnums;
  protected readonly IdentityEnums = IdentityEnums;
}
