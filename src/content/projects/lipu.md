---
title: "Sheet Music That Listens Back"
shortName: Lipu
category: Music
year: 2024
tagline: "Upload a PDF score, get harmonic analysis. Classical music meets modern tooling."
liveUrl: https://yang-lou.com/projects/lipu/
---

## What it is

Lipu is a web-based harmonic analysis tool for classical music scores. Upload a PDF or MusicXML file and it extracts harmonic progressions, identifies key areas, and annotates the score with Roman numeral analysis.

## Why I built it

Harmonic analysis is a core skill in classical music education, but doing it by hand is slow. I wanted a tool that could handle the mechanical parts — note identification, interval calculation, chord labeling — so musicians could focus on interpretation.

## How it works

The backend parses the score using music21 (Python), extracts note events per measure, and runs a rule-based harmonic analysis algorithm. Results are returned as JSON and rendered as an annotated overlay on the score viewer.

## Tech stack

Python · music21 · Flask · JavaScript · PDF.js
