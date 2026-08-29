# Strip — Juice Ecommerce (React + Vite + Tailwind + Framer Motion)

## Setup

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173).

## Pages
- `/` — homepage: hero, Best Sellers, Top Buying Drinks, About preview, Stories preview, reviews.
- `/drinks` — New Arrivals, Top Buying, and the full catalog.
- `/bestsellers` — best-selling flavors only.
- `/stories` — all journal/story entries.
- `/about` — full About page + reviews.
- `/admin` — admin login (`admin@strip.com` / `admin123`), then dashboard.

## Product & story images
Drop photos into `public/images/` using the exact filenames listed in
`public/images/README.txt`. New Arrivals reuse the same 4 files already listed there
(mango-rush.jpg, watermelon-splash.jpg, ginger-zing.jpg, coconut-cool.jpg) — no extra
photos needed for that section. Anything missing falls back to a drawn placeholder.

## This round's changes
1. Removed the "Est. 2019 · Small-batch hydration" line from the hero.
2. "Shop the lineup" now scrolls to the real Best Sellers section on the homepage.
3. "New Arrivals" is a real, working section (`/drinks#new-arrivals`) listing the 4
   newest flavors, linked correctly from both the header dropdown and the footer.
4. Section headings, story cards, and review cards now animate in from alternating
   left/right directions as you scroll, converging to center instead of a plain fade.
5. Color is more present throughout: a richer multi-tone ambient glow site-wide, plus
   each major section (About, Stories, Reviews, page banners) now carries its own subtle
   color wash instead of flat black — on top of the existing hover-driven accent that
   retints the site to whichever drink you're viewing.
6. All code comments removed and the codebase was reviewed for a natural, human-written
   structure end to end.

## Notes carried over from before
- Login (customer + admin) and checkout are UI simulations — no real backend, database,
  or payment gateway. Admin demo credentials are in `src/context/AuthContext.jsx`.
- Cart, wishlist, orders, and logins reset on page refresh (in-memory state only).
- Shipping is 50% of your subtotal, free once your subtotal hits $15
  (`src/context/ShopContext.jsx`).
- If the hero video URL doesn't load, a crafted fallback illustration shows instead.

## Build for production
```bash
npm run build
npm run preview
```
