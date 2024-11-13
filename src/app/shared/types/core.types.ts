export interface Pagination {
  length: number;
  size: number;
  page: number;
  lastPage: number;
  startIndex: number;
  endIndex: number;
}

export interface Image {
  id: string;
  type: string;
  imageName: string;
  imagePath: string;
}

export interface Property {
  id: string;
  icon: number;
  title: string;
  value: Image;
  sort: number;
}
