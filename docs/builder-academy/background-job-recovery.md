# What happens when a background job fails?

Reviewed: 2026-10-30. Format: short lesson plus written self-review. Estimated time: 15 minutes, not measured learner timing.
Prerequisites: MCP versus REST APIs; databases and recovery. Find this lesson in the **Connect systems and recover failures** path on [Builder Academy](https://www.byjoyaing.com/ai-academy).

## Goal and why it matters

Explain whether a failed research job should wait, stop for review or safely replay. An accepted request is not a finished result. A worker can fail after doing useful work, so blindly repeating everything can create duplicate effects.

## Mental model and vocabulary

A queue is a tray of work tickets. A worker takes a ticket and records what happened. Unlike a paper tray, software may deliver the same ticket more than once.

- **Queue:** pending work that a worker can receive.
- **Attempt:** one execution; a retry is an additional attempt.
- **Backoff:** a delay before trying again, often increased after repeated temporary failures.
- **Failed-job area / dead-letter queue:** work isolated for diagnosis after the applicable failure policy.
- **Idempotency:** repeating the same intended operation does not repeat its effect.

Queue implementations differ. This lesson defines its own three-attempt teaching policy; it is not a drop-in SQS configuration. SQS receive counts and message delivery behavior need their own implementation review.

## Worked example: a fictional research summary

Job `research-014` asks for a summary of a supplied fictional public article. It may save one draft, but must not email anyone or publish the draft. The operation key is `summary:article-014:v1`. No service runs during this exercise.

| Event | State | Decision and evidence |
| --- | --- | --- |
| Request accepted | Queued | Record job ID, intended operation and input version; do not claim success |
| Attempt 1: temporary outage | Waiting | Record the error and delay; two attempts remain |
| Attempt 2: same outage | Waiting | Increase the delay; one attempt remains |
| Attempt 3: same outage | Failed review | Stop automatic retries; preserve a minimal error record |
| Reviewer confirms service recovery | Ready for controlled replay | Recheck authorization, validity, duplicate protection and budget |
| Replay saves a draft and acknowledges completion | Completed | Record the draft ID and verify there is only one intended result |

The delays and attempt limit are classroom choices, not universal operational defaults. In a real system, use provider guidance, time limits, retry hints and jitter where appropriate. Retry traffic can cost money and worsen an outage.

Invalid input is a different branch: a missing required article ID should be corrected or quarantined rather than repeatedly retried unchanged. Permission denial requires review of the intended access, not automatically broader permissions.

## The difficult case: write succeeded, acknowledgement failed

Suppose the worker saved draft `draft-014` but crashed before acknowledging the ticket. A redelivered job is not proof that the save failed.

Check the stable operation key and durable outcome. Protect the effect and its completion record atomically when possible, for example through a transaction and uniqueness constraint. A separate “check, then write” without concurrency protection can race. External effects need the external service's supported idempotency or a reconciliation design; a database flag alone does not guarantee exactly-once behavior everywhere.

Keep the same operation key when replaying the same intended effect. If the input changes materially, decide whether it is a new operation and retain the relationship to the failed job. Do not quietly erase failure history.

## Try it before reading the answers

Write a five-line recovery note with: job ID, failure category, next state, duplicate guard, and evidence required before calling it complete.

1. Attempt 2 reports a temporary outage. The policy allows three total attempts. How many automatic attempts remain?
2. A job saved its draft but never acknowledged completion. What do you inspect before replay?
3. The article ID is missing. Would waiting longer fix it?
4. All three attempts failed. What must a reviewer check before a bounded replay?

### Answer key and feedback

1. **One.** Three total attempts includes the first attempt. Three retries would mean four attempts.
2. **The stable operation key and durable result**, with a guard against concurrent duplicate writes. Replaying every write can duplicate the draft.
3. **No.** Correct or quarantine invalid input. A delay cannot invent the missing ID.
4. **Cause and fix, current authorization, input validity, existing effects, duplicate protection, budget and a recorded replay decision.** A failed-job area preserves evidence; it does not prove the work is safe to repeat.

These are self-review answers. The Academy card has one automatically checked question; this written exercise does not save or grade a submission.

## Transfer: a new similar task

A fictional weekly report worker saved report `report-022` and timed out before its completion record was confirmed. A teammate proposes “run every failed report again.”

Write a safer decision: reconcile the existing report and operation identity, protect against duplicates, isolate invalid inputs, and replay only reviewed unresolved work with bounded attempts. Evidence of understanding is explaining why “no acknowledgement” and “no result” are different, without copying the worked timeline.

## Misconceptions and reflection

- “Retry until it works” ignores permanent errors, permissions, cost and overload.
- “A dead-letter queue fixes the job” confuses isolation with repair.
- “Exactly-once delivery means every external side effect is safe” ignores the effect boundary and provider guarantees.

Which record would let another person distinguish a failed execution from a completed effect? What would make you stop instead of retry?

## Related practice and next step

Try the [existing Systems examples](https://www.byjoyaing.com/ai-academy/systems) for webhook retry/duplicate handling and 401/403/200 access decisions. Those demos are related concepts, not a background-job queue simulator. Next, use **Protect identity and data** to examine permissions and safe release decisions.

## Sources and limits

Checked 2026-10-30:
- [AWS SQS dead-letter queues](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html): isolation, receive-count policy and redrive.
- [AWS SQS at-least-once delivery](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/standard-queues-at-least-once-delivery.html): duplicate delivery and idempotent processing.

The fictional policy, timeline, rubric and transfer task are original teaching examples. They do not prove a deployed queue is secure, durable or cost bounded.
