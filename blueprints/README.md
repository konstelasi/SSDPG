# Feature Blueprints

> A blueprint describes one feature before it is built, with the problem it solves and what counts as done.

Every feature gets a blueprint, whether it is already built or only planned. A decision that other code or data depends on goes in an ADR, and the blueprint links to it. Small fixes and refactors need no blueprint.

## Conventions

| Rule | Convention |
| :-- | :-- |
| File name | `short_snake_case_title.md` |
| Template | Copy [`_template.md`](_template.md) |
| Diagrams | Mermaid blocks |
| Status | `Draft`, `Accepted`, `Implemented`, `Superseded`. A stub says so in its first paragraph. |
| Rests on | The ADRs the blueprint depends on, named in its header. It can be accepted once they are all Accepted. |
| Contract | A blueprint for a contract says so in its first paragraph and gives the contract's version number in a header line named Version. |
| Editing | A blueprint can be edited until it is Implemented. After that, write a new one and mark the old one Superseded. |

Implemented means the code meets every acceptance criterion in the blueprint.

## Index

| Blueprint | Status | Summary |
| :-- | :-- | :-- |
| [`relation_field.md`](relation_field.md) | Draft | An entry links to entries of another model, who sees the links, and what deleting the other side does. |
