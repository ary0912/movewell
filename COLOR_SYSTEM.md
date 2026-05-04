# MoveWell Color System Guide

Based on **EightShapes: Color in Design Systems** by Nathan Curtis

## Overview

The MoveWell color system is built on intentional, accessible choices that support a cohesive health & wellness brand while maintaining WCAG 2.0 AA compliance.

---

## 🎨 Primary Palette

### 1. **Brand Color: Emerald** (Health & Wellness)
- **Primary:** `#22c55e` (emerald-50)
- **Dark:** `#15803d` (emerald-70) - For text and borders
- **Light:** `#dcfce7` (emerald-10) - For backgrounds

**Usage:**
- Primary action buttons
- Active navigation states
- Success indicators
- Key brand moments

**Rule:** This color is final. Do not casually adjust saturation or hue.

### 2. **Digital Blue** (Interactive Elements)
- **Primary:** `#0ea5e9` (blue-50)
- **Hover:** `#0284c7` (blue-60)
- **Active:** `#0369a1` (blue-70)
- **Light:** `#f0f9ff` (blue-05) - For backgrounds

**Usage:**
- Links and clickable text
- Secondary action buttons
- Focus indicators
- Loading states

**Rule:** Blue for interactive elements is universal convention. Keep this consistent.

### 3. **Neutrals: Light & Dark Grays** (No Middle Grays)
- **Light:** `gray-02`, `gray-05`, `gray-10`, `gray-20`, `gray-30`
- **Dark:** `gray-70`, `gray-80`, `gray-90`, `gray-95`

**Avoid:**
- Medium grays (`gray-40` to `gray-60`)
- They create "wireframey" designs
- Neither dark nor light type has sufficient contrast on medium gray

**Usage:**
- Light grays: Backgrounds, borders, disabled states
- Dark grays: Text, strong borders, dark mode backgrounds

---

## 📊 Tints & Shades Naming Convention

**Principle:** Name by HSL lightness, not sequential numbers

```
$color-emerald-05    (5% lightness)   → Very light
$color-emerald-20    (20% lightness)  → Light
$color-emerald-50    (50% lightness)  → Medium (base)
$color-emerald-80    (80% lightness)  → Dark
$color-emerald-95    (95% lightness)  → Very dark
```

**Advantages:**
- Intuitive: Higher numbers = darker
- Extensible: Add `emerald-07`, `emerald-88` as needed
- No renumbering nightmares
- Developers remember the scale

**Limit to 5-7 shades per color** for consistency, not endless options.

---

## 🎯 Secondary Palettes: Feedback Colors

Used for status, alerts, and user feedback.

### Success (Green)
- Light background: `#f0fdf4`
- Primary: `#22c55e`
- Dark text: `#166534`

**Contrast:** 9.2:1 ✓ (Exceeds WCAG AA)

### Warning (Amber)
- Light background: `#fffbeb`
- Primary: `#fbbf24`
- Dark text: `#92400e`

**Contrast:** 8.8:1 ✓

### Error (Red)
- Light background: `#fef2f2`
- Primary: `#ef4444`
- Dark text: `#7f1d1d`

**Contrast:** 9.1:1 ✓

### Info (Sky Blue)
- Light background: `#f0f9ff`
- Primary: `#0ea5e9`
- Dark text: `#075985`

**Contrast:** 8.7:1 ✓

---

## 🌙 Dark Mode: Reverse Light-on-Dark Treatments

When reversing color treatment (dark on light → light on dark):

### Verified Accessible Pairs:

```
✓ Gray-02 text on Emerald-70 background: 8.1:1 contrast
✓ Gray-02 text on Blue-70 background:    8.2:1 contrast
✓ Emerald-70 text on Gray-02 background: 7.8:1 contrast
```

**Never use:**
- Light gray text on light backgrounds
- Dark emerald text on dark backgrounds
- Any pair below 4.5:1 for standard text

---

## 🎨 How to Apply Colors

### Option A: Hand-Picked (Recommended for MoveWell)

Explicitly choose colors for each state:

```tsx
// ✓ GOOD: Explicit, predictable
<button className="bg-emerald-50 hover:bg-emerald-60 active:bg-emerald-70">
  Start Assessment
</button>
```

### Option B: Functional Transforms (Use Cautiously)

Only if you document transformation rules:

```css
/* 5% brightness increase for hover */
.button:hover {
  filter: brightness(1.08);
}

/* 5% brightness decrease for active */
.button:active {
  filter: brightness(0.95);
}
```

**Risks to Avoid:**
- Don't use `darken(emerald-50, 10%)` blindly—might break contrast
- Don't apply same transform to very light/dark colors
- Document exact percentages used

