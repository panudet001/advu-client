import { NgClass, NgIf } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { Router } from "@angular/router";

import { AuthService } from "@core/auth.service";

import { LocalizeRouterPipe } from "@gilsdav/ngx-translate-router";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-auth-menu",
  templateUrl: "./auth-menu.component.html",
  styleUrls: ["./auth-menu.component.scss"],
  standalone: true,
  imports: [LocalizeRouterPipe, MatIconModule, NgClass, NgIf, TranslateModule],
})
export class AuthMenuComponent implements OnInit {
  @Input() menu?: string;
  url = "/overview";
  isShow = false;
  menuAction!: string;
  icon!: string;

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.url = this._router.url;
    if (this.url === "/overview" || this.url === "/th/overview") {
      this.menuAction = "Overview";
      this.icon = "assets/img/icon/dashboard.svg";
    }
    if (this.url === "/profile" || this.url === "/th/profile") {
      this.menuAction = "Profile";
      this.icon = "assets/img/icon/user.svg";
    }
    if (
      this.url === "/identity-verification" ||
      this.url === "/th/identity-verification"
    ) {
      this.menuAction = "Identity Verification";
      this.icon = "assets/img/icon/admin_panel_settings.svg";
    }
    if (this.url === "/portfolio" || this.url === "/th/portfolio") {
      this.menuAction = "My Investments";
      this.icon = "assets/img/icon/list.svg";
    }
    if (this.url === "/transactions" || this.url === "/th/transactions") {
      this.menuAction = "Transaction";
      this.icon = "assets/img/icon/transaction.svg";
    }
    if (this.url === "/wallet" || this.url === "/th/wallet") {
      this.menuAction = "Wallet";
      this.icon = "assets/img/icon/wallet.svg";
    }
  }

  showMenu() {
    this.isShow = !this.isShow;
  }

  signOut(): void {
    this._authService.signOut();
    location.reload();
  }
}
