# Phase 00 — Prerequisites

> ⏱ Target: under 60 seconds. Skip checks that already passed in a previous run.

## Demo-vs-production callout (say this once)
> "Heads-up: this is the **demo path**. We're optimizing for shipping in 10 minutes, not production-ready. After the workshop, follow `05-production.md` to add Privy, real RPC keys, env management, and a custom domain."

## What must be installed and authed

Run these checks in parallel and only walk the participant through fixes for whatever fails.

| Check | Command | If it fails |
|---|---|---|
| Node ≥ 20 | `node --version` | Tell participant to install Node 20+ from https://nodejs.org/ |
| pnpm | `pnpm --version` | `npm install -g pnpm` |
| GitHub CLI | `gh --version` | https://cli.github.com/ — install and continue |
| GitHub auth | `gh auth status` | Run `gh auth login` interactively — pick GitHub.com → HTTPS → login with browser |
| Vercel CLI | `vercel --version` | `npm install -g vercel` |
| Vercel auth | `vercel whoami` | Run `vercel login` — pick GitHub or email, complete in browser |

## What you do NOT need to install
- Privy SDK — not in the demo
- A Vercel team — personal account works
- Any RPC API key — public Celo endpoints are fine for the demo

## When everything passes
Say one short sentence and move to phase 01:
> "Setup is good. Let's capture your idea."
