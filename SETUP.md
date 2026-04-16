# Maintainer setup

> **Not for workshop participants.** Do this once on the demo machine before the workshop. The agent (Claude Code) never reads this file — it is not part of the participant's 10-minute flow.

## Required tooling

- **Node ≥ 20** — https://nodejs.org/
- **pnpm** — `npm install -g pnpm`
- **GitHub CLI** — `brew install gh` (or https://cli.github.com/)
- **Vercel CLI** — `npm install -g vercel`

## Required auth

```bash
gh auth login       # GitHub.com → HTTPS → login with browser
vercel login        # GitHub or email → complete in browser
```

Verify both:

```bash
gh auth status
vercel whoami
```

## Sanity check before the session

```bash
node --version
pnpm --version
gh --version
vercel --version
```

If any of these fails, fix it **before** the workshop starts. `gh auth login` and `vercel login` are the two friction points you do not want to run with an audience watching.
