import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Banner } from "@shared/services/banner/banner.types";

import { environment } from "@environments/environment";

import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BannerService {
  constructor(private _httpClient: HttpClient) {}

  private _banners$: BehaviorSubject<Banner[]> = new BehaviorSubject<
    Banner[] | []
  >([]);

  get banners$(): Observable<Banner[]> {
    return this._banners$.asObservable();
  }

  getBanners(): Observable<Banner[]> {
    return this._httpClient.get<Banner[]>(`${environment.apiUrl}/banners`).pipe(
      tap(response => {
        this._banners$.next(response);
      })
    );
  }
}
