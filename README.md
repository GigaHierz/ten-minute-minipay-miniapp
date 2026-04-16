# Ten-minute MiniPay mini-app

Clone this repo, launch your coding agent inside it, answer a few questions, and walk out with a deployed MiniPay mini-app — roughly ten minutes, start to Vercel URL.

> **Demo-grade, not production-grade.** The kit optimizes for shipping a working app in ten minutes. Privy auth, custom domains, real RPC keys, and a tight design system are deliberately out of scope.

## What is MiniPay?

[MiniPay](https://docs.minipay.xyz/) is Opera's mobile-first stablecoin wallet, built on [Celo](https://celo.org). It runs on hundreds of millions of Android devices, has no on-ramp friction in its target markets, and auto-injects `window.ethereum` so mini-apps connect without a login flow. It's one of the fastest ways to put a working crypto payments app in someone's hands — especially in emerging markets where card rails are weak and stablecoins are useful.

## What this repo does

This repo is a **prompt package for a coding agent**. It doesn't run a server or a CLI of its own. When you open it inside [Claude Code](https://claude.com/claude-code) (or any agent of your choice that follows `CLAUDE.md`-style instructions), the agent reads the files here as a state machine and walks you through:

1. **Brief** — 3 questions about your app idea, 5 fields it infers for you
2. **Design** — drop 1–3 reference screenshots, it extracts a design spec
3. **Build** — scaffolds a [Celo Composer](https://github.com/celo-org/celo-composer) MiniPay template, ports in battle-tested wallet + UX patterns, themes it to your spec
4. **Deploy** — deploys the app to Vercel and hands you the live URL

The goal: a real, working mini-app on a live URL, inside ten minutes. The cloned workshop folder **is** the app — the scaffold drops `package.json`, `src/`, etc. at the root alongside the kit files. Pushing your app to your own GitHub is an optional one-liner at the end; nothing forces it.

## How to run it

### Prereqs (one-time, maintainer side)
See `SETUP.md` for `node`, `pnpm`, `gh`, and `vercel` install + auth. Do this once on the machine you'll run the workshop on. The agent assumes these are ready.

### At workshop time
```bash
git clone <this-repo>
cd ten-minute-minipay-miniapp
claude                         # or your agent of choice
```

The agent greets you and starts asking questions. You answer; it scaffolds, themes, and deploys. That's the whole loop.

## Workshop flow (10 min)

| When | Phase | What happens |
|---|---|---|
| 0:00–2:00 | 01 — brief | 3 questions + 5 inferred fields → `brief.json` |
| 2:00–4:30 | 02 — design | Drop reference screenshots → `design.md` |
| 4:30–8:00 | 03 — build | Scaffold + port UX patterns + theme + screens |
| 8:00–10:00 | 04 — deploy | Vercel live URL (optional GitHub push afterwards) |

## What you walk away with
- A live Vercel URL that auto-connects inside the MiniPay browser
- The app scaffolded into this folder — `src/`, `package.json`, etc. alongside your `brief.json` and `design.md` — ready to keep iterating on
- An optional one-liner to publish it to your own GitHub when you're ready:
  ```bash
  gh repo create <your-app-name> --public --source . --push
  ```

## Using an agent other than Claude Code

`CLAUDE.md` is the state machine. Most coding agents (Cursor, Cline, Aider, Codex, etc.) will happily follow it if you point them at this directory and tell them to start with `CLAUDE.md`. The phase files are plain markdown — no Claude-specific syntax beyond the tool names the agent calls.

## Repo structure

```
ten-minute-minipay-miniapp/
├── README.md                  # This file
├── SETUP.md                   # Maintainer-only prereqs (agent never reads this)
├── CLAUDE.md                  # State machine the agent follows
├── 01-brief.md                # 3 questions, 5 inferred fields
├── 02-design.md               # Screenshots → design.md
├── 03-build.md                # Scaffold + port + theme
├── 04-deploy.md               # Vercel deploy
├── sources.md                 # MiniPay + Celo doc links
├── ux-patterns/               # 6 files ported from a working MiniPay app
│   ├── wallet-provider.tsx    # wagmi + injected, MiniPay auto-connect
│   ├── connect-button.tsx     # Hidden in MiniPay, shown elsewhere
│   ├── user-balance.tsx       # CELO + cUSD + USDC + USDT reader
│   ├── bottom-nav.tsx         # Icons only, 44×44 touch targets
│   ├── layout-constants.ts    # Shared dimensions
│   └── root-layout.tsx        # Viewport, safe-area, provider wrapper
├── design-input/              # Participant drops reference screenshots here
└── .gitignore
```

## For workshop facilitators

- Run `SETUP.md` on the demo machine before the session — `gh auth login` and `vercel login` are the two friction points and you do not want to do them with an audience watching.
- If `vercel --prod` is slow on conference WiFi, narrate over it — it can take 30–60s.
- The kit deliberately doesn't seed a demo idea. Use a real participant idea or improvise one live.
