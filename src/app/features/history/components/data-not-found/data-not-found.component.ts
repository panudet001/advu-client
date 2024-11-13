import { NgIf } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-data-not-found",
  standalone: true,
  imports: [NgIf],
  templateUrl: "./data-not-found.component.html",
  styleUrl: "./data-not-found.component.scss",
})
export class DataNotFoundComponent {
  @Input() isShowText = false;
  @Input() description: string | undefined;
}
