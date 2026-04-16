# Ten-minute MiniPay mini-app

A Claude Code workshop kit. Clone it, run `claude`, get a deployed MiniPay mini-app in roughly ten minutes.

> **This is the demo path.** The kit is tuned for showing off MiniPay capabilities live in 10 minutes. It deliberately skips Privy auth, custom domains, real RPC keys, error tracking, and tight design systems. Those are covered in `05-production.md` as a separate follow-up step.

## What this gives a participant
- A 5-question brief that captures their app idea
- A live screenshot-to-design-spec step
- A Celo Composer MiniPay scaffold with battle-tested mobile UX patterns ported in
- A new GitHub repo + a live Vercel URL
- A clear path to productionize (`05-production.md`)

## Workshop flow (10 min)

| When | Phase | What happens |
|---|---|---|
| 0:00–1:00 | 00 — prereqs | Verify `node`, `pnpm`, `gh`, `vercel` installed and authed |
| 1:00–3:00 | 01 — brief | 5 questions + 3 inferred fields → `brief.json` |
| 3:00–5:30 | 02 — design | Drop reference screenshots → `design.md` |
| 5:30–9:00 | 03 — build | Scaffold + port UX patterns + theme + screens |
| 9:00–10:00 | 04 — deploy | New GH repo + Vercel live URL |
| later | 05 — production | Privy, RPC keys, custom domain, env mgmt |

## How to run it

### One-time setup (do before the workshop)
```bash
gh auth login          # GitHub.com → HTTPS → browser
vercel login           # GitHub or email → browser
node --version         # ≥ 20
pnpm --version         # any recent version
```

### At workshop time
```bash
git clone <this-repo>
cd ten-minute-minipay-miniapp
claude
```

The agent reads `CLAUDE.md`, greets you, and walks through phases 00 → 04. Phase 05 is a separate session you run *inside the generated app's repo* afterwards.

## Repo structure

```
ten-minute-minipay-miniapp/
├── README.md                  # This file
├── CLAUDE.md                  # State machine the agent follows
├── 00-prerequisites.md        # Verify toolchain
├── 01-brief.md                # 5 questions, 3 inferred fields
├── 02-design.md               # Screenshots → design.md
├── 03-build.md                # Scaffold + port + theme
├── 04-deploy.md               # GitHub + Vercel
├── 05-production.md           # Privy, RPC, domain, env, etc — DEMO-EXCLUDED
├── sources.md                 # MiniPay + Celo doc links
├── ux-patterns/               # 6 files ported from a working MiniPay app
│   ├── README.md
│   ├── wallet-provider.tsx    # wagmi + injected, MiniPay auto-connect
│   ├── connect-button.tsx     # Hidden in MiniPay, shown elsewhere
│   ├── user-balance.tsx       # CELO + cUSD + USDC + USDT reader
│   ├── bottom-nav.tsx         # Icons only, 44×44 touch targets
│   ├── layout-constants.ts    # Shared dimensions
│   └── root-layout.tsx        # Viewport, safe-area, provider wrapper
├── design-input/              # Participant drops reference screenshots here
└── .gitignore
```

## What gets generated when you run it

After phase 04 you'll have:
- `generated-app/` — the scaffolded MiniPay mini-app (gitignored in this kit; lives in its own GitHub repo after deploy)
- `brief.json` — your captured idea
- `design.md` — your generated design spec
- A new GitHub repo containing all of the above
- A live Vercel URL

## Going to production

Open `05-production.md`. It walks through:
1. Adding Privy (with API-key prompt) for non-MiniPay browser support
2. Real RPC keys instead of public endpoints
3. Custom domain
4. Real metadata (OG image, favicon, manifest)
5. Sentry error tracking
6. Hardening the design system into Tailwind + components
7. Replacing demo placeholder content
8. Pre-launch checklist

## For workshop facilitators

- Test the full flow on the demo machine before the session — `gh auth login` and `vercel login` are the two friction points and you do not want to do them with an audience watching.
- Keep one terminal window dedicated to Claude Code, one for the localhost dev server preview.
- If `vercel --prod` is slow on conference WiFi, narrate over it — it can take 30–60s.
- The kit deliberately doesn't seed a demo idea. Use a real participant idea or improvise one live.
