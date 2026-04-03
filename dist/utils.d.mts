import { IOverrides } from './_.mjs';
import '@grpc/grpc-js';

declare const nonRetryables: Set<string>;
declare const delay: (ms: number) => Promise<unknown>;
declare const backoffWithJitter: (attempt: number, initialBackoff?: string | number, maxBackoff?: string | number, multiplier?: number) => number;
declare const getCallerAndEnv: (overrides?: IOverrides) => [string, string];

export { backoffWithJitter, delay, getCallerAndEnv, nonRetryables };
