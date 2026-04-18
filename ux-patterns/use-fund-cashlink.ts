import { useCallback, useState } from 'react'
import type { CeloToken } from './celo-tokens'
import { encodeFunctionData, erc20Abi, parseUnits } from 'viem'
import type { Address } from 'viem'
import { usePublicClient, useSendTransaction } from 'wagmi'

// For production apps, consider adding toast notifications
// Example: import { toast } from 'react-hot-toast' or similar

type FundState = 'idle' | 'pending' | 'success' | 'error'

export function useFundCashlink(selectedToken?: CeloToken) {
  const publicClient = usePublicClient()
  const { sendTransactionAsync } = useSendTransaction()
  const [state, setState] = useState<FundState>('idle')

  const fundCashlink = useCallback(
    async (toAddress: Address, amount: number) => {
      if (!selectedToken || !publicClient) return

      setState('pending')

      try {
        const units = parseUnits(String(amount), selectedToken.decimals)
        const data = encodeFunctionData({
          abi: erc20Abi,
          functionName: 'transfer',
          args: [toAddress, units],
        })

        const hash = await sendTransactionAsync({
          to: selectedToken.address,
          data,
        })

        await publicClient.waitForTransactionReceipt({ hash })

        setState('success')
      } catch (error) {
        setState('error')
        // For production: add toast notification here
        // Example: toast.error('Failed to fund Cash Link')
        console.error('Failed to fund Cash Link:', error)
        throw error
      }
    },
    [selectedToken, publicClient, sendTransactionAsync],
  )

  return {
    fundCashlink,
    isPending: state === 'pending',
    isSuccess: state === 'success',
    isError: state === 'error',
    reset: () => {
      setState('idle')
    },
  }
}