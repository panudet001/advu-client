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
  id: string;
  amount: number;
  fromAddress: string;
  toAddress: string;
  txnHash: string;
  status: string;
  crypto: Crypto;
  chain: Chain;
  createdAt: string;
  updatedAt: string;
}

export interface Crypto {
  id: string;
  name: string;
  symbol: string;
  image: string;
}

export interface Chain {
  id: string;
  name: string;
  networkId: number;
  link: string;
}
