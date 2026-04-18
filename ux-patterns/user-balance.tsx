"use client";

import React from "react";
import { useConnection } from "wagmi";
import { CELO_TOKENS } from "./celo-tokens";
import { useTokenBalances } from "./use-token-balances";
import { shortenHash } from "./minipay-helpers";

function BalanceRow({ symbol, balance, isLoading }: {
  symbol: string;
  balance: string;
  isLoading: boolean;
}) {
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
        {isLoading ? "…" : parseFloat(balance || "0").toFixed(4)}
      </span>
    </div>
  );
}

export function UserBalance() {
  const { address, isConnected } = useConnection();

  // Get all supported tokens for current chain
  const tokenConfigs = Object.values(CELO_TOKENS);
  const { balances, isLoading } = useTokenBalances(tokenConfigs);

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
            fontFamily: "monospace",
          }}
        >
          {shortenHash(address)}
        </div>
      </header>
      <div
        style={{
          borderTop: "1px solid var(--border, #2a2a2a)",
          paddingTop: 8,
        }}
      >
        {balances.map((balance) => (
          <BalanceRow
            key={balance.symbol}
            symbol={balance.symbol}
            balance={balance.balance}
            isLoading={isLoading}
          />
        ))}
      </div>
    </section>
  );
}
