import type { EIP1193Provider } from 'viem'

declare global {
  interface Window {
    ethereum?: EIP1193Provider
  }
}

/**
 * Returns the global Ethereum provider.
 * Throws when not in a browser or when `window.ethereum` is missing.
 */
export function getEthereumProvider() {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error(
      'window.ethereum is required. Please ensure you are running in a Web3-enabled environment (e.g., MiniPay).',
    )
  }

  return window.ethereum
}