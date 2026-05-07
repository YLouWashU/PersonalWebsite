---
title: "Classical Catalog"
category: Music
tagline: "Gramophone reviews, Spotify previews, and LLM-generated TLDRs — one searchable catalog."
liveUrl: https://ylouwashu.github.io/ClassicalCatalog/en/index.html
---

## What it is

A personal catalog of classical music recordings built from Gramophone magazine reviews. An automated pipeline scrapes reviews, generates bilingual TLDRs using an LLM, enriches each entry with Spotify track data, and publishes everything as a searchable static site.

## How it works

The pipeline runs in four stages: extract (scrape Gramophone via Zinio), process (generate English/Chinese TLDRs via Claude), enrich (match recordings to Spotify), publish (generate static HTML via Jinja2 templates). The result is annotated recording comparison cards with performer and label details.

## Tech stack

Python · litellm · Claude · Spotify API · Jinja2 · Pydantic · GitHub Pages
