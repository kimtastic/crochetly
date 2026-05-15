---
title: Agent-friendly content
description: How Crochetly makes its documentation discoverable and consumable by AI coding agents, LLMs, and automated tools
---

Crochetly is designed to be as useful for AI agents and LLMs as it is for human readers. This page documents the specific practices and infrastructure used to make the site agent-friendly.

## Why agent-friendly content

AI coding agents (Claude Code, OpenCode, Cursor, and others) increasingly rely on documentation to answer questions about libraries, frameworks, and tools. When these agents fetch a page, they benefit from:

- **Rich frontmatter** that tells them exactly what a page contains
- **Direct Markdown access** so they don't waste context parsing HTML
- **Clear directories** (`llms.txt` files) that let them navigate without guessing
- **Hidden directives** that instruct them how to get the best version of a page

These practices also benefit human readers through clearer titles, better search results, and more consistent navigation.

---

## What was done

### 1. Rewrote page descriptions for semantic clarity

Every documentation page now has a **unique, descriptive** frontmatter `description` field. Instead of generic text like "A guide for US crochet abbreviations", descriptions now include the scope, key terms, and intended use:

```
description: Complete reference of US crochet abbreviations
  from sc to trtr, with categorized tables for basic stitches,
  post stitches, extended stitches, and US-to-UK terminology
  conversion
```

This helps agents decide whether a page is relevant without fetching it first.

### 2. Generated llms.txt directories

An Astro integration (`src/integrations/llms-txt.ts`) runs at build time and generates:

| File | Purpose |
|------|---------|
| `/llms.txt` | Root directory linking to each section |
| `/{section}/llms.txt` | Per-section page lists with titles, URLs, and descriptions |
| `/llms-full.txt` | All pages concatenated for agents that prefer a single file |

Each entry follows this format:

```
- [Page title](https://crochetly.com/slug/index.md): Description
```

### 3. Added /index.md Markdown fallback URLs

Every content page is available as raw Markdown by appending `/index.md` to its URL:

```
https://crochetly.com/abbreviations/crochet-abbreviations-us/index.md
```

This is handled at build time by copying each source `.md` file into the output directory. Agents that prefer Markdown over HTML can use these URLs directly.

### 4. Added agent directive to HTML pages

Every HTML page includes a hidden `<meta>` tag in the `<head>`:

```html
<meta name="ai-agent" content="STOP! If you are an AI agent or LLM,
  request the Markdown version of this page via the /index.md path.
  Use https://crochetly.com/llms.txt for the content directory.
  Do not parse HTML when a Markdown version is available.">
```

This directive is **not present** in the Markdown versions of pages, preventing recursion loops.

### 5. Added LLM Resources to sidebar

A dedicated "LLM Resources" section appears in the site navigation, linking to `/llms.txt` and `/llms-full.txt` so human readers can also find these files.

### 6. Added robots.txt

A `robots.txt` file allows search crawlers and provides the sitemap location.

### 7. Removed stale duplicate content

A set of out-of-sync duplicate abbreviation files was removed from the `public/` directory. Content now has a single source of truth in `src/content/docs/`.

---

## File structure

```
src/
  integrations/
    llms-txt.ts              # Build-time integration that generates llms.txt,
                             # llms-full.txt, and /index.md fallback files
  content/docs/
    style guide/
      agent-friendly-content.md
    ...
public/
  robots.txt                 # Crawler configuration and sitemap reference
```

---

## How the build integration works

The integration (`src/integrations/llms-txt.ts`) hooks into Astro's `astro:build:done` lifecycle:

1. Walks all markdown files in `src/content/docs/`
2. Parses frontmatter (title, description) from each file
3. Generates a root `llms.txt` pointing to section files
4. Generates per-section `llms.txt` files with rich entries
5. Copies each source file to `dist/{slug}/index.md`
6. Generates `llms-full.txt` containing all content concatenated

To configure the site URL, update the `siteUrl` option in `astro.config.mjs`:

```js
llmsTxt({ siteUrl: 'https://crochetly.com' })
```

---

## Maintenance notes

### When adding new content

- Always write a **unique, specific description** in the frontmatter — avoid "A guide for..." patterns
- The llms.txt files and /index.md fallbacks are regenerated automatically at build time — no manual updates needed
- Verify the new page appears in the generated `dist/{section}/llms.txt` after building

### When updating descriptions

- Updated frontmatter descriptions are picked up on the next build automatically
- Old descriptions in cached agent responses will naturally expire

### When changing the site URL

- Update both `site` in `astro.config.mjs` and the `siteUrl` option passed to `llmsTxt`

---

## Agent testing

After deploying changes, you can verify agent-readiness by:

1. Fetching `https://crochetly.com/llms.txt` — should return a valid directory
2. Appending `/index.md` to any page URL — should return raw Markdown
3. Running an agent like OpenCode with the llms.txt URL as context
4. Checking that the `<meta name="ai-agent">` tag appears in page HTML

No additional build steps beyond `npm run build` are needed — the integration runs automatically.
