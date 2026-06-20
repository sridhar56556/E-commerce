# Lumière — Contemporary Fashion Store

A premium, fully-animated fashion e-commerce front-end built with **React + Vite**.
Editorial design, sliding hero, image galleries, a working cart & wishlist, search,
filtering, and smooth page transitions.

![Lumière](https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=70)

## ✨ Features

- **Animated hero slider** (Swiper) with fade transitions, Ken-Burns zoom & staggered text
- **Product catalogue** with 16 fashion items across Women / Men / Shoes / Accessories
- **Shop page** with live category filters, search, sorting & animated grid (Framer Motion)
- **Product detail** with image gallery + thumbnails, colour/size pickers, quantity & details
- **Cart**: slide-in drawer + full cart page, quantity controls, promo code (`LUMIERE10`),
  free-shipping progress bar, demo checkout — all persisted to `localStorage`
- **Wishlist** with heart toggles, also persisted
- Scroll-reveal animations, animated marquees, hover effects, mobile menu & filter sheet
- Fully **responsive** and accessible (keyboard focus, reduced-motion support)

## 🚀 Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (opens http://localhost:5173)
```

To create a production build:

```bash
npm run build    # output to /dist
npm run preview  # preview the production build
```

## 🧱 Tech stack

| Purpose            | Library            |
| ------------------ | ------------------ |
| UI framework       | React 18           |
| Build tool         | Vite 5             |
| Routing            | React Router 6     |
| Animation          | Framer Motion 11   |
| Sliders / galleries| Swiper 11          |
| Icons              | lucide-react       |

## 📁 Structure

```
src/
├── main.jsx              # app entry
├── App.jsx               # routes + page transitions
├── index.css             # design system & global styles
├── data/products.js      # catalogue + helpers
├── context/CartContext   # cart & wishlist state (localStorage)
├── components/           # Navbar, Hero, ProductCard, CartDrawer, Footer…
└── pages/                # Home, Shop, ProductDetail, Cart, Wishlist, NotFound
```

## 🛍️ Notes

- Product photography is loaded from Unsplash (royalty-free) via verified URLs.
- This is a front-end demo: checkout is simulated and takes no payment.

Made with care. ✦
