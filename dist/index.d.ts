import { BaseClient, Token, Denom } from './stubs/base.js';
export { AccountInfoResponse, AddressResponse, Asset, AtaAddressResponse, Balance, Balances, BalancesItem, BalancesItem_BalancesEntry, BuildEd25519IxRequest, ExecuteTxResponse, GenerateHashedArrayRequest, GetAccountInfoRequest, GetAddressRequest, GetAtaAddressRequest, GetBalanceRequest, GetBalancesRequest, GetOrCreateAtaRequest, GetOrCreateAtaResponse, GetOwnerRequest, GetOwnerResponse, GetTokenAccountOwnerRequest, GetTxCostRequest, GetTxDetailsRequest, GetTxStatusRequest, HashedArrayResponse, TokenAccountOwnerResponse, TxCost, TxDetails, TxStatus } from './stubs/base.js';
import { CoreClient } from './stubs/core.js';
export { AttestOrderRequest, CreateOrderRequest, DecodeEventRequest, DeriveOrderTrackerRequest, DomainSeparatorRequest, DomainSeparatorResponse, EventData, GenerateOrderIdRequest, GetPdvRequest, MetaArg, OrderIdResponse, OrderTrackerData, OrderTrackerResponse, PdvResponse, ReadOrderTrackerByAddressRequest, ReadOrderTrackerByIdsRequest, ReplenishRequest, TransferRequest, TxResponse, TxResponse_MetaEntry } from './stubs/core.js';
import { KaminoClient } from './stubs/kamino.js';
export { BorrowCapacityRequest, BorrowCapacityResponse, BorrowRequest, CbrRequest, CbrResponse, DepositCollateralRequest, DepositRequest, EstimateYieldRequest, EstimateYieldResponse, GetStatsRequest, KaminoTx, RefreshStatsRequest, RepayRequest, StatsResponse, WithdrawRequest } from './stubs/kamino.js';
import { IOverrides } from './utils.js';
export { Ed25519Pair, ExecuteTxRequest } from './stubs/index.js';
import '@bufbuild/protobuf/wire';
import 'nice-grpc-common';
import '@solana/web3.js';

declare const _default: (endpoint: string, overrides?: IOverrides) => {
    core: CoreClient<{}>;
    base: BaseClient<{}>;
    kamino: KaminoClient<{}>;
    Token: typeof Token;
    Denom: typeof Denom;
};

export { Denom, Token, _default as default };
