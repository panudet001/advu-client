import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import {
  Transaction,
  TransactionPagination,
} from "@shared/services/transaction/transaction.types";
import { Pagination } from "@shared/types/core.types";

import { environment } from "@environments/environment";

import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TransactionService {
  constructor(private _httpClient: HttpClient) {}

  private _pagination$: BehaviorSubject<Pagination> =
    new BehaviorSubject<Pagination>({} as Pagination);

  get pagination$(): Observable<Pagination> {
    return this._pagination$.asObservable();
  }

  private _transaction$: BehaviorSubject<Transaction> =
    new BehaviorSubject<Transaction>({} as Transaction);

  get investment$(): Observable<Transaction> {
    return this._transaction$.asObservable();
  }

  private _transactions$: BehaviorSubject<Transaction[]> = new BehaviorSubject<
    Transaction[]
  >([]);

  get investments$(): Observable<Transaction[]> {
    return this._transactions$.asObservable();
  }

  getTransactionsByType(
    type: string,
    isPagination = true,
    page = 0,
    size = 10,
    startAt: string,
    endAt: string,
    status: number,
    cryptoUid: string,
    transactionHash: string,
    sort = "updatedAt",
    order: "asc" | "desc" | "" = "desc"
  ): Observable<TransactionPagination> {
    return this._httpClient
      .get<TransactionPagination>(
        `${environment.apiUrl}/transactions/` + type,
        {
          params: {
            isPagination,
            page,
            size,
            startAt,
            endAt,
            status,
            cryptoUid,
            transactionHash,
            sort,
            order,
          },
        }
      )
      .pipe(
        tap(response => {
          this._transactions$.next(response.transactions);
          this._pagination$.next(response.pagination);
        })
      );
  }
}
