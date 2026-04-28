import axiosConfig from './axiosConfig'

// ─── Auth (Login / Register) ──────────────────────────────────────────────────

export const login = async (userId, password) => {
  const response = await axiosConfig.post('/api/auth/login', { userId, password })
  return response.data
}

export const register = async (name, email, password, sponsorId) => {
  const response = await axiosConfig.post('/api/auth/register', { name, email, password, sponsorId })
  return response.data
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export const getdashboard = async () => {
  const response = await axiosConfig.get(`/api/users/dashboard`)
  return response.data
}

export const getprofile = async () => {
  const response = await axiosConfig.get(`/api/users/me`)
  return response.data
}

// ─── Referral Hub ─────────────────────────────────────────────────────────────

export const getreferals = async () => {
  const response = await axiosConfig.get('/api/users/referrals')
  return response.data
}

// ─── Community ────────────────────────────────────────────────────────────────

export const gettree = async (userId) => {
  const response = await axiosConfig.get(`/api/network/downline/${userId}`)
  return response.data
}

export const getnetworkstats = async (userId) => {
  const response = await axiosConfig.get(`/api/network/stats/${userId}`)
  return response.data
}

// ─── SWP Purchase ─────────────────────────────────────────────────────────────

export const getswpplan = async () => {
  const response = await axiosConfig.get(`/api/swp/packages`)
  return response.data
}

export const purchaseswp = async (amount) => {
  const response = await axiosConfig.post(`/api/swp/purchase`, { amount })
  return response.data
}

// ─── Trading Capital ──────────────────────────────────────────────────────────

export const gettradingcapital = async () => {
  const response = await axiosConfig.get(`/api/swp/status`)
  return response.data
}

export const getbalence = async () => {
  const response = await axiosConfig.get('/api/investment/trading-capital')
  return response.data
}

export const addinvestments = async (amount) => {
  const response = await axiosConfig.post(`/api/investment`, { amount })
  return response.data
}

// ─── Trading Capital — Wallet Histories ───────────────────────────────────────

export const getcombinedhistory = async () => {
  const response = await axiosConfig.get('/api/roi/combined-history')
  return response.data
}

export const getroihistory = async () => {
  const response = await axiosConfig.get('/api/roi/history')
  return response.data
}

export const getmultylevelhistory = async () => {
  const response = await axiosConfig.get('/api/multilevel-rewards/history')
  return response.data
}

export const getreferalhistory = async () => {
  const response = await axiosConfig.get('/api/swp/commissions')
  return response.data
}

// ─── Rank Report ──────────────────────────────────────────────────────────────

export const getrankstatus = async () => {
  const response = await axiosConfig.get('/api/rank/status')
  return response.data
}

// ─── Payout ───────────────────────────────────────────────────────────────────

export const withdraw = async () => {
  const response = await axiosConfig.post('/api/withdrawal')
  return response.data
}

export const getwithdrawal = async (page = 1, limit = 5, status = 'completed') => {
  const query = status ? `status=${status}&page=${page}&limit=${limit}` : `page=${page}&limit=${limit}`
  const response = await axiosConfig.get(`/api/withdrawal/history?${query}`)
  return response.data
}

// export const getwithdrawal = async () => {
//   const response = await axiosConfig.get(`/api/withdrawal/history?status=${completed}&page=1&limit=5`)
//   return response.data
// }

// export const getswp = async () => {
//   const response = await axiosConfig.get('/api/withdrawal')
//   return response.data
// }

// export const getswp = async () => {
//   const response = await axiosConfig.get('/api/withdrawal')
//   return response.data
// }

// export const getswp = async () => {
//   const response = await axiosConfig.get('/api/withdrawal')
//   return response.data
// }

// export const getswp = async () => {
//   const response = await axiosConfig.get('/api/withdrawal')
//   return response.data
// }
