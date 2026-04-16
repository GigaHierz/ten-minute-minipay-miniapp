"use client";

import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export function ConnectButton() {
  const { address, chain, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [isMiniPay, setIsMiniPay] = useState(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.ethereum &&
      // @ts-expect-error MiniPay flag
      window.ethereum.isMiniPay
    ) {
      setIsMiniPay(true);
    }
  }, []);

  // In MiniPay the wallet auto-connects — no button needed
  if (isMiniPay) return null;

  const baseStyle = {
    fontSize: 14,
    padding: "8px 14px",
    minHeight: 44,
    borderRadius: 10,
    border: "1px solid var(--text-muted, #888)",
    background: "transparent",
    color: "var(--text, #fff)",
    cursor: "pointer",
  } as const;

  if (!isConnected) {
    const injected = connectors.find((c) => c.id === "injected");
    return (
      <button
        onClick={() => injected && connect({ connector: injected })}
        style={baseStyle}
      >
        Connect wallet
      </button>
    );
  }

  return (
    <button onClick={() => disconnect()} style={baseStyle}>
      {chain?.name ?? "Connected"}
      {address ? ` · ${address.slice(0, 6)}…${address.slice(-4)}` : ""}
    </button>
  );
}
