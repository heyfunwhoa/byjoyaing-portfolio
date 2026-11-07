const form = document.querySelector("form");
const summary = document.querySelector("#summary");
const loseResponse = document.querySelector("#lose-response");
const button = form.querySelector("button");
const status = document.querySelector("#status");
let requestKey;

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (button.disabled) return;
  requestKey ??= crypto.randomUUID();
  summary.readOnly = true;
  loseResponse.disabled = true;
  button.disabled = true;
  status.textContent = "Submitting your review…";

  try {
    const response = await fetch("/api/review-requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": requestKey,
        "X-Lab-Drop-Response": loseResponse.checked ? "1" : "0",
      },
      body: JSON.stringify({ summary: summary.value }),
    });
    const result = await response.json();
    if (response.status === 400) {
      requestKey = undefined;
      status.textContent = result.error;
      return;
    }
    if (!response.ok) throw new Error("Unconfirmed submission");
    status.textContent = result.reused
      ? "Confirmed existing review #" + result.id + "."
      : "Created review #" + result.id + ".";
    form.reset();
    requestKey = undefined;
  } catch {
    status.textContent = "We could not confirm the review. Your draft is still here. Try again to check the same submission.";
  } finally {
    summary.readOnly = Boolean(requestKey);
    loseResponse.disabled = Boolean(requestKey);
    button.disabled = false;
    button.textContent = requestKey ? "Try again" : "Submit review";
  }
});
