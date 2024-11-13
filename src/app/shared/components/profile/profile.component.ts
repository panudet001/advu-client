import { DatePipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { UserV2 } from "@shared/services/user/user.types";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DatePipe],
})
export class ProfilesComponent {
  @Input() user!: UserV2;
}
