# Portfolio — Refactored

React + Vite + Supabase portfolio with a dark editorial design.

## Quick Start

```bash
npm install
cp .env.example .env   # add your Supabase anon key
npm run dev
```

## Environment Variables

Create a `.env` file at the project root:

```
VITE_SUPABASE_ANON_KEY=eyJhbGci...   # from Supabase > Settings > API
```

The Supabase URL is already hardcoded to `https://nogceqjnafbnkrrubyqa.supabase.co`.

## Supabase Setup

1. Open your Supabase project → **SQL Editor**
2. Paste and run `docs/SUPABASE_SETUP.sql`
3. Go to **Storage** → create a bucket called `assets` (set to **Public**)
4. Upload your files keeping this folder structure:

```
assets/
├── images/
│   ├── ProfileImage.jpg
│   ├── UniversityLogo.png
│   ├── Dashboard1.png  …
│   ├── fresh-logo.png  …
│   └── (all project screenshots)
├── documents/
│   └── Habib_Khan_Resume.pdf
└── apk/
    ├── Fresh-news.apk
    ├── QuickHr.apk
    └── Employee-Form.apk
```

The site uses **local assets as fallback** if Supabase is not yet populated, so it works immediately after `npm install`.

## Design System

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#0a0a0a` | Page background |
| `--surface` | `#111111` | Cards |
| `--surface-2` | `#1a1a1a` | Inputs, inner surfaces |
| `--accent` | `#c8f135` | Lime — buttons, highlights |
| `--text-primary` | `#f0f0ee` | Headings & body |
| `--text-secondary` | `#888880` | Descriptions |
| `--text-muted` | `#444440` | Labels, placeholders |

Fonts: **Syne** (headings) · **DM Sans** (body)

## Updating Data

- **Without Supabase**: Edit `src/hooks/usePortfolioData.js` → `FALLBACK_*` constants
- **With Supabase**: Update rows in the dashboard — changes reflect instantly, no redeploy needed
