import type { Metadata, Viewport } from "next";
import "./globals.css";
import { WalletProvider } from "@/components/wallet-provider";
import { BottomNav } from "@/components/bottom-nav";
import { BOTTOM_NAV_HEIGHT } from "@/constants/layout";

// Replace title + description after the brief is filled in
export const metadata: Metadata = {
  title: "MiniPay app",
  description: "Built in 10 minutes",
};

// Viewport: prevents iOS zoom on input focus, opts into safe-area
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          background: "var(--bg, #0a0a0a)",
          color: "var(--text, #fff)",
          // Inputs must be >= 16px font-size to stop iOS Safari from auto-zooming on focus
          fontSize: 16,
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        <WalletProvider>
          <main
            style={{
              minHeight: "100dvh",
              paddingBottom: BOTTOM_NAV_HEIGHT + 16,
            }}
          >
            {children}
          </main>
          <BottomNav />
        </WalletProvider>
      </body>
    </html>
  );
}
