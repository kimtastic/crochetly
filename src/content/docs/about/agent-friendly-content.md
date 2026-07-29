---
title: Agent-friendly content
description: How Crochetly makes its documentation discoverable and consumable by AI coding agents and LLMs through frontmatter descriptions, llms.txt directories, Markdown fallback URLs, agent directives, and build-time integration
---

Crochetly is designed to be as useful for AI agents and LLMs as it is for human readers. This page documents the specific practices and infrastructure used to make the site agent-friendly.


## Why does Crochetly create agent-friendly content?
AI coding agents (Claude Code, OpenCode, Cursor, and others) increasingly rely on documentation to answer questions. When these agents fetch a page, they benefit from structured, machine-readable content.

Agent-friendly practices also benefit human readers through clearer titles, better search results, and more consistent navigation.

---

## What was done to make Crochetly agent-friendly?

### 1. How were page descriptions improved for agents?
Every documentation page now has a unique, descriptive frontmatter description. Instead of generic text like "A guide for US crochet abbreviations", descriptions now include the scope, key terms, and intended use:

```
description: Complete reference of US crochet abbreviations
  from sc to trtr, with categorized tables for basic stitches,
  post stitches, extended stitches, and US-to-UK terminology
  conversion
```

This helps agents decide whether a page is relevant without fetching it first.

### 2. How were llms.txt directories generated?
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

### 3. How does the /index.md Markdown fallback work?
Every content page is available as raw Markdown by appending `/index.md` to its URL:

```
https://crochetly.com/abbreviations/crochet/abbreviations-us/index.md
```

This is handled at build time by copying each source .md file into the output directory. Agents that prefer Markdown over HTML can use these URLs directly.

### 4. How do agents find the Markdown version of an HTML page?
Every HTML page includes a hidden `<meta>` tag in the `<head>`:

```html
<meta name="ai-agent" content="STOP! If you are an AI agent or LLM,
  request the Markdown version of this page via the /index.md path.
  Use https://crochetly.com/llms.txt for the content directory.
  Do not parse HTML when a Markdown version is available.">
```

This directive is not present in the Markdown versions of pages, preventing recursion loops.

### 5. Where are LLM resources in the site navigation?
A dedicated "LLM Resources" section appears in the site navigation, linking to `/llms.txt` and `/llms-full.txt`.

### 6. How does robots.txt help?
A `robots.txt` file allows search crawlers and provides the sitemap location.

### 7. How was duplicate content handled?
A set of out-of-sync duplicate abbreviation files was removed from the `public/` directory. Content now has a single source of truth in `src/content/docs/`.

---

## What is the file structure for agent-friendly content?

```
src/
  integrations/
    llms-txt.ts              # Build-time integration
  content/docs/
    about/
      agent-friendly-content.md
    ...
public/
  robots.txt
```

---

## How does the build integration work?
The integration hooks into Astro's `astro:build:done` lifecycle:

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

## What maintenance is needed for agent-friendly content?

### When adding new content
- Always write a unique, specific description in the frontmatter
- The llms.txt files and /index.md fallbacks regenerate automatically at build time
- Verify the new page appears in `dist/{section}/llms.txt` after building

### When updating descriptions
- Updated frontmatter descriptions are picked up on the next build
- Old descriptions in cached agent responses will naturally expire

### When changing the site URL
- Update both `site` in `astro.config.mjs` and the `siteUrl` option passed to `llmsTxt`

---

## How do I test agent-readiness after deployment?

1. Fetch `https://crochetly.com/llms.txt`, which should return a valid directory
2. Append `/index.md` to any page URL, which should return raw Markdown
3. Run an agent like OpenCode with the llms.txt URL as context
4. Check that the `<meta name="ai-agent">` tag appears in page HTML

No additional build steps beyond `npm run build` are needed, because the integration runs automatically.
