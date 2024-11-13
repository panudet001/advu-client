import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

import { LocalizeRouterPipe } from "@gilsdav/ngx-translate-router";
import { TranslateModule } from "@ngx-translate/core";

import { EnsureComponent } from "../../components/ensure/ensure.component";
import { VideoWorkStepComponent } from "../../components/video-work-step/video-work-step.component";
import { WorkStepComponent } from "../../components/work-step/work-step.component";

@Component({
  selector: "app-how-to-use",
  standalone: true,
  imports: [
    CommonModule,
    EnsureComponent,
    LocalizeRouterPipe,
    TranslateModule,
    VideoWorkStepComponent,
    WorkStepComponent,
  ],
  templateUrl: "./how-to-use.component.html",
  styleUrl: "./how-to-use.component.scss",
})
export class HowToUseComponent {}
