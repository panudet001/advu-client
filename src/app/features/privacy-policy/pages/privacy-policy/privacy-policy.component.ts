import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";

import { PrivacyPolicyService } from "@app/shared/services/privacy-policy/privacy-policy.service";
import { PrivacyPolicy } from "@app/shared/services/privacy-policy/privacy-policy.type";

import { TranslateModule } from "@ngx-translate/core";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-privacy-policy",
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: "./privacy-policy.component.html",
  styleUrl: "./privacy-policy.component.scss",
})
export class PrivacyPolicyComponent implements OnInit {
  private _unsubscribeAll = new Subject();
  privacyPolicy!: PrivacyPolicy;

  constructor(
    private _privacyPolicyService: PrivacyPolicyService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._privacyPolicyService.privacy$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(value => {
        this.privacyPolicy = value;
        this._changeDetectorRef.markForCheck();
      });
  }
}
