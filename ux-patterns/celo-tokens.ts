import type { Address } from 'viem'

export const CELO_MAINNET_CHAIN_ID = 42220

export const MINI_PAY_TOKEN_SYMBOLS = ['USDM', 'USDC', 'USDT', 'XAUt0'] as const

export type MiniPayTokenSymbol = (typeof MINI_PAY_TOKEN_SYMBOLS)[number]

export type CeloToken = {
  symbol: MiniPayTokenSymbol
  name: string
  address: Address
  decimals: number
}

/** Token addresses on Celo mainnet. */
export const CELO_TOKENS: Record<MiniPayTokenSymbol, CeloToken> = {
  USDM: {
    symbol: 'USDM',
    name: 'Mento Dollar',
    address: '0x765DE816845861e75A25fCA122bb6898B8B1282a',
    decimals: 18,
  },
  USDC: {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0xcebA9300f2b948710d2653dD7B07f33A8B32118C',
    decimals: 6,
  },
  USDT: {
    symbol: 'USDT',
    name: 'Tether',
    address: '0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e',
    decimals: 6,
  },
  XAUt0: {
    symbol: 'XAUt0',
    name: 'Tether Gold',
    address: '0xaf37E8B6C9ED7f6318979f56Fc287d76c30847ff',
    decimals: 6,
  },
}

export function getCeloTokens(
  chainId: number | undefined,
): Record<MiniPayTokenSymbol, CeloToken> {
  if (chainId !== CELO_MAINNET_CHAIN_ID) {
    return {} as Record<MiniPayTokenSymbol, CeloToken>
  }
  return CELO_TOKENS
}

export function getCeloTokenSymbols(
  chainId: number | undefined,
): MiniPayTokenSymbol[] {
  const tokens = getCeloTokens(chainId)
  return Object.keys(tokens) as MiniPayTokenSymbol[]
}