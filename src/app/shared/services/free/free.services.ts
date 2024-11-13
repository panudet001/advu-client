import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Free } from "@shared/services/free/free.type";

import { BehaviorSubject, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class FreeService {
  private _free$: BehaviorSubject<Free> = new BehaviorSubject<Free>({} as Free);

  get free$(): Observable<Free> {
    return this._free$.asObservable();
  }

  constructor(private _httpClient: HttpClient) {}

  getFree(id: string): Observable<Free> {
    return this._httpClient.get<Free>(`${environment.apiUrl}/fee/` + id).pipe(
      tap(response => {
        this._free$.next(response);
      })
    );
  }
}
