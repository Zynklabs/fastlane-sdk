import { TransactionInstruction } from '@solana/web3.js';
import { TxIx } from './base.mjs';
export { AccountInfoResponse, AddressResponse, Asset, AtaAddressResponse, Balance, Balances, BalancesItem, BalancesItem_BalancesEntry, BuildEd25519IxRequest, DecodeEventRequest, Denom, EventData, ExecuteTxResponse, GenerateHashedArrayRequest, GetAccountInfoRequest, GetAddressRequest, GetAtaAddressRequest, GetBalanceRequest, GetBalancesRequest, GetOrCreateAtaRequest, GetOrCreateAtaResponse, GetOwnerRequest, GetOwnerResponse, GetTokenAccountOwnerRequest, GetTxCostRequest, GetTxDetailsRequest, GetTxStatusRequest, HashedArrayResponse, Token, TokenAccountOwnerResponse, TxCost, TxDetails, TxStatus } from './base.mjs';
export { AttestOrderRequest, CreateOrderRequest, DeriveOrderTrackerRequest, DomainSeparatorRequest, DomainSeparatorResponse, GenerateOrderIdRequest, GetPdvRequest, MetaArg, OrderIdResponse, OrderTrackerData, OrderTrackerResponse, PdvResponse, ReadOrderTrackerByAddressRequest, ReadOrderTrackerByIdsRequest, ReplenishRequest, TransferRequest, TxResponse, TxResponse_MetaEntry } from './core.mjs';
export { GetPdaRequest, TxResponse as OrbitTxResponse, PdaResponse, SpendTokensRequest, TransferPdaToWalletRequest, TransferToLpRequest } from './orbit.mjs';
export { BorrowCapacityRequest, BorrowCapacityResponse, BorrowRequest, CbrRequest, CbrResponse, DepositCollateralRequest, DepositRequest, EstimateYieldRequest, EstimateYieldResponse, GetStatsRequest, KaminoTx, RefreshStatsRequest, RepayRequest, StatsResponse, WithdrawRequest } from './kamino.mjs';
import '@bufbuild/protobuf/wire';
import 'nice-grpc-common';

interface ExecuteTxRequest {
    requestId: string;
    ixs: Array<TxIx | TransactionInstruction>;
    signers: string[];
}
interface Ed25519Pair {
    ed25519Sig: Buffer;
    ed25519Ix?: TxIx | TransactionInstruction | undefined;
}

export type { Ed25519Pair, ExecuteTxRequest };
