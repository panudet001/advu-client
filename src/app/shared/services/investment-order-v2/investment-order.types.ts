import { Properties } from "@shared/services/investment-v2/investment.types";
import { Pagination } from "@shared/types/core.types";

export interface InvestmentOrderRequest {
  amount: number;
}

export interface InvestmentResetOTPRequest {
  email: string;
  otpKey: string;
}

export interface InvestmentOrderPagination {
  pagination: Pagination;
  orders: InvestmentOrder[];
}

export interface InvestmentOrder {
  orderAmount: number;
  title: string;
  slug: string;
  type: string;
  imagePath: string;
  address: string;
  percent: number;
  totalInvest: number;
  investor: number;
  yield: number;
  minimumInvest: number;
  size: number;
  cryptoSymbol: string;
  startDate: Date;
  estateProperties: Properties[];
}

export interface OtpResponse {
  otpKey: string;
  expired: number;
}

export interface MyInvestmentAmountResponse {
  amount: string;
}
