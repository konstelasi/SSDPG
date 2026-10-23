# Architecture Decision Records

> The log of why StarSystem's important decisions were made.

An ADR records one decision, the situation that called for it and what follows from it. Once a decision is accepted its ADR is not edited, so a reader years later sees what was decided and why. [ADR 0000](0000-record-decisions-as-adrs.md) sets when a decision gets an ADR and who accepts it.

## Conventions

| Rule | Convention |
| :-- | :-- |
| File name | `NNNN-short-title.md`, for example `0000-record-decisions-as-adrs.md` |
| Template | Copy [`_template.md`](_template.md) |
| Status | `Proposed`, then `Accepted`. Later `Rejected`, `Deprecated` or `Superseded`. |
| Editing | A Proposed ADR can be edited. An Accepted ADR cannot. |
| Reversal | Write a new ADR that supersedes the old one, and change only the old one's status. |
| Citing | A newer ADR may cite older ones and never the reverse. Between two ADRs, the newer one wins. |

## Index

| ADR | Status | Summary |
| :-- | :-- | :-- |
| [`0000-record-decisions-as-adrs.md`](0000-record-decisions-as-adrs.md) | Proposed | Decisions that others depend on are recorded as ADRs, the documents outrank the code, and only the owner accepts. |
