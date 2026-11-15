# Architecture Decision Records

> The log of why StarSystem's important decisions were made.

An ADR records one decision, the situation that called for it and what follows from it. Once a decision is accepted its ADR changes only by an amendment that corrects or clarifies it, dated in its Amended line, so a reader years later sees what was decided and why. [ADR 0000](0000-record-decisions-as-adrs.md) sets when a decision gets an ADR and who accepts it.

## Conventions

| Rule | Convention |
| :-- | :-- |
| File name | `NNNN-short-title.md`, for example `0000-record-decisions-as-adrs.md` |
| Template | Copy [`_template.md`](_template.md) |
| Status | `Proposed`, then `Accepted`. Later `Rejected`, `Deprecated` or `Superseded`. |
| Editing | A Proposed ADR can be edited. An Accepted ADR can be amended to correct or clarify it, as long as the decision itself does not change, and it then carries an Amended line with the date. Weigh the benefit against what it could break in the documents that cite it. |
| Reversal | When the decision itself changes, or an amendment would risk more than it gains, write a new ADR that supersedes the old one, and change only the old one's status. |
| Citing | A newer ADR may cite older ones and never the reverse. Between two ADRs, the newer one wins. |

## Index

| ADR | Status | Summary |
| :-- | :-- | :-- |
| [`0000-record-decisions-as-adrs.md`](0000-record-decisions-as-adrs.md) | Accepted | Decisions that others depend on are recorded as ADRs, the documents outrank the code, and only the owner accepts. |
| [`0001-shared-hosting-is-the-floor.md`](0001-shared-hosting-is-the-floor.md) | Proposed | StarSystem installs, runs and updates on shared hosting, from one zip, with no command line, Node, Redis or running program. |
| [`0002-the-core-is-headless.md`](0002-the-core-is-headless.md) | Proposed | The core stores, validates, authorizes and serves content and has no public front end, and the website side is a module. |
| [`0003-a-site-is-found-by-its-domain.md`](0003-a-site-is-found-by-its-domain.md) | Proposed | A site's content is kept apart from every other site on the install, and the request's domain says which site it is for. |
