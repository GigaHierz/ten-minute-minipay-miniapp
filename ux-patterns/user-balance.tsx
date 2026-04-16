"use client";

import { useAccount, useBalance } from "wagmi";

// Celo mainnet stablecoin addresses
const cUSD_ADDRESS = "0x765de816845861e75a25fca122bb6898b8b1282a" as const;
const USDC_ADDRESS = "0xcebA9300f2b948710d2653dD7B07f33A8B32118C" as const;
const USDT_ADDRESS = "0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e" as const;

function Row({
  address,
  token,
  symbol,
}: {
  address: `0x${string}`;
  token?: `0x${string}`;
  symbol: string;
}) {
  const { data, isLoading } = useBalance({ address, token });
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "6px 0",
      }}
    >
      <span style={{ color: "var(--text-muted, #888)" }}>{symbol}</span>
      <span style={{ fontVariantNumeric: "tabular-nums" }}>
        {isLoading
          ? "…"
          : parseFloat(data?.formatted || "0").toFixed(4)}
      </span>
    </div>
  );
}

export function UserBalance() {
  const { address, isConnected } = useAccount();
  if (!isConnected || !address) return null;

  return (
    <section
      style={{
        width: "100%",
        maxWidth: 460,
        margin: "0 auto",
        padding: 16,
        borderRadius: 12,
        border: "1px solid var(--border, #2a2a2a)",
      }}
    >
      <header style={{ marginBottom: 12 }}>
        <div style={{ fontWeight: 600 }}>Connected wallet</div>
        <div
          style={{
            fontSize: 12,
            color: "var(--text-muted, #888)",
            wordBreak: "break-all",
          }}
        >
          {address}
        </div>
      </header>
      <div
        style={{
          borderTop: "1px solid var(--border, #2a2a2a)",
          paddingTop: 8,
        }}
      >
        <Row address={address} symbol="CELO" />
        <Row address={address} token={cUSD_ADDRESS} symbol="cUSD" />
        <Row address={address} token={USDC_ADDRESS} symbol="USDC" />
        <Row address={address} token={USDT_ADDRESS} symbol="USDT" />
      </div>
    </section>
  );
}
