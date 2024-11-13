import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";

import { AuthService } from "@app/core/auth.service";
import { DeleteAccountRequest, OtpResponse } from "@app/core/auth.types";
import { CookieConstant } from "@app/shared/constants/cookie.constants";
import { ErrorConstants } from "@app/shared/constants/error.constants";

import { AccountDeletionComponent } from "@features/profile/components/account-deletion/account-deletion.component";
import { AccountInfoComponent } from "@features/profile/components/account-info/account-info.component";
import { DialogConfirmNewPasswordComponent } from "@features/profile/components/dialog-confirm-new-password/dialog-confirm-new-password.component";
import { DialogDeleteAccountComponent } from "@features/profile/components/dialog-delete-account/dialog-delete-account.component";
import { DialogEditPersonalInfoComponent } from "@features/profile/components/dialog-edit-personal-info/dialog-edit-personal-info.component";
import { DialogNewEmailComponent } from "@features/profile/components/dialog-new-email/dialog-new-email.component";
import { DialogOtpComponent } from "@features/profile/components/dialog-otp/dialog-otp.component";
import { PersonalInfoComponent } from "@features/profile/components/personal-info/personal-info.component";
import {
  DialogOtpParams,
  ProfileStoreService,
} from "@features/profile/profile-store.service";

import { AuthMenuComponent } from "@shared/components/auth-menu/auth-menu.component";
import { ProfilesComponent } from "@shared/components/profile/profile.component";
import { SidebarComponent } from "@shared/components/sidebar/sidebar.component";
import { TransformErrorCodePipe } from "@shared/pipes/transform-error-code.pipe";
import { LocalizationService } from "@shared/services/localization/localization-service";
import { UserService } from "@shared/services/user/user.service";
import {
  ChangeEmailRequest,
  ChangePasswordRequest,
  ResendOtpRequest,
  SendOtpNewEmailRequest,
  UpdateUserRequest,
  User,
  verifyOtpRequest,
} from "@shared/services/user/user.types";

import { TranslateModule } from "@ngx-translate/core";
import { SsrCookieService } from "ngx-cookie-service-ssr";
import { ToastrService } from "ngx-toastr";
import { Observable, Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-profile-home",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
  standalone: true,
  imports: [
    AccountDeletionComponent,
    AccountInfoComponent,
    AuthMenuComponent,
    CommonModule,
    PersonalInfoComponent,
    ProfilesComponent,
    SidebarComponent,
    TranslateModule,
  ],
})
export class ProfileComponent implements OnInit {
  menuName = {
    personalInfo: 1,
    accountInfo: 2,
    accountDeletion: 3,
  };
  dialogTypeName = {
    personalInfo: 1,
    deleteAccount: 2,
    otp: 3,
    changePassword: 4,
    changeEmail: 5,
  };

  otpTypeName = {
    verifyChangePassword: 1,
    verifyChangeEmail: 2,
    changeEmail: 3,
  };
  messageAlertError = "";
  user!: User;
  private _unsubscribeAll = new Subject();

  selectMenu = this.menuName.personalInfo;
  isOpenOtpForm = false;
  otpKey = "";
  email = "";
  time = 0;
  isShowAlertErrorOTP = false;
  alertErrorOTP = "";
  isLoadingOTP = false;
  refWithTime!: string;
  otpType = 0;

  verifyOtpRequest!: verifyOtpRequest;
  sendOtpNewEmailRequest!: SendOtpNewEmailRequest;
  changeEmailRequest!: ChangeEmailRequest;

  readonly dialog = inject(MatDialog);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dialogRef!: MatDialogRef<any>;

  constructor(
    private _userService: UserService,
    private _authService: AuthService,
    private _profileStoreService: ProfileStoreService,
    private _transformErrorCodePipe: TransformErrorCodePipe,
    private _router: Router,
    private _ssrCookieService: SsrCookieService,
    private _toastr: ToastrService,
    private _localizeRouterService: LocalizationService
  ) {}

  ngOnInit(): void {
    this._userService.user$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((user: User) => {
        this.user = user;
      });
  }

  openDialog(type: number) {
    switch (type) {
      case this.dialogTypeName.personalInfo: // Edit personal info
        this.openDialogEditPersonalInfo();
        break;
      case this.dialogTypeName.deleteAccount: // Delete account
        this.openDialogDeleteAccount();
        break;
      case this.dialogTypeName.otp: // Otp
        this.openDialogOtp();
        this._profileStoreService._disableOpenDialog$.next(false);
        break;
      case this.dialogTypeName.changePassword: // Change password
        this.openDialogChangePassword();
        break;

      case this.dialogTypeName.changeEmail: // Change email
        this.openDialogChangeEmail();
        break;
    }
  }

