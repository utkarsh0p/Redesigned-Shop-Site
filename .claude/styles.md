# CrushBurg — Design System & Style Guide

## Color Palette

The palette is **brown / cream / amber**. All colors are CSS custom properties in
`src/index.css` under `@theme`. There is exactly one source colour set — never
introduce a raw Tailwind palette colour (`text-gray-500`, `bg-red-600`, …) in
new work; use a token so dark mode follows automatically.

### Brand

| Token | Light | Dark | Usage |
|---|---|---|---|
| `brand` | `#5F3425` | `#8B5A3C` | Primary CTA buttons, active nav, prices, links |
| `brand-light` | `#804632` | `#A66E4C` | Hover on brand |
| `gold` | `#E8A833` | *(same)* | Badges, highlights, star ratings, eyebrow labels |
| `gold-dark` | `#C88C24` | *(same)* | Hover on gold |
| `on-gold` | `#3A2118` | *(same)* | **Text on a gold surface** — see note below |

### Surfaces

| Token | Light | Dark | Usage |
|---|---|---|---|
| `white` | `#ffffff` | `#3A2118` | Card surfaces, navbar, footer |
| `cream` | `#E8E4E1` | `#241310` | Page background, section fills |
| `cream-dark` | `#D6D0CA` | `#5F3425` | Borders, dividers |
| `panel` | `#2E1A12` | *(same)* | **Always-dark** feature panels and image scrims |

### Text

| Token | Light | Dark | Usage |
|---|---|---|---|
| `ink` | `#3A2118` | `#E8E4E1` | Headings, primary text |
| `ink-soft` | `#5C4A40` | `#D0C6BF` | Body copy |
| `muted` | `#8A7A70` | `#B9A99E` | Secondary text |
| `muted-light` | `#A89A90` | `#96867C` | Captions, disabled |

### Two rules that are easy to get wrong

1. **`gold` does not invert, so `ink` must not sit on it.** `text-ink` flips to
   cream in dark mode and would land at ~1.9:1 on amber. Any solid `bg-gold`
   surface pairs with **`text-on-gold`**.
2. **Never use `ink` as a surface.** `bg-ink` inverts, so a dark panel built
   from it flips light in dark mode while its `text-white` stays white. Use
   **`bg-panel`** for a surface that must stay dark in both themes.

### Utility colors (deliberate exceptions, not tokens)

| Color | Usage |
|---|---|
| `#22c55e` / `#16a34a` (green-500/600) | WhatsApp + phone CTAs, **and the vegetarian dot — green is semantically required here** |
| `#E23744` | Zomato brand badge — third-party, never re-theme |
| `#FC8019` | Swiggy brand badge — third-party, never re-theme |
| `from-black/30…70` | Scrims over photography |

---

## Dark Mode

Implemented in `src/index.css` under `.dark`, toggled by
`src/context/ThemeContext.jsx` (adds `.dark` **and** DaisyUI's `data-theme` to
`<html>`, persisted to `localStorage["crushburg-theme"]`), driven by the
`SkyToggle` component in the navbar.

It works purely by **re-binding the theme variables above** — there are no
`dark:` variant classes in the codebase and there should not be. If a component
is styled with tokens, dark mode is free; if it hardcodes a hex, it will be
wrong in one of the two themes.

> **DaisyUI name collision:** DaisyUI reserves `--color-primary`, `--color-secondary`,
> `--color-accent`, `--color-neutral`, `--color-base-*`, `--color-info|success|warning|error`
> and emits them *after* `@theme`. A token named `accent` is silently overridden by
> DaisyUI's teal. This is why the amber token is called `gold`. Don't reuse those names.

---

## Typography

Fonts are loaded from Cloudinary in `src/index.css` via `@font-face`. **Inter** is loaded via Google Fonts in `index.html`.

| Font Variable | CSS Name | Usage |
|---|---|---|
| `font-sans` | Inter | **Primary heading font** — all `.heading` and h1–h3 tags |
| `font-heading` | heading-font | Legacy — avoid on new work |
| `font-primary` | primary-font | Body text, paragraphs, UI labels |

