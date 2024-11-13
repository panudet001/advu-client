import { InvestmentOrderStatusEnums } from "@shared/enums/investment-order.enums";
import { Investment } from "@shared/services/investment/investment.types";
import { User } from "@shared/services/user/user.types";

export interface InvestmentOrderRequest {
  investmentId: string;
  amount: number;
}

export interface InvestmentResetOTPRequest {
  email: string;
  otpKey: string;
}

export interface InvestmentOrder {
  id: string;
  amount: number;
  walletAddress: string;
  user: User;
  dominate: number;
  status: InvestmentOrderStatusEnums;
  investment: Investment;
  link: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OtpResponse {
  otpKey: string;
  expired: number;
}

export interface MyInvestmentAmountResponse {
  amount: string;
}
