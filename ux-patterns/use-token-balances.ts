import {
  CELO_MAINNET_CHAIN_ID,
  type CeloToken,
} from './celo-tokens'
import { erc20Abi, formatUnits, type Hex } from 'viem'
import { useAccount, useReadContracts } from 'wagmi'
import type { ReadContractsErrorType } from 'wagmi/actions'

export type TokenBalance<T extends CeloToken = CeloToken> = {
  symbol: T['symbol']
  config: T
  balance: string
  formattedBalance: string
  balanceNum: number
}

export function useTokenBalances<T extends CeloToken>(
  configs: readonly T[],
): {
  balances: TokenBalance<T>[]
  highestBalanceToken: TokenBalance<T> | null
  isLoading: boolean
  error: ReadContractsErrorType | null
} {
  const { address, chainId } = useAccount()
  const supported = chainId !== undefined && chainId === CELO_MAINNET_CHAIN_ID

  const contracts = configs.flatMap((config) => [
    {
      address: config.address,
      abi: erc20Abi,
      functionName: 'balanceOf' as const,
      args: [address as Hex],
    },
    {
      address: config.address,
      abi: erc20Abi,
      functionName: 'decimals' as const,
    },
  ])

  const {
    data: results,
    isLoading,
    error,
  } = useReadContracts({
    allowFailure: false,
    contracts,
    query: {
      enabled: !!address && supported,
    },
  })

  if (!results || !supported) {
    return {
      balances: configs.map((config) => ({
        symbol: config.symbol,
        config,
        balance: '0',
        formattedBalance: '0',
        balanceNum: 0,
      })),
      highestBalanceToken: null,
      isLoading,
      error,
    }
  }

  const userLocale = navigator.language || 'en-US'
  const formatter = new Intl.NumberFormat(userLocale, {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })

  const balances: TokenBalance<T>[] = configs.map((config, index) => {
    const resultIndex = index * 2
    const [balance, decimals] = results.slice(resultIndex, resultIndex + 2)
    const balanceBigInt = typeof balance === 'bigint' ? balance : BigInt(0)
    const decimalsNum =
      typeof decimals === 'number' ? decimals : config.decimals
    const balanceStr =
      balanceBigInt && decimalsNum ?
        formatUnits(balanceBigInt, decimalsNum)
      : '0'
    const balanceNum = Number(balanceStr)
    return {
      symbol: config.symbol,
      config,
      balance: balanceStr,
      formattedBalance: formatter.format(balanceNum),
      balanceNum,
    }
  })

  const highest = balances.reduce<TokenBalance<T> | null>(
    (best, b) => (!best || b.balanceNum > best.balanceNum ? b : best),
    null,
  )

  return {
    balances,
    highestBalanceToken: highest,
    isLoading: false,
    error,
  }
}