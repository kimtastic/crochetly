# Crochetly Agents

This document describes the agents used to assist with content creation,
editing, and documentation for Crochetly.com.

Agents in this project are **human-guided, assistive tools**.  
They do not run autonomously and do not generate or publish content
without manual review.

The goal of these agents is to make it easier to create clear,
consistent, and helpful content for Crochetly.

---

## Overview

Crochetly is a content-driven site. Most updates involve writing,
expanding, or refining tutorials, guides, and documentation.

Agents are used intentionally to:
- Draft new content from outlines
- Improve clarity and tone
- Maintain consistent structure
- Document workflows and decisions

---

## Agent Types

### Content Authoring Agent

**Purpose**  
Helps draft new site content using predefined outlines or templates.

**Used for**
- Tutorials
- Guides
- Feature descriptions
- FAQs and informational pages

**How it’s used**
- A human provides an outline, notes, or a template
- The agent produces a draft in Markdown
- The output is reviewed and edited before being committed

**What it does not do**
- Publish content automatically
- Decide what content should exist

---

### Content Editing Agent

**Purpose**  
Improves existing content for clarity, flow, and readability.

**Used for**
- Polishing rough drafts
- Updating older pages
- Simplifying explanations for beginners

**How it’s used**
- A human selects the content to revise
- The agent rewrites or refines specific sections
- Final decisions remain with the human editor

---

### Structure & Organization Agent

**Purpose**  
Helps maintain a clear and logical structure across Crochetly content.

**Used for**
- Deciding where new content should live
- Suggesting headings and sections
- Identifying opportunities for internal links

**How it’s used**
- The agent makes suggestions
- A human decides what to apply

---

### Documentation Agent

**Purpose**  
Maintains internal documentation about how Crochetly is built and updated.

**Used for**
- `agents.md`
- `README.md`
- Workflow notes
- Contribution guidelines

**How it’s used**
- Documents real practices
- Updated as workflows evolve

---

### Review Agent

**Purpose**  
Acts as a final content check before publishing.

**Checks for**
- Missing sections
- Unclear steps
- Inconsistent tone
- Obvious errors or omissions

**How it’s used**
- Content is reviewed before merging into `main`
- The agent highlights potential issues
- A human approves final changes

---

## Templates & Content Patterns

Crochetly uses **conceptual templates**, not automated generation systems.

Templates typically define:
- Section headings
- Content order
- Tone and level of detail

Examples include:
- Tutorial structure (overview → steps → tips)
- Feature pages (what it is → why it matters → how to use it)
- Documentation pages (purpose → usage → notes)

These templates are applied manually and may evolve over time.

---

## Workflow Summary

1. Identify the content to create or update
2. Choose the appropriate agent for the task
3. Provide context, outlines, or existing content
4. Review and edit the agent’s output
5. Test locally if relevant
6. Commit changes and merge into `main`

---

## Guiding Principles

- Humans make final decisions
- Agents assist, not automate
- Clarity over cleverness
- Documentation reflects reality
- Simplicity scales better than complexity

---

## Future Considerations

As Crochetly grows, agents may become more specialized or structured.
This document should evolve **only as real workflows change**, not
in anticipation of hypothetical tooling.
