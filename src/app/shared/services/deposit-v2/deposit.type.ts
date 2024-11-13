import { Pagination } from "@shared/types/core.types";

export interface DepositHistoryPagination {
  depositHistories: Deposits[];
  pagination: Pagination;
}

export interface Deposits {
  cryptoSymbol: string;
  cryptoImagePath: string;
  amount: number;
  chainName: string;
  chainSymbol: string;
  createdAt: string;
  txnHash: string;
  from: string;
  status: string;
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

export interface DepositCrypto {
  slug: string;
  name: string;
  symbol: string;
  cryptoImagePath: string;
  fees: number;
  balance: number;
  networks: Networks[];
}

export interface Networks {
  walletAddress: string;
  processingTime: number;
  confirmationPerSec: number;
  minimumAmount: number;
  contractAddress: string;
  chain: Chains;
}

export interface Chains {
  slug: string;
  name: string;
  symbol: string;
  networkType: string;
  networkId: number;
  explorer: string;
}