  openDialogEditPersonalInfo() {
    this.dialogRef = this.dialog.open(DialogEditPersonalInfoComponent, {
      disableClose: true,
      data: this.user,
    });

    this.dialogRef.componentInstance.save.subscribe(
      (updateUserRequest: UpdateUserRequest) => {
        this.editProfile(updateUserRequest);
      }
    );
  }

  openDialogDeleteAccount() {
    this.dialogRef = this.dialog.open(DialogDeleteAccountComponent, {
      disableClose: true,
    });

    this.dialogRef.componentInstance.save.subscribe((password: string) => {
      this.deleteAccount(password);
    });
  }

  openDialogOtp() {
    this.dialogRef = this.dialog.open(DialogOtpComponent, {
      disableClose: true,
      data: this.user,
    });

    this.dialogRef.componentInstance.submitOTP.subscribe((otp: string) => {
      if (this.otpType === this.otpTypeName.verifyChangePassword) {
        this.verifyOtpChangePassword(otp);
      } else if (this.otpType === this.otpTypeName.verifyChangeEmail) {
        this.verifyOtpOldEmail(otp);
      } else if (this.otpType === this.otpTypeName.changeEmail) {
        this.changeEmail(otp);
      }
    });

    this.dialogRef.componentInstance.resendOTP.subscribe(() => {
      this.selectTypeAndResendOtp(this.otpType);
    });
  }

  openDialogChangePassword() {
    this.dialogRef = this.dialog.open(DialogConfirmNewPasswordComponent, {
      disableClose: true,
      data: this.user,
    });

    this.dialogRef.componentInstance.save.subscribe(
      (changePasswordRequest: ChangePasswordRequest) => {
        this.changePassword(changePasswordRequest);
      }
    );
  }

  openDialogChangeEmail() {
    this.dialogRef = this.dialog.open(DialogNewEmailComponent, {
      disableClose: true,
      data: this.user,
    });

    this.dialogRef.componentInstance.save.subscribe((email: string) => {
      this.otpType = this.otpTypeName.changeEmail;
      this._profileStoreService._disableOpenDialog$.next(true);
      this.sendOtpNewEmail(email);
    });
  }

  selectTypeAndSendOtp(type: number) {
    this._profileStoreService._disableOpenDialog$.next(true);
    switch (type) {
      case this.otpTypeName.verifyChangePassword: // Change password
        this.otpType = this.otpTypeName.verifyChangePassword;
        this.sendOtpChangePassword();
        break;
      case this.otpTypeName.verifyChangeEmail: // Old email
        this.otpType = this.otpTypeName.verifyChangeEmail;
        this.sendOtpOldEmail();
        break;
    }
  }

  editProfile(updateUserRequest: UpdateUserRequest) {
    if (!updateUserRequest) return;
    updateUserRequest.dateOfBirth = new Date(updateUserRequest.dateOfBirth);
    const formData = new FormData();
    formData.append("firstName", updateUserRequest.firstName);
    formData.append("lastName", updateUserRequest.lastName);
    formData.append("countryCode", updateUserRequest.countryCode);
    formData.append("mobile", updateUserRequest.mobile);
    formData.append(
      "dateOfBirth",
      updateUserRequest.dateOfBirth.toDateString()
    );
    formData.append("address", updateUserRequest.address);
    this._userService.updateUser(formData).subscribe({
      next: () => {
        this._userService.getProfile().subscribe(result => {
          this.user = result;
          this.dialogRef.close();
        });
      },
      error: err => {
        const _err = err.error.title;
        this.messageAlertError = this._transformErrorCodePipe.transform(_err);
        this._profileStoreService._err$.next(this.messageAlertError);
        this._profileStoreService._disableSubmit$.next(false);
      },
    });
  }

