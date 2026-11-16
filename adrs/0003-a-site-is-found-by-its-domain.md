# 0003 A site is a tenant found by its domain

- **Status:** Proposed
- **Created:** 2026-11-15
- **Ruled:** 2026-09-23

## Context

One person or agency often runs several websites. Giving each website its own copy of StarSystem means one install, one database and one round of updates per website. Serving several websites from one copy avoids that, but only if the data of each website is kept apart from the start. Adding that separation after installs hold data would mean rewriting what they have stored.

## Decision

A site is one website with its own content, kept apart from every other site on the same install. StarSystem finds the site a request is for from the request's domain. An install is one copy of StarSystem with its one database, and "tenant" is the common word for one of several sites sharing an install.

For example, an install that holds two sites answers like this.

| A request arrives for | StarSystem serves |
| :-- | :-- |
| `toko.example/products` | The site Toko, with Toko's models, entries and files |
| `blog.example/products` | The site Blog, which has no access to anything of Toko's |

```mermaid
flowchart TD
    A[A request arrives] --> B{Which site has this domain?}
    B -->|Toko| C["Only Toko's content is in reach"]
    B -->|Blog| D["Only Blog's content is in reach"]
```

What belongs to a site is stored with that site. That covers its models, its entries, its files, its settings and who may do what on it. What belongs to the install is shared by all its sites, which covers the code and its updates.

The first version offers one site per install. Everything per site is stored per site from that version on, so a later version can offer more sites without changing what an install has stored.

## Consequences

### Positive

- Several sites can later share one install, one database and one update.
- An install that starts with one site needs no migration of its content when that day comes.
- A mistake in one site's content or settings cannot reach another site.

### Negative

- Every piece of stored data and every request now needs a site, including in places where one site would not need it, and a feature that forgets it leaks one site's content into another.
- Each feature has to say what it keeps per site and what per install.
- The domain becomes part of a site's identity, so changing a site's domain is a feature of its own.

### Left open

- What StarSystem shows when no site has the request's domain, which is left to the feature that manages sites and domains.
