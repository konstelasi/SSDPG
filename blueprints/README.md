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
| [`relation_field.md`](relation_field.md) | Accepted | An entry links to entries of another model, who sees the links, and what deleting the other side does. |

## Blueprints to come

Every feature below is planned and has no blueprint yet. The list gives no order of work. A row leaves it on the day its blueprint is drafted. Where a row rests on a decision that has no ADR yet, it names that decision in words, and the decision itself is in the list "Ruled and waiting to be written" in the [ADR index](../adrs/README.md).

| Feature | What its blueprint will specify | Rests on |
| :-- | :-- | :-- |
| Installer and first run | The requirements check, the database setup, and the first account becoming the install owner. | ADR 0001, ADR 0006, ADR 0007 |
| Sites and domains | What a site is, how a domain finds it, and what is kept per site against per install. | ADR 0003 |
| People, roles and abilities | Accounts, the built-in roles, and how an ability is defined and given. | ADR 0004, the limits of handing out access, limited abilities |
| Invites and mail | Invitations, mail setup, and what happens on a host with no mail. | ADR 0004 |
| Sign-in security | Two-factor sign-in, requiring it by role, sessions, and changing a password or an email. | ADR 0004 |
| Activity log | What is recorded, who may read it, and how long it is kept. | ADR 0004 |
| Model builder | Models, fields, the drag-and-drop canvas, the live preview, and what a change to a model goes through. | Extension points |
| Field types | The field types of the first version, and how a module adds one. | What a module is, extension points |
| Entries | Forms, lists, filters, authorship, the published box, trash, restore and delete for good. | Limited abilities |
| Media library | Folders, uploads, the file picker, and how a file is served. | ADR 0001 |
| Public access | Which models are public, and which field publishes an entry. | What a caller without a key sees |
| Content API | The endpoints, the wire format, filters, paging and errors. A contract. | Where the content API lives, what a caller without a key sees, the API's addresses, versions and errors |
| API keys | Creating a key, showing it once, rotating it and giving it permissions. | What a key is, key permissions |
| Modules | The manifest, loading, safe mode, the abilities a module declares, and bundled modules. A contract. | What a module is |
| Extension points | The points the core offers, such as an entry being written or checked. A contract. | Extension points |
| Module admin pages | The page host, menu items, and the versioned set of components. A contract. | Module admin pages |
| Updates and releases | The feed, its signature, download and resume, applying an update, and what a failed update leaves behind. A contract. | ADR 0001, ADR 0007, signed releases |
| Background work and health | The scheduled run, the health panel, and what a site shows when the schedule has not fired. | ADR 0001 |
| Website module | Themes, the list of addresses, the Site page, and how an entry becomes a page. | ADR 0002, what a module is, themes |
| Page cache | Serving a page without rendering it each time. A stub at first. | Themes |
| Blocks field | A field that holds ordered blocks of registered types. A stub at first. | Extension points |
| Page editor module | Visual page layouts. An idea, with no decision behind it yet. | nothing yet |
| AI assistant module | Describing a model in words and confirming what is proposed. An idea, with no decision behind it yet. | nothing yet |
