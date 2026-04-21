import axios from 'axios'
import toast from 'react-hot-toast'

export const basicURL = import.meta.env.VITE_API_URL || 'http://192.168.29.36:5000'

export const axiosConfig = axios.create({
  baseURL: basicURL,
})

// Request Interceptor
axiosConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers['Authorization'] = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

// Response Interceptor
axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.message?.toLowerCase() || ''

    if (
      message.includes('token') ||
      message.includes('unauthorized') ||
      message.includes('expired')
    ) {
      localStorage.clear()
      toast.error('Session expired. Please log in again.')
      setTimeout(() => { globalThis.location.href = '/login' }, 2500)
    }

    return Promise.reject(error)
  }
)

export default axiosConfig
