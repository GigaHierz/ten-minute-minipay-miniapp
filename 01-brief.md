# Phase 01 — Brief

> ⏱ Target: under 2 minutes. Ask the 5 questions, infer the 3 fields, confirm, save, move on.

## Ask the participant these 5 questions, one at a time

Wait for an answer to each before asking the next. Echo their answer back in one line and move on — do not over-coach.

1. **Category** — pick one:
   - 💸 Payments & everyday transactions
   - 🛍 Local services & commerce
   - 🤖 Pay-as-you-go tools (AI, utilities, access)
   - 🎮 Simple games with rewards
   - 👥 Community or social use cases
2. **One-line pitch** — what is this app, in one sentence?
3. **Target user** — who in the MiniPay ecosystem is this for? Be concrete (e.g. "matatu drivers in Nairobi", "freelance designers receiving cross-border tips").
4. **Who pays, who gets paid, and for what?** — the economic loop in one sentence.
5. **Core user action** — the one thing a user opens this app to do, in one sentence.

## Infer these 3 fields from the answers above

After the participant answers all 5, you generate the rest. Show the participant your inferences and ask "Edit any of these or move on?". Do not ask one-by-one — show all three at once.

6. **Tweet-length description** (≤ 240 chars, no hashtags, no emojis unless they used them)
7. **MiniPay context** — one paragraph on why this fits MiniPay specifically (mobile-first audience, stablecoin micropayments, low fee abstraction, emerging-market reach, etc.). Use `sources.md` if you need to ground claims.
8. **App concept expansion** — 3–6 bullets that the build agent will use to scaffold pages and components. Each bullet should be implementation-shaped (e.g. "Home screen lists active jobs with USDT amount and accept button" not "great UX").

## Save to `brief.json` at repo root

```json
{
  "category": "...",
  "pitch": "...",
  "target_user": "...",
  "economic_loop": "...",
  "core_action": "...",
  "tweet": "...",
  "minipay_context": "...",
  "concept": ["...", "..."]
}
```

## Then say
> "Brief locked. Onto design."

Move to phase 02.
