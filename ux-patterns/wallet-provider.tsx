"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { celo } from "viem/chains";
import { injected } from "wagmi/connectors";
import { useAutoConnect } from "./use-auto-connect";

// Modern MiniPay wallet stack: wagmi + injected connector with auto-connect.
// Uses modern useAutoConnect hook for cleaner implementation.

const wagmiConfig = createConfig({
  chains: [celo],
  connectors: [injected()],
  transports: {
    [celo.id]: http(),
  },
});

const queryClient = new QueryClient();

function MiniPayAutoConnect({ children }: { children: React.ReactNode }) {
  useAutoConnect();
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
