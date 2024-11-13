export interface WithdrawCrypto {
  slug: string;
  name: string;
  symbol: string;
  cryptoImagePath: string;
  fees: number;
  networks: Networks[];
}

export interface Networks {
  walletAddress: string;
  processingTime: number;
  confirmationPerSec: number;
  minimumAmount: number;
  chain: Chain;
}

export interface Chain {
  slug: string;
  name: string;
  symbol: string;
  networkType: string;
  networkId: number;
  explorer: string;
}

export interface WithdrawRequest {
  amount: number;
  cryptoSlug: string;
  chainSlug: string;
  toAddress: string;
  otpCode?: string;
}

export interface WithdrawResetOTPRequest {
  email: string;
  otpKey: string;
}

export interface OtpResponse {
  otpKey: string;
  email: string;
  expired: string;
}

export interface Withdraw {
  cryptoSymbol: string;
  cryptoImagePath: string;
  amount: number;
  chainName: string;
  chainSymbol: string;
  createdAt: string;
  to: string;
  status: string;
  link: string;
}
