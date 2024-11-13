import { CommonModule, NgOptimizedImage } from "@angular/common";
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from "@angular/core";
import { Router, RouterLink } from "@angular/router";

import { User } from "@app/shared/services/user/user.types";

import { LoadingBarComponent } from "@layouts/components/loading-bar/loading-bar";

import { UserService } from "@shared/services/user/user.service";

import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import {
  LocalizeRouterPipe,
  LocalizeRouterService,
} from "@gilsdav/ngx-translate-router";
import { TranslateModule } from "@ngx-translate/core";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-header",
  standalone: true,
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
  imports: [
    CommonModule,
    FaIconComponent,
    LoadingBarComponent,
    LocalizeRouterPipe,
    NgOptimizedImage,
    RouterLink,
    TranslateModule,
  ],
})
export class HeaderComponent {
  private _unsubscribeAll = new Subject();
  isHomePage = true;
  isScrolled = false;
  currentPathWithoutLang: string = "/";
  currentLang: string = "";
  locales: string[] = [];
  user?: User;

  @ViewChild("header") headerElement!: ElementRef;
  @ViewChild("navbar") navbarElement!: ElementRef;
  // @ViewChild("lang") langElement!: ElementRef;
  @ViewChild("menu") menuElement!: ElementRef;

  constructor(
    private _router: Router,
    private _userService: UserService,
    private _localizeRouterService: LocalizeRouterService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    this.getPathWithoutLang();
    this.isHomePage = this.currentPathWithoutLang == "/";
    this._userService.user$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((user: User) => {
        this.user = user;
        this._changeDetectorRef.markForCheck();
      });

    this.currentLang = this._localizeRouterService.parser.currentLang;
    this.locales = this._localizeRouterService.parser.locales;
  }

  @HostListener("window:scroll", [])
  onWindowsScroll(): void {
    const scrollPosition =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    this.isScrolled = scrollPosition > 78;

    if (this.isHomePage)
      this.isScrolled ? this.activeNavWhite() : this.activeNavTransparent();
  }

  activeNavWhite(): void {
    this.headerElement.nativeElement?.classList.add("position-sticky");
    this.headerElement.nativeElement?.classList.remove("position-absolute");

    this.headerElement.nativeElement?.classList.add("bg-white");
    this.headerElement.nativeElement?.classList.remove("bg-transparent");

    this.headerElement.nativeElement?.classList.add("box-shadow");
    this.headerElement.nativeElement?.classList.remove("box-shadow-unset");

    this.navbarElement.nativeElement?.classList.add("color-white");
    this.navbarElement.nativeElement?.classList.remove("color-black");

    // this.langElement.nativeElement?.classList.add("color-black");
    // this.langElement.nativeElement?.classList.remove("color-white");

    this.menuElement.nativeElement?.classList.add("color-black");
    this.menuElement.nativeElement?.classList.remove("color-white");
  }

  activeNavTransparent(): void {
    this.headerElement.nativeElement?.classList.add("position-absolute");
    this.headerElement.nativeElement?.classList.remove("position-sticky");

    this.headerElement.nativeElement?.classList.add("bg-transparent");
    this.headerElement.nativeElement?.classList.remove("bg-white");

    this.headerElement.nativeElement?.classList.add("box-shadow-unset");
    this.headerElement.nativeElement?.classList.remove("box-shadow");

    this.navbarElement.nativeElement?.classList.add("color-black");
    this.navbarElement.nativeElement?.classList.remove("color-white");

    // this.langElement.nativeElement?.classList.add("color-white");
    // this.langElement.nativeElement?.classList.remove("color-black");

    this.menuElement.nativeElement?.classList.add("color-white");
    this.menuElement.nativeElement?.classList.remove("color-black");
  }

  getPathWithoutLang(): void {
    const currentUrl = this._router.url;
    const currentLangPath =
      this._localizeRouterService.parser.getLocationLang(currentUrl);

    this.currentPathWithoutLang = currentUrl.replace(`/${currentLangPath}`, "");

    if (this.currentPathWithoutLang.length == 0) {
      this.currentPathWithoutLang = "/";
    }
  }
}
