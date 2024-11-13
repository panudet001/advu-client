import { Location } from "@angular/common";
import {
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  NativeDateAdapter,
} from "@angular/material/core";
import { provideClientHydration } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import {
  PreloadAllModules,
  provideRouter,
  withDisabledInitialNavigation,
  withInMemoryScrolling,
  withPreloading,
} from "@angular/router";
import { provideServiceWorker } from "@angular/service-worker";

import { authInterceptor } from "@core/interceptors/auth.interceptor";
import { LoadingInterceptor } from "@core/interceptors/loading.interceptor";
import { MultiTranslateHttpLoader } from "@core/interceptors/multi-translate";

import { environment } from "@environments/environment";

import {
  LocalizeParser,
  LocalizeRouterSettings,
  withLocalizeRouter,
} from "@gilsdav/ngx-translate-router";
import { LocalizeRouterHttpLoader } from "@gilsdav/ngx-translate-router-http-loader";
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from "@ngx-translate/core";
import { CookieModule } from "ngx-cookie";
import { provideToastr } from "ngx-toastr";

import { routes } from "./app.routes";

export function localizeLoaderFactory(
  translate: TranslateService,
  location: Location,
  settings: LocalizeRouterSettings,
  http: HttpClient
) {
  return new LocalizeRouterHttpLoader(translate, location, settings, http);
}

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: "DD/MM/YYYY",
  },
  display: {
    dateInput: "DD/MM/YYYY",
    monthYearLabel: "MMMM YYYY",
    dateA11yLabel: "DD/MM/YYYY",
    monthYearA11yLabel: "MMMM YYYY",
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_LOCALE, useValue: "en-GB" },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },

    provideAnimations(),
    provideRouter(
      routes,
      withDisabledInitialNavigation(),
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({ scrollPositionRestoration: "enabled" })
    ),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor, LoadingInterceptor])
    ),
    provideAnimations(),
    provideRouter(
      routes,
      withDisabledInitialNavigation(),
      withLocalizeRouter(routes, {
        parser: {
          provide: LocalizeParser,
          useFactory: localizeLoaderFactory,
          deps: [
            TranslateService,
            Location,
            LocalizeRouterSettings,
            HttpClient,
          ],
        },
        alwaysSetPrefix: false,
        initialNavigation: true,
      }),
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({ scrollPositionRestoration: "enabled" })
    ),
    provideClientHydration(),
    provideToastr(),
    importProvidersFrom(
      CookieModule.forRoot(),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient): MultiTranslateHttpLoader => {
            return new MultiTranslateHttpLoader(http, {
              withCommon: true,
              resources: [],
            });
          },
          deps: [HttpClient],
        },
      })
    ),
    provideServiceWorker("ngsw-worker.js", {
      enabled: environment.production,
      registrationStrategy: "registerWhenStable:30000",
    }),
  ],
};
