import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ToastProvider from './config/ToastProvider.jsx'

// Prevent all images from being draggable globally
document.addEventListener('dragstart', (e) => {
  if (e.target.tagName === 'IMG') e.preventDefault()
}, true)

document.addEventListener('mousedown', (e) => {
  if (e.target.tagName === 'IMG') e.preventDefault()
}, true)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider />
    <App />
  </StrictMode>,
)
