# Phase 03 — Build

> ⏱ Target: 3–4 minutes. Scaffold at the repo root, port, theme, move on.

The workshop folder **is** the app. Scaffold the Celo Composer MiniPay template directly at the repo root, alongside the existing workshop files (`CLAUDE.md`, phase files, `ux-patterns/`, `brief.json`, `design.md`). Do **not** create a `generated-app/` subfolder. Do **not** run `git init` — the cloned workshop folder is already the repo.

## Inputs you read
- `brief.json` — what to build
- `design.md` — how it should look
- `ux-patterns/` — files to copy in
- `sources.md` — Celo/MiniPay docs if you need to ground anything

## Step 1 — Scaffold the MiniPay template at the repo root

Scaffold into a temp directory, then copy the app files into the workshop folder without stomping on existing workshop-specific files.

```bash
npx @celo/celo-composer@latest create _tmp-scaffold --template minipay --owner workshop-participant --name minipay-app
rsync -a --exclude='.git' --exclude='README.md' _tmp-scaffold/ .
rm -rf _tmp-scaffold
pnpm install
```

Key rules:
- `README.md` stays as the workshop README — do not overwrite it.
- Do not delete `CLAUDE.md`, `01-brief.md`…`04-deploy.md`, `SETUP.md`, `sources.md`, `ux-patterns/`, `design-input/`, `brief.json`, or `design.md`.
- Merge `.gitignore` if needed (append Next.js entries — `node_modules/`, `.next/`, `.vercel/` — to the existing one).

If `npx` complains, fall back to:

```bash
git clone --depth 1 https://github.com/celo-org/celo-composer.git _tmp-composer
rsync -a --exclude='.git' --exclude='README.md' _tmp-composer/packages/react-app/ .
rm -rf _tmp-composer
pnpm install
```

## Step 2 — Port `ux-patterns/` into the scaffolded app

Copy these files into the Next.js src tree at the repo root:

| Source | Destination |
|---|---|
| `ux-patterns/wallet-provider.tsx` | `src/components/wallet-provider.tsx` |
| `ux-patterns/connect-button.tsx` | `src/components/connect-button.tsx` |
| `ux-patterns/user-balance.tsx` | `src/components/user-balance.tsx` |
| `ux-patterns/bottom-nav.tsx` | `src/components/bottom-nav.tsx` |
| `ux-patterns/layout-constants.ts` | `src/constants/layout.ts` |
| `ux-patterns/root-layout.tsx` | `src/app/layout.tsx` (overwrite) |

Create directories if they don't exist. Install missing deps:

```bash
pnpm add wagmi viem @tanstack/react-query
```

## Step 3 — Apply the design spec

Open `src/app/globals.css` and write the CSS-variable theme from `design.md`:

```css
:root {
  --bg: <from design.md>;
  --text: <from design.md>;
  --text-muted: <from design.md>;
  --primary: <from design.md>;
  --accent: <from design.md>;
  --border: <from design.md>;
}

body { background: var(--bg); color: var(--text); }
```

If `design.md` named a Google Font, add the link to `src/app/layout.tsx` head and reference it in body `font-family`.

## Step 4 — Build the actual app screens from `brief.json`

Use the **`concept` bullets** from `brief.json` as your spec. Generate one route per major bullet under `src/app/`. Keep it minimal:
- Each page: one heading, one core action button, supporting text from the brief.
- Wire `useAccount` from wagmi to gate logged-in vs logged-out states.
- For payment flows, use `useWriteContract` (wagmi) targeting cUSD/USDT contracts from `ux-patterns/user-balance.tsx`. Reference the MiniPay docs in `sources.md` for the actual transfer pattern.

Update `src/app/page.tsx` to be the home screen described in concept bullet #1. Keep it under 100 lines. No fake data — if you need a list, render an empty state with copy from the brief.

Update `src/components/bottom-nav.tsx` `navItems` array to match the routes you actually built (3 max).

Update `src/app/layout.tsx` `metadata.title` and `metadata.description` from `brief.json.pitch` and `brief.json.tweet`.

## Then say
> "Build done. Deploying now."

Move to phase 04.
