import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { InvestmentTypeEnums } from "@shared/services/investment/investment.enums";
import { Pagination } from "@shared/types/core.types";

import { environment } from "@environments/environment";

import { BehaviorSubject, Observable, tap } from "rxjs";

import { Investment, InvestmentPagination } from "./investment.types";

@Injectable({
  providedIn: "root",
})
export class InvestmentService {
  constructor(private _httpClient: HttpClient) {}

  private _pagination$: BehaviorSubject<Pagination> =
    new BehaviorSubject<Pagination>({} as Pagination);

  get pagination$(): Observable<Pagination> {
    return this._pagination$.asObservable();
  }

  private _investment$: BehaviorSubject<Investment> =
    new BehaviorSubject<Investment>({} as Investment);

  get investment$(): Observable<Investment> {
    return this._investment$.asObservable();
  }

  private _investments$: BehaviorSubject<Investment[]> = new BehaviorSubject<
    Investment[]
  >([]);

  get investments$(): Observable<Investment[]> {
    return this._investments$.asObservable();
  }

  private _investmentLives$: BehaviorSubject<Investment[]> =
    new BehaviorSubject<Investment[]>([]);

  get investmentsLive$(): Observable<Investment[]> {
    return this._investmentLives$.asObservable();
  }

  private _investmentFunded$: BehaviorSubject<Investment[]> =
    new BehaviorSubject<Investment[]>([]);

  get investmentFunded$(): Observable<Investment[]> {
    return this._investmentFunded$.asObservable();
  }

  getInvestments(
    type: InvestmentTypeEnums,
    isPagination = true,
    page = 0,
    size = 10,
    sort = "updatedAt",
    order: "asc" | "desc" = "desc"
  ): Observable<InvestmentPagination> {
    return this._httpClient
      .get<InvestmentPagination>(`${environment.apiUrl}/investments`, {
        params: {
          type,
          isPagination,
          page,
          size,
          sort,
          order,
        },
      })
      .pipe(
        tap(response => {
          this._investments$.next(response.investments);
          this._pagination$.next(response.pagination);

          if (type === InvestmentTypeEnums.live) {
            this._investmentLives$.next(response.investments);
          }
          if (type === InvestmentTypeEnums.funded) {
            this._investmentFunded$.next(response.investments);
          }
        })
      );
  }

  getInvestmentBySlug(slug: string): Observable<Investment> {
    return this._httpClient
      .get<Investment>(`${environment.apiUrl}/investments/` + slug)
      .pipe(
        tap(response => {
          this._investment$.next(response);
        })
      );
  }
}
