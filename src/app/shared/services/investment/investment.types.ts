import { Crypto, Pair } from "@shared/services/crypto/crypto.types";
import { Estate } from "@shared/services/estate/estate.types";
import { InvestmentTypeEnums } from "@shared/services/investment/investment.enums";
import { Image, Pagination } from "@shared/types/core.types";

export interface InvestmentPagination {
  pagination: Pagination;
  investments: Investment[];
}

export interface Investment {
  id: string;
  balance: number;
  amount: number;
  investor: number;
  progress: number;
  estate: Estate;
  crypto: Crypto;
  type: InvestmentTypeEnums;
  createdAt: Date;
  updatedAt: Date;
  maximumInvest: number;
  minimumInvest: number;
  tokenName: string;
  periodAt: Date;
  profitRange: number;
  profitAmount: number;
  successAt: Date;
  tag: number;
  totalInvest: number;
  contractAddress: InvestmentContractAddressResponse;
  management: management;
  investmentPeriods: InvestmentPeriods[];
}

export interface InvestmentPeriods {
  investmentPeriodId: string;
  investmentStartAt: Date;
  investmentEndAt: Date;
}

export interface management {
  id: string;
  name: string;
  description: string;
  image: Image;
  imagePath: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InvestmentContractAddressResponse {
  id: string;
  symbol: string;
  contractAddress: string;
  balance: number;
  investment: Investment;
  ownerAddress: string;
  pair: Pair;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoadMap {
  id: string;
  title: string;
  description: string;
  sort: number;
  roadmapAt: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface VoteInvestment {
  investmentId?: string;
  title: string;
  description: string;
}
