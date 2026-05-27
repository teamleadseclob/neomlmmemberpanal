import { Navigate, Outlet, useOutletContext } from 'react-router-dom'
import { useProfile } from '../../context/ProfileContext'

export default function SwpGuard() {
  const ctx = useOutletContext()
  const { profile, loading } = useProfile()

  // Wait for profile to load
  if (loading || profile === null) return null

  // SWP is a package — balance never decreases after purchase
  // redirect only if swpBalance is 0 or not set (never purchased)
  if (!profile.swpBalance || profile.swpBalance <= 0) {
    return <Navigate to="/swp-purchase" replace />
  }

  return <Outlet context={ctx} />
}
