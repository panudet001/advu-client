import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { BreadcrumbComponent } from "@features/blog/components/breadcrumb/breadcrumb.component";
import { Breadcrumb } from "@features/blog/components/breadcrumb/breadcrumb.types";
import { DataNotFoundComponent } from "@features/blog/components/data-not-found/data-not-found.component";
import { Error404Component } from "@features/error/pages/error-404/error-404.component";

import { BlogService } from "@shared/services/blog/blog.service";
import { BlogDetail } from "@shared/services/blog/blog.types";
import { FileService } from "@shared/services/file/file.service";
import { MetaService } from "@shared/services/seo/seo.service";

import { environment } from "@environments/environment";

import { LocalizeRouterPipe } from "@gilsdav/ngx-translate-router";

@Component({
  selector: "app-detail",
  standalone: true,
  imports: [
    BreadcrumbComponent,
    CommonModule,
    DataNotFoundComponent,
    Error404Component,
    LocalizeRouterPipe,
  ],
  templateUrl: "./detail.component.html",
  styleUrl: "./detail.component.scss",
})
export class DetailComponent implements OnInit {
  blogDetail?: BlogDetail;
  breadcrumb: Array<Breadcrumb> = [
    {
      url: "/",
      title: "Home",
    },
    {
      url: "/blog",
      title: "ADAVU Blogs",
    },
    {
      url: "",
      title: this.blogDetail?.blog.title,
    },
  ];

  constructor(
    private _router: Router,
    private _blogService: BlogService,
    private _meta: MetaService,
    private _fileService: FileService
  ) {}

  ngOnInit() {
    this._blogService.blogById$.subscribe(value => {
      this.blogDetail = value;
    });
    this.breadcrumb[2]!.title = this.blogDetail?.blog.title;
    this._meta.updateTitle(this.blogDetail?.blog.title);
    this._meta.updateDescription({
      title: this.blogDetail?.blog.title,
      keywords: "",
      description: this.blogDetail?.blog.highlights,
      author: "adavu",
      image: this.getImageBlog(this.blogDetail?.blog.imagePreview),
      url: environment.baseUrl + this._router.url,
    });
    this._meta.createLinkForCanonicalURL();
  }
  getImageBlog(path: string | undefined) {
    return this._fileService.getImageBlog(path!);
  }
  onClickNavigate(type: string) {
    switch (type) {
      case "News":
        this._router.navigate(["blog/news"]);
        break;
      case "Events":
        this._router.navigate(["blog/events"]);
        break;
      case "Articles":
        this._router.navigate(["blog/articles"]);
        break;
    }
  }
}
