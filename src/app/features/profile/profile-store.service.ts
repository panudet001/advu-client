import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable, Subject } from "rxjs";

export interface DialogOtpParams {
  isShowAlertError: false;
  alertError: "";
  email: string;
  secondRemaining: string;
  isLoading: boolean;
  otpRef: string;
}

@Injectable({
  providedIn: "root",
})
export class ProfileStoreService {
  _err$: Subject<string> = new Subject<string>();

  get err$(): Observable<string> {
    return this._err$.asObservable();
  }

  _sendDialogOtpParams$: BehaviorSubject<DialogOtpParams> =
    new BehaviorSubject<DialogOtpParams>({} as DialogOtpParams);

  get sendDialogOtpParams$(): Observable<DialogOtpParams> {
    return this._sendDialogOtpParams$.asObservable();
  }

  _disableSubmit$: Subject<boolean> = new Subject<boolean>();

  get disableSubmit$(): Observable<boolean> {
    return this._disableSubmit$.asObservable();
  }

  _disableOpenDialog$: Subject<boolean> = new Subject<boolean>();

  get disableOpenDialog$(): Observable<boolean> {
    return this._disableOpenDialog$.asObservable();
  }
}
