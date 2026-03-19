import {
  createChannel,
  createClientFactory,
  ClientMiddleware,
  Metadata,
} from "nice-grpc";
import { BaseClient, BaseDefinition, Token, Denom } from "./stubs/base";
import { CoreClient, CoreDefinition } from "./stubs/core";
import { KaminoClient, KaminoDefinition } from "./stubs/kamino";
import { getCallerAndEnv, IOverrides } from "./utils";

const callerMiddleware = (callerAndEnv: [string, string]): ClientMiddleware =>
  async function* (call, options) {
    const metadata = options.metadata ?? new Metadata();
    const [caller, env] = callerAndEnv;

    metadata.set("z-caller", caller);
    metadata.set("z-env", env);

    options.metadata = metadata;

    return yield* call.next(call.request, options);
  };

export default (endpoint: string, overrides?: IOverrides) => {
  const callerAndEnv = getCallerAndEnv(overrides);

  const clientFactory = createClientFactory().use(
    callerMiddleware(callerAndEnv),
  );

  const channel = createChannel(endpoint);

  const core: CoreClient = clientFactory.create(CoreDefinition, channel);
  const base: BaseClient = clientFactory.create(BaseDefinition, channel);
  const kamino: KaminoClient = clientFactory.create(KaminoDefinition, channel);

  return { core, base, kamino, Token, Denom };
};
