import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { MultiTranslateHttpLoader } from "@core/interceptors/multi-translate";

import { BlogListResolver } from "@features/blog/pages/list/list.resolver";
import { HomeComponent } from "@features/home/pages/home/home.component";
import { HomeResolver } from "@features/home/pages/home/home.resolvers";

import { LocalizeRouterService } from "@gilsdav/ngx-translate-router";
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from "@ngx-translate/core";

const routes: Routes = [
  {
    path: "",
    resolve: {
      homeResolver: HomeResolver,
      blogResolver: BlogListResolver,
    },
    component: HomeComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeComponent,
    RouterModule.forChild(routes),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient): MultiTranslateHttpLoader => {
          return new MultiTranslateHttpLoader(http, {
            withCommon: true,
            resources: [{ prefix: "./assets/i18n/home/", suffix: ".json" }],
          });
        },
        deps: [HttpClient],
      },
      isolate: true,
      extend: true,
    }),
  ],
})
export class HomeModule {
  constructor(
    private _localizeRouterService: LocalizeRouterService,
    private _translateService: TranslateService
  ) {
    const currentLang = this._localizeRouterService.parser.currentLang;
    this._translateService.setDefaultLang(currentLang);
    this._translateService.use(currentLang);
  }
}
