# Styling System

**Modular CSS build system for Obsidian plugins.**

---

## Overview

This template uses a **modular CSS build system**. Multiple organized CSS files are combined into a single `styles.css` for Obsidian.

---

## Source CSS Files

**Location:** `src/styles/`

**Default structure:**
```
src/styles/
├── base.css       # Base styles and Obsidian variables
├── modals.css     # Modal dialog styles
├── settings.css   # Settings tab styles
└── ...            # Add more as needed
```

---

## Build Process

**Compile CSS:**
```bash
npm run build:css
```

**What happens:**
- Reads all CSS files from `src/styles/`
- Concatenates them into single `styles.css` at root
- Automatically runs during `npm run build` and `npm run dev`

**Configuration:**
Edit `build-css.mjs` to add/remove CSS files:
```javascript
const cssFiles = [
  'src/styles/base.css',
  'src/styles/modals.css',
  'src/styles/settings.css',
  // Add more files here
];
```

**CRITICAL:** 
- ✅ Edit files in `src/styles/`
- ❌ **NEVER** edit `styles.css` directly (it's generated!)

---

## Never Hardcode CSS in TypeScript (CRITICAL)

**This is the most important rule of the styling system.**

### ❌ NEVER DO THIS

**Don't create styles dynamically:**
```typescript
const style = document.createElement('style');
style.textContent = `
  .my-component {
    width: 650px;
    padding: 1em;
  }
`;
document.head.appendChild(style);
```

**Don't hardcode style values:**
```typescript
element.style.width = '650px';
element.style.padding = '1em';
element.style.backgroundColor = '#ffffff';
```

### ✅ ALWAYS DO THIS

**Add to CSS files:**
```css
/* src/styles/modals.css */
.my-component {
  width: 650px;
  padding: 1em;
  background-color: var(--background-primary);
}
```

**Use CSS classes in TypeScript:**
```typescript
element.addClass('my-component');
```

---

## When to Use `.style` in TypeScript

**ONLY use `.style` for:**

### ✅ Conditional Display

```typescript
// Show/hide based on logic
if (shouldShow) {
  element.style.display = 'block';
} else {
  element.style.display = 'none';
}
```

### ✅ Dynamic Calculations

```typescript
// Width based on runtime data
const calculatedWidth = userInput * 10;
element.style.width = `${calculatedWidth}px`;
```

### ✅ Programmatic State Changes

```typescript
// Enable/disable based on conditions
if (isDisabled) {
  element.style.opacity = '0.5';
  element.style.pointerEvents = 'none';
}
```

---

## When to Use CSS Files

**ALWAYS use CSS files for:**

### ✅ All Static Styling

```css
/* Colors, fonts, spacing, layout */
.my-modal {
  color: var(--text-normal);
  font-family: var(--font-interface);
  margin: 1em;
  display: flex;
}
```

### ✅ Component Dimensions

```css
/* Width, height, padding, margin */
.dialog-container {
  width: 650px;
  height: 400px;
  padding: 1.5em;
  margin: 0 auto;
}
```

### ✅ Visual Design

```css
/* Backgrounds, borders, shadows */
.card {
  background: var(--background-secondary);
  border: 1px solid var(--background-modifier-border);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

### ✅ Responsive Design

```css
/* Media queries, flexible layouts */
@media (max-width: 768px) {
  .modal {
    width: 100%;
    max-width: none;
  }
}
```

### ✅ Typography

```css
/* Font sizes, weights, line heights */
.heading {
  font-size: 1.5em;
  font-weight: 600;
  line-height: 1.3;
}
```

---

## Obsidian CSS Variables (CRITICAL)

**Always use Obsidian's CSS variables for theming compatibility:**

### Background Colors

```css
.element {
  background: var(--background-primary);        /* Main background */
  background: var(--background-secondary);      /* Cards, sections */
  background: var(--background-primary-alt);    /* Alternative background */
  background: var(--background-secondary-alt);  /* Alternative secondary */
}
```

### Text Colors

```css
.element {
  color: var(--text-normal);        /* Normal text */
  color: var(--text-muted);         /* Muted/secondary text */
  color: var(--text-faint);         /* Very light text */
  color: var(--text-on-accent);     /* Text on accent background */
}
```

### Border Colors

```css
.element {
  border-color: var(--background-modifier-border);        /* Standard borders */
  border-color: var(--background-modifier-border-hover);  /* Hover state */
  border-color: var(--background-modifier-border-focus);  /* Focus state */
}
```

### Interactive Colors

```css
.button {
  background: var(--interactive-accent);        /* Accent color (buttons, links) */
  background: var(--interactive-accent-hover);  /* Accent hover state */
}

.item:hover {
  background: var(--interactive-hover);         /* Hover background */
}
```

### Font Variables

```css
.element {
  font-family: var(--font-interface);   /* UI font */
  font-family: var(--font-text);        /* Content font */
  font-family: var(--font-monospace);   /* Code/monospace font */
}
```

### Sizing Variables

```css
.element {
  font-size: var(--font-ui-small);      /* Small UI text */
  font-size: var(--font-ui-medium);     /* Medium UI text */
  font-size: var(--font-ui-large);      /* Large UI text */
}
```

---

## Why This Matters

### Benefits of Modular CSS + Variables

1. **Separation of concerns** - CSS belongs in CSS files, not JavaScript
2. **Maintainability** - Easy to find and modify styles
3. **Performance** - No dynamic DOM manipulation needed
4. **Theming** - Users can customize via CSS snippets
5. **Standards** - Follows Obsidian plugin best practices
6. **Dark/Light mode** - Automatic with Obsidian variables
7. **Accessibility** - Respects user's theme preferences

### What Happens If You Don't Use Variables

```css
/* ❌ BAD: Hardcoded colors */
.element {
  background: #ffffff;  /* Breaks in dark mode! */
  color: #000000;       /* Unreadable in dark themes! */
}

/* ✅ GOOD: Obsidian variables */
.element {
  background: var(--background-primary);  /* Works in all themes */
  color: var(--text-normal);              /* Readable everywhere */
}
```

---

## Example: Complete Component Styling

**TypeScript (minimal styling code):**
```typescript
class ExampleModal extends Modal {
  onOpen() {
    const { contentEl } = this;
    
    // Add CSS classes only
    contentEl.addClass('example-modal');
    
    const header = contentEl.createDiv({ cls: 'modal-header' });
    const body = contentEl.createDiv({ cls: 'modal-body' });
    const footer = contentEl.createDiv({ cls: 'modal-footer' });
    
    // Only programmatic state changes use .style
    if (this.isDisabled) {
      body.style.opacity = '0.5';
    }
  }
}
```

**CSS (all static styling):**
```css
/* src/styles/modals.css */
.example-modal {
  width: 650px;
  max-width: 90vw;
}

.modal-header {
  padding: 1em;
  border-bottom: 1px solid var(--background-modifier-border);
  background: var(--background-secondary);
}

.modal-body {
  padding: 1.5em;
  min-height: 200px;
  color: var(--text-normal);
}

.modal-footer {
  padding: 1em;
  display: flex;
  justify-content: flex-end;
  gap: 0.5em;
  border-top: 1px solid var(--background-modifier-border);
}
```

---

## Adding New CSS Files

**Steps:**

1. **Create file in `src/styles/`:**
   ```bash
   touch src/styles/my-feature.css
   ```

2. **Add to `build-css.mjs`:**
   ```javascript
   const cssFiles = [
     'src/styles/base.css',
     'src/styles/modals.css',
     'src/styles/settings.css',
     'src/styles/my-feature.css',  // Add here
   ];
   ```

3. **Write styles using Obsidian variables:**
   ```css
   /* src/styles/my-feature.css */
   .my-feature {
     background: var(--background-primary);
     color: var(--text-normal);
   }
   ```

4. **Build CSS:**
   ```bash
   npm run build:css
   ```

---

## Development Workflow

### Watch Mode

**Auto-rebuild CSS on changes:**
```bash
npm run watch:css
```

**What happens:**
- Watches all files in `src/styles/`
- Automatically rebuilds `styles.css` when any CSS file changes
- No need to manually run `npm run build:css`

### Manual Build

**Build CSS once:**
```bash
npm run build:css
```

### Full Build (Includes CSS)

**Build everything:**
```bash
npm run build      # Builds TypeScript + CSS
npm run dev        # Builds + copies to dev vault
```

---

## Testing Styles

### Test in Multiple Themes

**Always test your plugin with:**
- ✅ Default light theme
- ✅ Default dark theme
- ✅ Popular community themes
- ✅ High contrast themes

### Visual Regression Testing

**Check:**
- [ ] Colors readable in light mode
- [ ] Colors readable in dark mode
- [ ] Borders visible but not harsh
- [ ] Spacing consistent
- [ ] No layout breaking
- [ ] No color clashing

---

## Common Mistakes

### ❌ Mistake 1: Editing styles.css

```bash
# ❌ DON'T EDIT
styles.css

# ✅ EDIT THESE
src/styles/base.css
src/styles/modals.css
```

### ❌ Mistake 2: Hardcoded Colors

```css
/* ❌ BAD */
.element {
  background: #ffffff;
  color: #000000;
}

/* ✅ GOOD */
.element {
  background: var(--background-primary);
  color: var(--text-normal);
}
```

### ❌ Mistake 3: Inline Styles in TypeScript

```typescript
// ❌ BAD
element.style.width = '650px';
element.style.padding = '1em';

// ✅ GOOD (add to CSS file instead)
element.addClass('my-component');
```

---

## Summary

**Golden Rules:**

1. ✅ **All static styles in CSS files** (`src/styles/`)
2. ✅ **Always use Obsidian CSS variables** (for theming)
3. ✅ **Never edit `styles.css` directly** (it's generated)
4. ✅ **Use `.style` only for dynamic/conditional styling**
5. ✅ **Test in light and dark modes**
6. ✅ **Add CSS classes, not inline styles**
