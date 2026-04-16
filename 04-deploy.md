# Phase 04 — Deploy

> ⏱ Target: 1–2 minutes. Vercel deploy from the repo root, hand back the URL, stop.

## Inputs
- App scaffolded at the repo root (workshop folder === app folder)
- `vercel` already authed (maintainer setup — see `SETUP.md`)

**Do not** run `git init` or `gh repo create`. The workshop folder is already a git repo (the participant cloned it). Pushing to their own GitHub is an optional post-workshop one-liner, surfaced in the final message but not executed by you.

## Step 1 — Deploy to Vercel

From the repo root:

```bash
vercel --prod --yes
```

`--yes` accepts all defaults non-interactively. Capture the production URL from stdout.

If `vercel` prompts to link or create a project on first run, accept defaults (new project, current directory, detected Next.js framework). The deploy proceeds after.

If the build fails on Vercel, read the actual error:

```bash
vercel inspect <deployment-url> --logs
```

Common fixes:
- Missing dep → `pnpm add` it, redeploy with `vercel --prod --yes`
- Type error → fix it, redeploy
- Don't disable type checking to make the build pass

## Step 2 — Report success

Tell the participant exactly this, substituting the real URL:

> "You're live: **<vercel URL>**. Open it inside the MiniPay browser and you should see auto-connect work.
>
> Your app lives right here in this folder — alongside your `brief.json` and `design.md`. If you want to put it on your own GitHub (optional):
>
> ```bash
> gh repo create <your-app-name> --public --source . --push
> ```
>
> That's it — you've built and shipped a MiniPay mini-app."

Stop.
