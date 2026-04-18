import { useEffect } from 'react'
import { useConnect, useConnectors } from 'wagmi'

/**
 * Auto-connects to the first available wagmi connector on mount.
 * Use once at app root so the wallet connects when the app loads.
 */
export function useAutoConnect(): void {
  const connectors = useConnectors()
  const { connect } = useConnect()

  useEffect(() => {
    if (!connectors[0]) {
      return
    }

    connect({ connector: connectors[0] })
  }, [connectors, connect])
}