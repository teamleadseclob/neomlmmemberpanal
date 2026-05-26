import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
import { QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.jsx'
import ToastProvider from './config/ToastProvider.jsx'
import { wagmiConfig, queryClient } from './config/wagmiConfig.js'
import { initEnterKeyNavigation, initNoDrag } from './config/globalEvents.js'

initEnterKeyNavigation()
initNoDrag()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider />
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>,
)
