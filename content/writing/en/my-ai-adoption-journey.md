---
title: My AI adoption journey — Mitchell Hashimoto
description: Mitchell Hashimoto’s gradual path from experimenting with AI to making agents part of everyday engineering work.
date: '2026-02-05'
updated: '2026-02-05'
category: AI Engineering
tags: [AI Coding]
draft: false
author: Mitchell Hashimoto
authorUrl: https://mitchellh.com
sourceUrl: https://mitchellh.com/writing/my-ai-adoption-journey
editionNote: This English edition is rendered from the Chinese translation archived on this site. It is not a verbatim copy of the original; follow the source link for the author’s original wording.
---

When I adopt a significant new tool, I usually go through three stages: being less productive, getting back to roughly where I started, and eventually changing how I work in a meaningful way.

I often have to push myself through the first two stages. I already have a comfortable workflow, and learning a new tool takes effort. But I usually do it because I want to become a more capable developer.

This article describes how I found value in AI tools and what I want to try next. With so much exaggeration around the subject, I want to offer a more measured perspective.

## Step 1: move beyond chatbots

For substantial engineering work, a chatbot interface such as the ChatGPT or Gemini website is limiting.

Chat tools are useful, and I use them regularly. But in programming, you are often hoping for a correct answer on the first attempt, then repeatedly stepping in to correct it.

Most people first encounter AI through chat and try asking it to write code. I once gave Gemini a UI screenshot and asked it to recreate it in SwiftUI. The result was impressive.

Trying that approach on a real project was a different experience. Copying code and output back and forth took time, and the results were often disappointing. It could be slower than writing the code myself.

To get more value, I needed an agent: an LLM that can perform actions in a loop, including reading files, running programs, and making HTTP requests.

## Step 2: reproduce your own work

I started using Claude Code, but I was not happy with it at first.

I then did something uncomfortable but useful: after completing a task myself, I asked an agent to do the same task without showing it my implementation.

This was slow, but it gave me a much better understanding of the tool. A few lessons emerged:

1. Break a task into clear, small steps instead of asking for everything at once.
2. Separate ambiguous work into planning and execution.
3. Give the agent a way to verify its results, so it can correct its own mistakes.

I also started to understand which tasks suited an agent and which did not.

My results improved, but the process was still only about as fast as doing the work myself. Even so, I was starting to accept AI as a useful tool.

## Step 3: start agents before finishing work

I tried starting a few agents about thirty minutes before the end of the workday. The goal was to let them make progress while I was away.

The early results were mixed. Over time, I found several useful tasks:

- Research, such as finding libraries for a language and comparing their trade-offs.
- Exploring ideas in parallel to see whether an approach was viable.
- Analyzing and organizing issues and pull requests.

These tasks did not always produce a finished deliverable. They did give me a better starting point the next morning.

## Step 4: delegate reliable wins

With experience, I learned which tasks an agent was likely to handle well. I began delegating those tasks so I could focus on work I found more valuable or enjoyable.

One lesson stood out: do not let the agent keep interrupting you.

Context switching is expensive. I want to choose when to check on an agent instead of constantly responding to its notifications.

By this point, even without a dramatic productivity increase, I did not want to return to working without AI. I could spend more attention on the parts of the work I cared about most.

## Step 5: engineer the harness

An agent is more useful when it gets close to the right result on its first attempt.

I began working on what I call harness engineering: when an agent makes a mistake, improve its working environment so that mistake is less likely to happen again.

### Improve persistent instructions

Record useful rules in files such as `AGENTS.md`, so the agent has guidance before it starts a task.

### Build verification tools

Examples include tools that:

- Take screenshots automatically.
- Run tests.
- Check the results of a change.

Instructions and tools work together to help the agent verify its own output.

## Step 6: keep an agent working

My next goal is to keep an agent working in the background whenever there is useful work for it to do.

When none is running, I ask myself whether there is a task I could hand over.

I usually run one agent at a time. That lets me balance focused thinking with AI assistance.

At this point, an agent is running for roughly 10–20% of my working time. I am still improving that workflow.

## Where I am now

I have found practical value in AI and a measured way to use it.

I am a software engineer who enjoys making things and wants to write code. That is what matters to me.

The field changes quickly. I may soon look back and question some of what I think today. But if your past work never makes you a little uncomfortable, you may not be growing.

[Read Mitchell Hashimoto’s original article](https://mitchellh.com/writing/my-ai-adoption-journey).
