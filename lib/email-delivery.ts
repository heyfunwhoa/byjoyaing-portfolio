type Attempt = () => Promise<{ error?: unknown }>;

/** Provider acceptance is distinct from delivery; never retry the primary for a failed confirmation. */
export async function acceptMessageAndConfirm(
  primary: Attempt,
  confirmation: Attempt,
) {
  try {
    const result = await primary();
    if (result.error) return { accepted: false, confirmationAccepted: false };
  } catch {
    return { accepted: false, confirmationAccepted: false };
  }
  try {
    const result = await confirmation();
    return { accepted: true, confirmationAccepted: !result.error };
  } catch {
    return { accepted: true, confirmationAccepted: false };
  }
}
