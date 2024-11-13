/* eslint-disable  @typescript-eslint/no-explicit-any */
import { isPlatformServer } from "@angular/common";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Inject, Injectable, Injector, PLATFORM_ID } from "@angular/core";

import { REQUEST } from "@nguniversal/express-engine/tokens";
import { Observable } from "rxjs";

@Injectable()
export class AbsoluteUrlInterceptor implements HttpInterceptor {
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private injector: Injector
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Only modify requests if running on the server side
    if (
      isPlatformServer(this.platformId) &&
      request.url.startsWith("/assets")
    ) {
      // Extract protocol and host from the server request
      const req = this.injector.get(REQUEST);
      const protocol = req.protocol;
      const host = req.get("host");
      const absoluteUrl = `${protocol}://${host}${request.url}`;

      // Clone the request and update the URL
      request = request.clone({ url: absoluteUrl });
      console.log(request.url);
      console.log(request.urlWithParams);
    }

    // Pass the modified request to the next handler
    return next.handle(request);
  }
}
