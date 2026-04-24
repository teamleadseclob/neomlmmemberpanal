import React from 'react';
import { Toaster } from 'react-hot-toast'

const base = {
  background: 'rgba(10, 8, 35, 0.92)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  borderRadius: '14px',
  color: '#e2e2f0',
  fontSize: '13px',
  fontFamily: 'Poppins, sans-serif',
  fontWeight: '500',
  padding: '13px 16px',
  maxWidth: '380px',
  lineHeight: '1.6',
  boxShadow: '0 16px 48px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.06) inset',
}

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      gutter={8}
      containerStyle={{ top: 20, right: 20 }}
      toastOptions={{
        duration: 3500,

        style: {
          ...base,
          border: '1px solid rgba(127,37,251,0.2)',
        },

        success: {
          duration: 3000,
          style: {
            ...base,
            border: '1px solid rgba(34,197,94,0.25)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.5), 0 0 24px rgba(34,197,94,0.06), 0 1px 0 rgba(255,255,255,0.06) inset',
          },
          iconTheme: {
            primary: '#22c55e',
            secondary: '#0a0823',
          },
        },

        error: {
          duration: 4500,
          style: {
            ...base,
            border: '1px solid rgba(239,68,68,0.25)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.5), 0 0 24px rgba(239,68,68,0.06), 0 1px 0 rgba(255,255,255,0.06) inset',
          },
          iconTheme: {
            primary: '#ef4444',
            secondary: '#0a0823',
          },
        },

        loading: {
          style: {
            ...base,
            border: '1px solid rgba(127,37,251,0.35)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.5), 0 0 24px rgba(127,37,251,0.08), 0 1px 0 rgba(255,255,255,0.06) inset',
          },
          iconTheme: {
            primary: '#CB3CFF',
            secondary: '#0a0823',
          },
        },
      }}
    />
  )
}
