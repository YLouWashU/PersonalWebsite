---
title: "Daycare Monitor"
category: Work
tagline: "Motion-triggered video analysis with Google Gemini's advanced VLM capabilities."
---

## What it is

An automated video analysis pipeline that records live streams, detects motion events, and uses Google Gemini 2.0 Flash — a state-of-the-art vision language model — to reason about high-activity clips. The system runs on a cron schedule, generates daily summaries, and delivers notifications via Discord or email.

## How it works

Rather than analyzing full recordings, the pipeline identifies motion-heavy segments using OpenCV, clips just those intervals, and submits them to Gemini for visual reasoning. This targeted approach keeps API usage well within free-tier limits (~150 requests/day) while still covering the events that matter.

## Tech stack

Python · OpenCV · Google Gemini 2.0 Flash · ffmpeg · bash · cron · Discord API
