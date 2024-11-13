import { Injectable } from "@angular/core";

import { LocalizeRouterService } from "@gilsdav/ngx-translate-router";

@Injectable({
  providedIn: "root",
})
export class LocalizationService {
  constructor(private translate: LocalizeRouterService) {}

  translateRoute(path: string) {
    return this.translate.translateRoute(path);
  }
}
