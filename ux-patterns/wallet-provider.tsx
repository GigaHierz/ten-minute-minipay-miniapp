"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { WagmiProvider, createConfig, http, useConnect } from "wagmi";
import { celo, celoSepolia } from "viem/chains";
import { injected } from "wagmi/connectors";

// Demo wallet stack: wagmi + injected connector only.
// In MiniPay, window.ethereum is auto-injected and we auto-connect on mount.
// For non-MiniPay browsers (desktop, mobile Safari, etc.), upgrade to Privy
// in 05-production.md so users can log in with email / WalletConnect / etc.

const wagmiConfig = createConfig({
  chains: [celo, celoSepolia],
  connectors: [injected()],
  transports: {
    [celo.id]: http(),
    [celoSepolia.id]: http(),
  },
});

const queryClient = new QueryClient();

function MiniPayAutoConnect({ children }: { children: React.ReactNode }) {
  const { connect, connectors } = useConnect();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.ethereum &&
      // @ts-expect-error MiniPay-specific flag on window.ethereum
      window.ethereum.isMiniPay
    ) {
      const connector = connectors.find((c) => c.id === "injected");
      if (connector) connect({ connector });
    }
  }, [connect, connectors]);

  return <>{children}</>;
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <MiniPayAutoConnect>{children}</MiniPayAutoConnect>
      </WagmiProvider>
    </QueryClientProvider>
  );
}
