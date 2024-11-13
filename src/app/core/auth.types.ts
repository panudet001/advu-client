export interface AuthSendOtpRequest {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  address?: string;
  otpCode?: string;
}

export interface AuthSignInRequest {
  username: string;
  password: string;
  otpCode?: string;
}

export interface AuthResendOtpRequest {
  email: string;
  otpKey?: string;
}

export interface AuthResendResetPasswordRequest {
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface OtpResponse {
  otpKey: string;
  email: string;
  expired: number;
}

export interface Auth {
  accessToken: string;
  refreshToken: string;
  expiration: string;
}

export interface VerifyOtpForgotPasswordRequest {
  countryCode: string;
  mobile: string;
  otpCode: string;
}
export interface ResetPasswordRequest {
  countryCode: string;
  mobile: string;
  otpCode: string;
  password: string;
}

export interface SignUpResponse {
  accessToken: string;
  expiration: Date;
  refreshToken: string;
}

export interface DeleteAccountRequest {
  password: string;
}

export interface IpLocation {
  city: string;
  ip_address: string;
}

export interface SetIp {
  ip: string;
  device: string;
  browser: string;
}
