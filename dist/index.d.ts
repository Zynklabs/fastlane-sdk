import { BaseClient, Token, Denom } from './stubs/base.js';
export { AccountInfoResponse, AddressResponse, Asset, AtaAddressResponse, Balance, Balances, BalancesItem, BalancesItem_BalancesEntry, BuildEd25519IxRequest, DecodeEventRequest, EventData, ExecuteTxResponse, GenerateHashedArrayRequest, GetAccountInfoRequest, GetAddressRequest, GetAtaAddressRequest, GetBalanceRequest, GetBalancesRequest, GetOrCreateAtaRequest, GetOrCreateAtaResponse, GetOwnerRequest, GetOwnerResponse, GetTokenAccountOwnerRequest, GetTxCostRequest, GetTxDetailsRequest, GetTxStatusRequest, HashedArrayResponse, TokenAccountOwnerResponse, TxCost, TxDetails, TxStatus } from './stubs/base.js';
import { CoreClient } from './stubs/core.js';
export { AttestOrderRequest, CreateOrderRequest, DeriveOrderTrackerRequest, DomainSeparatorRequest, DomainSeparatorResponse, GenerateOrderIdRequest, GetPdvRequest, MetaArg, OrderIdResponse, OrderTrackerData, OrderTrackerResponse, PdvResponse, ReadOrderTrackerByAddressRequest, ReadOrderTrackerByIdsRequest, ReplenishRequest, TransferRequest, TxResponse, TxResponse_MetaEntry } from './stubs/core.js';
import { OrbitClient } from './stubs/orbit.js';
export { GetPdaRequest, TxResponse as OrbitTxResponse, PdaResponse, SpendTokensRequest, TransferPdaToWalletRequest, TransferToLpRequest } from './stubs/orbit.js';
import { KaminoClient } from './stubs/kamino.js';
export { BorrowCapacityRequest, BorrowCapacityResponse, BorrowRequest, CbrRequest, CbrResponse, DepositCollateralRequest, DepositRequest, EstimateYieldRequest, EstimateYieldResponse, GetStatsRequest, KaminoTx, RefreshStatsRequest, RepayRequest, StatsResponse, WithdrawRequest } from './stubs/kamino.js';
import { IOptions } from './interfaces.js';
export { Ed25519Pair, ExecuteTxRequest } from './stubs/index.js';
import '@bufbuild/protobuf/wire';
import 'nice-grpc-common';
import '@grpc/grpc-js';
import '@solana/web3.js';

declare const _default: (endpoint: string, options?: IOptions) => {
    base: BaseClient<{}>;
    core: CoreClient<{}>;
    orbit: OrbitClient<{}>;
    kamino: KaminoClient<{}>;
    Token: typeof Token;
    Denom: typeof Denom;
};

export { Denom, IOptions, Token, _default as default };
