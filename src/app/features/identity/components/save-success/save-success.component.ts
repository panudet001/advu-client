import { NgIf } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: "app-save-success",
  templateUrl: "./save-success.component.html",
  styleUrls: ["./save-success.component.scss"],
  standalone: true,
  imports: [NgIf],
})
export class SaveSuccessComponent {}