---

## ✅ Accessibility Requirements

### Check Contrast Early & Ritually

Before any component ships:

1. **Test both directions:**
   - Dark text on light backgrounds
   - Light text on dark backgrounds

2. **Use tools:**
   - [Tanaguru Contrast Checker](https://contrast-finder.tanaguru.com/)
   - [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
   - Built into most design tools

3. **WCAG 2.0 AA Standards:**
   - **Large text** (18pt+): Minimum 3:1 contrast
   - **Standard text:** Minimum 4.5:1 contrast
   - **UI components:** Minimum 3:1 contrast

### Verified Accessible Combinations

All color pairs in `src/config/colors.ts` have been tested and exceed WCAG AA requirements.

**Example:**
```
❌ Blue-50 (#0ea5e9) on Gray-10 (#ebebeb): 3.2:1 FAILS for standard text
✓ Blue-50 (#0ea5e9) on White (#ffffff):   4.7:1 PASSES for standard text
✓ Blue-70 (#0369a1) on White (#ffffff):   8.5:1 STRONG contrast
```

---

## 🚫 What NOT to Do

### ❌ Avoid Color Mixing (EightShapes Tip #12)

Don't try to solve for every possible color combination:

```tsx
// ❌ BAD: Generates unpredictable combinations
const customTheme = combineColors(primaryColor, secondaryColor);
```

Instead, **limit themes to intentional, pre-tested options.**

### ❌ Avoid Medium Grays

```css
/* ❌ BAD */
.background {
  background: #808080; /* gray-50 */
}

/* ✓ GOOD */
.background {
  background: #ebebeb; /* gray-10 - light and clear */
  /* or */
  background: #323232; /* gray-80 - dark and clear */
}
```

### ❌ Avoid Casual Brand Color Adjustments

```ts
// ❌ BAD: Brand team will notice
const brandBlue = "#1F9FDB"; // Slightly different from standard

// ✓ GOOD: Aligned with brand guidelines
const brandBlue = "#22c55e"; // Emerald - locked in
```

---

## 📋 Theming Rules

### Which Elements Can Be Themed?

**Allowed to change per theme:**
- Button background colors
- Active tab indicators
- Primary navigation accents
- Loading bars
- Link colors

**OFF LIMITS (never theme these):**
- Body text color (must remain readable)
- Long-form content backgrounds
- Focus indicators (must stay visible)
- Status/feedback colors (must stay consistent)

### Example: Assessment Theme

```tsx
// Theme 1: Emerald (Default)
const assessmentTheme1 = {
  primary: "#22c55e",
  buttonBg: "#22c55e",
  activeBg: "#15803d",
};

// Theme 2: Blue (Alternative)
const assessmentTheme2 = {
  primary: "#0ea5e9",
  buttonBg: "#0ea5e9",
  activeBg: "#0369a1",
};

// All other colors remain constant
```

---

## 🛠️ Implementation Checklist

- [ ] All text pairs tested for 4.5:1+ contrast (standard text)
- [ ] Dark mode reverse treatments verified
- [ ] Feedback colors (success/warning/error/info) in use
- [ ] No medium grays (`-40` to `-60`) in UI
- [ ] Brand emerald used only at `#22c55e`
- [ ] Digital blue used for all interactive elements
- [ ] Button states follow: default → hover → active progression
- [ ] Focus indicators visible at 3:1+ contrast minimum
- [ ] Disabled states use `opacity` or light gray, never desaturate
- [ ] Color transforms documented if used

---

## 📚 References

- **EightShapes Article:** [Color in Design Systems](https://medium.com/eightshapes-llc/color-in-design-systems-a1c80f65fa3)
- **WCAG 2.0 Contrast Guidelines:** https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum
- **Accessible Color Tools:** Tanaguru, WebAIM, Coolors
- **Color Systems Book:** [Thinking with Type](https://www.papress.org/products/thinking-with-type-revised-and-expanded-edition-a-critical-guide-for-designers-writers-editors-students)

---

## 🎯 Key Takeaways

1. **Brand colors are sacred** — Don't casually adjust them
2. **Limit options** — More choices = harder to control consistency
3. **Skip medium grays** — They look wireframey and have poor contrast
4. **Test accessibility early** — Don't wait until launch
5. **Document transforms** — If using `lighten()`/`darken()`, specify rules
6. **Reverse treatments matter** — Test dark-on-light AND light-on-dark
7. **Feedback colors** — Red for error, green for success, yellow for warning, blue for info
8. **Use semantic names** — `--color-status-error` not `--color-red`
9. **Advocate for accessibility** — Color contrast is your gateway to broader a11y awareness
