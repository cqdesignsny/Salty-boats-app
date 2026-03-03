# Salty Boats

Full-stack website and boat configurator for Salty Boats — a Florida-based boat manufacturer with three brands: **Stumpnocker**, **Palmetto Bay Boats**, and **Salty Skiffs**.

## Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS v4 (CSS-based config)
- **Payments:** Stripe Checkout ($500 flat deposits)
- **Email:** Resend (transactional emails)
- **Icons:** Lucide React
- **Fonts:** Inter (via next/font)
- **Hosting:** Vercel

## Features

### Marketing Pages
- **Home** — Hero, brand showcase cards, "How It Works" process steps, CTA
- **Brand pages** (3) — Brand hero, boat model grid with pricing
- **Boat detail pages** (7) — Specs, features, gallery, warranty badge, CTAs
- **Inventory** — Filterable grid of in-stock boats with deposit buttons
- **Inventory detail** — Full boat details with $500 deposit checkout
- **About** — Company story, values, team
- **Services** — Gel coat repair and custom fiberglass work
- **Contact** — Contact form with form submission API
- **Dealers** — Dealer locator (coming soon)
- **404** — Custom not-found page

### Boat Configurator (`/build-your-boat`)
Interactive 8-step wizard for building custom boats:

1. **Brand Select** — Choose from 3 brands
2. **Boat Select** — Pick a model with specs and pricing
3. **Color Select** — Hull color picker with per-model pricing
4. **Equipment Select** — Electrical, plumbing, and accessories (Stumpnocker only)
5. **Trailer Select** — Trailer options with pricing (Stumpnocker only)
6. **Motor Select** — Motor dropdown or "I have my own motor" (all brands)
7. **Delivery** — Pickup or delivery with address form
8. **Review & Submit** — Full build summary with customer info and submission

Package brands (Palmetto Bay, Salty Skiffs) skip equipment and trailer steps — they flow directly from color to motor.

### E-Commerce
- **Stripe Checkout** — $500 deposit for both custom builds and inventory purchases
- **Webhook handler** — `/api/webhooks/stripe` processes `checkout.session.completed`
- **Confirmation page** — Post-payment receipt with order details

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (header + footer)
│   ├── page.tsx                # Home
│   ├── not-found.tsx           # Custom 404
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── services/page.tsx
│   ├── dealers/page.tsx
│   ├── brands/
│   │   └── [brandSlug]/
│   │       ├── page.tsx        # Brand landing page
│   │       └── [modelSlug]/
│   │           └── page.tsx    # Boat detail page
│   ├── build-your-boat/
│   │   └── page.tsx            # Configurator
│   ├── inventory/
│   │   ├── page.tsx            # Inventory grid
│   │   └── [itemId]/
│   │       └── page.tsx        # Inventory detail + deposit
│   ├── checkout/
│   │   └── confirmation/
│   │       └── page.tsx        # Post-payment confirmation
│   └── api/
│       ├── build-requests/     # POST configurator submissions
│       ├── checkout/           # POST Stripe session creation
│       ├── contact/            # POST contact form
│       └── webhooks/
│           └── stripe/         # Stripe webhook handler
├── components/
│   ├── ui/                     # Button, Card, Input, Select, Badge, Dialog
│   ├── layout/                 # Header, Footer
│   └── configurator/           # Shell, steps, summary, hook
│       ├── configurator-shell.tsx
│       ├── build-summary.tsx
│       ├── step-indicator.tsx
│       ├── use-configurator.ts
│       └── steps/              # 8 step components
├── lib/
│   ├── data.ts                 # All boat/brand/equipment/inventory data
│   ├── stripe.ts               # Stripe client (lazy loaded)
│   └── utils.ts                # cn(), formatPrice()
└── types/
    └── configurator.ts         # TypeScript types
```

## Data Architecture

All product data is defined as TypeScript constants in `src/lib/data.ts`:

- **3 brands** — Stumpnocker (custom), Palmetto Bay (package), Salty Skiffs (package)
- **7 active boat models** — with specs, base pricing, and feature lists
- **8 hull colors** — with hex codes and per-model pricing
- **Equipment options** — categorized (Electrical, Plumbing, Accessories) with dependencies
- **Trailer options** — with per-model pricing
- **Motor options** — per-model with package pricing
- **~8 inventory items** — in-stock boats with full details

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

Required variables:
- `STRIPE_SECRET_KEY` — Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — Stripe publishable key
- `STRIPE_WEBHOOK_SECRET` — Stripe webhook signing secret

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
```

### Type Check

```bash
npx tsc --noEmit
```

## Deployment

This project is configured for Vercel deployment:

1. Connect the GitHub repo to Vercel
2. Set environment variables in the Vercel dashboard
3. Deploy — Vercel auto-detects Next.js and builds accordingly

### Environment Variables for Vercel

Set these in your Vercel project settings:

| Variable | Description |
|----------|-------------|
| `STRIPE_SECRET_KEY` | Stripe secret key (use live key for production) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |

## Boat Lineup

### Stumpnocker (Custom Build)
| Model | Base Price |
|-------|-----------|
| 144 Skiff | $5,990 |
| 164 Skiff | $6,990 |
| 174 Skiff Tiller | $10,990 |

### Palmetto Bay (All-In Package)
| Model | Starting Price |
|-------|---------------|
| 186 Bay (115HP) | $36,990 |
| 1701 Center Console (90HP) | $29,990 |

### Salty Skiffs (All-In Package)
| Model | Price |
|-------|-------|
| 14S Skiff | $5,800 |
| 14F Flat Bottom | $4,800 |

## Design System

- **Colors:** Navy (`#0f1b2d`), Ocean (`#4dd9e8`), Sea Green (`#2dbe8a`)
- **Font:** Inter (variable weight)
- **Layout:** Max-width 1280px container, responsive breakpoints at `sm`, `md`, `lg`
- **Components:** Card-based boat showcase, sticky nav, mobile hamburger menu

## License

Private — Salty Boats LLC
