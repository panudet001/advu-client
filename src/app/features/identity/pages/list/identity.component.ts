import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";

import { FaqsService } from "@app/shared/services/faqs/faqs.service";

import { ConfirmImgComponent } from "@features/identity/components/confirm-img-model/confirm-img.component";
import {
  IdentityInterface,
  IdentityVerificationComponent,
} from "@features/identity/components/identity-verification/identity-verification.component";
import {
  PersonalInformationComponent,
  PersonalInterface,
} from "@features/identity/components/personal-infomation/personal-information.component";
import { SaveSuccessComponent } from "@features/identity/components/save-success/save-success.component";
import { StartIdentityComponent } from "@features/identity/components/start-identity/start-identity.component";
import { StepFormComponent } from "@features/identity/components/step-form/step-form.component";
import {
  FileIdInterface,
  UploadPhotoComponent,
} from "@features/identity/components/upload-photos/upload-photos.component";
import { IdentityEnums } from "@features/identity/identity.enums";

import { AuthMenuComponent } from "@shared/components/auth-menu/auth-menu.component";
import { ProfilesComponent } from "@shared/components/profile/profile.component";
import { SidebarComponent } from "@shared/components/sidebar/sidebar.component";
import { TransformToastPipe } from "@shared/pipes/transform-toast.pipe";
import { FaqsCategoryDetail } from "@shared/services/faqs/faqs.types";
import { UserStatusEnums } from "@shared/services/user/user.enums";
import { UserService } from "@shared/services/user/user.service";
import { User } from "@shared/services/user/user.types";

import { TranslateModule } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-identity",
  templateUrl: "./identity.component.html",
  styleUrls: ["./identity.component.scss"],
  standalone: true,
  imports: [
    AuthMenuComponent,
    CommonModule,
    ConfirmImgComponent,
    IdentityVerificationComponent,
    PersonalInformationComponent,
    ProfilesComponent,
    SaveSuccessComponent,
    SidebarComponent,
    StartIdentityComponent,
    StepFormComponent,
    TranslateModule,
    UploadPhotoComponent,
  ],
})
export class IdentityComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$: Subject<void> = new Subject();
  protected readonly IdentityEnums = IdentityEnums;

  user?: User;
  isKyc!: boolean;
  isProcessing = false;
  isLoading = true;
  formDataIdentity!: FormGroup;
  identityStep: IdentityEnums = IdentityEnums.stepIdentity;
  faqs?: FaqsCategoryDetail[];

  constructor(
    private _userService: UserService,
    private _formBuilder: FormBuilder,
    public _matDialog: MatDialog,
    private _toastrService: ToastrService,
    private _transformToastPipe: TransformToastPipe,
    private _faqsService: FaqsService
  ) {}

  ngOnInit(): void {
    this._userService.user$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => {
        this.user = value;
        this.isKyc = value.isKyc;
      });
    this._faqsService.faqCategoryDetail$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => {
        this.faqs = value;
      });
    this.initialForm();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initialForm(): void {
    this.formDataIdentity = this._formBuilder.group({
      nationality: [this.user?.kyc?.nationality],
      type: [this.user?.kyc?.type.toString()],
      firstName: [this.user?.kyc?.firstName],
      lastName: [this.user?.kyc?.lastName],
      address: [this.user?.kyc?.address],
      city: [this.user?.kyc?.city],
      zip: [this.user?.kyc?.zip],
      country: [this.user?.kyc?.country],
      fileFront: [this.user?.kyc?.fileFront],
      fileBack: [this.user?.kyc?.fileBack],
      fileTake: [this.user?.kyc?.fileTake],
    });
  }

  changeStepIdentity(identityStep: IdentityEnums): void {
    this.identityStep = identityStep;
    this.isProcessing = identityStep != IdentityEnums.stepIdentity;
  }

  setFormIdentity(data: IdentityInterface): void {
    this.formDataIdentity.get("nationality")?.setValue(data.nationality);
    this.formDataIdentity.get("type")?.setValue(data.type);
    this.changeStepIdentity(IdentityEnums.personalInformation);
  }

  setFormPersonal(data: PersonalInterface): void {
    this.formDataIdentity.get("firstName")?.setValue(data.firstName);
    this.formDataIdentity.get("lastName")?.setValue(data.lastName);
    this.formDataIdentity.get("zip")?.setValue(data.zip);
    this.formDataIdentity.get("city")?.setValue(data.city);
    this.formDataIdentity.get("address")?.setValue(data.address);
    this.formDataIdentity.get("country")?.setValue(data.country);
    this.changeStepIdentity(IdentityEnums.uploadPhoto);
  }

  onSubmit(data: FileIdInterface): void {
    this.isLoading = true;
    this.formDataIdentity.disable();
    this.formDataIdentity.get("fileFront")?.setValue(data.fileFront);
    this.formDataIdentity.get("fileBack")?.setValue(data.fileBack);
    this.formDataIdentity.get("fileTake")?.setValue(data.fileTake);

    const formData = new FormData();
    formData.append(
      "nationality",
      this.formDataIdentity.get("nationality")?.value ?? ""
    );
    formData.append("type", this.formDataIdentity.get("type")?.value ?? "");
    formData.append(
      "firstName",
      this.formDataIdentity.get("firstName")?.value ?? ""
    );
    formData.append(
      "lastName",
      this.formDataIdentity.get("lastName")?.value ?? ""
    );
    formData.append(
      "address",
      this.formDataIdentity.get("address")?.value ?? ""
    );
    formData.append("city", this.formDataIdentity.get("city")?.value ?? "");
    formData.append("zip", this.formDataIdentity.get("zip")?.value ?? "");
    formData.append(
      "country",
      this.formDataIdentity.get("country")?.value ?? ""
    );
    formData.append(
      "fileFront",
      this.formDataIdentity.get("fileFront")?.value ?? ""
    );
    formData.append(
      "fileBack",
      this.formDataIdentity.get("fileBack")?.value ?? ""
    );
    formData.append(
      "fileTake",
      this.formDataIdentity.get("fileTake")?.value ?? ""
    );

    if (this.user?.kyc?.status == UserStatusEnums.Reject) {
      formData.append("id", this.user?.kyc.id);
      this._userService.updateUserKyc(formData).then(
        () => this.handleSuccess(),
        error => this.handleError(error)
      );
    } else {
      this._userService.createUserKyc(formData).then(
        () => this.handleSuccess(),
        error => this.handleError(error)
      );
    }
  }

  handleSuccess() {
    this.isLoading = false;
    this.identityStep = IdentityEnums.stepSuccess;
    this.isProcessing = false;
    this.formDataIdentity.reset();
    this.formDataIdentity.enable();
  }

  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  handleError(error: any) {
    this.isLoading = false;
    this._matDialog.closeAll();
    this.formDataIdentity.enable();
    const alert = this._transformToastPipe.transform(error.error.title);
    this._toastrService.error(alert);
  }
}
