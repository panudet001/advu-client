import { Injectable, Pipe, PipeTransform } from "@angular/core";

import { TranslateService } from "@ngx-translate/core";

import { ToastConstants } from "../constants/toast.constants";

@Pipe({ name: "tErrorCode", standalone: true })
@Injectable({
  providedIn: "root",
})
export class TransformToastPipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  transform(errorCode: string) {
    if (errorCode)
      switch (errorCode) {
        case ToastConstants.resetPasswordSuccess: {
          errorCode = this.translate.instant("toast.resetPasswordSuccess");
          break;
        }
        case ToastConstants.signUpSuccess: {
          errorCode = this.translate.instant("toast.signUpSuccess");
          break;
        }
        case ToastConstants.copiedSuccess: {
          errorCode = this.translate.instant("toast.copiedSuccess");
          break;
        }
        case ToastConstants.investCompleted: {
          errorCode = this.translate.instant("toast.investCompleted");
          break;
        }
        case ToastConstants.cancelInvestSuccess: {
          errorCode = this.translate.instant("toast.cancelInvestSuccess");
          break;
        }
        case ToastConstants.withdrawalSuccess: {
          errorCode = this.translate.instant("toast.withdrawalSuccess");
          break;
        }
        case ToastConstants.sendMsgSuccess: {
          errorCode = this.translate.instant("toast.sendMsgSuccess");
          break;
        }
        case ToastConstants.sendMsgFailed: {
          errorCode = this.translate.instant("toast.sendMsgFailed");
          break;
        }
        case ToastConstants.verifyEmailSuccess: {
          errorCode = this.translate.instant("toast.verifyEmailSuccess");
          break;
        }
        case ToastConstants.verifyIdentifySuccess: {
          errorCode = this.translate.instant("toast.verifyIdentifySuccess");
          break;
        }
        default: {
          break;
        }
      }
    return errorCode;
  }
}
