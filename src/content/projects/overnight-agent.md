---
title: "Overnight Agent"
category: Fun
tagline: "A Claude Code skill for working past the usage limit."
githubUrl: https://github.com/YLouWashU/overnight-agent
---

## What it is

A Claude Code skill that handles the usage limit gracefully. Instead of losing context when you hit the cap, Overnight Agent captures your session state, schedules a cron-based wakeup, and picks up exactly where you left off — so you can log off and come back to a running agent in the morning.

## How it works

Three modes: **pause** captures context and schedules the resume cron job; **resume** awakens and reconstructs the session; **recap** shows current status. Session data is stored locally; no external services required.

## Tech stack

Claude Code CLI · system crontab · bash · session state management
