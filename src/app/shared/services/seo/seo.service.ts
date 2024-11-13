import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { Router } from "@angular/router";

import { environment } from "@environments/environment";

import { UpdateMeta } from "./meta";

@Injectable({
  providedIn: "root",
})
export class MetaService {
  activeLang!: string;
  constructor(
    private title: Title,
    private meta: Meta,
    private _router: Router,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  updateTitle(title?: string) {
    if (title) {
      this.title.setTitle(title);
    }
  }
  createLinkForCanonicalURL() {
    const link: HTMLLinkElement = this.doc.createElement("link");
    link.setAttribute("rel", "canonical");
    this.doc.head.appendChild(link);
    link.setAttribute("href", environment.baseUrl + this._router.url);
  }

  updateDescription(meta: UpdateMeta) {
    this.meta.updateTag({ name: "og:url", content: meta.url });
    this.meta.updateTag({ name: "title", content: meta.title! });
    this.meta.updateTag({ name: "keywords", content: meta.keywords });
    this.meta.updateTag({ name: "description", content: meta.description! });
    this.meta.updateTag({ name: "robots", content: "index, follow" });
    this.meta.updateTag({ name: "author", content: meta.author });
    this.meta.updateTag({ property: "og:locale", content: "en_US" });
    this.meta.updateTag({ property: "og:title", content: meta.title! });
    this.meta.updateTag({ property: "og:keywords", content: meta.keywords });
    this.meta.updateTag({
      property: "og:description",
      content: meta.description!,
    });
    this.meta.updateTag({ property: "og:image", content: meta.image });
    this.meta.updateTag({ property: "og:site_name", content: "ADAVU" });
    this.meta.updateTag({ property: "og:url", content: meta.url });
    this.meta.updateTag({
      property: "twitter:card",
      content: "summary_large_image",
    });
    this.meta.updateTag({ property: "twitter:title", content: meta.title! });
    this.meta.updateTag({
      property: "twitter:keywords",
      content: meta.keywords,
    });
    this.meta.updateTag({
      property: "twitter:description",
      content: meta.description!,
    });
    this.meta.updateTag({ name: "twitter:title", content: meta.title! });
    this.meta.updateTag({ name: "twitter:keywords", content: meta.keywords });
    this.meta.updateTag({ name: "twitter:image", content: meta.image });
  }
}
