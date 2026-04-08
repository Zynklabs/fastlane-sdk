import { BaseClient, Token, Denom } from './stubs/base.mjs';
export { AccountInfoResponse, AddressResponse, Asset, AtaAddressResponse, Balance, Balances, BalancesItem, BalancesItem_BalancesEntry, BuildEd25519IxRequest, DecodeEventRequest, EventData, ExecuteTxResponse, GenerateHashedArrayRequest, GetAccountInfoRequest, GetAddressRequest, GetAtaAddressRequest, GetBalanceRequest, GetBalancesRequest, GetOrCreateAtaRequest, GetOrCreateAtaResponse, GetOwnerRequest, GetOwnerResponse, GetTokenAccountOwnerRequest, GetTxCostRequest, GetTxDetailsRequest, GetTxStatusRequest, HashedArrayResponse, TokenAccountOwnerResponse, TxCost, TxDetails, TxStatus } from './stubs/base.mjs';
import { CoreClient } from './stubs/core.mjs';
export { AttestOrderRequest, CreateOrderRequest, DeriveOrderTrackerRequest, DomainSeparatorRequest, DomainSeparatorResponse, GenerateOrderIdRequest, GetPdvRequest, MetaArg, OrderIdResponse, OrderTrackerData, OrderTrackerResponse, PdvResponse, ReadOrderTrackerByAddressRequest, ReadOrderTrackerByIdsRequest, ReplenishRequest, TransferRequest, TxResponse, TxResponse_MetaEntry } from './stubs/core.mjs';
import { OrbitClient } from './stubs/orbit.mjs';
export { GetPdaRequest, TxResponse as OrbitTxResponse, PdaResponse, SpendTokensRequest, TransferPdaToWalletRequest, TransferToLpRequest } from './stubs/orbit.mjs';
import { KaminoClient } from './stubs/kamino.mjs';
export { BorrowCapacityRequest, BorrowCapacityResponse, BorrowRequest, CbrRequest, CbrResponse, DepositCollateralRequest, DepositRequest, EstimateYieldRequest, EstimateYieldResponse, GetStatsRequest, KaminoTx, RefreshStatsRequest, RepayRequest, StatsResponse, WithdrawRequest } from './stubs/kamino.mjs';
import { IOptions } from './interfaces.mjs';
import { EvmClient } from './stubs/evm.mjs';
export { Ed25519Pair, ExecuteTxRequest } from './stubs/index.mjs';
import '@bufbuild/protobuf/wire';
import 'nice-grpc-common';
import '@grpc/grpc-js';
import '@solana/web3.js';

declare const _default: (endpoint: string, options?: IOptions) => {
    base: BaseClient<{}>;
    core: CoreClient<{}>;
    orbit: OrbitClient<{}>;
    kamino: KaminoClient<{}>;
    evm: EvmClient<{}>;
    Token: typeof Token;
    Denom: typeof Denom;
};

export { Denom, Token, _default as default };
