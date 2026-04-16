"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// Fixed bottom nav, icon-only, 44x44 touch targets.
// Replace these three items with whatever your app needs.
// Keep it to 3-5 items max — phones do not have room for more.

type NavItem = { label: string; href: string; icon: ReactNode };

const navItems: NavItem[] = [
  {
    label: "HOME",
    href: "/",
    icon: (
      <svg viewBox="0 0 24 24" width={20} height={20} fill="none" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12l9-9 9 9" />
        <path d="M5 10v10h14V10" />
      </svg>
    ),
  },
  {
    label: "ACTION",
    href: "/action",
    icon: (
      <svg viewBox="0 0 24 24" width={20} height={20} fill="none" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx={12} cy={12} r={10} />
        <path d="M12 8v8M8 12h8" />
      </svg>
    ),
  },
  {
    label: "PROFILE",
    href: "/profile",
    icon: (
      <svg viewBox="0 0 24 24" width={20} height={20} fill="none" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx={12} cy={7} r={4} />
      </svg>
    ),
  },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: 56,
        zIndex: 40,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        background: "var(--bg, #0a0a0a)",
        borderTop: "1px solid var(--border, #2a2a2a)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const stroke = isActive
          ? "var(--text, #fff)"
          : "var(--text-muted, #888)";
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-label={item.label}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              textDecoration: "none",
            }}
          >
            <span style={{ stroke, display: "flex" }}>{item.icon}</span>
          </Link>
        );
      })}
    </nav>
  );
}
