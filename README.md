# Salty Boats

Full-stack website and boat configurator for Salty Boats — a Florida-based boat manufacturer with three brands: **Stumpnocker**, **Palmetto Bay Boats**, and **Salty Skiffs**.

## Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS v4 (CSS-based config)
- **Payments:** Stripe Checkout ($500 flat deposits)
- **Email:** Resend (transactional emails)
- **Icons:** Lucide React
- **Fonts:** Inter (via next/font)
- **Hosting:** Vercel (auto-deploy from `main`)

## Features

### Marketing Pages
- **Home** — Interactive water canvas hero, brand showcase cards (fully clickable), "How It Works" process steps, CTA
- **Brand pages** (3) — Brand hero, boat model grid with pricing, "Build Your [Brand]" buttons link directly to configurator with brand pre-selected
- **Boat detail pages** (9) — Specs, features, gallery, warranty badge, "Build This Boat" CTA (auto-selects brand in configurator)
- **Inventory** — Filterable grid of in-stock boats with deposit buttons
- **Inventory detail** — Full boat details with $500 deposit checkout
- **About** — Company story, values, team
- **Services** — Gel coat repair and custom fiberglass work
- **Contact** — Contact form with form submission API
- **Dealers** — Dealer locator (coming soon)
- **404** — Custom not-found page

### Boat Configurator (`/build-your-boat`)
Interactive multi-step wizard for building custom boats:

**Stumpnocker (8 steps):**
1. **Brand Select** — Choose from 3 brands
2. **Boat Select** — Pick a model with specs and pricing
3. **Color Select** — Hull color picker with per-model pricing
4. **Equipment Select** — Electrical, plumbing, and accessories
5. **Trailer Select** — Trailer options with pricing
6. **Motor Select** — Motor dropdown or "I have my own motor"
7. **Delivery** — Pickup or delivery with address form
8. **Review & Submit** — Full build summary, print/download quote, customer info, and submission

**Package brands (Palmetto Bay, Salty Skiffs) — 7 steps:**
Brand → Boat → Color → Motor → Trailer → Delivery → Review

- **Palmetto Bay (all-in):** Motor step shows included motor(s), trailer shows as "Included"
- **Salty Skiffs (pick your power):** 12 Suzuki motor options ($975–$6,095 add-on), trailer included

**Smart features:**
- Brand auto-selection via URL query param (`?brand=stumpnocker`)
- Print Quote / Save as PDF — generates a clean branded quote document
- Real-time price calculation in sidebar and mobile sticky bar
- Step validation prevents advancing without required selections

### E-Commerce
- **Stripe Checkout** — $500 deposit for both custom builds and inventory purchases
- **Webhook handler** — `/api/webhooks/stripe` processes `checkout.session.completed`
- **Confirmation page** — Post-payment receipt with order details

### Interactive Hero
- **Water Canvas** — Canvas 2D animated water effect with sine waves and mouse-reactive ripples
- Listens on the full hero `<section>` for mouse/touch interaction across the entire area
- Ambient ripples spawn automatically for organic motion
- Respects `prefers-reduced-motion` for accessibility

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (header + footer + scroll-to-top)
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
│   │   └── page.tsx            # Configurator (wrapped in Suspense)
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
│   ├── ui/                     # Button, Card, Input, Select, Badge, Dialog, WaterCanvas
│   ├── layout/                 # Header, Footer
│   ├── scroll-to-top.tsx       # Client component — scrolls to top on route change
│   └── configurator/           # Shell, steps, summary, hook
│       ├── configurator-shell.tsx   # Main wizard with step routing + brand auto-select
│       ├── build-summary.tsx
│       ├── step-indicator.tsx
│       ├── use-configurator.ts      # useReducer state management (16 action types)
│       └── steps/                   # 8 step components
│           ├── brand-select.tsx
│           ├── boat-select.tsx
│           ├── color-select.tsx
│           ├── equipment-select.tsx
│           ├── trailer-select.tsx
│           ├── motor-select.tsx
│           ├── delivery-select.tsx
│           └── review-submit.tsx    # Review, print/PDF, contact form, submit
├── lib/
│   ├── data.ts                 # All boat/brand/equipment/inventory data
│   ├── stripe.ts               # Stripe client (lazy loaded)
│   └── utils.ts                # cn(), formatPrice()
└── types/
    ├── configurator.ts         # State, actions, step arrays
    └── database.ts             # Brand, BoatModel, HullColor, EquipmentOption, Trailer, etc.
