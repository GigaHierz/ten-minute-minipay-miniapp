# Phase 01 — Brief

> ⏱ Target: under 2 minutes. Ask the 3 questions, infer the 5 fields, confirm, save, move on.

## Ask the participant these 3 questions, one at a time

Wait for an answer to each before asking the next. Echo their answer back in one line and move on — do not over-coach.

1. **One-line pitch** — what is this app, in one sentence?
2. **Target user** — who in the MiniPay ecosystem is this for? Be concrete (e.g. "matatu drivers in Nairobi", "freelance designers receiving cross-border tips").
3. **Core user action** — the one thing a user opens this app to do, in one sentence.

## Infer these 5 fields from the answers above

After the participant answers all 3, you generate the rest. Show the participant your inferences all at once and ask "Edit any of these or move on?".

4. **Category** — pick the closest:
   - 💸 Payments & everyday transactions
   - 🛍 Local services & commerce
   - 🤖 Pay-as-you-go tools (AI, utilities, access)
   - 🎮 Simple games with rewards
   - 👥 Community or social use cases
5. **Economic loop** — who pays, who gets paid, and for what, in one sentence.
6. **Tweet-length description** (≤ 240 chars, no hashtags, no emojis unless they used them)
7. **MiniPay context** — one paragraph on why this fits MiniPay specifically (mobile-first audience, stablecoin micropayments, fee abstraction, emerging-market reach). Use `sources.md` if you need to ground claims.
8. **App concept expansion** — 3–6 bullets that the build agent will use to scaffold pages and components. Each bullet should be implementation-shaped (e.g. "Home screen lists active jobs with USDT amount and accept button" not "great UX").

## Save to `brief.json` at repo root

```json
{
  "pitch": "...",
  "target_user": "...",
  "core_action": "...",
  "category": "...",
  "economic_loop": "...",
  "tweet": "...",
  "minipay_context": "...",
  "concept": ["...", "..."]
}
```

## Then say
> "Brief locked. Onto design."

Move to phase 02.
