import { Navigate, Outlet, useOutletContext } from 'react-router-dom'
import { useProfile } from '../../context/ProfileContext'

function getDaysRemaining(createdAt) {
  if (!createdAt) return 0
  const created = new Date(createdAt)
  const deadline = new Date(created.getTime() + 30 * 24 * 60 * 60 * 1000)
  const now = new Date()
  const diff = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24))
  return diff > 0 ? diff : 0
}

export default function SwpGuard() {
  const ctx = useOutletContext()
  const { profile, loading } = useProfile()

  if (loading || profile === null) return null

  if (!profile.swpBalance || profile.swpBalance <= 0) {
    const daysRemaining = getDaysRemaining(profile.createdAt)
    return <Navigate to="/swp-purchase" replace state={{ daysRemaining, expired: daysRemaining === 0 }} />
  }

  return <Outlet context={ctx} />
}
