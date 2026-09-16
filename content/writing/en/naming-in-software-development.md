---
title: "On Naming in Software Development"
description: "Good names depend on more than conventions: they require a clear understanding of the domain, its relationships, and the abstractions behind them."
date: "2023-10-13"
updated: "2023-10-13"
category: "Building"
tags: ["Software Development", "Naming", "Domain Modeling"]
canonical: "https://samanhappy.com/en/writing/naming-in-software-development"
sourceUrl: "https://mp.weixin.qq.com/s/y2Yn5odFRXXFw1EoduHqJQ"
editionNote: "English translation of my Chinese article originally published on WeChat on 2023-10-13. The account below preserves the original context."
draft: false
---

Naming is so familiar in everyday development that we barely notice it—or even overlook it entirely.

As programmers, we name things every day: tables, fields, classes, methods, properties, variables, and more.

Why pay attention to naming?

Because code is meant to be read, whether by other people, our future selves, or even AI tools such as GitHub Copilot. Well-named code is easier to understand, modify, and extend, which improves software maintainability.

What makes a good name?

First, it should not be too long, which makes it verbose, or too short, which leaves its meaning unclear.

A good name precisely represents what it describes. Readers should understand it easily, without having to think too hard.

A good name should also be unambiguous, rather than leaving people to guess.

Naming things well is actually quite difficult.

Many industry coding standards include naming conventions, such as:

- Use camel case, with an uppercase initial for class names and a lowercase initial for method names.
- Use specific suffixes to identify particular kinds of things, such as Controller, Service, and Dao in the classic MVC pattern.
- Avoid meaningless temporary variable names such as i, j, and k.

Following naming conventions does improve readability, but in my view, it is far from enough.

Designing table and field names often requires a clear and correct data or domain model. A correct data model, in turn, requires strong comprehension and abstraction skills. A model maps reality. Without deep insight into things and the relationships between them, and without a thorough understanding of the business and its scenarios, it is impossible to design a good model.

Beyond understanding, we also need higher-level abstraction, generalization, synthesis, and compression. We need to identify and extract the underlying patterns and first principles from the complexity of the real world. Only then can we arrive at more appropriate names.

Although this article focuses on naming in development, the same reasoning applies to strategy, planning, and product design.

So how can we get better at naming? In my view, the following points deserve attention, though this is not an exhaustive list:

- Follow industry naming conventions.
- Understand the business and domain concepts deeply, and use a ubiquitous language.
- Improve your ability to analyze things systematically. Learn to distinguish different entities and the different relationships between them.
- Improve your abstraction skills. Identify what different entities have in common and uncover the general patterns behind them.

To sum up, naming matters, good naming is hard, and improving at it is a long and demanding process—but absolutely worthwhile.
