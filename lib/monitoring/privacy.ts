/** Strict payload allowlist: freeform messages, request data and user context never leave the app. */
const errorTypes = new Set([
  "Error",
  "TypeError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "URIError",
  "EvalError",
  "AggregateError",
]);
const record = (value: unknown): Record<string, unknown> =>
  value !== null && typeof value === "object"
    ? (value as Record<string, unknown>)
    : {};

export function sanitizeExceptionProperties(
  input: unknown,
  source: "browser" | "server",
) {
  const properties = record(input);
  const list = Array.isArray(properties.$exception_list)
    ? properties.$exception_list
    : [];
  return {
    app: "byjoyaing-portfolio",
    environment: "production",
    source,
    $process_person_profile: false,
    $exception_message: "Application error (message withheld)",
    $exception_list: list.slice(0, 3).map((item: unknown) => {
      const exception = record(item);
      const stack = record(exception.stacktrace);
      const frames = Array.isArray(stack.frames) ? stack.frames : [];
      return {
        type: errorTypes.has(String(exception.type)) ? exception.type : "Error",
        value: "Application error (message withheld)",
        stacktrace: {
          type: "raw",
          frames: frames.slice(-20).map((item: unknown) => {
            const frame = record(item);
            // Only a code-file basename is retained; no URL, query, path or source lines.
            const filename =
              typeof frame.filename === "string"
                ? frame.filename.split(/[?#]/)[0].split(/[\\/]/).pop()
                : undefined;
            return {
              ...(filename &&
              /^[a-zA-Z0-9_.-]{1,100}\.(?:js|mjs|cjs|ts|tsx)$/.test(filename)
                ? { filename }
                : {}),
              ...(Number.isSafeInteger(frame.lineno)
                ? { lineno: frame.lineno }
                : {}),
              ...(Number.isSafeInteger(frame.colno)
                ? { colno: frame.colno }
                : {}),
            };
          }),
        },
      };
    }),
  };
}

export function monitoringEnabled(env: {
  enabled?: string;
  token?: string;
  host?: string;
  deployment?: string;
  mode?: string;
}) {
  return (
    env.enabled === "true" &&
    Boolean(env.token?.startsWith("phc_")) &&
    ["https://us.i.posthog.com", "https://eu.i.posthog.com"].includes(
      env.host ?? "",
    ) &&
    env.deployment === "production" &&
    env.mode === "production"
  );
}

/** Local flood protection; billing limits must still be configured in PostHog. */
export function createErrorBudget(limit = 10, now = () => Date.now()) {
  let start = now();
  let used = 0;
  return () => {
    const time = now();
    if (time - start >= 60_000) {
      start = time;
      used = 0;
    }
    return used++ < limit;
  };
}
