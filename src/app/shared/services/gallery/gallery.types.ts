import { Image } from "@shared/types/core.types";

export interface Gallery {
  fileName: string;
  type: string;
  image: Image;
  imagePath: string;
  sort: string;
}
