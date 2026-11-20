# 0010 Abilities can be limited to a model or to own entries

- **Status:** Proposed
- **Created:** 2026-11-20
- **Ruled:** 2026-10-16

## Context

ADR 0004 decides that a person holds one role on each site, a role is a set of abilities, and each ability allows one action, such as editing entries. An entry is one piece of content, and a model is a kind of content, such as Post or Product. Left at that, the ability to edit entries covers every entry of every model on the site.

Sites often trust people more narrowly. A writer should edit the posts they wrote and not someone else's. A shop assistant should edit Products and not Pages. With only whole abilities, neither can be given without giving everything.

## Decision

An ability can be limited to one model, to the person's own entries, or to both. A role may hold several grants of the same action, each grant being one ability with its limits, and they add up, so the person may do what any one of them allows.

| Term | What it is |
| :-- | :-- |
| Grant | One ability as a role holds it, together with its limits. |
| Model limit | A grant that covers one model instead of every model. |
| Own entries | The entries whose author is the person, where the author is the account the entry records as its writer. |
| Own-entries limit | A grant that covers only the person's own entries. It is set on each grant, so one action can be limited this way while another is not. |

For example, the role Writer on the site Blog could hold these grants.

| Role | Action | Model | Own entries only |
| :-- | :-- | :-- | :-- |
| Writer | View entries | Every model | No |
| Writer | Edit entries | Post | Yes |
| Writer | Edit entries | Event | No |

Rina holds Writer on Blog, and Sam wrote some of the posts.

| When Rina tries to | Then | Because |
| :-- | :-- | :-- |
| View a post Sam wrote | Allowed | The view grant covers every model and every entry. |
| Edit a post she wrote | Allowed | The second grant covers Post and her own entries. |
| Edit a post Sam wrote | Refused | The only Post grant is limited to her own entries. |
| Edit an event Sam wrote | Allowed | The third grant covers every entry of Event. |
| Edit a page | Refused | No edit grant covers Page. |

A grant only ever allows. Nothing in a role takes away what another grant in it allows, so the answer for any action is found by looking for one grant that covers it.

## Consequences

### Positive

- A site can give narrow trust, such as one model or a person's own work, without a role for every model.
- One rule decides every action, which is whether any one grant covers it.

### Negative

- What a role allows is the sum of several grants, so the admin has to show that sum plainly for a person to read it.
- The own-entries limit means something only if every entry records an author.
- A grant without a model limit also covers every model created later, while a grant with one does not. An administrator who adds a model has to check which roles should reach it.

### Left open

- Which actions can take the own-entries limit. Creating an entry, for example, has no author to compare yet.
- Who becomes an entry's author and whether that can change, which the Entries blueprint settles.
- What happens to a grant limited to a model when that model is deleted.
- Limits finer than a model, such as one field, are not part of this decision.
