# Crochetly Brand Guidelines

## 🎨 Core Brand Colors

### Primary Gradient Colors
- **Primary (Purple/Pink):** `hsl(320, 70%, 65%)`
- **Secondary (Blue):** `hsl(200, 65%, 60%)`

### Opacity Values
- **Dark Mode Overlay:** 0.25 (primary), 0.20 (secondary)
- **Light Mode Overlay:** 0.18 (primary), 0.12 (secondary)
- **Additional Body Overlay:** 0.3 (secondary radial gradient)

## 🖼️ Hero Images
- **Current:** `/assets/crochetly-hero-geometric.svg` (3KB, 1024x1024px, geometric SVG)
- **Format:** Custom SVG with triangles and circles in brand colors
- **Placement:** Left-aligned in hero section
- **Note:** Geometric pattern with purple/pink and blue gradients
- **Design:** Modern abstract composition with no white background

### 🎨 Design Elements
- **Background Circles:** Large purple/pink circles with varying opacity
- **Triangles:** Geometric triangles in purple and blue gradients
- **Pattern Circles:** Medium-sized circles for visual rhythm
- **Accent Elements:** Small circles and triangles at bottom

## 📏 Design Principles
- **Gradient Coverage:** Subtle, full-page background
- **Theme Support:** Full light/dark mode compatibility
- **Aesthetic:** Modern, approachable, craft-focused

## 🔮 Future Brand Colors (Placeholders)

### Typography Colors
- **Headings:** TBD
- **Body Text:** TBD
- **Links:** TBD

### Neutral Colors
- **Backgrounds:** TBD
- **Borders:** TBD
- **Shadows:** TBD

### Accent Colors
- **Success/Error States:** TBD
- **Call-to-Actions:** TBD
- **Interactive Elements:** TBD

### Component-Specific
- **Card Borders:** TBD
- **Button Gradients:** TBD
- **Form Elements:** TBD

## 📐 Technical Notes
- **CSS Custom Properties:** Using `--gradient-*` naming convention
- **Browser Support:** Modern browsers (CSS custom properties, backdrop-filter)
- **Performance:** Native CSS gradients, no additional images

## 🚀 Implementation Details

### SVG Hero Image Updates
- **Removed purple squiggle line** from hook shape (was causing visual distraction)
- **Changed to blue gradient** for better visual balance
- **Maintained abstract shape** representing crochet hook concept

### CSS Custom Properties Used
- `--gradient-primary-hsl`: Primary color HSL values
- `--gradient-secondary-hsl`: Secondary color HSL values  
- `--gradient-overlay`: Primary gradient overlay with opacity
- `--gradient-secondary`: Secondary gradient overlay with opacity

### Background Gradient Layers
1. **Linear Gradient 1:** 215deg, primary overlay to transparent (40%)
2. **Linear Gradient 2:** 135deg, secondary overlay to transparent (45%)
3. **Radial Gradient 1:** Primary overlay, positioned -30vw -25vh
4. **Radial Gradient 2:** Secondary overlay, positioned 75% bottom
5. **Body Overlay:** Additional radial gradient for prominence

### Hero Image Effects
- **Base:** Drop shadow with gradient color + standard shadow
- **Hover:** Enhanced shadow with slight upward movement
- **Border:** Explicit `border: none !important` to remove visible borders
- **Transparency:** Multiple `background: transparent` declarations