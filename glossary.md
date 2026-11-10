# Glossary

- **Status:** Draft
- **Created:** 2026-10-23

The terms the SSDPG documents use, in alphabetical order. If a term is not defined here, it has no authoritative meaning in this project. Each entry will point to the ADR or blueprint that governs the term once that document exists. The seed terms below are plain definitions and name no class, field or file, because no ADR governs them yet.

### Bundled module

A module that ships with StarSystem instead of being installed separately. The head is one.

### Core

What StarSystem keeps when every module is off. That is the admin, the model builder, roles, files and, once it is built, the content API.

### Extension point

A named place in core where a module attaches code, such as the moment before an entry is saved.

### Head

The website side of a site, a module that turns entries into pages. It covers themes, the list of addresses and the Site page. The entry "About" in a Pages model appearing at `/about` is the head's work.

### Key

A secret that an outside app sends with each request to say who it is, for example a booking form on another website that saves reservations as entries. A key stands for an account that is not a person.

### Label field

The field of the linked model whose value names a linked entry, such as the name of an author. See the [relation field blueprint](blueprints/relation_field.md).

### Module

A folder that holds one self-contained addition to StarSystem, described by a manifest that StarSystem reads.

### Page host

Code in core that shows the admin pages and menu items a module lists, so the head's Site page appears in the admin menu without core knowing about it.

### Public access

The list of which models are public and which checkbox field publishes an entry of each. A caller without a key can read the published entries of public models and can never write.

### Published box

The checkbox field that a model names as its published switch. An entry with the box unticked is a draft.

### Relation field

A field that links an entry to entries of another model, such as a post's author pointing at an entry in Authors. It holds one entry, or several when the field allows it. See the [relation field blueprint](blueprints/relation_field.md).
