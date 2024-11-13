import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "@app/core/auth.service";

import { LocalizationService } from "@shared/services/localization/localization-service";

import { LocalizeRouterPipe } from "@gilsdav/ngx-translate-router";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-delete-account-success",
  standalone: true,
  imports: [LocalizeRouterPipe, TranslateModule],
  templateUrl: "./delete-account-success.component.html",
  styleUrl: "./delete-account-success.component.scss",
})
export class DeleteAccountSuccessComponent {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _localizeRouterService: LocalizationService
  ) {}

  logout() {
    this._router
      .navigate([this._localizeRouterService.translateRoute("sign-in")])
      .then(() => {
        this._authService.signOut();
      });
  }
}
