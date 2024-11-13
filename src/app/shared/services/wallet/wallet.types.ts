import { Crypto } from "@shared/services/crypto/crypto.types";
import { Investment } from "@shared/services/investment/investment.types";
import { Pagination } from "@shared/types/core.types";

export interface MyWallet {
  walletAddresses: WalletAddresses[];
  occupyResponses: OccupyResponses[];
  mainWalletResponses: Wallet[];
  pagination: Pagination;
  wallets: Wallet[];
  propertyWalletPaginationResponse: PropertyWalletPaginationResponse;
}

export interface PropertyWalletPaginationResponse {
  pagination: Pagination;
  propertyWalletResponses: PropertyWalletResponses[];
}

export interface PropertyWalletResponses {
  id: number;
  crypto: Crypto;
  balance: number;
  investment: Investment;
  percent: number;
  profit: number;
  difference: number;
}

export interface OccupyResponses {
  percent: number;
  symbol: string;
  name: string;
}

export interface Wallet {
  id: string;
  crypto: Crypto;
  balance: number;
}

export interface WalletAddresses {
  id: string;
  walletAddress: string;
  chain: Chain;
}

export interface Chain {
  id: string;
  name: string;
  symbol: string;
  processingTime: number;
  confirmation: number;
  networkType: string;
  networkId: number;
  rpc: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
}
