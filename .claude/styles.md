# CrushBurg — Design System & Style Guide

## Color Palette

All colors are defined as CSS custom properties in `src/index.css` under `@theme`.

### Brand Colors

| Token | Hex | Tailwind Class | Usage |
|---|---|---|---|
| `red-dark` | `#D32F2F` | `bg-red-dark` / `text-red-dark` | Primary CTA buttons, active nav, brand highlight |
| `red-light` | `#F44336` | `bg-red-light` / `text-red-light` | Hover states, accents, secondary highlights |
| `yellow-light` | `#FFCA28` | `bg-yellow-light` / `text-yellow-light` | Warm highlights, badge backgrounds, star ratings |
| `yellow-dark` | `#FF9800` | `bg-yellow-dark` / `text-yellow-dark` | Hover on yellow elements, CTA accents |

### Neutral / Background Colors

| Token | Hex | Tailwind Class | Usage |
|---|---|---|---|
| `white` | `#ffffff` | `bg-white` | Card surfaces, overlays |
| `offwhite` | `#fdf6f0` | `bg-offwhite` | Page backgrounds, section fills |
| `offwhite-dark` | `#e6dcd3` | `bg-offwhite-dark` | Dividers, subtle borders, hover on neutral areas |

### Utility Colors (use sparingly, not in theme)

| Color | Usage |
|---|---|
| `#22c55e` (green-500) | Phone/WhatsApp CTA in footer |
| `#16a34a` (green-600) | Hover on green phone button |
| Black (`#000`) | Primary text |
| Gray (`#6b7280`) | Secondary/muted text, borders |

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
bg-red-dark → hover:bg-red-light
text-white, rounded-full, font-semibold
px-6 py-2 (small) | px-8 py-3 (large)
```

**Secondary / Outline:**
```
border-2 border-red-dark, text-red-dark
hover: bg-red-dark text-white
rounded-full
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
Price: text-red-dark font-bold
```

**Info Card (franchise, about):**
```
bg-offwhite, rounded-2xl
border border-offwhite-dark
p-6 md:p-8
```

### Badges / Tags

```
bg-yellow-light text-black
text-xs font-semibold
px-3 py-1 rounded-full
```

### Dividers

```
border-offwhite-dark
or a 1px line colored #e6dcd3
```

---

## Carousel / Slider

Built with **Swiper 12**.

| Setting | Value |
|---|---|
| Autoplay delay | 2500ms |
| Mobile slides | 2 |
| Tablet slides | 3 |
| Desktop slides | 4 |
| Navigation color | `red-dark` |
| Pagination bullets | Active: `red-dark` |

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
7. **Testimonials section** — social proof with star ratings (use `yellow-light`)
8. **Number counters** — animate stats like "10+ Stores", "50,000+ Customers" on scroll
9. **Floating WhatsApp button** — fixed bottom-right, using green utility color
10. **Page transitions** — smooth fade between routes using React Router + GSAP
