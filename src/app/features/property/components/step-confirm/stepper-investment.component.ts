import { NgClass, NgIf } from "@angular/common";
import { Component, Input } from "@angular/core";

import { StepperInvestmentEnums } from "@features/property/components/step-confirm/stepper-investment-enum";

@Component({
  selector: "app-step-confirm",
  templateUrl: "./stepper-investment.component.html",
  styleUrls: ["./stepper-investment.component.scss"],
  standalone: true,
  imports: [NgClass, NgIf],
})
export class StepperInvestmentComponent {
  @Input() stepSelect!: StepperInvestmentEnums;
  protected readonly StepperInvestmentEnums = StepperInvestmentEnums;
}