```

## Data Architecture

All product data is defined as TypeScript constants in `src/lib/data.ts`:

- **3 brands** — Stumpnocker (custom), Palmetto Bay (package), Salty Skiffs (pick your power)
- **9 active boat models** — with specs, base pricing, and feature lists
- **8 hull colors** — with hex codes and per-model pricing
- **Equipment options** — categorized (Electrical, Plumbing, Accessories) with per-model applicability
- **Trailer options** — with per-model pricing and applicability
- **Motor options** — dual pricing system: all-in package (Palmetto Bay) and additive pick-your-power (Salty Skiffs, 12 Suzuki motors)
- **~8 inventory items** — in-stock boats with full details

## Boat Lineup

### Stumpnocker (Custom Build)
| Model | Base Price | Max HP |
|-------|-----------|--------|
| 144 Skiff Tiller | $5,990 | 25 |
| 164 Skiff Tiller | $6,990 | 40 |
| 174 Skiff Tiller | $10,990 | 50 |
| 174 Skiff Tiller Deluxe | $10,990 | 50 |
| 174 Skiff CC (Center Console) | $16,990 | 60 |

### Palmetto Bay (All-In Package)
| Model | Package Price |
|-------|--------------|
| 186 Bay (115HP) | $36,990 |
| 1701 Center Console (90HP) | $32,990 |

### Salty Skiffs (Pick Your Power)
| Model | Starting Price |
|-------|---------------|
| 14S | $6,000 |
| 14F | $10,500 |

#### Salty Skiffs Motor Options (12 Suzuki outboards)
| Motor | HP | SKU | Add-on Price |
|-------|-----|-----|-------------|
| Suzuki 2.5 HP Tiller | 2.5 | DF2.5L5 | $975 |
| Suzuki 4 HP Tiller | 4 | DF4AL5 | $1,575 |
| Suzuki 6 HP Tiller | 6 | DF6AL5 | $1,765 |
| Suzuki 9.9B HP E-Start Tiller + Power Tilt | 9.9 | DF9.9BETL5 | $3,295 |
| Suzuki 15 HP E-Start Tiller + Power Tilt | 15 | DF15AEHTL5 | $3,195 |
| Suzuki 20 HP E-Start Tiller + Power Tilt | 20 | DF20AEHTL5 | $3,495 |
| Suzuki 20 HP E-Start Tiller + Power Tilt (White) | 20 | DF20AEHTLW5 | $3,595 |
| Suzuki 25 HP E-Start Tiller + Power Trim & Tilt | 25 | DF25AETL5 | $4,195 |
| Suzuki 25 HP E-Start Tiller + PT&T (White) | 25 | DF25AETLW5 | $4,295 |
| Suzuki 30 HP E-Start Tiller + Power Trim & Tilt | 30 | DF30ATHL5 | $5,895 |
| Suzuki 30 HP E-Start Tiller + PT&T (White) | 30 | DF30ATHLW5 | $6,095 |
| Suzuki 30 HP 2nd Gen E-Start Tiller + PT&T | 30 | DF30ATL5 | $5,295 |

> Motor price is added to the base boat + trailer price. All motors include fuel tank, fuel line, and propeller — installed and ready to go.

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
cd salty-boats-app
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

This project is configured for Vercel deployment. Pushes to `main` auto-deploy.

1. Connect the GitHub repo to Vercel
2. Set environment variables in the Vercel dashboard
3. Deploy — Vercel auto-detects Next.js and builds accordingly

### Environment Variables for Vercel

| Variable | Description |
|----------|-------------|
| `STRIPE_SECRET_KEY` | Stripe secret key (use live key for production) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |

## Design System

- **Colors:** Navy (`#0f1b2d`), Ocean (`#4dd9e8`), Sea Green (`#2dbe8a`)
- **Font:** Inter (variable weight)
- **Layout:** Max-width 1280px container, responsive breakpoints at `sm`, `md`, `lg`
- **Components:** Card-based boat showcase, sticky nav, mobile hamburger menu
- **Hero:** Interactive water canvas with Canvas 2D ripples and sine waves

## Contact

- **Email:** sales@saltyboats.com
- **Phone:** (352) 748-1161
- **Address:** 900 Industrial Drive, Wildwood, FL 34785

## License

Private — Salty Boats LLC
