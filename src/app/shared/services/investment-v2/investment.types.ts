import { InvestmentEnums } from "@shared/services/investment-v2/investment.enums";
import { Pagination } from "@shared/types/core.types";

export interface InvestmentPagination {
  pagination: Pagination;
  estates: Investment[];
}

export interface Investment {
  title: string;
  slug: string;
  type: InvestmentEnums;
  imagePath: string;
  address: string;
  longitude: number;
  latitude: number;
  percent: number;
  totalInvest: number;
  investor: number;
  yield: number;
  minimumInvest: number;
  size: number;
  estateProperties: Properties[];
  cryptoSymbol: string;
  startDate: Date;
  description: string;
  thumbnailPath: string;
  galleryPaths: string[];
  contractAddress: ContractAddress;
  investment: Investment;
  managements: Managements[];
  properties: Properties[];
  userOrder: UserOrder;
}

export interface UserOrder {
  orderAmount: 0;
  userBalance: 5000;
}

export interface Properties {
  title: string;
  icon: string;
  capacity: number;
}

export interface ContractAddress {
  cryptoSymbol: string;
  cryptoImagePath: string;
  totalSupply: number;
  chainName: string;
  chainNetworkType: string;
  contractAddress: string;
  ownerAddress: string;
}

export interface Investment {
  totalInvest: number;
  investmentBalance: number;
  minimumInvest: number;
  maximumInvest: number;
  yield: number;
  percent: number;
  investor: number;
  cryptoSymbol: string;
  cryptoImagePath: string;
  startDate: Date;
  endDate: Date;
}

export interface Managements {
  name: string;
  description: string;
  imagePath: string;
}
