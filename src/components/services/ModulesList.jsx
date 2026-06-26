import React from 'react';
import PropTypes from 'prop-types'
import { basicURL } from '../../config/axiosConfig'

function resolveUrl(path) {
  if (!path) return null
  if (path.startsWith('http') || path.startsWith('blob:')) return path
  return `${basicURL}/${path.replace(/^\//, '')}`
}

function ImageWithDownload({ url, alt, index }) {
  const src = resolveUrl(url)
  if (!src) return null

  const handleDownload = async () => {
    try {
      const res = await fetch(src)
      const blob = await res.blob()
      const blobUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = blobUrl
      a.download = `image-${index + 1}.jpg`
      a.click()
      URL.revokeObjectURL(blobUrl)
    } catch {
      window.open(src, '_blank')
    }
  }

  return (
    <div className="relative group w-24 h-24 rounded-lg overflow-hidden border border-white/10 flex-shrink-0">
      <img src={src} alt={alt || `Image ${index + 1}`} crossOrigin="anonymous" className="w-full h-full object-cover" />
      <button
        onClick={handleDownload}
        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer border-none"
      >
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
      </button>
    </div>
  )
}

function ModuleCard({ module }) {
  const title = module.toolName || module.packageName || module.title || 'Untitled'
  const isActive = module.status === 'active' || module.isActive

  const images = module.imageUrls?.length ? module.imageUrls : (module.imageUrl ? [module.imageUrl] : [])
  const pdfs = module.pdfUrls?.length ? module.pdfUrls : (module.pdfUrl ? [module.pdfUrl] : [])
  const meetLink = module.googleMeetLink || module.meetLink || null
  const mediaUrl = module.mediaUrl || null

  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-4 transition-all duration-200 hover:border-purple-500/30"
      style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${isActive ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
          {isActive ? 'Active' : 'Inactive'}
        </span>
        {module.category && (
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
            {module.category.replace(/_/g, ' ')}
          </span>
        )}
      </div>

      <h3 className="text-base font-bold text-white">{title}</h3>
      {module.subTitle && module.subTitle !== title && (
        <p className="text-xs text-gray-300 -mt-2">{module.subTitle}</p>
      )}
      {module.description && <p className="text-xs text-gray-400 leading-relaxed">{module.description}</p>}

      {(module.startDate || module.duration) && (
        <p className="text-[10px] text-gray-500">
          {module.startDate && `${new Date(module.startDate).toLocaleDateString()} - ${new Date(module.endDate).toLocaleDateString()}`}
          {module.duration && ` • Duration: ${module.duration} mins`}
          {module.price != null && ` • Price: $${module.price}`}
        </p>
      )}

      {/* Multiple Images */}
      {images.length > 0 && (
        <div>
          <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-2">Images</p>
          <div className="flex gap-2 flex-wrap">
            {images.map((img, i) => (
              <ImageWithDownload key={i} url={img} alt={title} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Multiple PDFs */}
      {pdfs.length > 0 && (
        <div>
          <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-2">Documents</p>
          <div className="flex gap-2 flex-wrap">
            {pdfs.map((pdf, i) => (
              <a
                key={i}
                href={resolveUrl(pdf)}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-semibold
                           bg-gradient-to-r from-[#fb7f25] to-[#ff3c3c] text-white
                           hover:opacity-90 transition-opacity no-underline"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                PDF {pdfs.length > 1 ? i + 1 : ''}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Links */}
      {(meetLink || mediaUrl) && (
        <div className="flex gap-3 flex-wrap">
          {meetLink && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-white/[0.03]">
              <svg className="w-4 h-4 text-[#26A69A] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 10.5V6.5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-4l4 3V7.5l-4 3z"/>
              </svg>
              <a href={meetLink} target="_blank" rel="noopener noreferrer" className="text-xs text-[#26A69A] hover:underline break-all">{meetLink}</a>
            </div>
          )}
          {mediaUrl && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-white/[0.03]">
              <svg className="w-4 h-4 text-purple-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              <a href={resolveUrl(mediaUrl)} target="_blank" rel="noopener noreferrer" className="text-xs text-purple-400 hover:underline break-all">{mediaUrl}</a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

ModuleCard.propTypes = {
  module: PropTypes.object.isRequired,
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
  modules: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
}

export default ModulesList;
