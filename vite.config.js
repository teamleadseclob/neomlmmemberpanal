import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: [
      'ieee754',
      'buffer',
      'events',
      '@walletconnect/ethereum-provider',
      '@web3modal/wagmi',
      'wagmi',
      'viem',
      'ethers',
    ],
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [/ieee754/, /buffer/, /node_modules/],
    },
  },
  define: {
    global: 'globalThis',
  },
})
