import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import {
  FaqDetail,
  FaqsCategory,
  FaqsCategoryDetail,
  FaqsMostTopic,
} from "@shared/services/faqs/faqs.types";

import { environment } from "@environments/environment";

import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FaqsService {
  constructor(private _httpClient: HttpClient) {}

  private _faqMostTopic$: BehaviorSubject<FaqsMostTopic[]> =
    new BehaviorSubject<FaqsMostTopic[]>({} as FaqsMostTopic[]);

  get faqMostTopic$(): Observable<FaqsMostTopic[]> {
    return this._faqMostTopic$.asObservable();
  }

  private _faqCategory$: BehaviorSubject<FaqsCategory[]> = new BehaviorSubject<
    FaqsCategory[]
  >({} as FaqsCategory[]);

  get faqCategory$(): Observable<FaqsCategory[]> {
    return this._faqCategory$.asObservable();
  }

  private _faqCategoryDetail$: BehaviorSubject<FaqsCategoryDetail[]> =
    new BehaviorSubject<FaqsCategoryDetail[]>({} as FaqsCategoryDetail[]);

  get faqCategoryDetail$(): Observable<FaqsCategoryDetail[]> {
    return this._faqCategoryDetail$.asObservable();
  }

  private _faqBySlug$: BehaviorSubject<FaqDetail> =
    new BehaviorSubject<FaqDetail>({} as FaqDetail);

  get faqBySlug$(): Observable<FaqDetail> {
    return this._faqBySlug$.asObservable();
  }

  private _faqResult$: BehaviorSubject<FaqDetail[]> = new BehaviorSubject<
    FaqDetail[]
  >({} as FaqDetail[]);

  get faqResult$(): Observable<FaqDetail[]> {
    return this._faqResult$.asObservable();
  }

  getFaqMostTopic(): Observable<FaqsMostTopic[]> {
    const header = {
      lang: "en",
    };
    return this._httpClient
      .get<FaqsMostTopic[]>(`${environment.apiUrl}/faqs`, {
        headers: header,
      })
      .pipe(
        tap(response => {
          this._faqMostTopic$.next(response);
        })
      );
  }

  getFaqCategory(): Observable<FaqsCategory[]> {
    const header = {
      lang: "en",
    };
    return this._httpClient
      .get<FaqsCategory[]>(`${environment.apiUrl}/faq-categories`, {
        headers: header,
      })
      .pipe(
        tap(response => {
          this._faqCategory$.next(response);
        })
      );
  }

  getFaqCategoryDetail(
    faqCategorySlug: string
  ): Observable<FaqsCategoryDetail[]> {
    const header = {
      lang: "en",
    };
    return this._httpClient
      .get<FaqsCategoryDetail[]>(`${environment.apiUrl}/faqs/category`, {
        headers: header,
        params: {
          faqCategorySlug: faqCategorySlug,
        },
      })
      .pipe(
        tap(response => {
          this._faqCategoryDetail$.next(response);
        })
      );
  }

  getBySlugFaq(slug: string): Observable<FaqDetail> {
    const header = {
      lang: "en",
    };
    return this._httpClient
      .get<FaqDetail>(`${environment.apiUrl}/faqs/slug`, {
        headers: header,
        params: {
          slug: slug,
        },
      })
      .pipe(
        tap(response => {
          this._faqBySlug$.next(response);
        })
      );
  }

  getFaqSearchResult(keyword: string): Observable<FaqDetail[]> {
    const header = {
      lang: "en",
    };
    return this._httpClient
      .get<FaqDetail[]>(`${environment.apiUrl}/faqs/search`, {
        headers: header,
        params: {
          keyword: keyword,
        },
      })
      .pipe(
        tap(response => {
          this._faqResult$.next(response);
        })
      );
  }
}
