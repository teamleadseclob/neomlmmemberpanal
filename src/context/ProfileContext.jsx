import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { getprofile } from '../config/apiService'
import { useAuth } from './useAuth'

const ProfileContext = createContext(null)

export function ProfileProvider({ children }) {
  const { token } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const refreshProfile = useCallback(async () => {
    if (!localStorage.getItem('token')) {
      setProfile(null)
      setLoading(false)
      return
    }
    try {
      const res = await getprofile()
      setProfile(res?.data ?? null)
    } catch {
      setProfile(null)
    } finally {
      setLoading(false)
    }
  }, [])

  // re-runs whenever token changes (login/logout)
  useEffect(() => {
    if (token) {
      refreshProfile()
    } else {
      setProfile(null)
      setLoading(false)
    }
  }, [token, refreshProfile])

  const value = useMemo(
    () => ({ profile, loading, refreshProfile }),
    [profile, loading, refreshProfile]
  )

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}

ProfileProvider.propTypes = { children: PropTypes.node.isRequired }

export function useProfile() {
  const ctx = useContext(ProfileContext)
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider')
  return ctx
}
