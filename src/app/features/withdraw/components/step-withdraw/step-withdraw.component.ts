import { NgClass, NgIf } from "@angular/common";
import { Component, Input } from "@angular/core";

import { WithdrawStepEnums } from "@features/withdraw/components/step-withdraw/withdraw.enum";

@Component({
  selector: "app-step-withdraw",
  templateUrl: "./step-withdraw.component.html",
  styleUrls: ["./step-withdraw.component.scss"],
  standalone: true,
  imports: [NgClass, NgIf],
})
export class StepWithdrawComponent {
  @Input() withdrawStep!: WithdrawStepEnums;
  protected readonly WithdrawStepEnums = WithdrawStepEnums;
}
