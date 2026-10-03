import { ClientMiddleware } from 'nice-grpc';
import { RetryPolicy } from '@grpc/grpc-js';
import { IExtensions } from './interfaces.js';

declare const callerMiddleware: (callerAndEnv: [string, string]) => ClientMiddleware;
declare const retryMiddleware: (retryPolicy?: Partial<RetryPolicy>) => ClientMiddleware;
declare const extensionsMiddleware: (extensions?: IExtensions) => ClientMiddleware;
declare const txIxMiddleware: () => ClientMiddleware;

export { callerMiddleware, extensionsMiddleware, retryMiddleware, txIxMiddleware };
