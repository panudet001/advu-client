export class ErrorConstants {
  // HTTP ERROR 401
  public static unauthorized = "UNAUTHORIZED";

  // HTTP ERROR 500
  public static http500 = "HTTP_500";

  // Admin
  public static accountNotFound = "ACCOUNT_NOT_FOUND";

  // Permission
  public static permissionIsAlready = "PERMISSION_IS_ALREADY";
  public static permissionNotFound = "PERMISSION_NOT_FOUND";

  // Config Worker
  public static configWorkerNotFound = "CONFIG_WORKER_NOT_FOUND";

  // Fee
  public static feeNotFound = "FEE_NOT_FOUND";
  public static feeTypeIsAlreadyCreate = "FEE_TYPE_IS_ALREADY_CREATE";

  // File
  public static imageNotYouPermission = "IMAGE_NOT_YOU_PERMISSION";
  public static imageUploadNotFound = "IMAGE_UPLOAD_NOT_FOUND";
  public static imageNotFound = "IMAGE_NOT_FOUND";
  public static imageIsInRelation = "IMAGE_IS_IN_RELATION";

  // Authorization
  public static tokenNotFound = "TOKEN_NOT_FOUND";
  public static tokenOrRefreshTokenInvalid = "TOKEN_OR_REFRESH_TOKEN_INVALID";
  public static ThisTokenIsAlreadyExpired = "THIS_TOKEN_IS_ALREADY_EXPIRED";

  // User
  public static userNotFound = "USER_NOT_FOUND";
  public static userUsernameUnique = "USER_USERNAME_UNIQUE";
  public static userMobileUnique = "USER_MOBILE_UNIQUE";
  public static userEmailUnique = "USER_EMAIL_UNIQUE";
  public static userInCorrect = "USER_IS_INCORRECT";
  public static usernameNotFound = "USERNAME_NOT_FOUND";
  public static usernameIsYou = "USERNAME_IS_YOU";
  public static userBanded = "USER_BANDED";
  public static userEnoughBalance = "USER_ENOUGH_BALANCE";
  public static inValidNumber = "IN_VALID_NUMBER";

  // Estate
  public static estateNotFound = "ESTATE_NOT_FOUND";
  public static estateGalleryNotFound = "ESTATE_GALLERT_NOT_FOUND";
  public static estatePropertyNotFound = "ESTATE_PROPERTY_NOT_FOUND";
  public static estateTitleUnique = "ESTATE_TITLE_UNIQUE";
  public static estateSlugUnique = "ESTATE_SLUG_UNIQUE";
  public static estateAmountIsIncorrect = "ESTATE_AMOUNT_IS_INCORRECT";

  // Investment
  public static investmentNotFound = "INVESTMENT_NOT_FOUND";
  public static investmentEstateUnique = "INVESTMENT_ESTATE_UNIQUE";
  public static investmentIsLive = "INVESTMENT_IS_LIVE";
  public static investmentIsFunded = "INVESTMENT_IS_FUNDED";
  public static investmentBalanceNotEnough = "INVESTMENT_BALANCE_NOT_ENOUGH";
  public static investmentCanNotDelete = "INVESTMENT_CAN_NOT_DELETE";
  public static investmentCanNotInActive = "INVESTMENT_CAN_NOT_IN_ACTIVE";
  public static investmentCanNotTag = "INVESTMENT_CAN_NOT_TAG";
  public static investmentIsNotAvailable = "INVESTMENT_IS_NOT_AVAILIABE";

  // Investment Order
  public static investmentOrderNotFound = "INVESTMENT_ORDER_NOT_FOUND";
  public static investmentIsMaximum = "INVESTMENT_IS_MAXIMUM";
  public static investmentIsMinimum = "INVESTMENT_IS_MINIMUM";
  public static investmentIsLimitOnThree = "INVESTMENT_IS_LIMIT_ON_THREE";

  // Investment Roadmap
  public static investmentRoadmapNotFound = "INVESTMENT_ROADMAP_NOT_FOUND";
  public static investmentRoadmapIsDefault = "INVESTMENT_ROADMAP_IS_DEFAULT";

  // Investment Contract Address
  public static investmentContractAddressNotFound =
    "INVESTMENT_CONTRACT_ADDRESS_NOT_FOUND";
  public static investmentContractAddressIsAlreadyInUse =
    "INVESTMENT_CONTRACT_ADDRESS_IS_ALREADY_IN_USE";

  // Banner
  public static bannerNotFound = "BANNER_NOT_FOUND";

  // Chain
  public static chainNetworkIdUnique = "CHAIN_NETWORK_ID_UNIQUE";
  public static chainNameUnique = "CHAIN_NAME_UNIQUE";
  public static chainNotFound = "CHAIN_NOT_FOUND";

  // Pair
  public static pairDataUnique = "PAIR_DATA_UNIQUE";
  public static pairNotFound = "PAIR_NOT_FOUND";

  // OTP
  public static otpNotFound = "OTP_NOT_FOUND";
  public static otpTimeNotYet = "OTP_TIME_NOY_YET";
  public static otpInCorrect = "OTP_INCORRECT";
  public static otpExpired = "OTP_EXPIRED";

  // Wallet
  public static walletNotFound = "WALLET_NOT_FOUND";
  public static walletNotEnough = "WALLET_NOT_ENOUGH";

  // WalletAddress
  public static walletAddressIsInValid = "WALLET_ADDRESS_IS_IN_VALID";
  public static walletAddressNotFound = "WALLET_ADDRESS_NOT_FOUND";

  // Payment Method
  public static paymentMethodNotFound = "PAYMENT_METHOD_NOT_FOUND";
  public static paymentMethodNameUnique = "PAYMENT_METHOD_NAME_UNIQUE";

  // Crypto
  public static cryptoNotFound = "CRYPTO_NOT_FOUND";
  public static cryptoNameUnique = "CRYPTO_NAME_UNIQUE";
  public static cryptoCodeUnique = "CRYPTO_CODE_UNIQUE";
  public static cryptoSymbolUnique = "CRYPTO_SYMBOL_UNIQUE";

  // Currency
  public static currencyNotFound = "CURRENCY_NOT_FOUND";
  public static currencyNameUnique = "CURRENCY_NAME_UNIQUE";
  public static currencyCodeUnique = "CURRENCY_CODE_UNIQUE";
  public static currencySymbolUnique = "CURRENCY_SYMBOL_UNIQUE";

  // Role
  public static roleNotFound = "ROLE_NOT_FOUND";
  public static roleIsAlready = "ROLE_IS_ALREADY";

  // Notification
  public static notificationNotFound = "NOTIFICATION_NOT_FOUND";
  public static notificationIsRead = "NOTIFICATION_IS_READ";
  public static notificationIsNotOwner = "NOTIFICATION_IS_NOT_OWNER";

  // Withdrawal
  public static withdrawalNotFound = "WITHDRAWAL_NOT_FOUND";
  public static withdrawalCanNotRefund = "WITHDRAWAL_CAN_NOT_REFUND";
  public static withdrawalCanNotCancel = "WITHDRAWAL_CAN_NOT_CANCEL";
  public static balanceNotEnough = "BALANCE_NOT_ENOGH";

  // Transaction
  public static transactionNotFound = "TRANSACTION_NOT_FOUND";

  // Ticket
  public static canNotOpenTicket = "CAN_NOT_OPEN_TICKET";
  public static ticketNotFound = "TICKET_NOT_FOUND";

  // Etc
  public static advertisementOwner = "ADVERTISEMENT_OWNER";
  public static passwordNotMatch = "PASSWORD_NOT_MATCH";
  public static oneOrMoreValidate = "One or more validation errors occurred.";
  public static amountIsInCorrect = "AMOUNT_IS_INCORRECT";
  public static reCaptcha = "RE_CAPTCHA";
}
