import { NgClass, NgIf } from "@angular/common";
import { Component, Input } from "@angular/core";

import { StepConfirmEnums } from "@features/withdraw/components/step-confirm/step-confirm-enum";

@Component({
  selector: "app-step-confirm",
  templateUrl: "./step-confirm.component.html",
  styleUrls: ["./step-confirm.component.scss"],
  standalone: true,
  imports: [NgClass, NgIf],
})
export class StepConfirmComponent {
  @Input() stepConfirm!: StepConfirmEnums;
  protected readonly StepConfirmEnums = StepConfirmEnums;
}
