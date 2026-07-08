import { Navigate, Outlet, useOutletContext } from 'react-router-dom'
import { useProfile } from '../../context/ProfileContext'

export default function SwpGuard() {
  const ctx = useOutletContext()
  const { profile, loading } = useProfile()

  if (loading || profile === null) return null

  if (!profile.swpBalance || profile.swpBalance <= 0) {
    return <Navigate to="/dashboard/swp-purchase" replace />
  }

  return <Outlet context={ctx} />
}
