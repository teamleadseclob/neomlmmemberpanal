import { useState, useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { uploadImage, submitKYC, kycStatus } from '../../config/apiService'
import { basicURL } from '../../config/axiosConfig'

const DOC_TYPES = [
  { value: 'aadhaar',  label: 'Aadhaar Card' },
  { value: 'passport', label: 'Passport' },
  { value: 'pan',      label: 'PAN Card' },
  { value: 'driving_license', label: 'Driving License' },
]

const STATUS_STYLES = {
  approved: { bg: 'bg-green-500/10',  border: 'border-green-500/30',  text: 'text-green-400',  label: 'Approved' },
  pending:  { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', label: 'Pending Review' },
  rejected: { bg: 'bg-red-500/10',    border: 'border-red-500/30',    text: 'text-red-400',    label: 'Rejected' },
}

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] ?? STATUS_STYLES.pending
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${s.bg} ${s.border} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'approved' ? 'bg-green-400' : status === 'rejected' ? 'bg-red-400' : 'bg-yellow-400'}`} />
      {s.label}
    </span>
  )
}

function KYCStatus({ submission }) {
  return (
    <div className="rounded-2xl border border-[#1e1e3a] bg-[#0d0d1f] p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-bold text-white">KYC Verification</h3>
        <StatusBadge status={submission.status} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Document Type</p>
          <p className="text-sm text-white capitalize">{submission.documentType?.replace('_', ' ')}</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Document Number</p>
          <p className="text-sm text-white font-mono">{submission.documentNumber}</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Submitted On</p>
          <p className="text-sm text-white">{new Date(submission.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
        </div>
        {submission.reviewedAt && (
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Reviewed On</p>
            <p className="text-sm text-white">{new Date(submission.reviewedAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
          </div>
        )}
      </div>

      {submission.rejectionReason && (
        <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
          <p className="text-[10px] text-red-400 uppercase tracking-widest font-semibold mb-1">Rejection Reason</p>
          <p className="text-sm text-red-300">{submission.rejectionReason}</p>
        </div>
      )}

      {submission.documentImage && (
        <div className="mt-4">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-2">Document Image</p>
          <img
            src={`${basicURL}${submission.documentImage}`}
            alt="Document"
            crossOrigin="anonymous"
            className="w-full max-w-xs rounded-xl border border-[#1e1e3a] object-cover"
          />
        </div>
      )}
    </div>
  )
}

export default function KYCForm() {
  const [status, setStatus]           = useState(null)
  const [loadingStatus, setLoadingStatus] = useState(true)
  const [docType, setDocType]         = useState('')
  const [docNumber, setDocNumber]     = useState('')
  const [imageFile, setImageFile]     = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [uploading, setUploading]     = useState(false)
  const [submitting, setSubmitting]   = useState(false)
  const [errors, setErrors]           = useState({})
  const fileRef = useRef(null)

  useEffect(() => {
    kycStatus()
      .then((res) => setStatus(res?.data ?? null))
      .catch(() => setStatus(null))
      .finally(() => setLoadingStatus(false))
  }, [])

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
    setErrors((p) => ({ ...p, image: '' }))
  }

  const validate = () => {
    const e = {}
    if (!docType)    e.docType   = 'Please select a document type'
    if (!docNumber.trim()) e.docNumber = 'Document number is required'
    if (!imageFile)  e.image     = 'Please upload a document image'
    return e
  }

  const handleSubmit = async () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})

    try {
      // Step 1 — upload image
      setUploading(true)
      const formData = new FormData()
      formData.append('image', imageFile)
      const uploadRes = await uploadImage(formData)
      const imageUrl  = uploadRes?.data?.url
      if (!imageUrl) { toast.error('Image upload failed'); return }
      setUploading(false)

      // Step 2 — submit KYC
      setSubmitting(true)
      await submitKYC({ documentType: docType, documentNumber: docNumber, documentImage: imageUrl })
      toast.success('KYC submitted successfully!')

      // Refresh status
      const statusRes = await kycStatus()
      setStatus(statusRes?.data ?? null)
    } catch (err) {
      toast.error(err?.response?.data?.message || 'KYC submission failed')
    } finally {
      setUploading(false)
      setSubmitting(false)
    }
  }

  if (loadingStatus) {
    return (
      <div className="rounded-2xl border border-[#1e1e3a] bg-[#0d0d1f] p-6 flex items-center justify-center min-h-[200px]">
        <span className="w-7 h-7 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      </div>
    )
  }

  // Already submitted — show status
  if (status?.submission) {
    return <KYCStatus submission={status.submission} />
  }

  const loading = uploading || submitting

  return (
    <div className="rounded-2xl border border-[#1e1e3a] bg-[#0d0d1f] p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 0 1 21.75 8.25Z" />
          </svg>
        </div>
        <div>
          <h3 className="text-base font-bold text-white">KYC Verification</h3>
          <p className="text-xs text-gray-400">Submit your identity document for verification</p>
        </div>
      </div>

      <div className="flex flex-col gap-5">

        {/* Document Type */}
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-2">Document Type</p>
          <select
            value={docType}
            onChange={(e) => { setDocType(e.target.value); setErrors((p) => ({ ...p, docType: '' })) }}
            className={`w-full bg-[#1a1a2e] border rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors cursor-pointer
              ${errors.docType ? 'border-red-500/60' : 'border-[#2a2a4a] focus:border-purple-500'}`}
          >
            <option value="">Select document type</option>
            {DOC_TYPES.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
          </select>
          {errors.docType && <p className="mt-1 text-red-400 text-xs">{errors.docType}</p>}
        </div>

        {/* Document Number */}
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-2">Document Number</p>
          <input
            type="text"
            value={docNumber}
            onChange={(e) => { setDocNumber(e.target.value); setErrors((p) => ({ ...p, docNumber: '' })) }}
            placeholder="Enter document number"
            className={`w-full bg-[#1a1a2e] border rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors placeholder-gray-600
              ${errors.docNumber ? 'border-red-500/60' : 'border-[#2a2a4a] focus:border-purple-500'}`}
          />
          {errors.docNumber && <p className="mt-1 text-red-400 text-xs">{errors.docNumber}</p>}
        </div>

        {/* Document Image Upload */}
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-2">Document Image</p>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

          {imagePreview ? (
            <div className="relative">
              <img src={imagePreview} alt="Preview" className="w-full max-w-xs rounded-xl border border-[#2a2a4a] object-cover" />
              <button
                type="button"
                onClick={() => { setImageFile(null); setImagePreview(null); fileRef.current.value = ''; }}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500/80 flex items-center justify-center text-white cursor-pointer border-none hover:bg-red-500 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className={`w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center gap-2 cursor-pointer transition-colors bg-transparent
                ${errors.image ? 'border-red-500/60' : 'border-[#2a2a4a] hover:border-purple-500/50'}`}
            >
              <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
              </svg>
              <p className="text-sm text-gray-400">Click to upload document image</p>
              <p className="text-xs text-gray-600">PNG, JPG up to 10MB</p>
            </button>
          )}
          {errors.image && <p className="mt-1 text-red-400 text-xs">{errors.image}</p>}
        </div>

        {/* Submit */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3.5 rounded-xl text-sm font-bold text-white border-none cursor-pointer bg-gradient-to-r from-purple-600 to-purple-500 hover:shadow-[0_8px_24px_rgba(147,51,234,0.4)] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {uploading
            ? <span className="inline-flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Uploading...</span>
            : submitting
              ? <span className="inline-flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Submitting...</span>
              : 'Submit KYC'}
        </button>

      </div>
    </div>
  )
}
