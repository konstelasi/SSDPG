---
trigger: always_on
---

# SSDPG rules

Rules for this repository only. They add to `core.md` and win on a conflict. Do not edit `core.md` or the other synced guides here.

This is a design repository. It holds decisions and specifications and no application code. Its one script, `scripts/check.mjs`, checks the documents. It is private for now and may become public after a sweep, so write every document as if a stranger will read it.

## Writing a document

1. Copy SDDPG's structure, never its punctuation. SDDPG uses em dashes, "Title - subtitle" headings and "Blueprint: Title". Here none of that is allowed.
2. Write from decisions and constraints, never from the existing StarSystem code. Do not describe the code as the design.
3. Never name a private file, a private repository or a label that only means something in private notes.
4. Start from `adrs/_template.md` or `blueprints/_template.md`. Read the matching index first so numbers and names stay unique.
5. Treat StarDust as one dependency among others. Describe StarSystem's own behaviour, and when a document relies on something StarDust does, say it in a sentence. Never cite StarDust's ADRs and never check a document against SDDPG. When the problem is StarDust's, or the design is better that way, the change is made in StarDust in a measured way, as StarDust's own work.
6. A glossary entry may cite a class, field or command only when the ADR that governs the term uses that exact name.
7. Never write a build order, and never put a phase, stage, step or milestone label in a document. Say what the feature is and when it counts as done. The order of work lives outside this repository.
8. Run `node scripts/check.mjs` before every commit and fix what it reports. It does not check the glossary rule or whether a document says what the owner ruled, so read for those.

## Statuses

1. Only the owner moves a document to Accepted. Draft every ADR as Proposed and every blueprint as Draft, and never set Accepted yourself.
2. A Proposed ADR can be edited. An Accepted one can be amended to correct or clarify it, as long as the decision itself does not change, meaning anything that followed the old text still follows the new one. An amendment adds or updates an Amended line with the date in the header. Before amending, find every document that cites or rests on the ADR and check that each still reads true, and weigh that risk against the benefit. A change to the decision itself, or an amendment whose risk outweighs its benefit, is a new ADR that supersedes it. A small change with little risk never is.
3. A newer ADR may cite older ADRs and never the reverse.
4. Documents are accepted one at a time, never in groups. A document is not accepted before the older ADRs it cites.
5. At the start of each work session, run `node scripts/check.mjs`. It lists the documents marked Proposed or Draft, oldest first, so the owner can accept them one at a time.
6. Draft no new ADR while five ADRs are Proposed, unless the owner asks for one. The owner is the only reviewer, so a long queue only goes stale.
7. Mark a blueprint Implemented only after checking the StarSystem code against each of its acceptance criteria, and only with the owner's agreement. When the last piece of a feature lands in the code, check its blueprint then, so the status does not lag behind the code.
8. A blueprint's "Not decided yet" section lists only what the owner still has to rule on in that blueprint. A question that another document will settle goes under Non-goals with a pointer to that document. The section is empty when the blueprint is accepted, and `scripts/check.mjs` fails an Accepted or Implemented blueprint that still has items there.

## Talking to the owner

The owner reviews at eagle-view level. When a document relies on an earlier decision, restate that decision in a sentence and don't cite only its number.
