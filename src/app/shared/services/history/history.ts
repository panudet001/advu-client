import { Pagination } from "@shared/types/core.types";

export interface ProfitHistoryPagination {
  profitHistories: ProfitHistories[];
  pagination: Pagination;
}

export interface ProfitHistories {
  id: string;
  amount: number;
  fromAddress: string;
  toAddress: string;
  txnHash: string;
  chain: Chain;
  status: string;
  cryptoMain: Crypto;
  cryptoProperty: Crypto;
  createdAt: string;
  updatedAt: string;
}

export interface WithdrawHistoryPagination {
  withdraws: WithdrawHistories[];
  pagination: Pagination;
}

export interface WithdrawHistories {
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

export interface DepositHistoryPagination {
  deposits: DepositHistories[];
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

export interface OrderHistoryPagination {
  orderHistories: OrderHistories[];
  pagination: Pagination;
}

export interface OrderHistories {
  id: string;
  amount: number;
  fromAddress: string;
  toAddress: string;
  txnHash: string;
  estate: Estate;
  chain: Chain;
  status: string;
  cryptoMain: Crypto;
  cryptoProperty: Crypto;
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

export interface Estate {
  id: string;
  name: string;
  image: string;
  address: string;
}
