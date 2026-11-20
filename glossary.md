# Glossary

- **Created:** 2026-10-23

The terms the SSDPG documents use, in alphabetical order. If a term is not defined here, it has no authoritative meaning in this project. Each entry will point to the ADR or blueprint that governs the term once that document exists. The seed terms below are plain definitions and name no class, field or file, because no ADR governs them yet.

### Ability

The permission for one action on a site, such as editing entries or deleting a model. See [ADR 0004](adrs/0004-access-is-per-site.md).

### Bundled module

A module that ships with StarSystem instead of being installed separately. It has the same folder and manifest as any other module. The head is one. See [ADR 0008](adrs/0008-a-module-is-a-folder-with-a-manifest.md).

### Core

What StarSystem keeps when every module is off. That is the admin, the model builder, roles, files and, once it is built, the content API. See [ADR 0002](adrs/0002-the-core-is-headless.md).

### Entry value

The data saved on one entry for one field, such as `12` in a post's Author field. For a relation field it is the id of the linked entry, or a list of ids when several are allowed. See the [relation field blueprint](blueprints/relation_field.md).

### Extension point

A named place in core where a module attaches code, such as the moment before an entry is saved.

### Field settings

The options saved once on a field, as a small JSON object, that say how the field behaves. What they hold depends on the field's type. The field settings of a relation field hold the linked model, the label field and whether several entries are allowed. See the [relation field blueprint](blueprints/relation_field.md).

### Head

The website side of a site, a module that turns entries into pages. It covers themes, the list of addresses and the Site page. The entry "About" in a Pages model appearing at `/about` is the head's work. See [ADR 0002](adrs/0002-the-core-is-headless.md).

### Install

One copy of StarSystem with its one database. It holds one site in the first version and can hold several later. See [ADR 0003](adrs/0003-a-site-is-found-by-its-domain.md).

### Install owner

The one account that stands above the sites. It may do everything on every site, and it alone updates StarSystem and manages its modules. See [ADR 0007](adrs/0007-the-install-owner-stands-above-the-sites.md).

### Key

A secret that an outside app sends with each request to say who it is, for example a booking form on another website that saves reservations as entries. A key stands for an account that is not a person.

### Label field

The field of the linked model whose value names a linked entry, such as the name of an author. See the [relation field blueprint](blueprints/relation_field.md).

### Manifest

The one file in a module's folder that declares what the module is and what it adds. See [ADR 0008](adrs/0008-a-module-is-a-folder-with-a-manifest.md).

### Module

A folder that holds one self-contained addition to StarSystem, described by its manifest. It installs from a zip without Composer. See [ADR 0008](adrs/0008-a-module-is-a-folder-with-a-manifest.md).

### Page host

Code in core that shows the admin pages and menu items a module lists, so the head's Site page appears in the admin menu without core knowing about it.

### Public access

The list of which models are public and which checkbox field publishes an entry of each. A caller without a key can read the published entries of public models and can never write.

### Published box

The checkbox field that a model names as its published switch. An entry with the box unticked is a draft.

### Relation field

A field that links an entry to entries of another model, such as a post's author pointing at an entry in Authors. It holds one entry, or several when the field allows it. See the [relation field blueprint](blueprints/relation_field.md).

### Role

A named set of abilities, such as Editor. A person holds one role on each site they belong to. See [ADR 0004](adrs/0004-access-is-per-site.md).

### Site

One website with its own content, kept apart from every other site on the same install and found by the domain of the request. A site may have several domains. See [ADR 0003](adrs/0003-a-site-is-found-by-its-domain.md).
