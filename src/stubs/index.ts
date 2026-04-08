import { TransactionInstruction } from "@solana/web3.js";
import { TxIx } from "./base";

export interface ExecuteTxRequest {
  requestId: string;
  ixs: Array<TxIx | TransactionInstruction>;
  signers: string[];
}

export interface Ed25519Pair {
  ed25519Sig: Buffer;
  ed25519Ix?: TxIx | TransactionInstruction | undefined;
}

export type {
  Token,
  Asset,
  Denom,
  Balance,
  Balances,
  BalancesItem,
  BalancesItem_BalancesEntry,
  GenerateHashedArrayRequest,
  HashedArrayResponse,
  BuildEd25519IxRequest,
  GetBalanceRequest,
  GetBalancesRequest,
  GetAddressRequest,
  GetTokenAddressRequest,
  AddressResponse,
  GetAccountInfoRequest,
  AccountInfoResponse,
  GetOwnerRequest,
  GetOwnerResponse,
  GetTokenAccountOwnerRequest,
  TokenAccountOwnerResponse,
  GetAtaAddressRequest,
  AtaAddressResponse,
  GetOrCreateAtaRequest,
  GetOrCreateAtaResponse,
  ExecuteTxResponse,
  GetTxStatusRequest,
  TxStatus,
  GetTxDetailsRequest,
  TxDetails,
  GetTxCostRequest,
  TxCost,
  DecodeEventRequest,
  EventData,
  GetAssetPriceRequest,
  AssetPrice,
} from "./base";

export type {
  DomainSeparatorRequest,
  DomainSeparatorResponse,
  GetPdvRequest,
  PdvResponse,
  GenerateOrderIdRequest,
  OrderIdResponse,
  DeriveOrderTrackerRequest,
  OrderTrackerResponse,
  ReadOrderTrackerByAddressRequest,
  ReadOrderTrackerByIdsRequest,
  OrderTrackerData,
  MetaArg,
  CreateOrderRequest,
  ReplenishRequest,
  TransferRequest,
  AttestOrderRequest,
  TxResponse,
  TxResponse_MetaEntry,
} from "./core";

export type {
  GetPdaRequest,
  PdaResponse,
  SpendTokensRequest,
  TransferToLpRequest,
  TransferPdaToWalletRequest,
  TxResponse as OrbitTxResponse,
} from "./orbit";

export type {
  BorrowCapacityRequest,
  BorrowCapacityResponse,
  GetStatsRequest,
  RefreshStatsRequest,
  StatsResponse,
  CbrRequest,
  CbrResponse,
  EstimateYieldRequest,
  EstimateYieldResponse,
  DepositRequest,
  BorrowRequest,
  RepayRequest,
  WithdrawRequest,
  DepositCollateralRequest,
  KaminoTx,
} from "./kamino";

export type {
  GetChainByNameRequest,
  GetChainByIdRequest,
  ChainDetails,
  GetTokenDetailsRequest,
  TokenDetails,
  GetAllChainsRequest,
  AllChains,
  GetAllTokensRequest,
  AllTokens,
} from "./evm";
