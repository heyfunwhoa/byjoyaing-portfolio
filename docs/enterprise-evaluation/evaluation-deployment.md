# Choose deployment and prepare the architecture

[Track home](README.md) · [Scenario and templates](toolkit.md)

**Format:** Available reading lesson and manual practice. **Basis:** Original teaching synthesis using the named sources below. **Review:** Draft for editorial review; no professional certification.

## Understand

Placement, connectivity, data handling and operational ownership are related decisions. A reference diagram makes the assumptions visible.

Compare who runs the workload, what it must reach, where processing occurs and who handles upgrades.

Identify control-plane, scan-workload and result-storage boundaries separately; exact capabilities require official product documentation.

Record source inventory, permissions, credential lifecycle, outbound connections, proxy needs, data retention, logging and expected workload.

Use generic diagrams for learning. Ports, regions and deployment support are unknown until verified for the exact product and edition.

## See it in the fictional scenario

The example places the scan workload in a customer-managed zone and shows optional result export. It is a design exercise, not a supported TruffleHog reference architecture.

## Try

Use architecture.md to recommend an illustrative pattern. List three unresolved connectivity or data questions and fill the readiness checklist before declaring a go.

## Explain your decision

A scanner is inside the customer network. What follows?

1. No data can leave
2. You must still verify egress, control-plane communication and result handling
3. Security review is unnecessary

**Answer:** 2. Network placement alone does not establish data residency or isolation. Inspect actual flows and controls.

## Review your artifact

- Does it identify the decision and responsible owner?
- Can another person distinguish facts, assumptions and unknowns?
- Does each conclusion point to evidence or an explicit missing item?
- Have you documented an alternative and a condition that would change your recommendation?

Reading is **reviewed**; producing the artifact is **practiced**. A correct knowledge answer passes only that check. These are distinct from demonstrated workplace competence.

## Sources and limits

- [NIST SP 800-161 Rev. 1 updated](https://csrc.nist.gov/pubs/sp/800/161/r1/upd1/final)

Sources checked 2026-10-13. Publisher descriptions establish framework definitions, not guaranteed performance. Exercises, thresholds and scenario decisions are illustrative synthesis.
