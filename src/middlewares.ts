import { ClientError, ClientMiddleware, Metadata } from "nice-grpc";
import { RetryPolicy } from "@grpc/grpc-js";
import { transformTxIx } from "./txIx";
import { IExtensions } from "./interfaces";
import { backoffWithJitter, delay, nonRetryables } from "./utils";

export const callerMiddleware = (
  callerAndEnv: [string, string],
): ClientMiddleware =>
  async function* (call, options) {
    const metadata = options.metadata ?? new Metadata();
    const [caller, env] = callerAndEnv;

    metadata.set("z-caller", caller);
    metadata.set("z-env", env);

    options.metadata = metadata;

    return yield* call.next(call.request, options);
  };

export const retryMiddleware = (
  retryPolicy?: Partial<RetryPolicy>,
): ClientMiddleware =>
  async function* (call, options) {
    if (!retryPolicy) return yield* call.next(call.request, options);

    const {
      maxAttempts = 1,
      initialBackoff,
      maxBackoff,
      backoffMultiplier,
    } = retryPolicy;
    const { path } = call.method;
    const method = path.split("/").at(-1)!;

    let attempt = 0;

    while (true) {
      try {
        return yield* call.next(call.request, options);
      } catch (err) {
        if (
          ++attempt >= maxAttempts ||
          !(err instanceof ClientError) ||
          nonRetryables.has(method)
        ) {
          throw err;
        }

        await delay(
          backoffWithJitter(
            attempt + 1,
            initialBackoff,
            maxBackoff,
            backoffMultiplier,
          ),
        );
      }
    }
  };

export const extensionsMiddleware = (
  extensions?: IExtensions,
): ClientMiddleware =>
  async function* (call, options) {
    if (!extensions) return yield* call.next(call.request, options);

    const start = Date.now();
    const { path } = call.method;
    const method = path.split("/").at(-1)!;
    const defaults = { path, method };

    try {
      const res = yield* call.next(call.request, options);

      const duration = Date.now() - start;
      await extensions.logger?.("info", {
        ...defaults,
        ...res,
        duration,
      });
      await extensions.metrics?.(method, path, "Ok", Date.now() - start);

      return res;
    } catch (err: any) {
      const duration = Date.now() - start;
      await extensions.logger?.(
        "error",
        { ...defaults, duration },
        {
          code: err.status,
          raw: err,
          message: err.details,
        },
      );
      await extensions.metrics?.(method, path, err.status, duration);

      throw err;
    }
  };

export const txIxMiddleware = (): ClientMiddleware =>
  async function* (call, options) {
    const { transformed, ...req } = transformTxIx(call, "toWire");
    const res = yield* call.next(req, options);
    return transformTxIx(res, "fromWire", transformed);
  };
