# Phase 05 — Going to production

> **This phase is NOT part of the 10-minute workshop.** It runs after the demo, on the *generated* repo (not this kit), as a separate Claude Code session. The demo deliberately ships without the things in this file so it can fit in 10 minutes.

## Who this is for

You ran the workshop kit. You have a live Vercel URL. The app works inside MiniPay. Now you want:
- Wallet login that works in **non-MiniPay browsers** (desktop, mobile Safari, etc.)
- A custom domain (no `*.vercel.app`)
- Real RPC endpoints (not public ones that rate-limit you)
- Proper env-var management
- Error tracking
- A real metadata story (Open Graph, favicon, app name)

This file walks you through each.

---

## 1. Add Privy for cross-wallet support

MiniPay's webview auto-injects `window.ethereum`, which is why the demo works without any login UI inside MiniPay. Outside MiniPay, the demo's "Connect wallet" button only finds an injected connector — useless on phones without MetaMask.

Privy fixes this with email login + WalletConnect + injected, all in one provider.

### Steps
1. Create a Privy app at https://dashboard.privy.io/
2. Copy the **App ID**.
3. **Prompt the participant**: "Paste your Privy App ID:" — capture as `PRIVY_APP_ID`.
4. Add to `generated-app/.env.local`:
   ```
   NEXT_PUBLIC_PRIVY_APP_ID=<paste-here>
   ```
5. Add to Vercel env (production scope):
   ```bash
   vercel env add NEXT_PUBLIC_PRIVY_APP_ID production
   ```
6. Install:
   ```bash
   pnpm add @privy-io/react-auth @privy-io/wagmi
   ```
7. Replace `src/components/wallet-provider.tsx` with the Privy variant:

```tsx
"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiProvider, createConfig } from "@privy-io/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { http, useConnect } from "wagmi";
import { celo, celoSepolia } from "viem/chains";

const wagmiConfig = createConfig({
  chains: [celo, celoSepolia],
  transports: { [celo.id]: http(), [celoSepolia.id]: http() },
});

const queryClient = new QueryClient();

function MiniPayAutoConnect({ children }: { children: React.ReactNode }) {
  const { connect, connectors } = useConnect();
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum && (window.ethereum as any).isMiniPay) {
      const injected = connectors.find((c) => c.id === "injected");
      if (injected) connect({ connector: injected });
    }
  }, [connect, connectors]);
  return <>{children}</>;
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
  if (!appId) throw new Error("Missing NEXT_PUBLIC_PRIVY_APP_ID");
  return (
    <PrivyProvider
      appId={appId}
      config={{
        defaultChain: celo,
        supportedChains: [celo, celoSepolia],
        appearance: { theme: "dark" },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <MiniPayAutoConnect>{children}</MiniPayAutoConnect>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
```

8. Replace `connect-button.tsx` with a Privy-aware version that calls `usePrivy().login` instead of `useConnect().connect`. Keep the MiniPay hide logic — that doesn't change.

---

## 2. Real RPC endpoints

Public endpoints are throttled and unreliable in production.

1. Sign up for one: https://www.alchemy.com/, https://www.infura.io/, or run your own.
2. Get a Celo mainnet HTTPS endpoint.
3. Add to `.env.local` and Vercel:
   ```
   NEXT_PUBLIC_CELO_RPC_URL=<your-https-endpoint>
   ```
4. Update `wallet-provider.tsx`:
   ```ts
   transports: {
     [celo.id]: http(process.env.NEXT_PUBLIC_CELO_RPC_URL),
     [celoSepolia.id]: http(),
   },
   ```

---

## 3. Custom domain

```bash
vercel domains add your-domain.com
vercel alias <production-deployment-url> your-domain.com
```

DNS: add a CNAME pointing to `cname.vercel-dns.com` at your registrar.

---

## 4. Proper metadata (OG, favicon, manifest)

In `src/app/layout.tsx`, replace the demo metadata with:

```ts
export const metadata: Metadata = {
  title: "Your app name",
  description: "Your description",
  metadataBase: new URL("https://your-domain.com"),
  openGraph: {
    title: "...",
    description: "...",
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.ico", apple: "/apple-icon.png" },
  manifest: "/manifest.json",
};
```

Add the actual files to `generated-app/public/`. Generate `og.png` (1200×630), `favicon.ico`, `apple-icon.png` (180×180), and `manifest.json` (PWA basics).

---

## 5. Error tracking

Optional but recommended. Sentry is the path of least resistance for Next.js:

```bash
npx @sentry/wizard@latest -i nextjs
```

Follow the prompts. Add `SENTRY_DSN` to Vercel env.

---

## 6. Tighten the design system

The demo's `design.md` is markdown. For production, do these instead:
1. Move tokens out of `globals.css` into `tailwind.config.ts` `theme.extend`.
2. Stand up a small component library (`Button`, `Card`, `Input`, `List`) with proper variants.
3. Move the inline styles in the ported UX-patterns files to Tailwind classes or CSS modules.

---

## 7. Convert demo content to real content

Open `brief.json` and `design.md`. Anywhere the app uses placeholder copy, replace with real strings. Anywhere a route renders an empty state, decide what real data should populate it (contract reads, API call, KV store).

---

## 8. Pre-launch checklist

- [ ] Lighthouse mobile score ≥ 90 (perf + a11y)
- [ ] Tested in MiniPay browser on a real Android device
- [ ] Tested in mobile Safari + Chrome with Privy login
- [ ] Privy app set to **production** mode in dashboard
- [ ] All env vars set in Vercel for `production` scope
- [ ] Sentry receiving events
- [ ] Privacy policy + ToS pages exist if you collect user data
- [ ] `robots.txt` and `sitemap.xml` if you want indexing
