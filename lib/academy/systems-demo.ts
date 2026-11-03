export type DeliveryState = {
  phase: "ready" | "failed" | "waiting" | "delivered";
  attempts: number;
  workCount: number;
  duplicates: number;
};

export const initialDelivery: DeliveryState = {
  phase: "ready", attempts: 0, workCount: 0, duplicates: 0,
};

/** Deterministic teaching fixture; no request, timer or persistence. */
export function advanceDelivery(state: DeliveryState): DeliveryState {
  switch (state.phase) {
    case "ready":
      return { ...state, phase: "failed", attempts: 1 };
    case "failed":
      return { ...state, phase: "waiting" };
    case "waiting":
      return { ...state, phase: "delivered", attempts: 2, workCount: 1 };
    case "delivered":
      return { ...state, attempts: state.attempts + 1, duplicates: state.duplicates + 1 };
  }
}

export const accessExamples = {
  anonymous: {
    label: "Signed out",
    result: "401 · Sign in first",
    explanation: "The server cannot establish an authenticated identity. In this example, the request is rejected before the record can be edited.",
  },
  member: {
    label: "Signed in, no permission",
    result: "403 · Editing is not allowed",
    explanation: "The server recognizes this fictional user, but their permissions do not allow editing this record. Signing in alone is not enough.",
  },
  editor: {
    label: "Signed in, permission granted",
    result: "200 · Sample edit allowed",
    explanation: "The server recognizes this fictional user and permits this action on this record. Permission for one record does not grant access to every record.",
  },
} as const;

export type AccessExample = keyof typeof accessExamples;
