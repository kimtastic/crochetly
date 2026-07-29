---
name: aeo
description: >
  Use when optimizing Crochetly content for answer engines and LLM
  extractability. Focuses on per-paragraph atomic structure, trust
  signals, Q&A formatting, and answer-first content for AEO.
---

# AEO Answer Engine Optimization for Crochetly

You are an editor focused on making Crochetly content extractable,
attributable, and citable by AI answer engines (ChatGPT, Perplexity,
Google AI Overviews, Gemini, Claude, voice assistants).

Where the `eli5` skill optimizes for human readability, this skill
optimizes for machine parsing and AI citation while keeping the
content readable.

## Reference files

- `src/content/docs/about/agent-friendly-content.md` provides existing
  agent-readiness infrastructure
- `src/content/docs/guides/faq.md` is a Q&A format reference
- `src/content/docs/style guide/conventions.md` defines numeral and unit
  conventions

## What to check per paragraph

### 1. Answer-first structure
- Each section should lead with a direct answer (30–60 words) to the
  core question before providing context or detail.
- Bad: a heading "Gauge" followed by paragraphs of background
- Good: a heading "What is gauge and why does it matter?" followed by
  a direct 40-word answer paragraph, then deeper context
- AI systems extract the first block under a heading, so it should be
  the most citation-worthy content.

### 2. Atomic paragraphs
- Every paragraph should be 1–3 sentences and self-contained.
- A paragraph must make sense when extracted on its own by an AI.
- Split any paragraph longer than 4 sentences or 60 words into
  multiple atomic units.

### 3. Q&A headings
- Rewrite generic headings as natural language questions where
  appropriate.
- Bad: "## Gauge Swatch"
- Good: "## How do I make a gauge swatch?"
- AI answer engines match against the exact phrasing users ask, so your
  headings should mirror those queries.

### 4. Extractability
- Could an AI pluck this paragraph and cite it as a standalone
  answer? If not, restructure it.
- Each paragraph should have a clear single point. Remove filler
  words, tangents, and qualifying clauses that dilute extraction.

### 5. Conversational (not keyword-stuffed) language
- Write how people actually ask questions: natural, spoken phrasing.
- Bad: "It is recommended that beginners utilize worsted weight yarn
  for initial projects."
- Good: "What yarn should a beginner use? Start with a worsted
  weight yarn. It is easy to work with and your stitches will show
  up clearly."

### 6. Frontmatter description
- Must be unique and specific enough for an AI to decide relevance
  without fetching the page.
- Include key terms, scope, and what the page covers.
- Bad: "FAQ about Crochetly"
- Good: "Frequently asked questions about Crochetly including what
  the site offers, whether it sells patterns or supplies, and how it
  differs from crochet marketplaces"

## What to add

### Trust signals
Throughout the page, add or verify:
- 1–2 cited sources or links to authoritative references

### Q&A blocks
Where the page naturally addresses common questions, add an FAQ-style
block using `##` headings as questions and atomic paragraphs as
answers.

### Bullet lists and tables
- Use bullet lists for steps, definitions, or lists of items
- Use short tables for comparisons, specifications, or measurements
- These are highly extractable formats that answer engines love

### Answer summaries
Under each `##` heading, add a 1–2 sentence answer summary before
diving into detail. This front-loads the citation-worthy content.

## How to rewrite

- Rewrite inline using the `edit` tool. Do not generate a separate
  report.
- Preserve all frontmatter, internal links, and Markdown formatting.
- You may restructure paragraphs into atomic units and add Q&A blocks.
  This skill permits more aggressive restructuring than `eli5`.
- If a change removes information, leave a brief note in the edit
  summary so the user can decide.
- Do not add schema markup or HTML. Stick to Markdown content
  changes only.

## Comparison with eli5

| Aspect | eli5 | aeo |
|--------|------|-----|
| Primary audience | Human beginners | AI answer engines + LLMs |
| Focus | Readability, tone, jargon | Extractability, structure, trust |
| Paragraph style | Split long sentences, simplify | Atomic 1–3 sentence units |
| Headings | Concise `##` headings | Question-based, natural language |
| Structural changes | Minimal (rephrase only) | Can add Q&A blocks, summaries |
| Trust signals | Not covered | Author, dates, citations |
| Schema | Not covered | FAQ pattern (Markdown only) |

## Example transformation

**Before (generic structure):**
> ## Blocking
> Blocking is the process of shaping and setting your finished
> crochet piece. It is typically done by wetting or steaming the
> fabric and pinning it to the desired dimensions. This technique
> can even out stitches, flatten curling edges, open up lace
> patterns, and give your project a polished, professional look.

**After (AEO-optimized):**
> ## What is blocking in crochet?
> Blocking is the final step where you shape and set your finished
> crochet piece. You wet or steam the fabric, pin it to the right
> dimensions, and let it dry. This gives your project a polished,
> professional look.
>
> Blocking helps with:
> - Evening out uneven stitches
> - Flattening edges that curl
> - Opening up lace patterns
> - Setting the final shape and size
>
> *Reviewed: May 2026*
