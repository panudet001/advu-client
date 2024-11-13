import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";

import { CookiePolicyService } from "@app/shared/services/cookie-policy/cookie-policy.service";
import { CookiePolicy } from "@app/shared/services/cookie-policy/cookie-policy.types";

import { TranslateModule } from "@ngx-translate/core";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-cookie-policy",
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: "./cookie-policy.component.html",
  styleUrls: ["./cookie-policy.component.scss"],
})
export class CookiePolicyComponent implements OnInit {
  private _unsubscribeAll = new Subject();
  cookiePolicy!: CookiePolicy;

  constructor(
    private _cookiePolicyService: CookiePolicyService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._cookiePolicyService.cookiePolicy$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(value => {
        this.cookiePolicy = value;
        this._changeDetectorRef.markForCheck();
      });
  }
}
