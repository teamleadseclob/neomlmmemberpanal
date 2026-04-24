import axiosConfig from './axiosConfig'

// ─── Auth ────────────────────────────────────────────────────────────────────

export const login = async (userId, password) => {
  const response = await axiosConfig.post('/api/auth/login', { userId, password })
  return response.data
}

export const register = async (name, email, password, sponsorId) => {
  const response = await axiosConfig.post('/api/auth/register', { name, email, password, sponsorId })
  return response.data
}

export const gettree = async (userId) => {
  const response = await axiosConfig.get(`/api/network/downline/${userId}`)
  return response.data
}

export const getswpplan = async () => {
  const response = await axiosConfig.get(`/api/swp/packages`)
  return response.data
}

export const purchaseswp = async (amount) => {
  const response = await axiosConfig.post(`/api/swp/purchase`, { amount })
  return response.data
}

export const gettradingcapital = async () => {
  const response = await axiosConfig.get(`/api/swp/status`)
  return response.data
}

export const getprofile = async () => {
  const response = await axiosConfig.get(`/api/users/me`)
  return response.data
}

// export const getswp = async () => {
//   const response = await axiosConfig.get(`/api/swp/status`)
//   return response.data
// }
// export const getswp = async () => {
//   const response = await axiosConfig.get(`/api/swp/status`)
//   return response.data
// }





