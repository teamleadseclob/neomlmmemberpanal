import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ToastProvider from './config/ToastProvider.jsx'
import { initEnterKeyNavigation, initNoDrag } from './config/globalEvents.js'

initEnterKeyNavigation()
initNoDrag()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider />
    <App />
  </StrictMode>,
)
