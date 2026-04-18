# Modern MiniPay UX patterns

These are **production-ready** mobile/MiniPay UX building blocks with modern viem/wagmi patterns. They're stack-neutral and styling-light so the participant's design choices drive the look.

The build agent (`03-build.md`) copies these into the new Celo Composer project after scaffolding.

## Core Components & Hooks

| File | Drop into | What it does |
|---|---|---|
| `wallet-provider.tsx` | `src/components/` | Modern wagmi provider with auto-connect integration |
| `user-balance.tsx` | `src/components/` | Modern balance display using comprehensive token hooks |
| `wallet-connection-ui.tsx` | `src/components/` | Complete wallet UI with expandable balances, USD totals, loading states |
| `bottom-nav.tsx` | `src/components/` | Fixed bottom nav, icon-only, 44×44 touch targets, theme-aware |
| `root-layout.tsx` | `src/app/layout.tsx` | Viewport meta + safe-area + provider wrapper |

## Modern Hooks & Utilities

| File | Drop into | What it does |
|---|---|---|
| `use-auto-connect.ts` | `src/hooks/` | Clean auto-connect hook that connects to first available connector |
| `use-token-balances.ts` | `src/hooks/` | Comprehensive token balance reading for all CELO tokens |
| `use-fund-cashlink.ts` | `src/hooks/` | ERC20 token transfer hook for funding cashlinks |
| `celo-tokens.ts` | `src/constants/` | Complete CELO token configuration (USDM, USDC, USDT, XAUt0) |
| `cashlink-generator.ts` | `src/utils/` | Generate MiniPay cashlinks (shareable payment links) |
| `ethereum-provider.ts` | `src/utils/` | Proper window.ethereum handling with error messages |
| `minipay-helpers.ts` | `src/utils/` | formatUsd, shortenHash, and className merging utilities |
| `layout-constants.ts` | `src/constants/` | `TOP_BAR_HEIGHT`, `BOTTOM_NAV_HEIGHT`, etc. |

## Configuration Examples

| File | Drop into | What it does |
|---|---|---|
| `wagmi-config.ts` | `src/lib/` | Modern createConfig setup with Celo chain and custom transport |
| `app-structure.tsx` | Reference | Simple Next.js App wrapper with WagmiProvider and auto-connect |
| `root-route.tsx` | Reference | Next.js layout patterns for app structure |

## Key Improvements

### 🚀 **Modern viem/wagmi patterns**
- Uses `useConnection` instead of deprecated `useAccount`
- Clean `useAutoConnect` hook replaces inline auto-connect logic
- Comprehensive `useTokenBalances` hook with proper error handling

### 💰 **Complete token support**
- All MiniPay-supported tokens: USDM, USDC, USDT, XAUt0
- Proper token configuration with addresses and decimals
- USD value formatting and highest balance detection

### 🔗 **Cashlink functionality**
- Generate shareable MiniPay payment links
- Fund cashlinks with ERC20 token transfers
- Base64 entropy encoding for URL compatibility

### 🎨 **Enhanced UI components**
- Expandable wallet connection UI with balance details
- Proper loading states and error handling
- Theme-aware styling with CSS variables
- **No external UI dependencies** - all icons and components implemented inline

### 🧩 **Minimal dependencies**
- Pure Next.js patterns without external router/state dependencies
- Only requires wagmi + @tanstack/react-query (wagmi requirement)
- No connect button needed - MiniPay auto-connects

## What was deliberately stripped

- **No external dependencies.** Pure Next.js + wagmi patterns only. No TanStack Router, Sonner, Lucide, etc.
- **No connect button.** MiniPay auto-connects, so manual connection UI is unnecessary.
- **No Privy in the demo.** Modern wagmi + injected connector only. MiniPay injects `window.ethereum` and auto-connect picks it up — zero API keys required.
- **No specific fonts.** Uses system fonts; participant's design spec from `02-design.md` decides typography.
- **No hardcoded colors.** Everything uses CSS variables (`var(--text)`, `var(--text-muted)`, `var(--bg)`) so theme drives colors.
- **No copyright headers.** Clean, workshop-ready code without licensing concerns.

## Why the touch targets are 44×44

iOS HIG and Material Design both call for 44pt / 48dp minimum tap targets. Smaller targets are unreliable on phones — especially with edge-of-screen one-handed use, which is most of MiniPay's traffic.

## How auto-connect works

MiniPay's webview injects `window.ethereum` and the `useAutoConnect` hook connects to the first available connector on mount. Since MiniPay users are always connected automatically, no manual connect button is needed - the app works immediately when opened in MiniPay.
