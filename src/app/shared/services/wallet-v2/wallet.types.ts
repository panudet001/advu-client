import { Pagination } from "@shared/types/core.types";

export interface MyWallet {
  occupyResponses: OccupyResponses[];
  tokenWalletPaginationResponse: TokenWalletPaginationResponse;
}

export interface OccupyResponses {
  percent: number;
  symbol: string;
  name: string;
}

export interface TokenWalletPaginationResponse {
  tokenWalletResponses: TokenWalletResponses[];
  pagination: Pagination;
}

export interface TokenWalletResponses {
  cryptoSymbol: string;
  cryptoImagePath: string;
  balance: number;
  investment: Investment;
  estate: Estate;
  percent: string;
  profit: string;
  difference: string;
}

export interface Investment {
  cryptoSymbol: string;
  cryptoImagePath: string;
  type: string;
  yield: number;
  totalInvest: number;
}

export interface Estate {
  title: string;
  slug: string;
  address: string;
  thumbnailImagePath: string;
  properties: Properties[];
}

export interface Properties {
  icon: string;
  capacity: string;
}
