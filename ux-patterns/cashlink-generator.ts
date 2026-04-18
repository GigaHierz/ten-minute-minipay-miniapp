import { generateMnemonic, mnemonicToEntropy } from 'bip39'
import type { Address } from 'viem'
import { mnemonicToAccount } from 'viem/accounts'

const CASHLINK_BASE_URL = 'https://cash.minipay.xyz/#'

type CashlinkWallet = {
  address: Address
  mnemonic: string
  entropy: string
  cashlinkUrl: string
}

function mnemonicToBase64Entropy(mnemonic: string): string {
  return Buffer.from(Buffer.from(mnemonicToEntropy(mnemonic), 'hex'))
    .toString('base64')
    .replace(/\//g, '_')
    .replace(/\+/g, '-')
}

export function buildCashlinkUrl(entropy: string): string {
  return `${CASHLINK_BASE_URL}${entropy}`
}

export function generateCashlinkWallet(): CashlinkWallet {
  const mnemonic = generateMnemonic()
  const account = mnemonicToAccount(mnemonic)
  const entropy = mnemonicToBase64Entropy(mnemonic)

  return {
    address: account.address,
    mnemonic,
    entropy,
    cashlinkUrl: buildCashlinkUrl(entropy),
  }
}