  sendOtpOldEmail() {
    this._userService.sendOtpOldEmail().subscribe({
      next: (value: OtpResponse) => {
        this._ssrCookieService.set(
          CookieConstant.otpOldEmail,
          JSON.stringify(value)
        );
        this.formVerifyOtp(value);
        this.openDialog(this.dialogTypeName.otp);
        this._profileStoreService._sendDialogOtpParams$.next(this.otpParams());
      },
      error: err => {
        if (err.error.title.split(",")[0] == ErrorConstants.otpTimeNotYet) {
          this.formVerifyOtp(
            JSON.parse(this._ssrCookieService.get(CookieConstant.otpOldEmail))
          );
          this.openDialog(this.dialogTypeName.otp);
          this._profileStoreService._sendDialogOtpParams$.next(
            this.otpParams()
          );
        } else {
          this.alertErrorOTP = this._transformErrorCodePipe.transform(
            err.error.title
          );
          this._toastr.error(this.alertErrorOTP);
        }
      },
    });
  }

  verifyOtpOldEmail(otpCode: string) {
    this.isLoadingOTP = true;

    this.verifyOtpRequest = {
      otpCode: otpCode,
    };

    this._userService.verifyOtpOldEmail(this.verifyOtpRequest).subscribe({
      next: () => {
        this.dialogRef.close();
        this.openDialog(this.dialogTypeName.changeEmail);
      },
      error: err => {
        this.isLoadingOTP = false;
        this.isShowAlertErrorOTP = true;
        this.alertErrorOTP = this._transformErrorCodePipe.transform(
          err.error.title
        );
        this._profileStoreService._sendDialogOtpParams$.next(this.otpParams());
      },
    });
  }

  sendOtpNewEmail(email: string) {
    this.sendOtpNewEmailRequest = {
      email: email,
      otpCode: this.verifyOtpRequest.otpCode,
    };

    this._userService.sendOtpNewEmail(this.sendOtpNewEmailRequest).subscribe({
      next: (value: OtpResponse) => {
        this.dialogRef.close();
        this._ssrCookieService.set(
          CookieConstant.otpNewEmail,
          JSON.stringify(value)
        );
        this.formVerifyOtp(value);
        this.openDialog(this.dialogTypeName.otp);
        this._profileStoreService._sendDialogOtpParams$.next(this.otpParams());
      },
      error: err => {
        if (err.error.title.split(",")[0] == ErrorConstants.otpTimeNotYet) {
          this.formVerifyOtp(
            JSON.parse(this._ssrCookieService.get(CookieConstant.otpNewEmail))
          );
          this.openDialog(this.dialogTypeName.otp);
          this._profileStoreService._sendDialogOtpParams$.next(
            this.otpParams()
          );
        } else {
          this.alertErrorOTP = this._transformErrorCodePipe.transform(
            err.error.title
          );
          this._toastr.error(this.alertErrorOTP);
        }
      },
    });
  }

  changeEmail(otpCode: string) {
    this.isLoadingOTP = true;

    this.changeEmailRequest = {
      email: this.sendOtpNewEmailRequest.email,
      otpCode: otpCode,
    };

    this._userService.changeEmail(this.changeEmailRequest).subscribe({
      next: () => {
        this.user.email = this.email;
        this.dialogRef.close();
      },
      error: err => {
        this.isLoadingOTP = false;
        this.isShowAlertErrorOTP = true;
        this.alertErrorOTP = this._transformErrorCodePipe.transform(
          err.error.title
        );
        this._profileStoreService._sendDialogOtpParams$.next(this.otpParams());
      },
      complete: () => {},
    });
  }

  deleteAccount(password: string) {
    const deleteRequest = {
      password: password,
    } as DeleteAccountRequest;

    this._authService.deleteAccount(deleteRequest).subscribe({
      next: () => {
        this.dialogRef.close();
        this._router.navigate([
          this._localizeRouterService.translateRoute("profile/delete-done"),
        ]);
      },
      error: err => {
        const _err = err.error.title;
        this.messageAlertError = this._transformErrorCodePipe.transform(_err);
        this._profileStoreService._err$.next(this.messageAlertError);
        this._profileStoreService._disableSubmit$.next(false);
      },
    });
  }

  changeTab(menu: number) {
    this.selectMenu = menu;
  }

  formVerifyOtp(value: OtpResponse) {
    this.isOpenOtpForm = true;
    this.isLoadingOTP = false;
    this.otpKey = value.otpKey;
    this.refWithTime = value.otpKey + "_" + value.expired;
    this.email = value.email;
  }

  otpParams() {
    return {
      isShowAlertError: this.isShowAlertErrorOTP,
      alertError: this.alertErrorOTP,
      email: this.email,
      secondRemaining: this.refWithTime,
      isLoading: this.isLoadingOTP,
      otpRef: this.otpKey,
    } as DialogOtpParams;
  }

