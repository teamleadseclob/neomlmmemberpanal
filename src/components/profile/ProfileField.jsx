import PropTypes from 'prop-types';

const fieldBase = 'w-full bg-transparent border-b text-white text-base pb-1.5 outline-none transition-colors';

export default function ProfileField({ label, value, editing, onChange, error, type, options }) {
  const borderClass = error ? 'border-red-500/60' : 'border-[#2a2a4a] focus:border-purple-500';

  const renderInput = () => {
    if (type === 'select') {
      return (
        <select
          value={value}
          onChange={onChange}
          className={`${fieldBase} ${borderClass} bg-[#0d0d1f] cursor-pointer`}
        >
          <option value="">Select</option>
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      );
    }
    if (type === 'date') {
      return (
        <input
          type="date"
          value={value}
          onChange={onChange}
          className={`${fieldBase} ${borderClass} [color-scheme:dark]`}
        />
      );
    }
    return (
      <input
        type={type || 'text'}
        value={value}
        onChange={onChange}
        className={`${fieldBase} ${borderClass}`}
      />
    );
  };

  return (
    <div>
      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">{label}</p>
      {editing
        ? <>
            {renderInput()}
            {error && <p className="mt-1 text-red-400 text-xs">{error}</p>}
          </>
        : <p className="text-white text-base border-b border-[#2a2a4a] pb-1.5">{value || '—'}</p>
      }
    </div>
  );
}

ProfileField.propTypes = {
  label:   PropTypes.string.isRequired,
  value:   PropTypes.string,
  editing: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  error:   PropTypes.string,
  type:    PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
};
ProfileField.defaultProps = { value: '', onChange: () => {}, error: '', type: 'text', options: [] };
