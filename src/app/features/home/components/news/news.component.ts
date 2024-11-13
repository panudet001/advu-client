import { DatePipe, SlicePipe } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";

import { DataNotFoundComponent } from "@features/blog/components/data-not-found/data-not-found.component";

import { BlogService } from "@shared/services/blog/blog.service";
import { BlogList } from "@shared/services/blog/blog.types";
import { FileService } from "@shared/services/file/file.service";

import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-news",
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.scss"],
  standalone: true,
  imports: [DataNotFoundComponent, DatePipe, SlicePipe, TranslateModule],
})
export class NewsComponent implements OnInit {
  @Input() title!: string;
  @Input() detail!: string;
  blogHome?: BlogList;

  constructor(
    private _blogService: BlogService,
    private _fileService: FileService
  ) {}
  ngOnInit(): void {
    this._blogService.blogContent$.subscribe(value => {
      this.blogHome = value;
    });
  }
  getImageBlog(path: string) {
    return this._fileService.getImageBlog(path);
  }
}
