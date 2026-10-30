"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type {
  LearningChange,
  LearningState,
} from "@/lib/academy-account/policy";
const empty: LearningState = { records: [], lastLesson: null };
export function useLearning() {
  const [data, setData] = useState<LearningState>(empty);
  const [status, setStatus] = useState<
    "loading" | "ready" | "anonymous" | "error"
  >("loading");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const generation = useRef({ value: 0, writing: false });
  const update = useCallback(
    async (change?: LearningChange | "clear") => {
      if (generation.current.writing) return;
      generation.current.writing = Boolean(change);
      const current = ++generation.current.value;
      setBusy(true);
      setMessage("");
      try {
        const response = await fetch("/api/academy/learning", {
          method: change === "clear" ? "DELETE" : change ? "PATCH" : "GET",
          cache: "no-store",
          credentials: "same-origin",
          ...(change && change !== "clear"
            ? {
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(change),
              }
            : {}),
        });
        if (current !== generation.current.value) return;
        if (response.status === 401) {
          setData(empty);
          setStatus("anonymous");
          return;
        }
        if (!response.ok) throw new Error("Unavailable");
        const result: LearningState = await response.json();
        if (current !== generation.current.value) return;
        setData(result);
        setStatus("ready");
        if (change)
          setMessage(
            change === "clear"
              ? "Your saved lessons and reading progress have been cleared."
              : "Saved to your account.",
          );
      } catch {
        if (current !== generation.current.value) return;
        setData(empty);
        setStatus("error");
        setMessage(
          "We could not load or save your learning. Please try again. You can keep reading without an account.",
        );
      } finally {
        if (current === generation.current.value) {
          generation.current.writing = false;
          setBusy(false);
        }
      }
    },
    [generation],
  );
  useEffect(() => {
    const controller = new AbortController();
    const current = ++generation.current.value;
    fetch("/api/academy/learning", {
      cache: "no-store",
      credentials: "same-origin",
      signal: controller.signal,
    })
      .then(async (response) => {
        if (response.status === 401)
          return { status: "anonymous" as const, data: empty };
        if (!response.ok) throw new Error("Unavailable");
        return {
          status: "ready" as const,
          data: (await response.json()) as LearningState,
        };
      })
      .then((result) => {
        if (current === generation.current.value) {
          setData(result.data);
          setStatus(result.status);
        }
      })
      .catch(() => {
        if (
          !controller.signal.aborted &&
          current === generation.current.value
        ) {
          setData(empty);
          setStatus("error");
          setMessage("We could not load your learning. Please try again.");
        }
      });
    const refresh = () => {
      void update();
    };
    window.addEventListener("focus", refresh);
    const counter = generation.current;
    return () => {
      controller.abort();
      counter.value++;
      window.removeEventListener("focus", refresh);
    };
  }, [update, generation]);
  return { data, status, busy, message, update };
}
