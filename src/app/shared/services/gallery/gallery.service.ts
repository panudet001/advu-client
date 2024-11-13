import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Gallery } from "@shared/services/gallery/gallery.types";

import { environment } from "@environments/environment";

import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class GalleryService {
  constructor(private _httpClient: HttpClient) {}

  private _gallery$: BehaviorSubject<Gallery> = new BehaviorSubject<Gallery>(
    {} as Gallery
  );

  get gallery$(): Observable<Gallery> {
    return this._gallery$.asObservable();
  }

  private _galleries$: BehaviorSubject<Gallery[]> = new BehaviorSubject<
    Gallery[] | []
  >([]);

  get galleries$(): Observable<Gallery[]> {
    return this._galleries$.asObservable();
  }

  getCurrencies(): Observable<Gallery[]> {
    return this._httpClient
      .get<Gallery[]>(`${environment.apiUrl}/gallery`)
      .pipe(
        tap(response => {
          this._galleries$.next(response);
        })
      );
  }

  getImage(type: string, uid: string, fileName: string) {
    return `${environment.apiUrl}/galleries/${type}/${uid}/${fileName}`;
  }
  getImageUrl(fileName: string) {
    return `${environment.apiUrl}/images/${fileName}`;
  }

  getImagUrlV2(path: string) {
    return `${environment.apiUrl}${path}`;
  }
}
