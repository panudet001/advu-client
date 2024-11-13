import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { InvestmentEnums } from "@shared/services/investment-v2/investment.enums";
import {
  Investment,
  InvestmentPagination,
} from "@shared/services/investment-v2/investment.types";
import { Pagination } from "@shared/types/core.types";

import { environment } from "@environments/environment";

import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class InvestmentService {
  header = {
    lang: "EN",
  };
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
    type: InvestmentEnums,
    page = 0,
    size = 10,
    sort = "updatedAt",
    order: "asc" | "desc" = "desc",
    searchValue = ""
  ): Observable<InvestmentPagination> {
    return this._httpClient
      .get<InvestmentPagination>(`${environment.apiUrl}/v2/investments`, {
        params: {
          type,
          page,
          size,
          sort,
          order,
          searchValue,
        },
      })
      .pipe(
        tap(response => {
          this._investments$.next(response.estates);
          this._pagination$.next(response.pagination);

          if (type === InvestmentEnums.live) {
            this._investmentLives$.next(response.estates);
          }
          if (type === InvestmentEnums.funded) {
            this._investmentFunded$.next(response.estates);
          }
        })
      );
  }

  getInvestmentBySlug(slug: string): Observable<Investment> {
    return this._httpClient
      .get<Investment>(`${environment.apiUrl}/v2/investments/` + slug, {
        headers: this.header,
      })
      .pipe(
        tap(response => {
          this._investment$.next(response);
        })
      );
  }
}
