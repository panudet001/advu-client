import { NgClass, NgIf } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "@core/auth.service";

import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import {
  faArrowDown,
  faArrowRightFromBracket,
  faCertificate,
  faClockRotateLeft,
  faUser,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { LocalizeRouterPipe } from "@gilsdav/ngx-translate-router";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
  standalone: true,
  imports: [
    FaIconComponent,
    LocalizeRouterPipe,
    NgClass,
    NgIf,
    TranslateModule,
  ],
})
export class SidebarComponent implements OnInit {
  @Input() isKyc?: boolean;
  faWallet = faWallet;
  faArrowDown = faArrowDown;
  faUser = faUser;
  faCertificate = faCertificate;
  faClockRotateLeft = faClockRotateLeft;
  faArrowRightFromBracket = faArrowRightFromBracket;
  menu? = "";
  menuHistory? = "";
  isExpandPortfolio = false;
  isExpandHistory = false;

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.menu = this._router.url.split("/")[1];
    this.menuHistory = `${this._router.url.split("/")[1]}/${this._router.url.split("/")[2]}`;
  }

  signOut(): void {
    this._authService.signOut();
    location.reload();
  }
  handleExpandPortfolio(): void {
    this.isExpandPortfolio = !this.isExpandPortfolio;
  }
  handleExpandHistory(): void {
    this.isExpandHistory = !this.isExpandHistory;
  }
}
