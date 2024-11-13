export interface pair {
  id: string;
  chain: Chain;
  crypto: Crypto;
  contractAddress: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Chain {
  id: string;
  name: string;
  symbol: string;
  networkType: string;
  networkId: number;
  rpc: string;
  link: string;
  processingTime: number;
  confirmation: number;
  createdAt: string;
  updatedAt: string;
}

export interface Crypto {
  id: string;
  name: string;
  code: string;
  symbol: string;
  rate: number;
  type: string;
  isDefault: boolean;
  imagePath: string;
  createdAt: string;
  updatedAt: string;
}
