import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class FileService {
  getImage(fileName: string) {
    return `${environment.apiUrl}/images/${fileName}`;
  }
  getImageBlog(path: string) {
    return `${environment.apiUrl}/images/${path}`;
  }

  getImageV2(fileName: string) {
    return `${environment.apiUrl}${fileName}`;
  }
}
