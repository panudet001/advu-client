import { UserStatusEnums } from "@shared/services/user/user.enums";

import { MyWallet } from "../wallet/wallet.types";

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  mobile: string;
  countryCode: string;
  country: string;
  dateOfBirth: Date;
  image: string;
  address: string;
  street: string;
  city: string;
  state: string;
  status: number;
  telegramChatId: string;
  wallets: MyWallet;
  lastMonthInCome: number;
  totalInCome: number;
  withdrawLimit: number;
  isKyc: boolean;
  kyc: Kyc;
  createdAt: Date;
  updatedAt: Date;
}

export interface Kyc {
  id: string;
  nationality: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  fileFront: string;
  fileBack: string;
  fileTake: string;
  description: string;
  type: number;
  status: UserStatusEnums;
  createdAt: Date;
  updatedAt: Date;
}
export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  countryCode: string;
  mobile: string;
  dateOfBirth: Date;
  address: string;
}

export interface KycRequest {
  idCard: string;
  type: number;
  fileImg: string;
}

export interface ImageIdentity {
  id: string;
  imageName: number;
  subType: string;
  type: string;
}

export interface verifyOtpRequest {
  otpCode: string;
}

export interface ResendOtpRequest {
  otpKey: string;
  email: string;
}

export interface ChangePasswordRequest {
  password: string;
  otpCode: string;
}

export interface SendOtpNewEmailRequest {
  otpCode: string;
  email: string;
}

export interface ChangeEmailRequest {
  otpCode: string;
  email: string;
}

export interface UserV2 {
  username: string;
  firstname: string;
  lastname: string;
  countryCode: string;
  email: string;
  mobile: string;
  imagePath: string;
  address: string;
  country: string;
  telegramChatId: string;
  withdrawLimit: number;
  lastMonthInCome: number;
  totalInCome: number;
  isKyc: boolean;
  dateOfBirth: Date;
  createdAt: Date;
  wallets: Wallet;
  kyc: Kyc;
  isDeleted: string;
  recoveryTime: string;
  recoveryToken: string;
}

export interface Wallet {
  walletAddresses: WalletAddresses[];
  wallets: Wallets[];
}

export interface WalletAddresses {
  walletAddress: string;
  chainName: string;
  chainSymbol: string;
  networkType: string;
  networkId: number;
  rpc: string;
  explorer: string;
  processingTime: number;
  confirmation: number;
}

export interface Wallets {
  cryptoName: string;
  cryptoSymbol: string;
  cryptoImagePath: string;
  isDefault: string;
  balance: number;
}
