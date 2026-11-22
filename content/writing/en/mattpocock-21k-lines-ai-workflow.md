---
title: AI Wrote 21,000 Lines of Code. Here Is Where Matt Pocock Actually Spent His Time
description: Matt Pocock shipped a 21,000-line feature with AI agents by concentrating human effort at the two ends—clarifying requirements, naming, and prototypes up front, then reviewing by risk and turning review comments into ratcheted checks with Retro.
date: '2026-11-22'
updated: '2026-11-22'
category: AI Engineering
tags:
  - AI Coding
  - Matt Pocock
  - Claude Code
  - Code Review
sourceUrl: 'https://www.youtube.com/watch?v=jVBlkOF8sHk'
editionNote: Adapted from Matt Pocock’s walkthrough video and companion notes; screenshots are captured from the original video.
draft: false
---

Matt Pocock originally just wanted to eliminate the repetitive loop of switching windows, taking screenshots, and pasting images while making YouTube thumbnails. That single improvement grew into a roughly 21,000-line pull request. His walkthrough shows how he collaborated with AI across the whole arc: clarifying requirements through structured questioning, testing quick prototypes, splitting the spec into parallelizable tickets, and finally turning code review feedback back into repository rules.

## Background: Matt Pocock and His AI Skills

Matt Pocock is a software engineer and educator known for his TypeScript courses and practical AI coding workflows. He maintains [mattpocock/skills](https://github.com/mattpocock/skills), an open repository of reusable agent workflows (covered earlier in [this deep dive](/writing/mattpocock-skills-deep-dive)). A skill is a structured set of Markdown instructions that tells a coding agent how to interview you, model a domain, write a spec, implement changes, or run a retrospective.

This session chains several skills together—grilling, spec writing, ticket breakdown, implementation, and review—with two bookends doing the heaviest lifting: **Grill With Docs** at the start to interrogate requirements against existing docs and code, and **Retro** at the end to mine agent sessions and review comments for rules that prevent repeat mistakes.

## Starting from Friction: Explain Why the Current Flow Hurts

Inside Matt’s internal course-and-video manager sits a thumbnail editor. Previously, making a thumbnail meant capturing his face, removing the background, jumping to a separate drawing tool to sketch a diagram, taking a screenshot, and pasting it back. If the alignment was off by a few pixels, he had to switch back, adjust, and screenshot all over again. He wanted his cutout portrait and an editable diagram inside the same frame—but layout, persistence, and reuse boundaries were all still undecided.

Before writing any code, Matt triages the size of the change: small fixes can be one-shotted; changes touching multiple areas start with a structured Q&A; and if the scope keeps growing mid-conversation, he switches to phased planning. Because this touched both editing UX and data storage, he began by talking it through.

Using voice dictation in Claude Code, he described why the current workflow felt clunky rather than prescribing where buttons should go. The agent followed up with concrete questions: Should thumbnail diagrams share state with video diagrams? Should he be able to start from a blank canvas? Can the portrait move or be retaken? Should he be able to search and insert previous diagrams?

Answering each question narrowed the scope: keep it focused on diagrams rather than turning it into a general-purpose design tool; capture and remove the background first, then compose the diagram around the face; keep the diagram stationary when nudging the portrait. A fuzzy annoyance became a set of explicit product decisions.

![Launching Grill With Docs in Claude Code](/images/mattpocock-21k-lines-ai-workflow-320.webp)

*[5:20](https://www.youtube.com/watch?v=jVBlkOF8sHk&t=320s) · Matt launches `/grill-with-docs` in Claude Code to dictate what makes his thumbnail workflow painful.*

## Using Naming to Nail Down Persistence

Once the UX shape emerged, the discussion shifted to domain modeling: what is this new entity inside the system? Matt checked the project glossary to see how existing diagrams (hand-drawn explanatory diagrams, not data charts) are defined. Video diagrams keep timestamped snapshots so he can see what a diagram looked like when a specific clip was recorded. Thumbnail artwork, however, needs ongoing edits. Matt therefore decided thumbnails should own their own diagrams—copied from a teaching diagram or snapshot so he can tweak composition freely without mutating the original or its recording history.

At that point, naming became design work. After ruling out “Thumbnail Drawing” to avoid muddying the existing “Diagram” term, Matt asked the agent to test three candidates against real usage scenarios: **Snapshot**, **Thumbnail Diagram**, and **Thumbnail Scene**. Putting each name into concrete sentences exposed the flaws immediately: saying “I dragged an arrow in the snapshot” contradicts the glossary because snapshots are immutable records of a point in time; “Scene” already existed in older code identifiers, sat on the glossary’s avoid list, and wasn’t a phrase Matt naturally spoke. After testing five scenarios, the plainest option—**Thumbnail Diagram**—proved the least ambiguous.

![Comparing three candidate names across concrete scenarios](/images/mattpocock-21k-lines-ai-workflow-1430.webp)

*[23:50](https://www.youtube.com/watch?v=jVBlkOF8sHk&t=1430s) · Testing Snapshot, Thumbnail Diagram, and Thumbnail Scene across scenarios like timeline lookups and dragging arrows.*

The agent then drafted an Architecture Decision Record (ADR) explaining why thumbnails own independent diagrams instead of sharing video diagram timelines. Matt questioned whether it warranted a standalone ADR before keeping it. In his view, a glossary defines what concepts exist today while ADRs explain why they exist—reading them before touching a mature codebase prevents agents and humans alike from deleting intentional design choices.

He also nailed down reuse boundaries: both editors share the underlying drawing components, thumbnail editing can search teaching diagrams and snapshots, and the main diagram playground can search past thumbnail diagrams. While updating the glossary, he renamed `Component` to `Diagram Component` so it would not collide with React components.

## Three Prototypes to Test What Words Cannot Settle

Some interaction questions cannot be answered in chat. To see how the portrait and diagram should sit together, Matt had the agent build three quick prototypes in parallel: Option A overlays the face cutout directly with the live drawing frame; Option B places the face inside the drawing canvas as a canvas element; Option C splits the editor and preview side by side.

Trying them made the verdict obvious. Putting the face inside the canvas made it feel oversized; the split view forced constant eye ping-pong when trying to align a box with his pointing finger. Option A matched his mental model immediately.

![Option A live editor in the frame prototype](/images/mattpocock-21k-lines-ai-workflow-2070.webp)

*[34:30](https://www.youtube.com/watch?v=jVBlkOF8sHk&t=2070s) · Option A composites the face cutout and editable diagram in one frame with live previews on the right.*

Hands-on testing uncovered a wave of polish details: finer face nudging, ghosting the portrait whenever the pointer enters the frame so hidden shapes stay readable, moving multi-size YouTube previews below the editor, simulated face retakes, unified undo across face moves and drawing edits, and keyboard shortcuts to insert existing diagrams. During the second iteration, a thin white border appeared along the edge. The agent reproduced it in the browser, compared edge pixels between the preview and exported image, and traced it to Chrome’s downscaled preview rendering at 125% Windows display scaling.

Prototyping turned subjective taste into direct comparison. Once Option A won, Matt iterated only on that prototype until every interaction felt right, before writing production code.

![Iterated prototype embedded in the app page](/images/mattpocock-21k-lines-ai-workflow-2285.webp)

*[38:05](https://www.youtube.com/watch?v=jVBlkOF8sHk&t=2285s) · The refined prototype embedded in the actual page with Home Feed, Search Results, and Sidebar previews below.*

## Write Decisions Down First, Then Let Agents Run

With requirements and interactions settled, Matt had the agent distill the conversation into a formal spec and ticket breakdown. The PRD captured over forty user stories, implementation choices, explicit non-goals, and prototype links; the work was split into 9 tickets with dependencies and parallel entry points clearly marked.

Before starting implementation, he compacted the long chat history and handed off to the implementation workflow. Because every important decision now lived in the glossary, ADR, PRD, tickets, and prototype, the coding agents no longer had to excavate intent from dozens of chat turns. The same logic applies to isolated bugs: start a fresh session with only the relevant evidence rather than dragging the entire prototyping transcript along. The earlier product decisions are locked down, the less the agent improvises.

![Ticket dependencies, context compaction, and spec implementation](/images/mattpocock-21k-lines-ai-workflow-2845.webp)

*[47:25](https://www.youtube.com/watch?v=jVBlkOF8sHk&t=2845s) · Ticket dependencies and pre-flight notes in the terminal, followed by `/compact` and `/implement-spec`.*

Multiple agents then worked through the 9 tickets in dependency order, producing a roughly **21,000-line** pull request. An automated review pass caught one must-fix bug and a few out-of-scope additions. Rather than slogging through a 21,000-line diff in one sitting, Matt asked the agent to split the changes into a clean sequence of smaller PRs.

## Code Review: Triage by Risk, Explain Why Patterns Matter

The diff was reorganized into 7 stacked PRs (stacked diffs—each independently reviewable and merged in sequence), separating glossary updates, ADRs, shared editor abstractions, and UI work. Matt focused first on the highest-risk layer: incremental database migrations for thumbnail diagrams, where persistent schema changes are hard to roll back cleanly. He distinguishes between **one-way doors** (irreversible or persistent changes) and **two-way doors** (easily reversible UI tweaks), and considers feature flags when rolling out risky behavior.

Because this is his personal tool, he reviewed the diffs first and tested interactively after merging; for multi-user production systems, he noted he would walk through the live feature in a preview environment beforehand.

![Reviewing stacked PR diffs on GitHub](/images/mattpocock-21k-lines-ai-workflow-3340.webp)

*[55:40](https://www.youtube.com/watch?v=jVBlkOF8sHk&t=3340s) · Matt inspects the stacked pull requests on GitHub.*

Across the diffs, several recurring anti-patterns stood out: bloated comments narrating what code already says; `as` type assertions outside shared utilities (telling TypeScript “trust me” and bypassing type safety); raw magic strings in `useSearchParams` that break silently on renames; raw `fetch` calls instead of a typed API client; and unnecessary `useEffect` calls scattered through components. For each issue, Matt pushed for a safer, reusable pattern rather than a one-off line edit.

His review comments follow a clear formula: **where the pattern appears → why it causes trouble → what reusable abstraction or check should replace it.** Saying “this feels off” gives an agent almost nothing to generalize from; explaining that a raw query parameter string won’t fail typechecking on rename points straight to a typed helper. He also called out what worked well—solid automated tests or collapsing scattered conditionals into one unified check—so the system learns what to preserve, not only what to reject.

## Retro: Turning Review Comments into System Guardrails

Code review asks: “Is this change safe and right?” **Retro** asks: “Why did these issues keep happening, and how do we prevent them next time?”

Matt pointed Retro at more than 30 agent transcripts alongside his 12 review comments. Although the comments touched different files, the root cause was remarkably consistent: the repository’s written guidelines never stated those rules, while older docs and legacy code actively demonstrated the opposite patterns. The agents were not inventing bad habits out of thin air—they were faithfully mirroring the codebase they could see.

Retro’s prescription was blunt: **fewer paragraphs of prose, more automated enforcement.** Turn mechanical rules into lint checks; wrap error-prone APIs in typed helpers; record architectural rationale in ADRs; fix misleading docs. For massive existing backlogs—over two thousand `as` assertions and 151 raw `fetch` calls—the agent proposed **shrink-only ratchets**: lock the current violation count as a ceiling so legacy code does not block progress, fail CI if any new change pushes the number up, and automatically lower the ceiling whenever old violations are removed. New guardrails take effect on day one without a stop-the-world rewrite.

![Retro converting review comments into ratcheted lint checks](/images/mattpocock-21k-lines-ai-workflow-3620.webp)

*[1:00:20](https://www.youtube.com/watch?v=jVBlkOF8sHk&t=3620s) · Retro maps human review comments to lint rules paired with shrink-only ratchets.*

The comment audit illustrated why root-cause analysis beats blanket rules. Roughly 18% of the new feature’s lines were comments, compared with about 12% across the repo. Instead of ordering all comments deleted, Matt asked whether deleting them would destroy context invisible in the code. An audit of all 2,053 comment lines in `features/diagrams` proved the caution worthwhile:

- About **940 lines** merely repeated the code or restated test names and could be deleted immediately.
- About **1,040 lines** captured real non-obvious constraints—library quirks, race conditions, custom-shape persistence contracts, and product rules—distilling down to ~45 distinct facts: ~30 compact one-line call-site comments, plus entries moved into two new ADRs, `KEYBOARD_SHORTCUTS.md`, and the glossary.
- The audit also caught **7 stale comments** and a dead event that was never dispatched.

![Comment audit results for features/diagrams](/images/mattpocock-21k-lines-ai-workflow-3870.webp)

*[1:04:30](https://www.youtube.com/watch?v=jVBlkOF8sHk&t=3870s) · The agent audits 2,053 comment lines in `features/diagrams`, separating noise from durable knowledge and stale comments.*

Retro also discovered that parts of the throwaway prototype had been copied straight into production code. That insight led back to Matt’s own skills repository: prototypes exist to validate UX, not to be pasted verbatim into shipping code. Retro’s output split cleanly into two tracks—codebase cleanup tickets for the app, and workflow refinements for his reusable skills.

## Back to the Original Friction

Finally, Matt opened the shipped thumbnail editor: captured and cut out his face, drew shapes and typed labels directly beside it, nudged positioning, and checked the previews—all inside a single view. The old loop of switching windows, screenshotting, pasting, and redoing collapsed into one workspace.

![Editing portrait and diagram in one frame after shipping](/images/mattpocock-21k-lines-ai-workflow-4005.webp)

*[1:06:45](https://www.youtube.com/watch?v=jVBlkOF8sHk&t=4005s) · After shipping, Matt composes his portrait alongside live text and shape tools in the same frame.*

That is the sharpest contrast in the entire walkthrough: behind a 21,000-line pull request, Matt spent almost none of his effort typing implementation code by hand. Instead, he concentrated his energy at **both ends**—defining the problem, domain language, and UX up front, then auditing risk and encoding lessons into automated rules at the end—while delegating the decomposable, parallelizable middle to long-running agents.

## Patterns Worth Taking Away

**Turn fuzzy UX debates into testable prototypes.** Instead of arguing layout details in prose, test two or three quick prototypes against one concrete task (like aligning a box with a pointing finger). For visual bugs like edge artifacts, have the agent reproduce and inspect pixels before guessing.

**Persist decisions, then compact or isolate context.** Anchor domain terms and trade-offs in a glossary and ADRs, and carry execution through a spec and tickets. Compact long conversations before coding starts; for isolated bugs, hand a fresh session only the relevant evidence.

**Review one-way doors before two-way doors.** Prioritize verification and rollback paths for migrations, permissions, and external side effects. Treat reversible UI polish separately so minor comments do not stall delivery.

**Write review comments for the system, not just the line.** Name the location, explain the real failure mode, and point to a reusable replacement so comments become raw material for Retro rather than one-off preferences.

**Replace prose reminders with automated guardrails and ratchets.** Enforce mechanical standards through lint rules and typed helpers instead of longer prompts. When legacy debt is huge, use a shrink-only ratchet so new standards apply immediately without blocking on a full rewrite.

### A Minimal Code Review Note Format

> **Location → What I noticed → What breaks or degrades → Reusable fix to prefer → Merge blocker?**

### A Reusable Retro Prompt

> Review these agent transcripts, code diffs, and human review comments together. Group recurring issues by root cause with concrete citations. Propose prioritized follow-ups split into immediate fixes, automated checks (using shrink-only ratchets for existing debt), safe abstractions, tests, documentation updates, and skill/workflow changes. Clearly mark what is evidence-backed versus speculative, and draft tickets for review before making bulk code edits.

---

*Screenshots are captured from the original video; click any timestamp in the captions to jump straight to that moment.*

## Sources

- [Original video](https://www.youtube.com/watch?v=jVBlkOF8sHk)
- [Companion article by Matt Pocock](https://www.aihero.dev/watch-me-ship-a-21-000-line-feature-with-mattpocock-skills~ez95n)
- [Video transcript](https://www.usetranscribe.io/yt/jVBlkOF8sHk/feature-development)
