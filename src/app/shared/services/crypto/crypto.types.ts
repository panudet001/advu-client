import { Image } from "@shared/types/core.types";

export interface Crypto {
  id: string;
  name: string;
  code: string;
  symbol: string;
  rate: number;
  type: string;
  isDefault: boolean;
  image: Image;
  imagePath: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WalletAddresses {
  id: string;
  walletAddress: string;
  pair: Pair;
  crypto: Crypto;
  contractAddress: string;
  isActive: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Pair {
  id: string;
  chain: Chain;
  contractAddress: string;
  crypto: Crypto;
  isActive: boolean;
  updatedAt: Date;
  createdAt: Date;
}

export interface Chain {
  id: string;
  name: string;
  networkId: number;
  rpc: string;
  createdAt: Date;
  updatedAt: Date;
}
