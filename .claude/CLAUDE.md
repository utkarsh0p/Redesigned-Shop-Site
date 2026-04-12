# CrushBurg — Claude Code Project Guide

## Project Overview

**CrushBurg** is a burger & wraps restaurant chain website built for a franchise business. The site covers the full customer + business journey: browsing the menu, finding stores, learning about the franchise opportunity, and contacting the team.

- Business contact: +917619910103 | connect@crushburg.com
- All prices in Indian Rupees (₹39 – ₹179)
- Vegetarian-only menu (no meat products)

> **For any franchise, menu, outlet locations, investment models, leadership, awards, or general business info:** Always read [franchise-info.md](./franchise-info.md) first. This is the single source of truth for all business context.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 19 + Vite 7 |
| Routing | React Router DOM 7 |
| Styling | Tailwind CSS 4 + DaisyUI 5 |
| Icons | Lucide React |
| Carousel | Swiper 12 |
| Animations | GSAP 3 + Motion (motion/react) |
| Forms | React Hook Form |
| Email | EmailJS (service_c81x8y8 / template_5o6opax) |
| Notifications | React Toastify |
| Assets | Cloudinary CDN |

---

## Running the Project

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # ESLint check
```

---

## Directory Structure

```
src/
├── components/
│   ├── FoodCard.jsx          # Category card with image background
│   ├── Footer.jsx            # Multi-section footer (accordion on mobile)
│   ├── Navbar.jsx            # Top nav + mobile bottom nav bar
│   ├── ProductCarousel.jsx   # Swiper carousel for featured products
│   └── SlideButton.jsx       # Reusable CTA button (3 modes)
├── pages/
│   ├── HomePage.jsx          # Hero, carousel, categories, store CTA
│   ├── Menu.jsx              # Full product catalog with categories
│   ├── Store.jsx             # Store locations
│   ├── AboutUs.jsx           # Brand story
│   ├── Contacts.jsx          # EmailJS contact form
│   ├── Franchise.jsx         # Franchise opportunity page
│   ├── FAQ.jsx               # Accordion FAQ
│   ├── PrivacyPolicy.jsx     # Legal
│   └── TermsOfUse.jsx        # Legal
├── constants/
│   └── index.js              # ALL product data, images (Cloudinary URLs), nav links
├── index.css                 # Tailwind theme, custom utilities, fonts
├── App.jsx                   # Route definitions
└── main.jsx                  # Entry point
```

---

## Key Routes

| Path | Page |
|---|---|
| `/` | HomePage |
| `/menu` | Menu |
| `/store` | Store |
| `/aboutus` | AboutUs |
| `/contact` | Contacts |
| `/franchise` | Franchise |
| `/faq` | FAQ |
| `/termsofuse` | TermsOfUse |
| `/privacypolicy` | PrivacyPolicy |

---

## Design System

> **For any styling-related task:** Always read [styles.md](./styles.md) first, then confirm whether the proposed change aligns with the design system before proceeding.

See [styles.md](./styles.md) for the full design reference (colors, typography, spacing, component patterns).

**Core principles:**
- Off-white/beige backgrounds (`offwhite`) as the canvas
- Red (`red-dark`) as the primary brand action color
- Yellow/orange (`yellow-light`, `yellow-dark`) for highlights and hover states
- Rounded pill buttons throughout
- Mobile-first — always check mobile layout first

**Custom CSS utilities (defined in index.css):**
- `.heading` — bold heading styles
- `.para` — responsive paragraph size
- `.padding-responsive` — `px-4 md:px-8 lg:px-16`
- `.card-shadow` — white card with subtle shadow

---

## Data & Assets

All product data and image URLs live in `src/constants/index.js`. This is the single source of truth for:
- `navLinks` — navigation items
- `products` — full menu with categories, names, descriptions, prices, images
- All Cloudinary asset URLs (logos, banners, product images, store photos)

**Never hardcode product data or image URLs in components.** Always reference `constants/index.js`.

---

## Important Constraints

- Do not add meat or non-vegetarian products — CrushBurg is 100% vegetarian
- Keep the red + off-white + yellow brand palette — do not introduce new base colors without updating `styles.md`
- EmailJS credentials are in the Contacts page — do not move them to env without updating the integration
- Fonts are loaded from Cloudinary URLs in `index.css` — do not change font sources
- DaisyUI is installed but use it selectively — prefer custom Tailwind classes to keep brand consistency
