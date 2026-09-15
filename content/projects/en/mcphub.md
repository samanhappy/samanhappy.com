---
title: MCPHub
description: Connect, manage, and govern MCP servers through one unified gateway.
tagline: An open-source MCP gateway for AI agents.
status: Active · Open source
type: Agent infrastructure
tags: [Open source, MCP, Agent infrastructure]
website: https://mcphub.app
github: https://github.com/samanhappy/mcphub
docs: https://docs.mcphub.app
order: 1
---
## Overview

MCPHub is an open-source gateway for MCP servers. It gives AI applications a single place to connect, manage, and organize their tools, so developers can spend more time building the application itself.

## Who it's for

AI developers connecting multiple MCP servers, and teams that want a shared place to manage their agents' tools.

## Use it when

- You need a unified endpoint for multiple MCP servers.
- Different applications need different groups of tools or routing rules.
- You want to manage access and keep an eye on server health.
- Your tool collection has grown beyond a handful of individual configurations.

## Key features

- **Unified gateway:** aggregate MCP servers behind a shared endpoint.
- **Flexible organization:** use groups and routing to expose the tools a client needs.
- **Management interface:** configure servers and inspect their status in one place.
- **Open source and self-hosted:** run it in your own environment and contribute improvements.

## Why I built it

As AI applications connect to more tools, managing each server separately becomes repetitive work. MCPHub moves that work into a shared management layer, making tool integration easier to maintain over time.

## Compared with direct connections

Connecting directly to a single MCP server works well for simple setups. MCPHub is useful when several clients need to reuse several servers, with shared configuration and a central management interface. It works alongside the underlying MCP servers.

## Status

Active and open source. See the documentation and GitHub releases for current capabilities, deployment instructions, and version changes.

## Links

- [Official website](https://mcphub.app)
- [GitHub](https://github.com/samanhappy/mcphub)
- [Documentation](https://docs.mcphub.app)

## FAQ

### Is MCPHub an AI model?

MCPHub is infrastructure for connecting and managing MCP servers. It works with AI clients that support MCP.

### Can I host it myself?

Yes. The project is open source. Deployment instructions and configuration references are available in the documentation.
