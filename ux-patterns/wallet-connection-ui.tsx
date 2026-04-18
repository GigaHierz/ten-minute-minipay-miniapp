import { useState, type ReactElement, type ReactNode } from 'react'
import { cn, formatUsd, shortenHash } from './minipay-helpers'

// Simple ChevronDown icon component
function ChevronDown({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      className={className}
      style={style}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline points="6,9 12,15 18,9"></polyline>
    </svg>
  )
}

export type WalletBalanceItem = {
  symbol: string
  formattedBalance: string
  valueUsd: number
}

export type WalletConnectionUIProps = {
  address: string | undefined
  balances: WalletBalanceItem[]
  totalUSD: string
  isLoading: boolean
  isConnecting?: boolean
  /** Optional section rendered above token list (e.g. gold CTA or link to card app). */
  extraSection?: ReactNode
  /** Optional classNames to theme the component (merged with defaults via cn()). */
  connectingClassName?: string
  errorClassName?: string
  cardClassName?: string
  buttonClassName?: string
  expandedSectionClassName?: string
  balanceRowClassName?: string
}

export function WalletConnectionUI({
  address,
  balances,
  totalUSD,
  isLoading,
  isConnecting = false,
  extraSection,
  connectingClassName,
  errorClassName,
  cardClassName,
  buttonClassName,
  expandedSectionClassName,
  balanceRowClassName,
}: WalletConnectionUIProps): ReactElement {
  const [isExpanded, setIsExpanded] = useState(false)

  if (isConnecting) {
    return (
      <div
        className={cn(
          'flex items-center gap-2 rounded-lg bg-gray-100 p-4 dark:bg-gray-800 dark:text-gray-400',
          connectingClassName,
        )}
      >
        <div className='h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent' />
        <span className='text-sm text-gray-600'>Connecting to MiniPay...</span>
      </div>
    )
  }

  if (!address) {
    return (
      <div
        className={cn(
          'rounded-lg border border-destructive/30 bg-destructive/10 p-4',
          errorClassName,
        )}
      >
        <p className='text-sm text-destructive'>Could not connect to wallet</p>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-600 dark:bg-gray-800',
        cardClassName,
      )}
    >
      <button
        type='button'
        onClick={() => {
          setIsExpanded(!isExpanded)
        }}
        className={cn(
          'flex w-full items-center gap-4 rounded-lg p-4 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-700',
          buttonClassName,
        )}
      >
        <div className='flex min-w-0 flex-1 items-center gap-4'>
          <div className='min-w-0 flex-1'>
            <p className='mb-1 text-xs text-gray-500 dark:text-gray-400'>
              Wallet Address
            </p>
            <p className='font-mono text-sm text-gray-800 dark:text-gray-200'>
              {shortenHash(address)}
            </p>
          </div>
          <div className='min-w-0 flex-1 text-right'>
            <p className='mb-1 text-xs text-gray-500 dark:text-gray-400'>
              Total Balance
            </p>
            {isLoading ?
              <div className='ml-auto h-7 w-18 animate-pulse rounded bg-gray-200 dark:bg-gray-600' />
            : <p className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
                {totalUSD}
              </p>
            }
          </div>
        </div>
        <ChevronDown
          className='h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400'
          style={{ transform: isExpanded ? 'rotate(180deg)' : undefined }}
        />
      </button>

      {isExpanded && (
        <div
          className={cn(
            'border-t border-gray-100 p-4 pt-3 dark:border-gray-600',
            expandedSectionClassName,
          )}
        >
          {extraSection != null && <div className='mb-3'>{extraSection}</div>}
          <p className='mb-2 text-xs text-gray-500 dark:text-gray-400'>
            Token Balances
          </p>
          <div className='space-y-2'>
            {balances.map((balance) => (
              <div
                key={balance.symbol}
                className={cn(
                  'flex items-center justify-between rounded-md bg-gray-50 px-3 py-2 dark:bg-gray-700/50',
                  balanceRowClassName,
                )}
              >
                <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                  {balance.symbol}
                </span>
                {isLoading ?
                  <div className='h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-600' />
                : <span className='text-sm text-gray-600 dark:text-gray-400'>
                    {formatUsd(balance.valueUsd)} {balance.symbol}
                  </span>
                }
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}