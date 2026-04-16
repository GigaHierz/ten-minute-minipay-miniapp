# Phase 03 — Build

> ⏱ Target: 3–4 minutes. Scaffold, port, theme, run dev once to verify, move on.

## Inputs you read
- `brief.json` — what to build
- `design.md` — how it should look
- `ux-patterns/` — files to copy in
- `sources.md` — Celo/MiniPay docs if you need to ground anything

## Step 1 — Scaffold Celo Composer MiniPay template

Run from repo root:

```bash
npx @celo/celo-composer@latest create generated-app \
  --template minipay \
  --owner workshop-participant \
  --name minipay-app
```

If the CLI prompts interactively, accept defaults. If `npx` complains, fall back to:

```bash
git clone --depth 1 https://github.com/celo-org/celo-composer.git tmp-composer
cp -r tmp-composer/packages/react-app generated-app
rm -rf tmp-composer
cd generated-app && pnpm install
```

Pick whichever works on the demo machine.

## Step 2 — Port `ux-patterns/` into the scaffolded app

Copy these files exactly:

| Source | Destination |
|---|---|
| `ux-patterns/wallet-provider.tsx` | `generated-app/src/components/wallet-provider.tsx` |
| `ux-patterns/connect-button.tsx` | `generated-app/src/components/connect-button.tsx` |
| `ux-patterns/user-balance.tsx` | `generated-app/src/components/user-balance.tsx` |
| `ux-patterns/bottom-nav.tsx` | `generated-app/src/components/bottom-nav.tsx` |
| `ux-patterns/layout-constants.ts` | `generated-app/src/constants/layout.ts` |
| `ux-patterns/root-layout.tsx` | `generated-app/src/app/layout.tsx` (overwrite) |

Create directories if they don't exist. Install missing deps:

```bash
cd generated-app && pnpm add wagmi viem @tanstack/react-query
```

## Step 3 — Apply the design spec

Open `generated-app/src/app/globals.css` and write the CSS-variable theme from `design.md`:

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

If `design.md` named a Google Font, add the link to `generated-app/src/app/layout.tsx` head and reference it in body `font-family`.

## Step 4 — Build the actual app screens from `brief.json`

Use the **`concept` bullets** from `brief.json` as your spec. Generate one route per major bullet under `generated-app/src/app/`. Keep it minimal:
- Each page: one heading, one core action button, supporting text from the brief.
- Wire `useAccount` from wagmi to gate logged-in vs logged-out states.
- For payment flows, use `useWriteContract` (wagmi) targeting cUSD/USDT contracts from `ux-patterns/user-balance.tsx`. Reference the MiniPay docs in `sources.md` for the actual transfer pattern.

Update `generated-app/src/app/page.tsx` to be the home screen described in concept bullet #1. Keep it under 100 lines. No fake data — if you need a list, render an empty state with copy from the brief.

Update `generated-app/src/components/bottom-nav.tsx` `navItems` array to match the routes you actually built (3 max).

Update `generated-app/src/app/layout.tsx` `metadata.title` and `metadata.description` from `brief.json.pitch` and `brief.json.tweet`.

## Step 5 — Verify

```bash
cd generated-app && pnpm dev
```

Wait for "ready" in the terminal output. Tell the participant:
> "Open http://localhost:3000 — it should render. Once you've eyeballed it, hit Enter and I'll deploy."

Wait for confirmation. Kill the dev server (`pkill -f "next dev"` or close the background process).

## Then say
> "Build done. Deploying now."

Move to phase 04.
