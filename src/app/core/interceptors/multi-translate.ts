import { HttpClient } from "@angular/common/http";

import { mergeObjectsRecursively } from "@core/interceptors/mergeObjectsRecursively";
import { Resource } from "@core/interceptors/multi.types";

import { TranslateLoader } from "@ngx-translate/core";
import { Observable, forkJoin, map, of } from "rxjs";

export class MultiTranslateHttpLoader implements TranslateLoader {
  resources: Resource[];
  withCommon: boolean;

  constructor(
    private readonly http: HttpClient,
    {
      resources,
      withCommon = true,
    }: { resources: Resource[]; withCommon?: boolean }
  ) {
    this.resources = resources;
    this.withCommon = withCommon;
  }

  getTranslation(lang: string): Observable<Record<string, unknown> | []> {
    let resources: Resource[] = [...this.resources];
    if (this.withCommon) {
      resources = [
        { prefix: "./assets/i18n/common/", suffix: ".json" },
        ...resources,
      ];
    }

    if (resources.length <= 0) {
      return of([]);
    }

    return forkJoin(
      resources.map((config: Resource) => {
        return this.http.get<Record<string, unknown>>(
          `${config.prefix}${lang}${config.suffix}`
        );
      })
    ).pipe(
      map((response: Record<string, unknown>[]) =>
        mergeObjectsRecursively(response)
      )
    );
  }
}
