import { Component } from "@angular/core";

import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-work-step",
  standalone: true,
  imports: [TranslateModule],
  templateUrl: "./work-step.component.html",
  styleUrl: "./work-step.component.scss",
})
export class WorkStepComponent {}