### Scale

| Element | Mobile | Desktop | Weight | Extra |
|---|---|---|---|---|
| h1 / hero title | `text-4xl` | `text-6xl` | `font-bold` | `uppercase tracking-tight font-sans` |
| h2 / section title | `text-4xl` | `text-6xl` | `font-bold` | `uppercase tracking-tight font-sans` |
| Body / paragraph | `text-[14px]` | `text-[16px]` | `font-normal` | |
| Button label | `text-sm` | `text-base` | `font-semibold` | |
| Caption / meta | `text-xs` | `text-sm` | `font-normal` | |

### Custom Utility Classes

```css
.heading  → text-4xl md:text-6xl font-bold uppercase tracking-tight font-sans (Inter)
.para     → text-[14px] md:text-[16px] font-sans font-normal (Inter regular)
```

---

## Spacing & Layout

### Responsive Padding

```css
.padding-responsive → px-4 md:px-8 lg:px-16
```

Apply to all page-level sections so content is consistently inset.

### Section Rhythm

| Section role | Padding |
|---|---|
| Page hero | `py-16 md:py-24` |
| Standard section | `py-10 md:py-16` |
| Compact section | `py-6 md:py-10` |

### Grid Patterns

| Content | Mobile | Tablet | Desktop |
|---|---|---|---|
| Product cards | 2 cols | 3 cols | 4 cols |
| Store locations | 1 col | 2 cols | 3 cols |
| Category icons | 3 cols | 4 cols | 6 cols |
| Footer columns | 1 col (accordion) | 2 cols | 4 cols |

---

## Component Patterns

### Buttons

**Primary (SlideButton):**
```
bg-brand → hover:bg-brand-light
text-white, rounded-full, font-semibold
px-6 py-2 (small) | px-8 py-3 (large)
```

**Secondary / Outline:**
```
border-2 border-brand, text-brand
hover: bg-brand text-white
rounded-full
```

**Gold / highlight:**
```
bg-gold → hover:bg-gold-dark
text-on-gold (NOT text-ink), rounded-full
```

**Utility (e.g. WhatsApp/Phone):**
```
bg-green-500 → hover:bg-green-600
text-white, rounded-full
```

### Cards

**Product / Food Card:**
```
bg-white, rounded-2xl, card-shadow
overflow-hidden
Image top → content padding p-4
Title: font-sub-heading, text-lg font-bold
Price: text-brand font-bold
```

**Info Card (franchise, about):**
```
bg-cream, rounded-2xl
border border-cream-dark
p-6 md:p-8
```

### Badges / Tags

```
bg-gold text-on-gold
text-xs font-semibold
px-3 py-1 rounded-full
```

### Dividers

```
border-cream-dark
```

---

## Asset & Image Convention

**All image URLs must live in `src/constants/index.js`** — never hardcode Cloudinary URLs directly in components.

### Cloudinary URL format

```
https://res.cloudinary.com/dff30apwl/image/upload/{transformations}/{version}/{public_id}
```

Transformations are embedded in the URL path (not query params). Always include at minimum `f_auto,q_auto`.

### Standard transformation presets

| Use case | Transformations | Example export |
|---|---|---|
| Product / food card | `w_400,f_auto,q_auto` | `kingFusionBurger` |
| Hero / banner (full-width) | `w_1100,f_auto,q_auto` | `heroBanner` |
| Section banner / wide card | `w_800,f_auto,q_auto` | `modelImage` |
| Portrait / person photo | `w_600,f_auto,q_auto` | `ceoBanner` |
| Shop / store photo | `f_auto,q_auto` (no fixed w) | `shop`, `shopAiImage` |

### When a new image URL is provided

1. Add it to `src/constants/index.js` with the appropriate transformation preset.
2. Export it with a descriptive camelCase name grouped under the relevant comment section (Logos, Burgers, Team / People, etc.).
3. Import from `../constants` (or `../../constants`) in the component — never paste the raw URL into JSX.

