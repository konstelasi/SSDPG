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
| [`0001-shared-hosting-is-the-floor.md`](0001-shared-hosting-is-the-floor.md) | Accepted | StarSystem installs, runs and updates on shared hosting, from one zip, with no command line, Node, Redis or running program required, and uses a running program where the host has one. |
| [`0002-the-core-is-headless.md`](0002-the-core-is-headless.md) | Accepted | The core stores, validates, authorizes and serves content and has no public front end, and the website side is a module. |
| [`0003-a-site-is-found-by-its-domain.md`](0003-a-site-is-found-by-its-domain.md) | Accepted | A site's content is kept apart from every other site on the install, and the request's domain says which site it is for. A site may have several domains. |
| [`0004-access-is-per-site.md`](0004-access-is-per-site.md) | Accepted | A person holds one role per site, and an ability allows one action. |
| [`0005-the-design-reaches-past-the-floor.md`](0005-the-design-reaches-past-the-floor.md) | Proposed | StarSystem is designed for its ceiling as well as its floor, and no floor shortcut may block a larger install from growing. |
| [`0006-the-database-is-reached-through-stardust.md`](0006-the-database-is-reached-through-stardust.md) | Accepted | StarSystem reads and writes its database only through StarDust, so its engines are the ones StarDust supports. |
| [`0007-the-install-owner-stands-above-the-sites.md`](0007-the-install-owner-stands-above-the-sites.md) | Accepted | One account, the install owner, may do everything on every site and alone updates StarSystem and manages its modules. |
| [`0008-a-module-is-a-folder-with-a-manifest.md`](0008-a-module-is-a-folder-with-a-manifest.md) | Proposed | A module is a folder with a manifest that declares what it is and what it adds, and it installs from a zip without Composer. |
| [`0009-modules-attach-through-typed-extension-points.md`](0009-modules-attach-through-typed-extension-points.md) | Proposed | A module attaches to the core only through extension points that are fixed classes with fixed fields, never by a free-form name. |
| [`0010-abilities-can-be-limited.md`](0010-abilities-can-be-limited.md) | Proposed | An ability can be limited to one model or to the person's own entries, and grants add up. |

## Ruled and waiting to be written

The owner has ruled on each decision below, and no document records it yet. A row leaves this list on the day its ADR is drafted as Proposed, or its blueprint as Draft. Until then this row is the record, so a later document must not contradict it.

| Ruled | Decision | Will be recorded in |
| :-- | :-- | :-- |
| 2026-10-25 | A module gets admin pages through a page host. It lists its pages and menu items in its manifest and builds them from components and colour variables the core hands over, a set that is versioned. | An ADR on module admin pages |
| 2026-11-15 | Themes belong to the website module, which renders them as templates, and the core knows nothing about them. | An ADR on themes |
| 2026-11-15 | Nobody hands out more than they hold. A person assigns or edits only roles whose abilities they hold themselves, and every action on an account stays inside the acting site. | An ADR on the limits of handing out access |
| 2026-10-26 | The content API is part of the core, with no separate gateway in front of it. Its contract is a blueprint of its own with a JSON Schema. | An ADR on where the content API lives |
| 2026-10-25 | Outside apps can write entries as well as read them, and they do so with a key. A key is an account that is not a person. It cannot sign in and cannot manage keys. | An ADR on what a key is |
| 2026-10-25 | A key's permissions are given per model and per action, and a person can only create a key with permissions they hold themselves. Publishing is a permission of its own, so a key without it saves entries unpublished. A key sees drafts only with the permission to see all entries of that model. A key never holds the permissions for users, roles, the model builder or key management. | An ADR on key permissions |
| 2026-10-25 and 2026-11-15 | A caller without a key reads the published entries of public models and never writes. Every field of those entries is exposed, because permissions per field are not part of the first version. That caller is treated as a built-in key whose write permissions are locked off, so one permission check serves both kinds of caller. | An ADR on what a caller without a key sees |
| 2026-10-18 | Releases are signed. An update is refused unless its feed verifies against the public key built into the code. | An ADR on signed releases |
| 2026-11-15 | The API's version is in the path, as in `/api/v1/entries/{model}`, `/api/v1/entries/{model}/{id}` and `/api/v1/files`. Every refusal has one body with four parts, a code, a message, a pointer to the part of the request that is wrong, and details. A version only adds and never removes or renames, and a breaking change becomes the next version. | An ADR on the API's addresses, versions and errors |
| 2026-11-15 | The code is released under Apache-2.0. | An ADR on the licence |
| 2026-11-15 | An install remembers the newest signed release it has seen and warns when a feed offers an older one. An expiry date on the feed is not part of the first version. | The blueprint for updates and releases |

## Not ruled yet

These questions are open. Each is settled with the owner in conversation, and it then moves to the list above.

- How a module that ships with StarSystem is switched on after an install or an update, and whether a later switch-off by an admin is kept.
- How the head reads content, through the same contract an outside app gets or through one the core offers to modules.
- What the first version of StarSystem contains.
