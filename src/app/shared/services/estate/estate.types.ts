import { Gallery } from "@shared/services/gallery/gallery.types";
import { Image, Pagination, Property } from "@shared/types/core.types";

export interface EstatePagination {
  pagination: Pagination;
  estates: Estate[];
}

export interface Estate {
  id: string;
  title: string;
  slug: string;
  code: string;
  investType: number;
  isCapitalBack: boolean;
  minimumInvest: number;
  maximumInvest: number;
  totalInvest: number;
  isPeriod: boolean;
  periodDuration: number;
  imageThumbnailPath: string;
  profitRange: number;
  lossRange: number;
  isAcceptNewInvestor: boolean;
  isAcceptInstallments: boolean;
  isActive: boolean;
  address: string;
  latitude: number;
  longitude: number;
  mapUrl: string;
  description: string;
  highlights: string;
  imagePreview: Image;
  imageThumbnail: Image;
  galleries: Gallery[];
  properties: Property[];
  createdAt: Date;
  updatedAt: Date;
}
