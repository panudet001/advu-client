import { DatePipe, NgClass, NgIf } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { FaqsCategoryDetail } from "@app/shared/services/faqs/faqs.types";

import { IdentityEnums } from "@features/identity/identity.enums";

import { UserStatusEnums } from "@shared/services/user/user.enums";
import { Kyc } from "@shared/services/user/user.types";

import { LocalizeRouterPipe } from "@gilsdav/ngx-translate-router";

@Component({
  selector: "app-start-identity",
  templateUrl: "./start-identity.component.html",
  styleUrls: ["./start-identity.component.scss"],
  standalone: true,
  imports: [DatePipe, LocalizeRouterPipe, NgClass, NgIf, ReactiveFormsModule],
})
export class StartIdentityComponent {
  @Input() kyc?: Kyc;
  @Input() isKyc?: boolean;
  @Input() faqs?: FaqsCategoryDetail[];
  @Output() nextStep = new EventEmitter<IdentityEnums>();

  handleNextStep(): void {
    this.nextStep.emit(IdentityEnums.identityVerification);
  }

  protected readonly UserStatusEnums = UserStatusEnums;
}
