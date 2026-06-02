import { useCallback } from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import toast from 'react-hot-toast'

export default function WalletButton() {
  const { address, isConnected } = useAccount()
  const { disconnectAsync }      = useDisconnect()
  const { open }                 = useWeb3Modal()

  const handleConnect = useCallback(async () => {
    try { await open() } catch (err) { toast.error(err?.message || 'Failed to connect wallet') }
  }, [open])

  const handleOpen       = useCallback(() => open(), [open])
  const handleDisconnect = useCallback(async () => {
    try { await disconnectAsync() } catch {}
  }, [disconnectAsync])

  if (!isConnected) {
    return (
      <button
        type="button"
        onClick={handleConnect}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-purple-500/40 text-purple-400 hover:bg-purple-500/10 transition-colors cursor-pointer bg-transparent"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          <line x1="12" y1="12" x2="12" y2="16" />
          <line x1="10" y1="14" x2="14" y2="14" />
        </svg>
        <span className="hidden sm:inline text-xs font-semibold">Connect Wallet</span>
      </button>
    )
  }

  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={handleOpen}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/8 transition-colors cursor-pointer"
        title="Manage wallet"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
        <span className="text-white/70 text-xs font-mono sm:hidden">
          {address?.slice(0, 4)}...{address?.slice(-3)}
        </span>
        <span className="text-white/70 text-xs font-mono hidden sm:inline">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
      </button>
      <button
        type="button"
        onClick={handleDisconnect}
        title="Disconnect wallet"
        className="flex items-center gap-1 px-2 py-1.5 rounded-lg border border-red-500/20 text-red-400/70 hover:bg-red-500/10 hover:text-red-400 transition-colors cursor-pointer bg-transparent"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        <span className="hidden sm:inline text-xs">Disconnect</span>
      </button>
    </div>
  )
}
