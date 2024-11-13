import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "@core/auth.service";

@Component({
  selector: "app-logout",
  standalone: true,
  template: "",
})
export class LogoutComponent {
  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {
    this._authService.signOut();
    this._router.navigate(["/sign-in"]);
  }
}
