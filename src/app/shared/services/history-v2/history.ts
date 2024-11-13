import { Pagination } from "@shared/types/core.types";

export interface ProfitHistoryPagination {
  profits: ProfitHistories[];
  pagination: Pagination;
}

export interface ProfitHistories {
  amount: number;
  fromAddress: string;
  toAddress: string;
  txnHash: string;
  status: string;
  crypto: Crypto;
  token: Crypto;
  createdAt: string;
  updatedAt: string;
}

export interface WithdrawHistoryPagination {
  withdraws: WithdrawHistories[];
  pagination: Pagination;
}

export interface WithdrawHistories {
  cryptoSymbol: string;
  cryptoImagePath: number;
  amount: number;
  chainName: string;
  chainSymbol: string;
  createdAt: string;
  txnHash: string;
  to: string;
  status: string;
  link: string;
}

export interface DepositHistoryPagination {
  deposits: DepositHistories[];
  pagination: Pagination;
}

export interface DepositHistories {
  cryptoSymbol: string;
  cryptoImagePath: string;
  amount: number;
  chainName: string;
  chainSymbol: string;
  createdAt: string;
  txnHash: string;
  from: string;
  status: string;
  link: string;
}

export interface OrderHistoryPagination {
  orders: OrderHistories[];
  pagination: Pagination;
}

export interface OrderHistories {
  id: string;
  amount: number;
  fromAddress: string;
  toAddress: string;
  txnHash: string;
  status: string;
  estate: Estate;
  crypto: Crypto;
  token: Crypto;
  createdAt: string;
  updatedAt: string;
}

export interface Chain {
  id: string;
  name: string;
  networkId: number;
  link: string;
}

export interface Crypto {
  slug: string;
  name: string;
  symbol: string;
  cryptoImagePath: string;
}

export interface Estate {
  slug: string;
  name: string;
  thumbnailImagePath: string;
  address: string;
}
