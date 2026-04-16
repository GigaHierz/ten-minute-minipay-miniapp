# UX patterns to port into the scaffolded app

These are the **functional** mobile/MiniPay UX building blocks ported from a working production MiniPay app. They are stack-neutral and styling-light so the participant's design choices drive the look.

The build agent (`03-build.md`) copies these into the new Celo Composer project after scaffolding.

## What's in here

| File | Drop into | What it does |
|---|---|---|
| `wallet-provider.tsx` | `src/components/` | Wagmi provider, Celo + Celo Sepolia chains, MiniPay auto-connect |
| `connect-button.tsx` | `src/components/` | Wallet connect; **hides itself in MiniPay** since wallet auto-connects there |
| `user-balance.tsx` | `src/components/` | Reads CELO + cUSD + USDC + USDT balances for the connected address |
| `bottom-nav.tsx` | `src/components/` | Fixed bottom nav, icon-only, 44×44 touch targets, theme-aware |
| `layout-constants.ts` | `src/constants/` | `TOP_BAR_HEIGHT`, `BOTTOM_NAV_HEIGHT`, etc. |
| `root-layout.tsx` | `src/app/layout.tsx` (overwrite) | Viewport meta that prevents iOS zoom + safe-area + provider wrapper |

## What was deliberately stripped

- **No Privy in the demo.** Wagmi + injected connector only. MiniPay injects `window.ethereum` and the auto-connect picks it up — zero API keys required. Privy is reintroduced in `05-production.md` (with the API key prompt and full env wiring) so non-MiniPay browsers also work.
- **No pixel/arcade fonts.** The source app uses `Press Start 2P` — that's its brand, not yours. The participant's design spec from `02-design.md` decides typography.
- **No hardcoded colors.** Everything that was hardcoded was rewritten to use CSS variables (`var(--text)`, `var(--text-muted)`, `var(--bg)`) so the theme drives the colors.

## Why the touch targets are 44×44

iOS HIG and Material Design both call for 44pt / 48dp minimum tap targets. Smaller is unreliable on phones — especially with edge-of-screen one-handed use, which is most of MiniPay's traffic. Don't shrink them.

## Why MiniPay auto-connects but the button still exists

MiniPay's webview injects `window.ethereum` with `isMiniPay = true`. The provider auto-calls `connect()` on the injected connector when it sees that flag, so users land already-connected. The connect button checks `isMiniPay` and renders `null` in that case — but it's still there for desktop testing and non-MiniPay browsers.
