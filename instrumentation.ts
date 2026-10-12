import type { Instrumentation } from "next";

export const onRequestError: Instrumentation.onRequestError = async (error) => {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { reportServerError } = await import("./lib/monitoring/server");
    await reportServerError(error);
  }
};
