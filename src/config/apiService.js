import axiosConfig from './axiosConfig'

// ─── Auth (Login / Register) ──────────────────────────────────────────────────

export const login = async (userId, password) => {
  const response = await axiosConfig.post('/api/auth/login', { userId, password })
  return response.data
}

export const register = async (name, email, sponsorId,password ) => {
  const response = await axiosConfig.post('/api/auth/register', { name, email, password, sponsorId })
  return response.data
}

export const sendotp = async ( email, otp ) => {
  const response = await axiosConfig.post('/api/auth/verify-otp', { email, otp })
  return response.data
}

export const resendotp = async ( email ) => {
  const response = await axiosConfig.post('/api/auth/resend-otp', { email })
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

export const getgraph = async (month, year) => {
  const response = await axiosConfig.get(`/api/users/me/income-chart?month=${month}&year=${year}`)
  return response.data
}

// ─── Referral Hub ─────────────────────────────────────────────────────────────

export const getreferals = async () => {
  const response = await axiosConfig.get('/api/users/referrals')
  return response.data
}

export const sendreferallink = async (email,referralLink) => {
  const response = await axiosConfig.post('/api/users/send-referral', { email, referralLink })
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

export const getswphistory = async () => {
  const response = await axiosConfig.get(`/api/swp/purchases`)
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

export const withdraw = async (amount) => {
  const response = await axiosConfig.post('/api/withdrawal', { amount })
  return response.data
}

export const getwithdrawal = async (page = 1, limit = 5, status = 'completed') => {
  const query = status ? `status=${status}&page=${page}&limit=${limit}` : `page=${page}&limit=${limit}`
  const response = await axiosConfig.get(`/api/withdrawal/history?${query}`)
  return response.data
}

export const geteventes= async () => {
  const response = await axiosConfig.get('/api/events')
  return response.data
}

// ─── Support Tickets ──────────────────────────────────────────────────────────

export const createticket = async (body) => {
  const response = await axiosConfig.post('/api/support/tickets', body)
  return response.data
}

export const gettickets = async (page = 1, limit = 10, status = '') => {
  const query = status ? `page=${page}&limit=${limit}&status=${status}` : `page=${page}&limit=${limit}`
  const response = await axiosConfig.get(`/api/support/tickets?${query}`)
  return response.data
}

export const getticketbyid = async (ticketId) => {
  const response = await axiosConfig.get(`/api/support/tickets/${ticketId}`)
  return response.data
}