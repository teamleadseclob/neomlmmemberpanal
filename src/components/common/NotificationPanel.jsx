import { useEffect, useRef, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { getnotification, readallnotification, readnotification } from '../../config/apiService'

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

export default function NotificationPanel({ onClose, onCountChange }) {
  const ref = useRef(null)
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchNotifications = useCallback(() => {
    setLoading(true)
    getnotification()
      .then((res) => {
        const list = res?.data ?? []
        setNotifications(list)
        onCountChange?.(list.filter((n) => !n.isRead).length)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [onCountChange])

  useEffect(() => { fetchNotifications() }, [fetchNotifications])

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose() }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  const handleReadOne = async (id) => {
    await readnotification(id).catch(() => {})
    setNotifications((prev) => prev.map((n) => n._id === id ? { ...n, isRead: true } : n))
    onCountChange?.((prev) => Math.max(0, prev - 1))
  }

  const handleReadAll = async () => {
    await readallnotification().catch(() => {})
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
    onCountChange?.(0)
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <div
      ref={ref}
      className="absolute right-0 top-10 w-80 rounded-xl border border-[#1e1e3a] bg-[#0d0d1f] shadow-2xl z-[9999] overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1e1e3a]">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white">Notifications</span>
          {unreadCount > 0 && (
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-purple-600 text-white">{unreadCount}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button type="button" onClick={handleReadAll}
              className="text-[10px] text-purple-400 hover:text-purple-300 bg-transparent border-none cursor-pointer whitespace-nowrap">
              Mark all read
            </button>
          )}
          <button type="button" onClick={onClose} className="text-gray-500 hover:text-white bg-transparent border-none cursor-pointer">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="max-h-80 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center py-8">
            <span className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : notifications.length === 0 ? (
          <p className="text-xs text-gray-500 text-center py-8">No notifications</p>
        ) : (
          notifications.map((n, i) => {
            const isUnread = !n.isRead
            return (
              <button
                key={n._id ?? i}
                type="button"
                onClick={() => isUnread && handleReadOne(n._id)}
                className={`w-full flex gap-3 px-4 py-3 border-b border-[#1e1e3a]/60 text-left transition-colors bg-transparent border-x-0 border-t-0 cursor-pointer
                  ${isUnread ? 'hover:bg-purple-500/5 bg-purple-500/3' : 'hover:bg-white/2'}`}
              >
                <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${isUnread ? 'bg-purple-500' : 'bg-gray-600'}`} />
                <div className="flex-1 min-w-0">
                  <p className={`text-xs leading-relaxed ${isUnread ? 'text-gray-200' : 'text-gray-400'}`}>
                    {n.message ?? n.title ?? 'New notification'}
                  </p>
                  {n.amount != null && (
                    <p className="text-[10px] text-purple-400 font-semibold mt-0.5">
                      +${n.amount?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                  )}
                  {n.createdAt && <p className="text-[10px] text-gray-500 mt-1">{timeAgo(n.createdAt)}</p>}
                </div>
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}

NotificationPanel.propTypes = {
  onClose: PropTypes.func.isRequired,
  onCountChange: PropTypes.func,
}

NotificationPanel.defaultProps = {
  onCountChange: null,
}
