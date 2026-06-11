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

export const updateprofile = async (payload) => {
  const response = await axiosConfig.patch(`/api/users/me`, payload)
  return response.data
}

export const uploadAvatar = async (file) => {
  const formData = new FormData()
  formData.append('profileImage', file)
  const response = await axiosConfig.post('/api/users/me/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}

export const getrewardlimit = async () => {
  const response = await axiosConfig.get(`/api/users/me/earning-limits`)
  return response.data
}

export const getgraph = async (month, year) => {
  const response = await axiosConfig.get(`/api/users/me/income-chart?month=${month}&year=${year}`)
  return response.data
}

export const getrewardwallet = async () => {
  const response = await axiosConfig.get(`/api/users/reward-wallet`)
  return response.data
}

// ─── layout ─────────────────────────────────────────────────────────────

export const getnotification = async () => {
  const response = await axiosConfig.get(`/api/users/notifications/earnings`)
  return response.data
}

export const getnotificationcount = async () => {
  const response = await axiosConfig.get(`/api/users/notifications/earnings/unread-count`)
  return response.data
}

export const readallnotification = async () => {
  const response = await axiosConfig.patch(`/api/users/notifications/earnings/read-all`)
  return response.data
}

export const readnotification = async (id) => {
  const response = await axiosConfig.patch(`/api/users/notifications/earnings/${id}/read `)
  return response.data
}

// ─── Referral Hub ─────────────────────────────────────────────────────────────

export const getreferals = async (page = 1, limit = 10) => {
  const response = await axiosConfig.get(`/api/users/referrals?page=${page}&limit=${limit}`)
  return response.data
}

export const sendreferallink = async (email, referralLink) => {
  const response = await axiosConfig.post(
    '/api/users/send-referral',
    {
      email,
      referralLink: `https://${referralLink}`,
    }
  )

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

export const getdownlinestats = async (userId) => {
  const response = await axiosConfig.get(`/api/network/team-member/${userId}`)
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


export const purchaseswp = async (amount, walletAddress, txHash, paymentMethod = 'wallet') => {
  const response = await axiosConfig.post(`/api/swp/purchase`, { amount, walletAddress, transactionHash:txHash, paymentMethod })
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

export const addinvestments = async (amount, walletAddress, txHash, paymentMethod = 'wallet') => {
  const response = await axiosConfig.post(`/api/investment`, { amount, walletAddress, transactionHash:txHash, paymentMethod })
  return response.data
}

// ─── Trading Capital — Wallet Histories ───────────────────────────────────────

export const getcombinedhistory = async (layered_rewards ,page = 1, limit = 10) => {
  const response = await axiosConfig.get(`/api/users/reward-wallet/history?type=${layered_rewards}&page=${page}&limit=${limit}`)
  return response.data
}

export const getroihistory = async (page = 1, limit = 10) => {
  const response = await axiosConfig.get(`/api/roi/history?page=${page}&limit=${limit}`)
  return response.data
}

export const getmultylevelhistory = async (page = 1, limit = 10) => {
  const response = await axiosConfig.get(`/api/multilevel-rewards/history?page=${page}&limit=${limit}`)
  return response.data
}

export const getreferalhistory = async (page = 1, limit = 10) => {
  const response = await axiosConfig.get(`/api/swp/commissions?page=${page}&limit=${limit}`)
  return response.data
}
export const getpoolfundhistory = async (page = 1, limit = 10) => {
  const response = await axiosConfig.get(`/api/users/reward-wallet/pool-fund?page=${page}&limit=${limit}`)
  return response.data
}

// ─── Rank Report ──────────────────────────────────────────────────────────────

export const getrankstatus = async () => {
  const response = await axiosConfig.get('/api/rank/status')
  return response.data
}

// ─── Payout ───────────────────────────────────────────────────────────────────

export const withdraw = async (amount,walletAddress) => {
  const response = await axiosConfig.post('/api/withdrawal', { amount,walletAddress })
  return response.data
}

export const getwithdrawal = async (page = 1, limit = 5, status = 'completed') => {
  const query = status ? `status=${status}&page=${page}&limit=${limit}` : `page=${page}&limit=${limit}`
  const response = await axiosConfig.get(`/api/withdrawal/history?${query}`)
  return response.data
}

export const geteventes= async (type) => {
  const response = await axiosConfig.get(`/api/events?type=${type}`)
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

export const uploadFile = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  const response = await axiosConfig.post('/api/users/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}

export const getticketbyid = async (ticketId) => {
  const response = await axiosConfig.get(`/api/support/tickets/${ticketId}`)
  return response.data
}

export const getNotifications = async () => {
  const response = await axiosConfig.get('/api/users/notifications')
  return response.data
}

// ─── Kyc ──────────────────────────────────────────────────────────

export const uploadImage = async (body) => {
  const response = await axiosConfig.post('/api/kyc/upload', body)
  return response.data
}

export const submitKYC = async (body) => {
  const response = await axiosConfig.post('/api/kyc/submit', body)
  return response.data
}

export const kycStatus = async () => {
  const response = await axiosConfig.get('/api/kyc/status')
  return response.data
}

export const interest = async (marketTitle) => {
  const response = await axiosConfig.post('/api/market/interest', { marketTitle })
  return response.data
}

export const geturl = async () => {
  const response = await axiosConfig.get(`/api/market/interests`)
  return response.data
}





