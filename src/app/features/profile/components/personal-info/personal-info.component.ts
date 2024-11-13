import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

import { User } from "@app/shared/services/user/user.types";

import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-personal-info",
  templateUrl: "./personal-info.component.html",
  styleUrls: ["./personal-info.component.scss"],
  standalone: true,
  imports: [CommonModule, TranslateModule],
})
export class PersonalInfoComponent {
  @Input() user!: User;

  @Output() openDialog = new EventEmitter();
}
