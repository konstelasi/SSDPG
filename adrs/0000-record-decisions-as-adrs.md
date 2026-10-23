# 0000 Record decisions as ADRs

- **Status:** Proposed
- **Created:** 2026-10-27
- **Ruled:** not yet

## Context

A decision that exists only in conversation is easy to lose and easy to contradict. StarSystem is also meant to be built by people who were not present when its design was settled, and by modules and themes written by people outside the project. They need a place that says what was decided, why, and which document to believe when two disagree.

## Decision

Decisions are recorded as Architecture Decision Records in `adrs/`, one decision per file, numbered in the order they are written and shaped by `adrs/_template.md`.

An ADR is written only when something outside the decision's own code depends on it. That means other people's code such as modules, themes and clients of the content API, data already stored on an install, the update and trust path, or a security boundary. Any other decision belongs in the blueprint it affects, under its technical sketch or open questions.

The design documents outrank the code. When the two disagree, the document is right until an ADR changes it. The code is brought to the document, and a difference that proves impossible or too costly to close comes back as a new ADR and is never dropped quietly.

Only the project owner moves a document to Accepted. A Proposed ADR can be edited and an Accepted one cannot, so a decision that changes is a new ADR that supersedes the old one. A newer ADR may cite older ADRs and never the reverse.

Documents are accepted one at a time. A decision the owner has already ruled on is drafted as Proposed with the date of the ruling in its Ruled line, and the owner checks that the text says what was ruled. A decision that is still open is settled in conversation first. A blueprint is accepted once every ADR it rests on is Accepted, and no document is accepted before the older ADRs it cites.

## Consequences

Anyone can find a decision and its reason in one place, and the order of precedence is fixed before the first conflict. A decision that touches only one feature stays out of the ADR list, which keeps the list short enough to read.

The cost is the effort of writing each record, and the risk that documents wait Proposed for a long time because only one person can accept them. To limit that, the documents waiting for acceptance are listed, oldest first, at the start of each working session.
