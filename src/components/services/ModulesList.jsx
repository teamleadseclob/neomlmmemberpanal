import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import axiosConfig from '../../config/axiosConfig'

function ModuleMedia({ url, type, alt }) {
  const ytMatch = url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/)
  const isDirectUrl = url?.startsWith('http') || url?.startsWith('/')
  const isBlobUrl = url?.startsWith('blob:')
  const [src, setSrc] = useState(isDirectUrl ? url : null)

  useEffect(() => {
    if (ytMatch || isDirectUrl || isBlobUrl) return
    let objectUrl
    axiosConfig.get(url, { responseType: 'blob' })
      .then(res => {
        objectUrl = URL.createObjectURL(res.data)
        setSrc(objectUrl)
      })
      .catch(() => setSrc(null))
    return () => { if (objectUrl) URL.revokeObjectURL(objectUrl) }
  }, [url, isDirectUrl, isBlobUrl, ytMatch])

  if (ytMatch) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${ytMatch[1]}`}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={alt}
      />
    )
  }

  if (!src) return (
    <svg className="w-14 h-14 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 21h18M3 3h18" />
    </svg>
  )

  return type?.startsWith('video')
    ? <video src={src} className="w-full h-full object-cover" muted />
    : <img src={src} alt={alt} className="w-full h-full object-cover" />
}

ModuleMedia.propTypes = {
  url: PropTypes.string.isRequired,
  type: PropTypes.string,
  alt: PropTypes.string,
}

function ModuleCard({ module }) {
  const expiresDate = module.expiresAt
    ? new Date(module.expiresAt).toLocaleDateString()
    : null

  return (
    <div
      className="rounded-xl p-5 flex gap-5 items-start transition-all duration-200 hover:border-purple-500/30"
      style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
      }}
    >
      {/* Media */}
      <div className="w-28 h-28 rounded-xl bg-gradient-to-br from-[#1a1a3e] to-[#0a0920] border border-[#1e1e3a] flex items-center justify-center flex-shrink-0 overflow-hidden">
        {module.mediaUrl
          ? <ModuleMedia url={module.mediaUrl} type={module.mediaType} alt={module.title} />
          : (
            <svg className="w-14 h-14 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 21h18M3 3h18" />
            </svg>
          )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border bg-green-500/20 text-green-400 border-green-500/30">
            {module.isActive ? 'Active' : 'Inactive'}
          </span>
          {expiresDate && (
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
              Expires {expiresDate}
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-white mb-2">{module.title}</h3>
        <p className="text-xs text-gray-400 leading-relaxed mb-4">{module.description}</p>

        <button
          type="button"
          onClick={() => module.mediaUrl && window.open(module.mediaUrl, '_blank', 'noopener,noreferrer')}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold tracking-wide
                     bg-gradient-to-r from-[#7F25FB] to-[#CB3CFF] text-white
                     hover:opacity-90 transition-opacity duration-200 cursor-pointer border-none"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
          View Event
        </button>
      </div>
    </div>
  );
}

ModuleCard.propTypes = {
  module: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    mediaUrl: PropTypes.string,
    mediaType: PropTypes.string,
    expiresAt: PropTypes.string,
    isActive: PropTypes.bool,
  }).isRequired,
}

function ModulesList({ modules = [], loading = false }) {
  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <span className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      </div>
    )
  }

  if (!modules.length) {
    return (
      <div className="text-center py-16">
        <p className="text-sm text-gray-500">No results found.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 mb-8">
      {modules.map((module) => (
        <ModuleCard key={module._id} module={module} />
      ))}
    </div>
  )
}

ModulesList.propTypes = {
  modules: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    mediaUrl: PropTypes.string,
    mediaType: PropTypes.string,
    expiresAt: PropTypes.string,
    isActive: PropTypes.bool,
  })),
  loading: PropTypes.bool,
}

export default ModulesList;
