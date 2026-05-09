/**
 * Single source of truth for the referral link.
 * To change the base URL, edit only BASE_URL below.
 */

const BASE_URL = 'neofiacademy.com/register'

function getStoredUserId() {
  const stored = localStorage.getItem('user')
  return stored ? JSON.parse(stored)?.userId : null
}

export function getReferralLink(userId) {
  const id = userId ?? getStoredUserId() ?? 'NEO_USER'
  return `${BASE_URL}?ref=${id}`
}
