# Crochetly Brand Guidelines

## 🎨 Core Brand Colors

### Primary Gradient Colors
- **Primary (Purple/Pink):** `hsl(320, 70%, 65%)`
- **Secondary (Blue):** `hsl(200, 65%, 60%)`

### Opacity Values (Payabli-inspired)
- **Dark Mode Overlay:** 0.35 (primary), 0.28 (secondary)
- **Light Mode Overlay:** 0.22 (primary), 0.16 (secondary)
- **Additional Body Overlay:** 0.3 (secondary radial gradient)

## 🖼️ Hero Images
- **Current:** `/assets/crochetly-concentric.svg` (3KB, 1024x1024px, concentric SVG)
- **Format:** Custom SVG with concentric circles in brand colors
- **Placement:** Left-aligned in hero section
- **Note:** Concentric circles design with enhanced brand colors

### 🎨 Enhanced Color Scheme
- **Purple/Pink:** Enhanced from `#c746ef` to `#a855f7` for more vibrancy
- **Blue:** Enhanced from `#3b82f6` to `#4a90e2` for better contrast
- **Radial Gradients:** Added depth with radial gradient variations
- **Design:** Modern abstract composition with no white background

### 🎨 Design Elements
- **Background Circles:** Large purple/pink circles with varying opacity (0.3, 0.25, 0.6)
- **Triangles:** Geometric triangles in purple and blue gradients
- **Pattern Circles:** Medium-sized circles for visual rhythm
- **Accent Elements:** Small circles and triangles at bottom

### 🔘 Button Color Updates
- **Primary Buttons:** Updated to use blue gradient (`hsl(200, 65%, 60%)`)
- **Border Colors:** Blue border to match secondary brand color
- **Hover Effects:** Enhanced blue gradients on interaction
- **Consistency:** Buttons now match overall blue brand elements

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