---

## Logo

The logo is the **one exception to the Cloudinary rule** — it is served from
`public/` so it can also act as the favicon.

The mark is a **single flat colour on transparency**, so it ships as two tints
generated from the same source artwork:

| Export | File | Use on |
|---|---|---|
| `logoBrown` | `public/logo-brown.png` | Light surfaces (`#5F3425`) |
| `logoCream` | `public/logo-cream.png` | Dark surfaces (`#E8E4E1`) |

Also in `public/`: `favicon.png` (512px, cream mark on a brown square) and
`apple-touch-icon.png` (180px).

**Always pick the variant from the theme** — a cream logo on a light navbar is
invisible:

```jsx
const { isDark } = useTheme();          // src/context/ThemeContext.jsx
<img src={isDark ? logoCream : logoBrown} alt="CrushBurg" />
```

Rendered in `components/Navbar.jsx` (desktop + mobile bars) and
`components/Footer.jsx`. Source artwork lives outside the repo at
`~/Desktop/VindhyamAssets/Crushburg/logo.png` — it has a large transparent
margin, so re-exports must be cropped to the alpha bounding box first.

---

## Carousel / Slider

Built with **Swiper 12**.

| Setting | Value |
|---|---|
| Autoplay delay | 2500ms |
| Mobile slides | 2 |
| Tablet slides | 3 |
| Desktop slides | 4 |
| Navigation color | `brand` |
| Pagination bullets | Active: `brand` |

---

## Animations

Built with **GSAP 3**.

**Principles:**
- Use entrance animations on scroll (ScrollTrigger) — fade-in + slight translateY
- Avoid animations that delay user interaction
- Keep durations under 600ms for UI feedback, under 1000ms for hero reveals
- Use `ease: "power2.out"` as the default easing

**Common patterns:**
```js
// Fade in from below
gsap.from(el, { opacity: 0, y: 40, duration: 0.6, ease: "power2.out" })

// Stagger children
gsap.from(cards, { opacity: 0, y: 30, stagger: 0.1, duration: 0.5 })
```

---

## Iconography

Using **Lucide React**. Stick to Lucide for consistency — do not mix icon libraries.

| Icon | Usage |
|---|---|
| `Search` | Navbar search |
| `User` | Navbar account |
| `Heart` | Wishlist |
| `ShoppingCart` | Cart |
| `Menu` | Hamburger toggle |
| `ChevronDown` | Accordion arrows |
| `Phone`, `Mail` | Contact info |
| `MapPin` | Store location |

Size convention: `size={20}` for nav, `size={16}` for inline text icons, `size={24}` for standalone CTAs.

---

## Responsiveness Rules

- **Mobile-first** — write base styles for mobile, add `md:` and `lg:` overrides
- Navbar collapses to hamburger + bottom bar on mobile
- Footer sections collapse to accordion on mobile
- All images must have `object-cover` to prevent distortion
- Minimum tap target size: 44×44px on mobile

---

## Improvement Opportunities

Areas where the site can feel more professional and interactive:

1. **Hover micro-interactions on cards** — subtle scale (`hover:scale-[1.02]`) + shadow lift
2. **Skeleton loaders** — show placeholder shimmer while images load
3. **Sticky Navbar shadow** — add `shadow-md` when user scrolls past hero
4. **Scroll-triggered section reveals** — use GSAP ScrollTrigger (already installed) for section fade-ins
5. **Active category tabs** — highlight selected category in menu with animated underline/pill
6. **Image zoom on hover** — `overflow-hidden` + `hover:scale-110 transition-transform` on food images
7. **Testimonials section** — social proof with star ratings (use `gold`)
8. **Number counters** — animate stats like "10+ Stores", "50,000+ Customers" on scroll
9. **Floating WhatsApp button** — fixed bottom-right, using green utility color
10. **Page transitions** — smooth fade between routes using React Router + GSAP
