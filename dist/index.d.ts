import { BaseClient, Token, Denom } from "./stubs/base";
import { CoreClient } from "./stubs/core";
import { KaminoClient } from "./stubs/kamino";
import { IOverrides } from "./utils";
declare const _default: (endpoint: string, overrides?: IOverrides) => {
    core: CoreClient<{}>;
    base: BaseClient<{}>;
    kamino: KaminoClient<{}>;
    Token: typeof Token;
    Denom: typeof Denom;
};
export default _default;
export * from "./stubs";
