---
title: "DeepSheet · 理谱"
shortName: DeepSheet
category: Music
tagline: "Harmonic analysis for classical scores. Point it at a MusicXML file, get Roman numeral annotations back."
liveUrl: https://yang-lou.com/projects/lipu/
---

## What it is

DeepSheet (理谱) is a web-based harmonic analysis tool for classical music scores. Point it at a pre-downloaded MusicXML file and it extracts harmonic progressions, identifies key areas, and annotates the score with Roman numeral analysis.

## Why I built it

Harmonic analysis is a core skill in classical music education, but doing it by hand is slow. I wanted a tool that could handle the mechanical parts — note identification, interval calculation, chord labeling — so musicians could focus on interpretation.

## How it works

The backend parses the score using music21 (Python), extracts note events per measure, and runs a rule-based harmonic analysis algorithm. Results are returned as JSON and rendered as an annotated overlay on the score viewer.
