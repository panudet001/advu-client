import { NgIf } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-confirm-img",
  templateUrl: "./confirm-img.component.html",
  styleUrls: ["./confirm-img.component.scss"],
  standalone: true,
  imports: [NgIf],
})
export class ConfirmImgComponent {
  @Input() imgPath!: string | null;
  @Input() title?: string;
  @Output() isContinue = new EventEmitter<boolean>();

  handleDelete(): void {
    this.isContinue.emit(false);
  }

  handleContinue(): void {
    this.isContinue.emit(true);
  }
}
