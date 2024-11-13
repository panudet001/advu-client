import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { LocalizeRouterPipe } from "@gilsdav/ngx-translate-router";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-hero",
  templateUrl: "./hero.component.html",
  styleUrls: ["./hero.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [LocalizeRouterPipe, TranslateModule],
})
export class HeroComponent {
  @Input() title!: string;
  @Input() detail!: string;
}
