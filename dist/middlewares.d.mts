import { ClientMiddleware } from 'nice-grpc';
import { RetryPolicy } from '@grpc/grpc-js';
import { ILogger } from './_.mjs';

declare const callerMiddleware: (callerAndEnv: [string, string]) => ClientMiddleware;
declare const retryMiddleware: (retryPolicy: Partial<RetryPolicy>) => ClientMiddleware;
declare const loggerMiddleware: (logger: ILogger) => ClientMiddleware;
declare const txIxMiddleware: () => ClientMiddleware;

export { callerMiddleware, loggerMiddleware, retryMiddleware, txIxMiddleware };
