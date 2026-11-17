# 0001 Shared hosting is the floor

- **Status:** Proposed
- **Created:** 2026-11-15
- **Ruled:** 2026-09-23, the versions on 2026-11-15, and the optional use of a running program on 2026-11-16

## Context

StarSystem is meant for people who rent the cheapest kind of web hosting. On shared hosting the customer gets a control panel, a file manager, PHP and a database. There is no command line, nothing can be installed on the server, and no program keeps running between two requests.

A content system built for a server its owner controls does not fit there, and making it fit afterwards means redesigning its installer, its updates and its background work. So the host StarSystem must run on is fixed before those are designed.

## Decision

StarSystem installs, runs and updates on shared hosting, and no feature of it may need more than that host gives. That is a minimum and not a target. It limits what StarSystem may require, and it does not limit how far an install can grow.

| The host has to give | StarSystem never needs on the host |
| :-- | :-- |
| PHP 8.3 or newer | A command line, such as SSH |
| MariaDB 10.11 or newer, or MySQL 8.0 or newer | Composer or Node |
| A way to upload and unpack a zip | Redis, or any other service beside the database |
| A cron line, or any service that requests a URL on a schedule | A program that keeps running, such as a queue worker |

The table uses a few terms that need a plain meaning.

| Term | What it is |
| :-- | :-- |
| Cron line | One entry in the host's scheduler, such as "run this command every minute". |
| SSH | A way to type commands on the server from another computer. |
| Composer | A tool that downloads the code libraries a PHP program uses. |
| Node | A program that runs JavaScript on the server. |
| Redis | A service that keeps data in memory beside the database, so frequent answers are ready without asking the database. |
| Queue worker | A program that stays running and does the jobs waiting in a queue, such as mail waiting to be sent. |

Four rules follow from the table.

1. A release is one zip that holds StarSystem together with everything it depends on, including Laravel 13, the framework it is built on. A person installs it by unpacking the zip on the host and opening the installer in a browser. The zip is the way a release is delivered and the way every host can use, and it does not stop an owner of their own server from installing another way.
2. An update is applied from the admin, the screens where staff manage the site, in a browser, and needs nothing the table rules out.
3. Work that does not belong to one page view, such as sending queued mail, is done in small pieces. A cron line or a scheduled request to a URL starts each piece, and a piece finishes within the time a host allows one request.
4. The right-hand column lists what StarSystem never requires, not what it never uses. Where the host does give one of those things, such as a queue worker, Redis, a command line or another program that keeps running, StarSystem may use it for the same work. Every feature still completes without it, only more slowly, so such a thing is an accelerator and never a requirement. The same zip serves both kinds of host.

For example, the same queued mail is picked up like this.

| Host | What starts a piece of queued mail work | Delay before it runs |
| :-- | :-- | :-- |
| Shared hosting | A cron line, at the interval the host allows, such as every minute | Up to that interval |
| A server the owner manages | A worker that stays running | As soon as the work is queued |

```mermaid
flowchart TD
    A[A person downloads the release zip] --> B[Unpacks it on the host]
    B --> C[Opens the installer in a browser]
    C --> D[StarSystem runs]
    E[Cron line or scheduled URL] -->|starts one small piece of background work| D
    F["Worker or other running program, when the host has one"] -.->|does the same work sooner| D
```

## Consequences

### Positive

- Anyone with a hosting account can run StarSystem, without a developer and without a server of their own.
- The same zip also runs on a larger server, since that server gives everything the floor does, and there it can use a worker, Redis or the command line to go faster.

### Negative

- Background work on the floor is slower than with a running worker, because it advances only when the schedule fires.
- A feature that needs a running program or a second service is ruled out, or is redesigned to do without one. Using one as an accelerator is allowed.
- A feature that uses an accelerator has two ways to run, and both have to be tested.
- The release zip is larger because it carries its dependencies, and each release has to be built and tested as that zip.
- The versions in the table are the ones the tests run on. Raising one of them drops installs that already work, so it is a new ADR.
