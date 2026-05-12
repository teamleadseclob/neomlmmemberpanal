import Select from 'react-select';
import PropTypes from 'prop-types';

const customStyles = {
  control: (base, state) => ({
    ...base,
    background: 'transparent',
    border: 'none',
    borderBottom: state.isFocused ? '1px solid #a855f7' : '1px solid #2a2a4a',
    borderRadius: 0,
    boxShadow: 'none',
    minHeight: 'unset',
    cursor: 'pointer',
    paddingBottom: '6px',
    '&:hover': { borderBottomColor: '#a855f7' },
  }),
  valueContainer: (base) => ({ ...base, padding: 0 }),
  singleValue: (base) => ({ ...base, color: '#ffffff', fontSize: '1rem', margin: 0 }),
  placeholder: (base) => ({ ...base, color: '#4b5563', fontSize: '1rem', margin: 0 }),
  input: (base) => ({ ...base, color: '#ffffff', margin: 0, padding: 0 }),
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: (base) => ({ ...base, color: '#6b7280', padding: '0 0 4px 4px', '&:hover': { color: '#a855f7' } }),
  menu: (base) => ({
    ...base,
    background: '#0d0d1f',
    border: '1px solid #2a2a4a',
    borderRadius: '12px',
    overflow: 'hidden',
    zIndex: 9999,
    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
  }),
  menuList: (base) => ({ ...base, padding: '4px' }),
  option: (base, state) => ({
    ...base,
    background: state.isSelected ? 'rgba(147,51,234,0.3)' : state.isFocused ? 'rgba(147,51,234,0.1)' : 'transparent',
    color: state.isSelected ? '#ffffff' : '#d1d5db',
    fontSize: '0.875rem',
    borderRadius: '8px',
    cursor: 'pointer',
    padding: '8px 12px',
    '&:active': { background: 'rgba(147,51,234,0.4)' },
  }),
  noOptionsMessage: (base) => ({ ...base, color: '#6b7280', fontSize: '0.875rem' }),
};

export default function CustomSelect({ value, onChange, options, placeholder, error, isSearchable }) {
  const opts = options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o));
  const selected = opts.find((o) => o.value === value) || null;

  return (
    <div>
      <Select
        options={opts}
        value={selected}
        onChange={(opt) => onChange(opt?.value || '')}
        styles={customStyles}
        placeholder={placeholder}
        isSearchable={isSearchable}
        menuPortalTarget={document.body}
        menuPosition="fixed"
      />
      {error && <p className="mt-1 text-red-400 text-xs">{error}</p>}
    </div>
  );
}

CustomSelect.propTypes = {
  value:       PropTypes.string,
  onChange:    PropTypes.func.isRequired,
  options:     PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  error:       PropTypes.string,
  isSearchable: PropTypes.bool,
};
CustomSelect.defaultProps = { value: '', placeholder: 'Select', error: '', isSearchable: false };
