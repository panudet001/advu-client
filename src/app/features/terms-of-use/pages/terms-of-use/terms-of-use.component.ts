import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";

import { TermsOfUseService } from "@app/shared/services/terms-of-use/terms-of-use.service";
import { TermsOfUse } from "@app/shared/services/terms-of-use/terms-of-use.type";

import { TranslateModule } from "@ngx-translate/core";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-terms-of-use",
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: "./terms-of-use.component.html",
  styleUrl: "./terms-of-use.component.scss",
})
export class TermsOfUseComponent implements OnInit {
  private _unsubscribeAll = new Subject();
  termsOfUse?: TermsOfUse;

  constructor(
    private _termsOfUseService: TermsOfUseService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._termsOfUseService.termsOfUse$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(value => {
        this.termsOfUse = value;
        this._changeDetectorRef.markForCheck();
      });
  }
}
