import { useRef } from 'react';
import PropTypes from 'prop-types';

export default function ProfileAvatar({ name, imageUrl, previewUrl, editing, onFileSelect }) {
  const inputRef = useRef(null);
  const initial = (name?.[0] || 'U').toUpperCase();
  const displayUrl = previewUrl || imageUrl;

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect?.(file);
  };

  return (
    <div className="flex-shrink-0 flex flex-col items-center sm:items-start gap-2">
      <div
        className="relative w-32 h-32 rounded-xl bg-[#1a1a2e] border border-[#2a2a4a] flex items-center justify-center"
        style={{ boxShadow: '0 0 32px rgba(147,51,234,0.15)' }}
      >
        {displayUrl ? (
          <img src={displayUrl} alt={name} className="w-full h-full object-cover rounded-xl" crossOrigin="anonymous" />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-3xl font-bold text-white">
            {initial}
          </div>
        )}
      </div>
      {editing && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-purple-400 border border-purple-500/40 bg-purple-500/10 hover:bg-purple-500/20 transition-colors cursor-pointer"
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Edit
        </button>
      )}
      {editing && <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />}
    </div>
  );
}

ProfileAvatar.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  previewUrl: PropTypes.string,
  editing: PropTypes.bool,
  onFileSelect: PropTypes.func,
};
