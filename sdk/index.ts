import { createChannel, createClient } from "nice-grpc";
import { BaseClient, BaseDefinition } from "./stubs/base";
import { CoreClient, CoreDefinition } from "./stubs/core";
import { KaminoClient, KaminoDefinition } from "./stubs/kamino";

export default (endpoint: string) => {
  const channel = createChannel(endpoint);

  const core: CoreClient = createClient(CoreDefinition, channel);
  const base: BaseClient = createClient(BaseDefinition, channel);
  const kamino: KaminoClient = createClient(KaminoDefinition, channel);

  return { core, base, kamino };
};
