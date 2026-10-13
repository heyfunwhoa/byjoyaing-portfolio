import assert from "node:assert/strict";
import test from "node:test";
import { acceptMessageAndConfirm } from "./email-delivery.ts";

test("primary failure prevents confirmation and reports a safe failure", async () => {
  let confirmations = 0;
  const result = await acceptMessageAndConfirm(
    async () => ({ error: { message: "synthetic failure" } }),
    async () => {
      confirmations++;
      return {};
    },
  );
  assert.deepEqual(result, { accepted: false, confirmationAccepted: false });
  assert.equal(confirmations, 0);
});
test("a rejected primary promise does not send confirmation", async () => {
  const result = await acceptMessageAndConfirm(
    async () => {
      throw Error("synthetic failure");
    },
    async () => {
      throw Error("must not run");
    },
  );
  assert.deepEqual(result, { accepted: false, confirmationAccepted: false });
});
test("confirmation failure preserves the accepted primary without duplicate sending", async () => {
  let primaries = 0;
  for (const confirmation of [
    async () => ({ error: true }),
    async () => {
      throw Error("synthetic failure");
    },
  ]) {
    const result = await acceptMessageAndConfirm(async () => {
      primaries++;
      return {};
    }, confirmation);
    assert.deepEqual(result, { accepted: true, confirmationAccepted: false });
  }
  assert.equal(primaries, 2);
});
test("both provider acceptances are reported without claiming delivery", async () => {
  assert.deepEqual(
    await acceptMessageAndConfirm(
      async () => ({}),
      async () => ({}),
    ),
    { accepted: true, confirmationAccepted: true },
  );
});
