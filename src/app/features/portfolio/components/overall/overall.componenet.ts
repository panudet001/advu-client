import { Component, Input } from "@angular/core";

import { AddCommaPipe } from "@shared/pipes/add-comma.pipe";

@Component({
  selector: "app-overall",
  templateUrl: "./overall.component.html",
  styleUrls: ["./overall.component.scss"],
  standalone: true,
  imports: [AddCommaPipe],
})
export class OverallComponent {
  @Input() title!: string;
  @Input() total!: number;
}
