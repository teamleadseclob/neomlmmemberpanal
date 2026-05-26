import { Navigate, Outlet, useOutletContext } from 'react-router-dom'
import { useProfile } from '../../context/ProfileContext'

export default function SwpGuard() {
  const ctx = useOutletContext()
  const { profile, loading } = useProfile()

  if (loading) return null

  if (!profile?.swpBalance) {
    return <Navigate to="/swp-purchase" replace />
  }

  return <Outlet context={ctx} />
}
