import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { bsc, mainnet } from 'wagmi/chains'
import { QueryClient } from '@tanstack/react-query'
import { createStorage } from 'wagmi'

export const projectId = '6e2a0b3bfca4d9509beb19d48f85941f'

const metadata = {
  name: 'NeoFi',
  description: 'NeoFi Financial Observatory',
  url: typeof globalThis.window !== 'undefined' ? globalThis.window.location.origin : 'https://neo-fi.com',
  icons: ['https://neo-fi.com/logo.png'],
}

export const wagmiConfig = defaultWagmiConfig({
  chains: [bsc, mainnet],
  projectId,
  metadata,
  enableWalletConnect: true,
  enableInjected: true,
  enableEIP6963: true,
  enableCoinbase: true,
  ssr: false,
  storage: createStorage({ storage: localStorage }),
})

createWeb3Modal({
  wagmiConfig,
  projectId,
  defaultChain: bsc,
  allowUnsupportedChain: true,
  enableAnalytics: false,
  enableOnramp: false,
})

export const queryClient = new QueryClient()
