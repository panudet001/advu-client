import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { BlogDetail, BlogList } from "@shared/services/blog/blog.types";

import { environment } from "@environments/environment";

import { Observable, ReplaySubject, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BlogService {
  constructor(private _httpClient: HttpClient) {}

  private _blogList$: ReplaySubject<BlogList> = new ReplaySubject<BlogList>(1);

  get blogContent$(): Observable<BlogList> {
    return this._blogList$.asObservable();
  }

  private _blogById$: ReplaySubject<BlogDetail> = new ReplaySubject<BlogDetail>(
    1
  );

  get blogById$(): Observable<BlogDetail> {
    return this._blogById$.asObservable();
  }

  getBlogList(
    page = 0,
    size = 7,
    sort = "",
    order = "desc",
    type = "",
    searchValue = ""
  ): Observable<BlogList> {
    const header = {
      lang: "en",
    };
    return this._httpClient
      .get<BlogList>(`${environment.apiUrl}/blogs`, {
        headers: header,
        params: {
          page,
          size,
          sort,
          order,
          type,
          searchValue,
        },
      })
      .pipe(
        tap(response => {
          this._blogList$.next(response);
        })
      );
  }

  getBlogById(slug: string | null): Observable<BlogDetail> {
    const header = {
      lang: "en",
    };
    return this._httpClient
      .get<BlogDetail>(`${environment.apiUrl}/blogs/${slug}`, {
        headers: header,
      })
      .pipe(
        tap(response => {
          this._blogById$.next(response);
        })
      );
  }
}
