import { Pagination } from "@shared/types/core.types";

export interface BlogList {
  blogs: BlogContent[];
  pagination: Pagination;
}
export interface BlogContent {
  id: string;
  slug: string;
  title: string;
  highlights: string;
  imagePreview: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}
export interface BlogDetail {
  blog: Detail;
  recommend: Detail[];
}
export interface Detail {
  id: string;
  title: string;
  subTitle: string;
  slug: string;
  isActive: boolean;
  highlights: string;
  description: string;
  imagePreview: string;
  imageThumbnail: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}
