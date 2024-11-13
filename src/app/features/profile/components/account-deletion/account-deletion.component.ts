import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";

import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-account-deletion",
  templateUrl: "./account-deletion.component.html",
  styleUrl: "./account-deletion.component.scss",
  standalone: true,
  imports: [CommonModule, TranslateModule],
})
export class AccountDeletionComponent {
  @Output() openDialog = new EventEmitter();
}
