import { createChannel, createClientFactory } from "nice-grpc";
import { BaseClient, BaseDefinition, Token, Denom } from "./stubs/base";
import { CoreClient, CoreDefinition } from "./stubs/core";
import { OrbitClient, OrbitDefinition } from "./stubs/orbit";
import { KaminoClient, KaminoDefinition } from "./stubs/kamino";
import { getCallerAndEnv } from "./utils";
import {
  callerMiddleware,
  loggerMiddleware,
  retryMiddleware,
  txIxMiddleware,
} from "./middlewares";
import { IOptions } from "./_";

export default (endpoint: string, options?: IOptions) => {
  const { overrides, logger, retryPolicy } = options || {};

  const clientFactory = createClientFactory();
  clientFactory.use(callerMiddleware(getCallerAndEnv(overrides)));
  if (retryPolicy) clientFactory.use(retryMiddleware(retryPolicy));
  if (logger) clientFactory.use(loggerMiddleware(logger));
  clientFactory.use(txIxMiddleware());

  const channel = createChannel(endpoint);

  const base: BaseClient = clientFactory.create(BaseDefinition, channel);
  const core: CoreClient = clientFactory.create(CoreDefinition, channel);
  const orbit: OrbitClient = clientFactory.create(OrbitDefinition, channel);
  const kamino: KaminoClient = clientFactory.create(KaminoDefinition, channel);

  return { base, core, orbit, kamino, Token, Denom };
};

export * from "./stubs";
export { IOptions };