  sendOtpChangePassword() {
    this._userService.sendOtpChangePassword().subscribe({
      next: (value: OtpResponse) => {
        this._ssrCookieService.set(
          CookieConstant.otpChangePassword,
          JSON.stringify(value)
        );
        this.formVerifyOtp(value);
        this.openDialog(this.dialogTypeName.otp);
        this._profileStoreService._sendDialogOtpParams$.next(this.otpParams());
      },
      error: err => {
        if (err.error.title.split(",")[0] == ErrorConstants.otpTimeNotYet) {
          this.formVerifyOtp(
            JSON.parse(
              this._ssrCookieService.get(CookieConstant.otpChangePassword)
            )
          );
          this.openDialog(this.dialogTypeName.otp);
        } else {
          this.alertErrorOTP = this._transformErrorCodePipe.transform(
            err.error.title
          );
          this._toastr.error(this.alertErrorOTP);
        }
      },
    });
  }

  verifyOtpChangePassword(otpCode: string) {
    this.isLoadingOTP = true;

    this.verifyOtpRequest = {
      otpCode: otpCode,
    };
    this._profileStoreService._sendDialogOtpParams$.next(this.otpParams());
    this._userService.verifyOtpChangePassword(this.verifyOtpRequest).subscribe({
      next: () => {
        this.dialogRef.close();
        this.openDialog(this.dialogTypeName.changePassword);
      },
      error: err => {
        this.isLoadingOTP = false;
        this.isShowAlertErrorOTP = true;
        this.alertErrorOTP = this._transformErrorCodePipe.transform(
          err.error.title
        );
        this._profileStoreService._sendDialogOtpParams$.next(this.otpParams());
      },
    });
  }

  changePassword(changePasswordRequest: ChangePasswordRequest) {
    changePasswordRequest.otpCode = this.verifyOtpRequest.otpCode;
    this._userService.changePassword(changePasswordRequest).subscribe({
      next: () => {
        this.dialogRef.close();
      },
      error: err => {
        this.messageAlertError = this._transformErrorCodePipe.transform(
          err.error.title
        );
        this._profileStoreService._err$.next(this.messageAlertError);
        this._profileStoreService._disableSubmit$.next(true);
      },
    });
  }

  selectTypeAndResendOtp(type: number) {
    const resendOtpRequest = {
      email: this.email,
      otpKey: this.otpKey,
    } as ResendOtpRequest;

    let service: Observable<OtpResponse>;
    let cookie: string;

    switch (type) {
      case 1: // Resend otp change password
        service = this._userService.reSendOtpChangePassword(resendOtpRequest);
        cookie = CookieConstant.otpChangePassword;
        this.resendOtp(service, cookie);
        break;
      case 2: // Resend otp old email
        service = this._userService.reSendOtpOldEmail(resendOtpRequest);
        cookie = CookieConstant.otpOldEmail;
        this.resendOtp(service, cookie);
        break;
      case 3: // Resend otp new email
        service = this._userService.reSendOtpNewEmail(resendOtpRequest);
        cookie = CookieConstant.otpOldEmail;
        this.resendOtp(service, cookie);
        break;
      default:
      // code block
    }
  }

  resendOtp(service: Observable<OtpResponse>, cookie: string) {
    service.subscribe({
      next: value => {
        this._ssrCookieService.set(cookie, JSON.stringify(value));
        this.formVerifyOtp(value);
        this.isShowAlertErrorOTP = false;
        this._profileStoreService._sendDialogOtpParams$.next(this.otpParams());
      },
      error: err => {
        if (err.error.title.split(",")[0] == ErrorConstants.otpTimeNotYet) {
          const minutes = Number(err.error.title.split(",")[1]);
          const seconds = Number(err.error.title.split(",")[2]);
          const otpKey = err.error.title.split(",")[3];
          this.isShowAlertErrorOTP = true;
          this.alertErrorOTP = this._transformErrorCodePipe.transform(
            err.error.title
          );
          this.refWithTime = otpKey + "_" + (minutes * 60 + seconds).toString();
          this._profileStoreService._sendDialogOtpParams$.next(
            this.otpParams()
          );
        } else {
          this.isShowAlertErrorOTP = true;
          this.alertErrorOTP = this._transformErrorCodePipe.transform(
            err.error.title
          );
          this._toastr.error(this.alertErrorOTP);
        }
      },
    });
  }
}
