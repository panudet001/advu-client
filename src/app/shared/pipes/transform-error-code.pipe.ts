import { Injectable, Pipe, PipeTransform } from "@angular/core";

import { ErrorConstants } from "@shared/constants/error.constants";

import { TranslateService } from "@ngx-translate/core";

@Pipe({ name: "tErrorCode", standalone: true })
@Injectable({
  providedIn: "root",
})
export class TransformErrorCodePipe implements PipeTransform {
  activeLang!: string;

  constructor(public _translocoService: TranslateService) {
    this.activeLang = _translocoService.currentLang;
  }

  transform(errorCode: string): string {
    const errorCodeSplit = errorCode?.split(",");
    let minute = "";
    let second = "";
    if (errorCodeSplit[0] == ErrorConstants.otpTimeNotYet) {
      errorCode = ErrorConstants.otpTimeNotYet;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      minute = errorCodeSplit[1];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      second = errorCodeSplit[2];
    }

    if (errorCode)
      switch (errorCode) {
        case ErrorConstants.userUsernameUnique: {
          errorCode = "apiError.userUsernameUnique";
          break;
        }
        case ErrorConstants.oneOrMoreValidate: {
          errorCode = "apiError.oneOrMoreValidate";
          break;
        }
        case ErrorConstants.userInCorrect: {
          errorCode = "apiError.userIsInCorrect";
          break;
        }
        case ErrorConstants.userMobileUnique: {
          errorCode = "apiError.userMobileUnique";
          break;
        }
        case ErrorConstants.userEmailUnique: {
          errorCode = "apiError.userEmailUnique";
          break;
        }
        case ErrorConstants.userNotFound: {
          errorCode = "apiError.userNotFound";
          break;
        }
        case ErrorConstants.otpTimeNotYet: {
          errorCode =
            this.activeLang == "th"
              ? "OTP has been sent to this phone number, please wait " +
                minute +
                " minute " +
                second +
                " second "
              : "OTP has been sent to this phone number, please wait " +
                minute +
                " minute " +
                second +
                " second ";
          break;
        }
        case ErrorConstants.otpInCorrect: {
          errorCode = "apiError.otpIncorrect";
          break;
        }
        case ErrorConstants.otpExpired: {
          errorCode = "apiError.otpExpired";
          break;
        }
        case ErrorConstants.advertisementOwner: {
          errorCode = "apiError.advertisementOwner";
          break;
        }
        case ErrorConstants.investmentIsMaximum: {
          errorCode = "apiError.investmentIsMaximum";
          break;
        }
        case ErrorConstants.investmentIsMinimum: {
          errorCode = "apiError.investmentIsMinimum";
          break;
        }
        case ErrorConstants.walletNotEnough: {
          errorCode = "apiError.walletNotEnough";
          break;
        }
        case ErrorConstants.passwordNotMatch: {
          errorCode = "error.passwordNotMatch";
          break;
        }
        case ErrorConstants.investmentIsLimitOnThree: {
          errorCode = "apiError.investmentIsLimitOnThree";
          break;
        }
        case ErrorConstants.amountIsInCorrect: {
          errorCode = "apiError.amountIsInCorrect";
          break;
        }
        case ErrorConstants.walletAddressIsInValid: {
          errorCode = "apiError.walletAddressIsInValid";
          break;
        }
        case ErrorConstants.investmentBalanceNotEnough: {
          errorCode = "apiError.investmentBalanceNotEnough";
          break;
        }
        case ErrorConstants.http500: {
          errorCode = "apiError.http500";
          break;
        }
        case ErrorConstants.reCaptcha: {
          errorCode = "error.reCaptcha";
          break;
        }
        case ErrorConstants.inValidNumber: {
          errorCode = "apiError.inValidNumber";
          break;
        }
        case ErrorConstants.investmentIsNotAvailable: {
          errorCode = "apiError.investmentIsNotAvailable";
          break;
        }
        case ErrorConstants.ThisTokenIsAlreadyExpired: {
          errorCode = "This token is already expired";
          break;
        }

        default: {
          errorCode = "500";
          break;
        }
      }

    return errorCode;
  }
}
