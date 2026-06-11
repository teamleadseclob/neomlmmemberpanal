import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { createticket, uploadFile } from '../../config/apiService';

const CATEGORIES = ['Account Issues', 'SWP & Investment', 'Commission & Rewards', 'Withdrawal', 'Technical Issue', 'Other']
const PRIORITIES = ['low', 'high']

function Dropdown({ label, options, value, onChange, display }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1.5">{label}</p>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full bg-black flex items-center justify-between border border-[#1e1e3a] rounded-lg px-3 py-2.5 text-sm text-white
                   hover:border-purple-500/50 transition-colors cursor-pointer"
      >
        <span>{display(value)}</span>
        <svg className={`w-4 h-4 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && (
        <ul className="absolute  z-20 mt-1 w-full border border-[#1e1e3a] rounded-lg overflow-hidden"
            style={{ background: '#0d0b2e' }}>
          {options.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                onClick={() => { onChange(opt); setOpen(false) }}
                className={`w-full text-left px-3 py-2.5 text-sm transition-colors cursor-pointer bg-transparent border-none
                            ${value === opt ? 'text-purple-400' : 'text-gray-300 hover:text-white hover:bg-[#1a1a3e]'}`}
              >
                {display(opt)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

Dropdown.propTypes = {
  label:    PropTypes.string.isRequired,
  options:  PropTypes.arrayOf(PropTypes.string).isRequired,
  value:    PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  display:  PropTypes.func.isRequired,
}

function RaiseTicket({ onSuccess, prefill }) {
  const [category, setCategory] = useState(CATEGORIES[0])
  const [priority, setPriority] = useState('low')
  const [subject, setSubject]   = useState('')
  const [message, setMessage]   = useState('')
  const [image, setImage]           = useState(null)
  const [imageUrl, setImageUrl]     = useState('')
  const [submitting, setSubmitting] = useState(false)
  const fileRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    if (!prefill) return
    if (prefill.category && CATEGORIES.includes(prefill.category)) setCategory(prefill.category)
    if (prefill.subject)  setSubject(prefill.subject)
    if (prefill.message)  setMessage(prefill.message)
    cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [prefill])

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImage(file)
    try {
      const res = await uploadFile(file)
      setImageUrl(res.data.url)
      toast.success('Image uploaded successfully!')
    } catch {
      toast.error('Image upload failed.')
      setImage(null)
      setImageUrl('')
    }
  }

  const handleSubmit = async () => {
    if (!subject.trim() || !message.trim()) {
      toast.error('Subject and message are required.')
      return
    }
    setSubmitting(true)
    try {
      await createticket({ category, fields: [], priority, subject, message, ...(imageUrl && { image: imageUrl }) })
      toast.success('Ticket submitted successfully!')
      setSubject('')
      setMessage('')
      setCategory(CATEGORIES[0])
      setPriority('low')
      setImage(null)
      setImageUrl('')
      onSuccess?.()
    } catch {
      toast.error('Failed to submit ticket. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div ref={cardRef} className="rounded-xl p-5 md:p-6" style={{ background: '#181F3033', border: '1px solid #FFFFFF0D' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-bold text-white">Raise a New Ticket</h3>
        <span className="text-[10px] uppercase tracking-widest font-bold  bg-clip-text text-transparent"
          style={{ backgroundImage: 'linear-gradient(128.49deg, #CB3CFF 19.86%, #7F25FB 68.34%)' }}>
          Average Response: 2H
        </span>
      </div>

      {/* Category + Priority row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Dropdown
          label="Category"
          options={CATEGORIES}
          value={category}
          onChange={setCategory}
          display={(v) => v}
        />
        <Dropdown
          label="Priority"
          options={PRIORITIES}
          value={priority}
          onChange={setPriority}
          display={(v) => v.charAt(0).toUpperCase() + v.slice(1)}
        />
      </div>

      {/* Subject */}
      <div className="mb-4">
        <label htmlFor="subject" className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1.5 block">
          Subject
        </label>
        <input
          id="subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Brief summary of your inquiry"
          className="w-full  border bg-black border-[#1e1e3a] rounded-lg px-3 py-2.5 text-sm text-white
                     placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50"
        />
      </div>

      {/* Message */}
      <div className="mb-5">
        <label htmlFor="message" className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1.5 block">
          Message
        </label>
        <div className="border bg-black border-[#1e1e3a] rounded-lg overflow-hidden">
          <div className="flex bg-[#1E293B80] items-center gap-1 px-3 py-2 border-b border-[#1e1e3a]">
            <button type="button" className="w-7 h-7 rounded flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#1a1a3e] transition-colors cursor-pointer bg-transparent border-none">
              <span className="text-sm font-bold">B</span>
            </button>
            <button type="button" className="w-7 h-7 rounded flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#1a1a3e] transition-colors cursor-pointer bg-transparent border-none">
              <span className="text-sm italic">I</span>
            </button>
            <button type="button" className="w-7 h-7 rounded flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#1a1a3e] transition-colors cursor-pointer bg-transparent border-none">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </button>
          </div>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your issue in detail..."
            rows={4}
            className="w-full bg-black px-3 py-3 text-sm text-white resize-none
                       placeholder:text-gray-600 focus:outline-none border-none"
          />
        </div>
      </div>

      {/* Footer: Attachment + Submit */}
      <div className="flex items-center justify-between">
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
          </svg>
          {image ? image.name : 'Add Attachment'}
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
          className="px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wide
                     bg-gradient-to-r from-[#7F25FB] to-[#CB3CFF] text-white
                     hover:opacity-90 transition-opacity duration-200 cursor-pointer border-none
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Submitting...' : 'Submit Inquiry'}
        </button>
      </div>
    </div>
  );
}

RaiseTicket.propTypes = {
  onSuccess: PropTypes.func,
  prefill:   PropTypes.shape({
    category: PropTypes.string,
    subject:  PropTypes.string,
    message:  PropTypes.string,
  }),
}

RaiseTicket.defaultProps = {
  onSuccess: null,
  prefill:   null,
}

export default RaiseTicket;
