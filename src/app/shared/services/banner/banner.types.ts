import { Image } from "@shared/types/core.types";

export interface Banner {
  id: string;
  sort: number;
  title: string;
  description: string;
  imagePath: string;
  image: Image;
  createdAt: Date;
  updatedAt: Date;
}
