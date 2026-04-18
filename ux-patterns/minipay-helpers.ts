/**
 * Formats a number as USD currency string
 */
export function formatUsd(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

/**
 * Shortens a hash address to display format (first 6 + last 4 characters)
 */
export function shortenHash(hash: string, startLength = 6, endLength = 4): string {
  if (hash.length <= startLength + endLength) {
    return hash
  }
  return `${hash.slice(0, startLength)}...${hash.slice(-endLength)}`
}

/**
 * Utility for merging class names (simplified tailwind-merge pattern)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}