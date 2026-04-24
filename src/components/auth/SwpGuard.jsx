import { Navigate, Outlet, useOutletContext } from 'react-router-dom'

export default function SwpGuard() {
  const ctx = useOutletContext()
  const swpBalance = ctx?.swpBalance

  // Still loading — wait before redirecting
  if (swpBalance === null || swpBalance === undefined) return null

  if (swpBalance === 0) {
    return <Navigate to="/swp-purchase" replace />
  }

  return <Outlet context={ctx} />
}
