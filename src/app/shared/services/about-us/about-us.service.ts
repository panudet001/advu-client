import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { AboutUs } from "@shared/services/about-us/about-us.types";

import { BehaviorSubject, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AboutUsServices {
  constructor(private _httpClient: HttpClient) {}

  private _aboutUs$: BehaviorSubject<AboutUs> = new BehaviorSubject<AboutUs>(
    {} as AboutUs
  );
  get aboutUs$(): Observable<AboutUs> {
    return this._aboutUs$.asObservable();
  }

  getAboutUs(): Observable<AboutUs> {
    return this._httpClient.get<AboutUs>(`${environment.apiUrl}/about-us`).pipe(
      tap(response => {
        this._aboutUs$.next(response);
      })
    );
  }
}
