# 0000 Record decisions as ADRs

- **Status:** Accepted
- **Created:** 2026-10-23
- **Ruled:** 2026-10-27
- **Accepted:** 2026-10-27
- **Amended:** 2026-11-20

## Context

A decision that exists only in conversation is easy to lose and easy to contradict. StarSystem is also meant to be built by people who were not present when its design was settled, and by modules and themes written by people outside the project. A module is a folder that adds one self-contained feature, and a theme is a package that sets how a site's pages look. These people need a place that says what was decided, why, and which document to believe when two disagree.

## Decision

Decisions are recorded as Architecture Decision Records (ADRs) in `adrs/`, one decision per file, numbered in the order they are written and shaped by `adrs/_template.md`. An ADR gives the situation that called for a decision, the decision itself and what follows from it.

An ADR is written only when something outside the decision's own code depends on it. That means other people's code such as modules, themes and clients of the content API (the interface through which other programs read and write a site's entries over HTTP), data already stored on an install (one copy of StarSystem with its one database), the update and trust path (how an install fetches a new version and decides whether to believe it), or a security boundary (a rule about who may reach what). Any other decision belongs in the blueprint it affects, which is the document that describes one feature before it is built and says when it counts as done.

The design documents, meaning the ADRs and the blueprints, outrank the code. When the two disagree, the document is right until an ADR changes it. The code is brought to the document, and a difference that proves impossible or too costly to close comes back as a new ADR and is never dropped quietly.

Only the project owner, the one person who decides what StarSystem's design is, moves a document to Accepted. A new ADR starts as Proposed and a new blueprint as Draft, which both mean written and waiting for review. Accepted means the owner has read the text and it now stands as the design. A Proposed ADR can be edited freely. An Accepted ADR can be amended to correct or clarify it, as long as the decision itself does not change, meaning that anything which followed the old text still follows the new one. An amendment adds an Amended line with its date to the header, the lines under the title that give the status and dates, and a later amendment updates that date. An amendment is made with care. Its benefit is weighed against what it could break, such as the documents, code and modules that cite or follow the old text, and each of those is checked before the change is made. When the risk outweighs the benefit, or the decision changes in substance, the change is a new ADR that supersedes the old one, which stays on file marked Superseded while the new one governs. A newer ADR may cite older ADRs and never the reverse.

Documents are accepted one at a time. A decision the owner has already ruled on is drafted as Proposed with the date of the ruling in its Ruled line, the header line for the day the owner decided, and the owner checks that the text says what was ruled. A decision that is still open is settled in conversation first. A blueprint is accepted once every ADR it rests on (the ones named in its header as things it depends on) is Accepted, and no document is accepted before the older ADRs it cites.

## Consequences

Anyone can find a decision and its reason in one place, and the order of precedence is fixed before the first conflict. A decision that touches only one feature stays out of the ADR list, which keeps the list short enough to read.

The cost is the effort of writing each record, and the risk that documents wait Proposed for a long time because only one person can accept them. To limit that, the documents waiting for acceptance are listed, oldest first, at the start of each working session.
