import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { BreadcrumbComponent } from "@features/blog/components/breadcrumb/breadcrumb.component";
import { Breadcrumb } from "@features/blog/components/breadcrumb/breadcrumb.types";
import { DataNotFoundComponent } from "@features/blog/components/data-not-found/data-not-found.component";
import { Error404Component } from "@features/error/pages/error-404/error-404.component";

import { BlogService } from "@shared/services/blog/blog.service";
import { BlogContent, BlogList } from "@shared/services/blog/blog.types";
import { FileService } from "@shared/services/file/file.service";
import { MetaService } from "@shared/services/seo/seo.service";

import { environment } from "@environments/environment";

import { LocalizeRouterPipe } from "@gilsdav/ngx-translate-router";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-blog",
  standalone: true,
  imports: [
    BreadcrumbComponent,
    CommonModule,
    DataNotFoundComponent,
    Error404Component,
    FormsModule,
    LocalizeRouterPipe,
    TranslateModule,
  ],
  templateUrl: "./list.component.html",
  styleUrl: "./list.component.scss",
})
export class BlogListComponent implements OnInit {
  cateBlog = ["All", "News", "Events", "Articles"];
  page = 0;
  isShowViewMore = true;
  selectedItem: number = 0;
  blogs: Array<BlogContent> = [];
  searchValue: string = "";
  blogList?: BlogList;
  isLoading!: boolean;
  isType!: boolean;

  breadcrumb: Array<Breadcrumb> = [
    {
      url: "/",
      title: "Home",
    },
    {
      url: "/blog",
      title: "ADAVU Blogs",
    },
  ];
  type = "";

  constructor(
    private _router: Router,
    private _blogService: BlogService,
    private _meta: MetaService,
    private _fileService: FileService,
    private _route: ActivatedRoute
  ) {
    this._meta.updateTitle("ADAVU Blogs");
    this._meta.updateDescription({
      title: "ADAVU Blogs",
      keywords: "ADAVU blog,adavu blog",
      description: "this is blog adavu",
      author: "adavu",
      image: "",
      url: environment.baseUrl + this._router.url,
    });
    this._meta.createLinkForCanonicalURL();
  }

  ngOnInit() {
    this._blogService.blogContent$.subscribe(value => {
      this.blogList = value;
      this.isLoading = false;
      this.blogList.blogs.map(e => {
        if (this.blogs.filter(i => i.id == e.id).length == 0) {
          this.blogs.push(e);
        }
      });
      if (this.blogs.length >= this.blogList.pagination.length) {
        this.isShowViewMore = false;
      }
      this.blogList.blogs.forEach(e => {
        this.replaceObjectBlogsById(e.id, e);
      });
    });
    this._route.paramMap.subscribe(paramMap => {
      this.type = paramMap.get("type")!;
      this.isType = true;

      switch (this.type) {
        case null:
          this.selectedItem = 0;
          break;
        case "news":
          this.selectedItem = 1;
          break;
        case "events":
          this.selectedItem = 2;
          break;
        case "articles":
          this.selectedItem = 3;
          break;
        default:
          this.isType = false;
      }
    });
  }

  getImageBlog(path: string) {
    return this._fileService.getImageBlog(path);
  }

  selectItem(index: number) {
    this.selectedItem = index;
    this.isLoading = true;
    switch (this.selectedItem) {
      case 0:
        this.blogs = [];
        this._router.navigate(["blog"]);
        this._blogService.getBlogList(0, 7, "", "desc", "").subscribe();
        this.isShowViewMore = true;
        break;
      case 1:
        this.blogs = [];
        this._router.navigate(["blog/news"]);
        this._blogService.getBlogList(0, 7, "", "desc", "News").subscribe();
        this.isShowViewMore = true;
        break;
      case 2:
        this.blogs = [];
        this._router.navigate(["blog/events"]);
        this._blogService.getBlogList(0, 7, "", "desc", "Events").subscribe();
        this.isShowViewMore = true;
        break;
      case 3:
        this.blogs = [];
        this._router.navigate(["blog/articles"]);
        this._blogService.getBlogList(0, 7, "", "desc", "Articles").subscribe();
        this.isShowViewMore = true;
        break;
    }
  }

  replaceObjectBlogsById(id: string, newObj: BlogContent): void {
    const index = this.blogs.findIndex(obj => obj.id === id);
    if (index !== -1) {
      this.blogs[index] = newObj;
    }
  }

  viewMore() {
    const blogType = this.type?.charAt(0).toUpperCase() + this.type?.slice(1);
    this._blogService
      .getBlogList(this.page, 3, "", "desc", blogType)
      .subscribe(value => {
        this.blogs = this.blogs.concat(value.blogs);
        if (this.blogs.length >= value.pagination.length)
          this.isShowViewMore = false;
      });
  }

  onSearch(value: string): void {
    this._router
      .navigate(["blog/blog-search"], {
        queryParams: { q: value },
      })
      .then(() => {
        window.location.reload();
      });
  }

  protected readonly environment = environment;
  protected readonly Object = Object;
}
