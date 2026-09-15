---
title: What Matt Pocock’s skills teach us about AI coding
description: A closer look at the workflows behind mattpocock/skills, and what they reveal about planning, feedback, and discipline in AI-assisted development.
date: '2026-05-28'
updated: '2026-05-28'
category: AI Engineering
tags: [AI Coding, Vibe Coding, Matt Pocock, Claude Code]
draft: false
---

Matt Pocock’s `mattpocock/skills` repository has been getting attention in the AI coding community.

If you write TypeScript, you have probably seen his tutorials. This project takes a different direction: a collection of **plain Markdown files** that teach coding agents such as Claude Code how to approach software development more carefully.

No JavaScript, no Python, no executable code. Just `.md` files.

The thinking behind those files offers a useful answer to a question I keep coming back to: what is missing from AI coding?

## 1. The problem with vibe coding

As AI coding tools have spread, so has a familiar workflow: describe roughly what you want, let the AI generate code, run it, and move on if it seems to work.

It is fast and satisfying. The difficulty is **not knowing what you have missed**.

The code runs, but you may not notice that:

- Edge cases are unhandled.
- The architecture is getting harder to change.
- Tests cover only the happy path.
- A decision will become expensive three months later.

Vibe coding can trade certainty for speed. The immediate result looks productive while debt accumulates out of sight, until making a change becomes difficult.

Pocock’s skills address that gap. The idea I take from the project is simple: **AI coding benefits from better discipline, alongside better models.**

## 2. Turn discipline into a workflow

The version of the project discussed here has 14 skills. Each is a **structured workflow**. You invoke a skill with a slash command, and the agent follows a process with you instead of jumping straight to implementation.

A few examples stand out.

### `/grill-me`: ask instead of assuming

This is the project’s flagship skill.

Give it a plan and invoke `/grill-me`. The agent questions you one decision at a time, helping you work through the branches you have not considered.

These are specific questions:

- “This plan depends on X, but X is not defined. How will you handle that?”
- “You said Redis would probably work. What does ‘probably’ mean here?”
- “This decision will be difficult to reverse. Which alternatives have you considered?”

For each question, it also recommends an answer that you can accept or reject.

The useful principle is that **many mistakes happen before implementation begins**. Clarifying a decision early can make the code much easier to write.

It is a reminder to understand the problem before trying to discover it through code.

### `/tdd`: vertical slices

Many people using AI for test-driven development ask it to write a batch of tests first and then implement everything. That is a horizontal approach: all the tests, followed by all the implementation.

Pocock’s `/tdd` skill calls for **vertical slices**:

1. Write one test.
2. Run it and confirm it fails because the behavior is missing.
3. Write the smallest implementation that makes it pass.
4. Refactor.
5. Return to step one.

The problem with a large batch is that you may discover, while implementing test five, that the assumptions behind the remaining fifteen were wrong.

A vertical slice gives you **feedback at every step**. Each test checks an assumption before you build much on top of it. When an assumption is wrong, there is less to undo.

Another useful rule is to avoid distorting the design just to make tests possible. If something is difficult to test, the interface may need attention. The question becomes “Why is this interface so hard to use?” rather than “How can I mock around it?”

### `/diagnose`: building the feedback loop is a skill

A common debugging pattern is to read an error, guess a cause, make a change, and guess again if it does not work.

`/diagnose` describes a six-stage process:

1. **Build a feedback loop:** establish a reliable way to observe the problem.
2. **Reproduce:** reduce it to a small, repeatable case.
3. **Form hypotheses:** list three to five plausible causes and rank them.
4. **Instrument:** use logs, breakpoints, or checkpoints to test the hypotheses.
5. **Fix:** address the root cause and add a regression test.
6. **Clean up:** remove debugging code and write a short account of what happened.

The first step matters most to me: **building the feedback loop is itself a skill**.

It is tempting to jump straight to a likely cause. Without a reliable reproduction, though, it is difficult to know whether a change actually fixed anything. Make the problem observable before trying to solve it.

## 3. Lightweight, but deliberate

Anyone can write a Markdown file. What is worth learning here is how those files are designed.

**Each skill is a conversation protocol.** It specifies what the agent should ask, do, and check at each stage. That is more actionable than a document that simply reminds it to write tests.

**The instructions are model-independent.** They do not depend on one model’s special features. As plain text, the workflows can be adapted to Claude, GPT, or Gemini, and may remain useful longer than any single tool.

**The skills compose.** You can clarify a plan with `/grill-me`, implement it with `/tdd`, and investigate failures with `/diagnose`. Each skill works independently, but they can also form a larger workflow.

## 4. Three patterns to take away

### Clarify before implementing

Spend a few minutes thinking through the plan before asking an agent to write code. You do not have to use `/grill-me`, but ask yourself:

- What assumptions does the plan rely on?
- Which decisions will be difficult to reverse?
- What edge cases have I overlooked?

A short conversation now can prevent a long round of rework later.

### Use a clear process

Whether you are implementing, testing, or debugging, define a sequence of steps and follow it.

Vertical-slice TDD and structured diagnosis can feel slower at first. Their value is that every step produces feedback, keeping the cost of a wrong turn small.

### Turn repeated advice into reusable instructions

If you keep telling an agent the same things—handle errors, avoid `any`, write the test first—put those instructions into a structured skill.

A short Markdown file can save you from repeating the same explanation across sessions. The most useful tools help us build better working habits.

## 5. Try one workflow

To install the skills:

```bash
npx skills@latest add mattpocock/skills
```

Then try `/grill-me` in Claude Code with a plan you are considering. See which assumptions it brings to the surface.

You can also read the files directly in the [mattpocock/skills repository](https://github.com/mattpocock/skills). They are all Markdown.

There is no need to adopt everything at once. Pick one recurring difficulty, try the corresponding skill for a week, and see whether it improves the way you work. A capable model helps; a clear process helps you use that capability well.
