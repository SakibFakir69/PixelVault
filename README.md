# PixelVault

A collectible pixel-art marketplace. Browse, claim, and acquire AI-generated character assets across themed collections — from football archetypes to fantasy warriors.

Built by **Seven Venture Labs**.

---

## Features

- 933 generated assets across 25 collections
- Tiered pricing: **Free** (Common), **Own It** (Uncommon), **Premium** (Rare)
- Real-time search across asset title, prompt description, and collection name
- Filter by collection and tier
- Responsive layout — desktop table/grid view, mobile-optimized stacked view
- Lazy-loaded images served via Cloudinary

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS |
| Fonts | `next/font/google` |
| Image hosting | Cloudinary |
| Asset generation | Python, Together AI (FLUX.1-schnell) |
| Deployment target | Vercel / Docker on Hetzner |

---

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, pnpm, or yarn

### Installation

```bash
git clone https://github.com/<your-org>/pixelvault.git
cd pixelvault
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# App
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Payments (if enabling checkout)
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# Database (if enabling persistent claims/ownership)
DATABASE_URL=your_mongodb_or_postgres_connection_string
```

> Never commit `.env.local`. Confirm it's covered by `.gitignore` before your first push — this project has had API keys leak into commits before, so treat this as non-negotiable.

### Run locally

```bash
npm run dev
```

App runs at `http://localhost:3000`.

### Production build

```bash
npm run build
npm run start
```

---

## Project Structure

```
pixelvault/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx             # Landing / manifest view
│   └── globals.css          # Global styles, theme tokens
├── components/
│   ├── AssetRow.tsx         # Manifest table row
│   ├── AssetCard.tsx        # Grid card (alt view)
│   ├── FilterBar.tsx        # Search + collection + tier filters
│   └── Toast.tsx             # Claim/acquire confirmation
├── data/
│   └── catalog.json          # Combined asset manifest (category, title, description, image_url, price, tier)
├── public/
├── scripts/
│   └── generate_catalog.py   # Pipeline: Together AI + Cloudinary + CSV/JSON export
├── .env.local                 # Local secrets (not committed)
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Data Pipeline

Assets are generated offline via a Python pipeline and imported as static catalog data:

1. Prompts generated per category (25 collections)
2. Images generated via Together AI's FLUX.1-schnell model
3. Uploaded to Cloudinary, deduplicated via perceptual hashing
4. Catalog exported to CSV/JSON with category, tier, price, and image URLs
5. Catalog consumed by the Next.js app as static data (`data/catalog.json`)

To regenerate or extend the catalog, see `scripts/generate_catalog.py`.

**Security note:** the Together AI API key has been exposed in commits and chat history before. Rotate the key immediately if this happens again, and confirm `.env` and `.env.local` are listed in `.gitignore` before every push.

---

## Deployment

### Vercel (recommended for the frontend)

```bash
vercel --prod
```

Set all environment variables from `.env.local` in the Vercel project dashboard before deploying.

### Docker (self-hosted, e.g. Hetzner)

```bash
docker build -t pixelvault .
docker run -p 3000:3000 --env-file .env.local pixelvault
```

Example `Dockerfile`:

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["npm", "start"]
```

---

## Pre-Launch Checklist

- [ ] Domain secured (`pixelvault.com` / `.io` / `.gg`) and DNS pointed at hosting
- [ ] Trademark/name-collision check done for "PixelVault" in the NFT/collectibles space
- [ ] All secrets set via environment variables, none hardcoded
- [ ] `.env`, `.env.local` excluded in `.gitignore`, confirmed with `git status` before first push
- [ ] Cloudinary account on a plan that covers expected bandwidth/storage
- [ ] Real payment flow wired up (Stripe or equivalent) — current UI uses a mock "Acquire" confirmation only
- [ ] Persistent ownership records (database) if claims/purchases need to survive a page refresh
- [ ] Privacy policy and terms of service pages live and linked in footer
- [ ] robots.txt / sitemap.xml configured
- [ ] Lighthouse pass on performance, accessibility, SEO
- [ ] Error boundary and 404/500 pages in place
- [ ] Analytics (e.g. Plausible, Vercel Analytics) wired up
- [ ] Rate limiting / bot protection on claim & checkout endpoints

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## License

Proprietary — © Seven Venture Labs. All generated assets and source code are not licensed for redistribution without permission.
