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
- **Brand pages** (3) — Boat model grid with image carousels (arrow navigation), pricing, "Build" buttons link to configurator with brand + model pre-selected
- **Boat detail pages** (9) — Specs, features, image gallery with arrows, warranty badge, "Build This Boat" CTA (auto-selects brand + model in configurator, skips to Color step)
- **Inventory** — Filterable grid of in-stock boats with deposit buttons
- **Inventory detail** — Full boat details with $500 deposit checkout
- **About** — Company story, values, team
- **Services** — Gel coat repair and custom fiberglass work
- **Contact** — Contact form with form submission API
- **Dealers** — Dealer locator (coming soon)
- **404** — Custom not-found page

### Boat Configurator (`/build-your-boat`)
Interactive multi-step wizard for building custom boats:

**Stumpnocker (9 steps):**
Brand → Boat → Color → Equipment → Trailer → Motor → Installation → Delivery → Review

- Tiller models (144, 164, 174, 174 Deluxe): 18 pick-your-power Suzuki motors ($975–$7,875)
- 174 Skiff CC (center console): 17 remote-steering Suzuki motors ($3,465–$7,875), including V-Twin options

**Salty Skiffs (8 steps):**
Brand → Boat → Color → Trailer → Motor → Installation → Delivery → Review

- 18 pick-your-power Suzuki tiller motors ($975–$7,875)

**Palmetto Bay (7 steps):**
Brand → Boat → Color → Motor → Trailer → Delivery → Review

- Motor included in all-in package price

**Smart features:**
- Brand + model auto-selection via URL query params (`?brand=stumpnocker&model=164-skiff-tiller`)
- Build Summary sidebar visible from step 1 (no layout shift)
- Clickable step indicator dots to jump back to completed steps
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
│   ├── ui/                     # Button, Card, Input, Select, Badge, Dialog, WaterCanvas, ImageCarousel, ImageGallery
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
- **Motor options** — dual pricing system: all-in package (Palmetto Bay) and additive pick-your-power (Salty Skiffs + Stumpnocker). 30 total motor entries across all brands.
- **~8 inventory items** — in-stock boats with full details

## Boat Lineup

### Stumpnocker (Custom Build)
| Model | Base Price | Max HP |
|-------|-----------|--------|
| 144 Skiff Tiller | $5,990 | 30 |
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

### Motor Options

All pick-your-power motors are Suzuki outboards. Motor price is added to the base boat price. All motors include fuel tank, fuel line, and propeller.

#### Tiller Motors — Salty Skiffs + Stumpnocker (except 174 CC)
18 motors shared across Salty Skiffs 14S/14F and Stumpnocker 144, 164, 174, 174 Deluxe:

| Motor | HP | SKU | Price |
|-------|-----|-----|-------|
| 2.5 HP Tiller | 2.5 | DF2.5L5 | $975 |
| 4 HP Tiller | 4 | DF4AL5 | $1,575 |
| 6 HP Tiller | 6 | DF6AL5 | $1,765 |
| 9.9B HP E-Start Tiller + Power Tilt | 9.9 | DF9.9BETL5 | $3,295 |
| 15 HP E-Start Tiller + Power Tilt | 15 | DF15AEHTL5 | $3,195 |
| 20 HP E-Start Tiller + Power Tilt | 20 | DF20AEHTL5 | $3,495 |
| 20 HP E-Start Tiller + Power Tilt (White) | 20 | DF20AEHTLW5 | $3,595 |
| 25 HP E-Start Tiller + PT&T | 25 | DF25AETL5 | $4,195 |
| 25 HP E-Start Tiller + PT&T (White) | 25 | DF25AETLW5 | $4,295 |
| 30 HP Tiller + PT&T | 30 | DF30ATHLS | $5,945 |
| 30 HP Tiller + PT&T (White) | 30 | DF30ATHLW5 | $6,095 |
| 30 HP 2nd Gen + PT&T | 30 | DF30ATL5 | $5,295 |
| 40 HP PT&T | 40 | DF40ATL5 | $6,585 |
| 40 HP PT&T (White) | 40 | DF40ATLW5 | $6,885 |
| 50 HP PT&T | 50 | DF50ATL5 | $6,855 |
| 50 HP PT&T (White) | 50 | DF50ATLW5 | $7,155 |
| 60 HP PT&T | 60 | DF60ATL5 | $7,575 |
| 60 HP PT&T (White) | 60 | DF60ATLW5 | $7,875 |

#### Remote-Steering Motors — 174 Skiff CC Only
17 motors for the center console (no tiller handle):

| Motor | HP | SKU | Price |
|-------|-----|-----|-------|
| 9.9B HP PT&T | 9.9 | DF9.9BTL5 | $3,465 |
| 9.9B HP PT&T (White) | 9.9 | DF9.9BTLW5 | $3,565 |
| 20 HP PT&T | 20 | DF20ATL5 | $4,340 |
| 20 HP PT&T (White) | 20 | DF20ATLW5 | $4,440 |
| 25 HP PT&T | 25 | DF25ATL5 | $5,055 |
| 25 HP PT&T (White) | 25 | DF25ATLW5 | $5,205 |
| 30 HP PT&T | 30 | DF30ATL5 | $5,840 |
| 30 HP PT&T (White) | 30 | DF30ATLW5 | $5,990 |
| 40 HP PT&T | 40 | DF40ATL5 | $6,585 |
| 40 HP PT&T (White) | 40 | DF40ATLW5 | $6,885 |
| 50 HP PT&T | 50 | DF50ATL5 | $6,855 |
| 50 HP PT&T (White) | 50 | DF50ATLW5 | $7,155 |
| 50 HP V-Twin PT&T | 50 | DF50AVTL5 | $7,190 |
| 60 HP PT&T | 60 | DF60ATL5 | $7,575 |
| 60 HP PT&T (White) | 60 | DF60ATLW5 | $7,875 |
| 60 HP V-Twin PT&T | 60 | DF60AVTL5 | $7,720 |
| 60 HP V-Twin PT&T (25" Shaft) | 60 | DF60AVTX5 | $7,800 |

> The 40–60 HP non-V-Twin motors are shared entries (same data.ts objects) between tiller and CC models. The 174 CC 9.9–30 HP motors have separate IDs/prices from the tiller versions since they are different SKUs (remote steering vs tiller handle).

#### Palmetto Bay Motors (All-In Package)
| Model | Motor | Included |
|-------|-------|----------|
| 186 Bay | Suzuki 115 HP or Yamaha 115 HP | In package price |
| 1701 CC | Suzuki 90 HP | In package price |

#### SKU Decoding Key
`DF` = 4-Stroke, `A` = 2nd Gen, `B` = 3rd Gen, `V` = V-Twin, `E` = Electric Start, `H` = Tiller Handle, `T` = Power Trim & Tilt, `L` = 20" Shaft, `X` = 25" Shaft, `W` = White Cowling, `5` = model year suffix

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
