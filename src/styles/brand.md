# Crochetly Brand Guidelines

## 🎨 Brand Palette

Crochetly uses a **monochrome palette**: black in light mode, white in dark mode.

- **Light mode:** `#000` (#202124 body text)
- **Dark mode:** `#fff` (#e8e6df body text)
- **Opacity layers:** 0.9, 0.8, 0.7, 0.6 for depth and hierarchy
- **Theme Support:** Full light/dark mode compatibility via CSS

The primary brand does not use accent colors, gradients, or brand hues.
This keeps the site clean, accessible, and distraction-free.

## 🖼️ Hero Image

- **File:** `/assets/crochetly-concentric.svg` (screenshot-based)
- **Fallback:** `/assets/crochetly-concentric-dark.svg` (inverted for dark mode)
- **Legacy:** `/assets/crochetly-concentric-2.svg` (previous concentric circles design)
- **Format:** SVG embedding a PNG screenshot, white background removed
- **Placement:** Hero section (grid right column on wide viewports)
- **Size:** 1024x1024 viewBox, rendered at 400x400 via Astro Image
- **Light mode:** Screenshot content with transparent background
- **Dark mode:** Inverted screenshot content visible on dark background

## 🖼️ Card Icons

- **Style:** Monochrome, inheriting text color via `fill="currentColor"`
- **Light mode:** Dark icons on card surfaces
- **Dark mode:** Light icons on card surfaces
- **No per-icon color variation**, all icons share the same text color

## 📐 Design Principles

- **Monochrome first:** No brand colors in UI elements
- **Typography-led:** Hierarchy comes from type weight and size
- **Whitespace:** Generous spacing for readability
- **Accessibility:** Maintain high contrast ratios in both themes
- **Performance:** Minimal CSS, no external icon libraries

## 🔮 Future Considerations

If color is reintroduced, it should serve a specific functional purpose
(e.g., success/error states, link underlines) rather than decoration.
Document any additions here before implementation.