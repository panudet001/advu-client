import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { ContactUs } from "@shared/services/contact-us/contact.type";

import { environment } from "@environments/environment";

import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ContactUsService {
  constructor(private _httpClient: HttpClient) {}

  private _contactUs$: BehaviorSubject<ContactUs> =
    new BehaviorSubject<ContactUs>({} as ContactUs);
  get contactUs$(): Observable<ContactUs> {
    return this._contactUs$.asObservable();
  }

  getContactUs(): Observable<ContactUs> {
    return this._httpClient
      .get<ContactUs>(`${environment.apiUrl}/contact-us`)
      .pipe(
        tap(response => {
          this._contactUs$.next(response);
        })
      );
  }

  contactUs(contactUs: object): Observable<Response> {
    return this._httpClient.post<Response>(
      `${environment.apiUrl}/contact-us`,
      contactUs
    );
  }
}
