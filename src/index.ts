import { createChannel, createClientFactory } from "nice-grpc";
import { BaseClient, BaseDefinition, Token, Denom } from "./stubs/base";
import { CoreClient, CoreDefinition } from "./stubs/core";
import { OrbitClient, OrbitDefinition } from "./stubs/orbit";
import { KaminoClient, KaminoDefinition } from "./stubs/kamino";
import { getCallerAndEnv } from "./utils";
import {
  callerMiddleware,
  retryMiddleware,
  txIxMiddleware,
  extensionsMiddleware,
} from "./middlewares";
import { IOptions } from "./interfaces";
import { EvmClient, EvmDefinition } from "./stubs/evm";

export default (endpoint: string, options?: IOptions) => {
  const { overrides, extensions, retryPolicy } = options || {};

  const clientFactory = createClientFactory()
    .use(callerMiddleware(getCallerAndEnv(overrides)))
    .use(extensionsMiddleware(extensions))
    .use(retryMiddleware(retryPolicy))
    .use(txIxMiddleware());

  const channel = createChannel(endpoint);

  const base: BaseClient = clientFactory.create(BaseDefinition, channel);
  const core: CoreClient = clientFactory.create(CoreDefinition, channel);
  const orbit: OrbitClient = clientFactory.create(OrbitDefinition, channel);
  const kamino: KaminoClient = clientFactory.create(KaminoDefinition, channel);
  const evm: EvmClient = clientFactory.create(EvmDefinition, channel);

  return { base, core, orbit, kamino, evm, Token, Denom };
};

export * from "./stubs";
