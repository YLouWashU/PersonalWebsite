---
title: "Allowlist Manager"
category: Fun
tagline: "A Claude Code skill that tames permission prompts."
githubUrl: https://github.com/YLouWashU/allowlist-manager
---

## What it is

A Claude Code skill that automates permission management. Instead of approving the same safe commands over and over, Allowlist Manager intelligently filters them — distinguishing benign patterns from dangerous ones (like `sudo` or `rm -rf`) — and auto-populates your allowlist.

## Features

- Automatic safe-command detection with concurrent-safe file locking
- Virtual environment wildcard expansion for Python projects
- Retroactive init mode to capture patterns from existing transcripts
- Risky commands queued for manual review rather than silently blocked

## Tech stack

Python · shell scripting · Claude Code hooks · JSON settings management
