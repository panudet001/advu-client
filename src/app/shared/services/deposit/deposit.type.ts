import { Pagination } from "@shared/types/core.types";

export interface DepositHistoryPagination {
  depositHistories: DepositHistories[];
  pagination: Pagination;
}

export interface DepositHistories {
  id: string;
  amount: number;
  fromAddress: string;
  toAddress: string;
  txnHash: string;
  chain: Chain;
  status: string;
  crypto: Crypto;
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
  id: string;
  name: string;
  symbol: string;
  image: string;
}
