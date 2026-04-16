# Phase 04 — Deploy

> ⏱ Target: 1–2 minutes. New GitHub repo, push, Vercel deploy, return URLs.

## Demo-vs-production callout (say this once)
> "Heads up: I'm deploying without env vars or a custom domain. To put this on a real URL with Privy auth and proper RPC keys, see `05-production.md`."

## Inputs
- Working app under `generated-app/`
- `gh` and `vercel` already authed (verified in phase 00)

## Step 1 — Initialize git inside `generated-app/`

```bash
cd generated-app
git init
git add .
git commit -m "Initial commit — built with ten-minute-minipay-miniapp kit"
```

## Step 2 — Create the GitHub repo and push

Pick a slug from `brief.json.pitch` (kebab-case, ≤ 40 chars). If it conflicts with an existing repo, append `-2`, `-3`, etc.

```bash
gh repo create <slug> --public --source . --push --description "<from brief.tweet>"
```

Capture the resulting repo URL — you'll need it.

## Step 3 — Deploy to Vercel

```bash
vercel link --yes --project <slug>
vercel --prod --yes
```

`--yes` accepts all defaults non-interactively. Capture the production URL from stdout.

If `vercel link` fails because the project doesn't exist, run `vercel` (no flags) once to create it interactively, then `vercel --prod --yes`.

If the build fails on Vercel, read the actual error in `vercel inspect <deployment-url> --logs`. Common fixes:
- Missing dep → `pnpm add` it locally, commit, push, redeploy
- Type error → fix it, commit, push, redeploy
- Don't disable type checking to make it pass.

## Step 4 — Commit `brief.json` and `design.md` to the new repo

These should travel with the app so future sessions can see what was built and why.

```bash
cp ../brief.json ../design.md .
git add brief.json design.md
git commit -m "Add brief and design spec"
git push
```

## Step 5 — Report success

Tell the participant exactly this:

> "Done. Your repo: <repo URL>. Live: <vercel URL>. Open the live URL inside the MiniPay browser to see auto-connect work.
>
> To take this to production — Privy login for non-MiniPay users, real RPC keys, custom domain, env management — open the generated repo and follow `05-production.md`. That's a separate session."

Stop. Do not start phase 05.
