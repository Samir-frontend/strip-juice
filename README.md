<div align="center">

![Strip Header](https://readme-typing-svg.demolab.com?font=Fira+Code&size=32&duration=3000&pause=1000&color=F2A340&center=true&vCenter=true&width=800&height=90&lines=%F0%9F%A5%A4+Strip;Powerful+Drinks.+Built+For+Every+Adventure.;React+%2B+Vite+%2B+Tailwind+Ecommerce;Hydration%2C+Reimagined.)

<br/>

<a href="https://strip-juice.netlify.app/">
  <img src="https://img.shields.io/badge/🥤%20Open%20Strip-F2A340?style=for-the-badge&logoColor=black"/>
</a>

<br/><br/>

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
<img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
<img src="https://img.shields.io/badge/Framer%20Motion-black?style=for-the-badge&logo=framer&logoColor=0055FF"/>

<br/><br/>

![Status](https://img.shields.io/badge/Status-Live-brightgreen?style=flat-square)
![Responsive](https://img.shields.io/badge/Responsive-Yes-blue?style=flat-square)
![Pages](https://img.shields.io/badge/Pages-6-F2A340?style=flat-square)
![Dynamic Theming](https://img.shields.io/badge/Theming-Drink--Reactive-e0526b?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

</div>

---

## 🥤 Overview

> **Strip** is a fully responsive, premium-feel **hydration ecommerce storefront** — a complete React frontend for a fictional juice/electrolyte drink brand. It includes a cinematic video hero, live product search, wishlist, a click-to-view product popup, cart + simulated checkout, customer & admin auth, and a full admin dashboard for managing the catalog — all wrapped in a dark, drink-reactive color theme. No backend required to run.

<div align="center">

| 🍑 Flavors | ⭐ Best Sellers | 🛒 Full Checkout Flow | 🎨 Drink-Reactive Theme |
|:---:|:---:|:---:|:---:|
| 8 | 3 | Cart → Pay → Confirm | Live Accent Color |

</div>

---

## ✨ Features

### 🛍️ Storefront & Catalog
- 🥤 **8 Flavors** — Peach Perfect, Citrus Charge, Berry Boost, Cherry Focus, Mango Rush, Watermelon Splash, Ginger Zing, Coconut Cool
- 🖼️ **Full-Bleed Product Cards** — real photo support with automatic fallback to a drawn bottle illustration if an image is missing
- 🔎 **Click-to-View Quick Popup** — bigger image, full description, rating, quantity stepper, Add to Cart & Buy Now
- ⭐ **Best Sellers** & 📈 **Top Buying Drinks** — dynamically ranked sections
- 🆕 **New Arrivals** — auto-generated from the newest flavors in the catalog
- ❤️ **Wishlist** — heart any bottle, review it all in a dedicated drawer
- 🔍 **Live Search** — type a flavor name and see matching results with photo & price instantly

### 🛒 Cart, Checkout & Orders
- 🧺 **Slide-Over Cart** — quantity controls, live subtotal, free-shipping progress nudge
- 💳 **Simulated Checkout** — shipping form + card details (formatted card/expiry/CVV inputs)
- 🚚 **Dynamic Shipping** — 50% of subtotal, free once the cart crosses the threshold
- ✅ **Order Confirmation** — generated order ID, order history visible from the account modal

### 🔐 Auth System
- 👤 **Customer Login / Signup** — simulated session with order history
- 🛠️ **Admin Login** — separate `/admin` route with demo credentials
- 📊 **Admin Dashboard** — Overview stats, Products (add/delete live), Orders, Customers tabs

### 🎨 Drink-Reactive Theming
- 🌈 **Dynamic Accent Color** — hover or click any drink and the header, buttons, and ambient glow across the entire site retint to that flavor's color
- 🖤 **Premium Dark UI** — glassmorphism cards, jewel-toned per-flavor palette, subtle colored washes per section
- 🎬 **Cinematic Hero** — full-bleed background video with an automatic illustrated fallback if the video fails to load

### 📄 Multi-Page Experience
- 🏠 **Home** — hero, Best Sellers, Top Buying, About preview, Stories preview, Reviews
- 🥤 **Drinks** — New Arrivals, Top Buying, full catalog
- ⭐ **Best Sellers** — dedicated page for top-rated flavors
- 📖 **Stories** — brand journal entries
- ℹ️ **About** — full brand story + stats + reviews
- 🛠️ **Admin** — login-gated dashboard

### 📱 UI / UX
- 📱 **Mobile-First Interactions** — drinks, reviews & stories scroll horizontally on phones instead of stacking
- 🍔 **Mobile Drawer Menu** — Home, Shop, Best Sellers, About, Stories, Reviews, Search, Wishlist & Contact in one panel
- 🔔 **Toast Notifications** — cart adds, wishlist changes, navigation, form submissions
- ⚡ **Scroll-Reveal Animations** — sections and cards fade/slide into view smoothly as you scroll
- 🚀 **Performance-Tuned** — lazy-loaded images, minimal blur layers, GPU-friendly transforms

---

## ⚙️ How It Works

```javascript
1. User lands on the hero — video plays, ingredient highlights fade in
2. Browses Best Sellers / Top Buying / New Arrivals / full catalog
3. Hovers or clicks a drink → site accent color retints to match it
4. Clicks a product card → Quick View popup opens with full details
5. Adds to cart or wishlist → toast confirms the action
6. Opens cart drawer → reviews items, subtotal & shipping
7. Proceeds to checkout → fills shipping + card details (simulated)
8. Order is placed → confirmation screen with a generated order ID
9. Admin logs in at /admin → manages products, views orders & customers
10. Search opens centered → live-filters flavors by name as you type
```

---

## 📁 Project Structure

```
strip-juice/
├── public/
│   └── images/          → Product & story photos (with a README for exact filenames)
├── src/
│   ├── components/      → Header, Hero, ProductsSection, CartDrawer, QuickViewModal,
│   │                       CheckoutModal, LoginModal, AdminDashboard pieces, etc.
│   ├── pages/            → Home, DrinksPage, BestSellersPage, StoriesPage,
│   │                       AboutPage, AdminLogin, AdminDashboard
│   ├── context/          → ShopContext (catalog + cart), AuthContext, ThemeContext
│   ├── theme.js          → Shared color palette (accent + per-flavor colors)
│   └── App.jsx           → Routes & providers
├── index.html
├── tailwind.config.js
└── vite.config.js
```

---

## 🛠️ Tech Stack

<div align="center">

![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/-Framer%20Motion-black?style=flat-square&logo=framer&logoColor=0055FF)
![React Router](https://img.shields.io/badge/-React%20Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white)
![Lucide Icons](https://img.shields.io/badge/-Lucide%20Icons-F2A340?style=flat-square)

</div>

---

## 🚀 Run Locally

```bash
# Clone the repository
git clone https://github.com/Samir-frontend/strip-juice.git

# Navigate to the folder
cd strip-juice

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Then open the URL shown in the terminal (usually `http://localhost:5173`).

> Drop your own product photos into `public/images/` (see `public/images/README.txt` for exact filenames) to replace the drawn placeholder bottles.

---

## 🎯 What I Learned

- 🎨 **Global Reactive Theming** — driving a site-wide accent color from user interaction (hover/click) without heavy re-renders
- 🛒 **Cart & Checkout State** — managing cart, wishlist, and orders through React Context instead of prop drilling
- 🖼️ **Graceful Image Fallbacks** — building a component that quietly falls back to a drawn illustration when a real photo is missing
- 🧭 **Multi-Page Routing** — structuring a small ecommerce app across dedicated pages with a shared Layout
- 🎬 **Resilient Video Hero** — detecting a failed video load and swapping in a crafted fallback background automatically
- 📱 **Mobile-First Scroll Patterns** — horizontal snap-scrolling rows instead of vertical stacks on small screens
- 🛠️ **Lightweight Admin Panel** — building a functional-feeling admin dashboard without a real backend

---

## 🔮 Future Improvements

- [ ] 🗄️ Real backend with Node.js + a database for persistent products & orders
- [ ] 🔐 Real authentication (JWT / sessions) for customers and admins
- [ ] 💳 Live payment gateway integration (Stripe / Razorpay)
- [ ] 📦 Order tracking with real shipment status updates
- [ ] 🖼️ Image upload flow for the admin product form
- [ ] 🌍 Multi-currency & localization support
- [ ] 🤖 Personalized flavor recommendations based on browsing/wishlist history

---

## 🚀 Live Demo

**[🥤 Open Strip →](https://strip-juice.netlify.app/)**

---

<div align="center">

*"Powerful drinks. Built for every adventure."*

---

**Samir Sheikh** · Front-End Developer · 📍 Rawatbhata, Rajasthan

[Portfolio](https://samir-portfolio-mu.vercel.app/) · [GitHub](https://github.com/Samir-frontend) · 📧 samirshiekh0808@gmail.com

<br/>

⭐ **Impressed? Drop a star!** ⭐

</div>
