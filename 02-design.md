# Phase 02 — Design

> ⏱ Target: 2–3 minutes. The point is to *show* design generation live, not to nail a final design.

## Ask the participant for screenshots

> "Drop 1 to 3 screenshots of apps whose look you want to borrow into the `design-input/` folder. PNG or JPG. Tell me when they're in."

If they ask "what kinds of apps?" — say:
> "Anything mobile-shaped with a vibe close to what you pictured. MiniPay itself, Revolut, Wise, M-Pesa, Cash App, a game, a marketplace. Not Figma exports — actual product screenshots."

Wait for them to say they're done.

## Read every image in `design-input/`

Use the Read tool on each image (Claude Code can read images natively). Look for:
- **Color palette** — extract 4–6 colors. Background, text, primary, accent, muted, border.
- **Type scale** — heading vs body sizing, weight, font character.
- **Spacing rhythm** — padding inside cards, gaps between elements.
- **Component personality** — cards/lists/tabs/sheets, button shape (pill/rounded/square), iconography (filled/outlined/duotone).
- **Mood** — playful, transactional, premium, gritty.

## Write `design.md` at repo root

Use this exact structure. Keep it short — 60 lines max. The build agent reads this verbatim.

```markdown
# Design spec

> Generated for the demo path. For a production design system, swap this for a real `tailwind.config.ts` + component library. See `05-production.md`.

## Mood
One paragraph capturing the vibe.

## Color tokens (CSS variables)
- `--bg`: #...
- `--text`: #...
- `--text-muted`: #...
- `--primary`: #...
- `--accent`: #...
- `--border`: #...

## Type
- Body font: <google font name or system stack>
- Heading font: <ditto>
- Body size: 16px
- H1: ..px / weight ..
- H2: ..px / weight ..

## Components
- Buttons: <shape, padding, border>
- Cards: <radius, border, padding>
- Lists: <divider style, row height>
- Inputs: <16px font min, border>

## Layout
- Bottom nav (use ported `bottom-nav.tsx`)
- Max content width: 500px
- Page padding: 16px
```

## Important callout to the participant

After writing `design.md`, say exactly this once:
> "This is a markdown design spec — perfect for a demo. For a real product you'd want a Tailwind config plus a component library; that's covered in `05-production.md`. Want me to do that now, or keep moving and ship the demo?"

Default to "keep moving." Only switch to Tailwind output if the participant explicitly asks.

## Then say
> "Design locked. Building now."

Move to phase 03.
