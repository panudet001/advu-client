import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ApplicationConfig, mergeApplicationConfig } from "@angular/core";
import { provideServerRendering } from "@angular/platform-server";

import { AbsoluteUrlInterceptor } from "@core/interceptors/server.interceptor";

import { REQUEST } from "@nguniversal/express-engine/tokens";

import { appConfig } from "./app.config";

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AbsoluteUrlInterceptor,
      multi: true,
    },
    {
      provide: REQUEST,
      useValue: {},
    },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
