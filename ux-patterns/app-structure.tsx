import React, { type ReactElement } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from './wagmi-config'
import { useAutoConnect } from './use-auto-connect'

// Simple Next.js app with wagmi and auto-connect for MiniPay
// No external dependencies beyond wagmi + react-query (required by wagmi)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
    },
  },
})

function AutoConnectWrapper({ children }: { children: React.ReactNode }) {
  useAutoConnect()
  return <>{children}</>
}

export function App({ children }: { children: React.ReactNode }): ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <AutoConnectWrapper>
          {children}
        </AutoConnectWrapper>
      </WagmiProvider>
    </QueryClientProvider>
  )
}