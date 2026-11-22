VAR baseline = false
VAR owner = false
-> opening
=== opening ===
Buyer: Our onboarding queue keeps growing. We are considering automation, but I am not sure where to start.
* [Ask what changed and how onboarding works today.] -> discovery
* [Offer a demo immediately.] -> demo
=== demo ===
Buyer: I can attend, but you have not asked what our team needs to change.
Coach: A demo invitation is not evidence of a qualified problem. Recover by understanding the workflow.
* [Return to discovery.] -> discovery
=== discovery ===
Buyer: Our service team repeats setup steps for each new client. We do not yet have a reliable time baseline.
* [Ask the service owner to measure a sample of recent onboardings.]
~ baseline = true
Buyer: Our operations lead can gather the setup times and identify the manual steps.
-> stakeholders
* [Assume automation will cut onboarding time in half.]
Coach: That improvement is an untested hypothesis. Record the missing baseline before promising an outcome.
-> stakeholders
=== stakeholders ===
Buyer: I manage the queue, but I cannot approve a purchase or assign engineering time.
* [Identify the service owner, technical evaluator and budget approver.]
~ owner = true
Buyer: We should include our operations lead, platform engineer and finance approver in the next conversation.
-> scope
* [Treat this contact as the decision maker.] 
Coach: Interest does not establish authority. Confirm the missing owners before proposing a buying plan.
-> scope
=== scope ===
Buyer: What would you suggest as a next step?
* [Propose one workflow with a baseline, owner and agreed success measure.] -> bounded
* [Propose a full deployment before agreeing on success.] -> broad
=== bounded ===
{baseline:
Coach: You asked for baseline evidence rather than inventing savings.
- else:
Coach: A baseline is still missing. Measure current setup time before claiming an improvement.
}
{owner:
Coach: You identified the roles needed to review an evaluation. Their approval is still unconfirmed.
- else:
Coach: Ownership is still unconfirmed. Include the operational, technical and budget roles before starting.
}
Debrief: Draft a one-workflow evaluation plan. List the evidence to collect, the accountable owner and the success measure the buyer must confirm.
-> END
=== broad ===
Coach: A broad deployment creates unbounded effort. Return with a smaller test and an agreed success measure.
Debrief: Revisit baseline evidence and approval ownership. A conversation outcome is not a forecast or buyer approval.
-> END
