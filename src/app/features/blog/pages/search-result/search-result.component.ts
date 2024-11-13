import { DatePipe, NgClass, NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { BreadcrumbComponent } from "@features/blog/components/breadcrumb/breadcrumb.component";
import { Breadcrumb } from "@features/blog/components/breadcrumb/breadcrumb.types";
import { DataNotFoundComponent } from "@features/blog/components/data-not-found/data-not-found.component";

import { BlogService } from "@shared/services/blog/blog.service";
import { BlogList } from "@shared/services/blog/blog.types";
import { FileService } from "@shared/services/file/file.service";

import { LocalizeRouterPipe } from "@gilsdav/ngx-translate-router";

@Component({
  selector: "app-search-result",
  standalone: true,
  imports: [
    BreadcrumbComponent,
    DataNotFoundComponent,
    DatePipe,
    FormsModule,
    LocalizeRouterPipe,
    NgClass,
    NgIf,
  ],
  templateUrl: "./search-result.component.html",
  styleUrl: "./search-result.component.scss",
})
export class SearchResultComponent implements OnInit {
  searchKey?: string;
  searchValue: string = "";
  blogList?: BlogList;
  isEmpty: boolean = true;
  type?: string;
  cateBlog = ["All", "News", "Events", "Articles"];
  selectedItem: number = 0;
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
      title: this.searchKey,
    },
  ];

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _blogService: BlogService,
    private _fileService: FileService
  ) {
    this.searchKey = this._route.snapshot.queryParamMap.get("q")!;
    this.breadcrumb[2]!.title = this._route.snapshot.queryParamMap.get("q")!;
  }

  ngOnInit() {
    this._blogService.blogContent$.subscribe(value => {
      this.blogList = value;
      if (this.blogList.blogs.length == 0) {
        this.isEmpty = true;
      }
    });
  }

  selectItem(index: number) {
    this.selectedItem = index;
    switch (this.selectedItem) {
      case 0:
        this._router.navigate(["blog"]);
        break;
      case 1:
        this._router.navigate(["blog/news"]);
        break;
      case 2:
        this._router.navigate(["blog/events"]);
        break;
      case 3:
        this._router.navigate(["blog/articles"]);
        break;
    }
  }
  getImageBlog(path: string) {
    return this._fileService.getImageBlog(path);
  }

  onSearch(value: string): void {
    this._router
      .navigate(["blog/blog-search"], { queryParams: { q: value } })
      .then(() => {
        window.location.reload();
      });
  }
}
