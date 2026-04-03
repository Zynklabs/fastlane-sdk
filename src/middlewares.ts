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
      console.debug(`[${path}] attempt count: ${attempt + 1}`);

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

    let error;
    let code = "Ok";
    let level = "info";
    let payload = { path, method, message: code };

    try {
      const res = yield* call.next(call.request, options);
      payload = { ...payload, ...res };

      return res;
    } catch (err: any) {
      code = err.code;
      level = "error";
      error = {
        code,
        raw: err,
        message: err.details,
      };

      throw err;
    } finally {
      const duration = Date.now() - start;
      await extensions.logger(level as any, { ...payload, duration }, error);
      await extensions.metrics?.(method, path, code, duration);
    }
  };

export const txIxMiddleware = (): ClientMiddleware =>
  async function* (call, options) {
    const { transformed, ...req } = transformTxIx(call, "toWire");

    const _res = yield* call.next(req, options);
    const res = transformTxIx(_res, "fromWire", transformed);

    delete res["transformed"];
    return res;
  };
