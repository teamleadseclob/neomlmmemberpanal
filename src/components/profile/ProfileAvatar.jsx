import PropTypes from 'prop-types';

export default function ProfileAvatar({ name }) {
  const initial = (name?.[0] || 'U').toUpperCase();
  return (
    <div className="flex-shrink-0 flex items-start justify-center sm:justify-start">
      <div
        className="w-32 h-32 rounded-xl bg-[#1a1a2e] border border-[#2a2a4a] flex items-center justify-center"
        style={{ boxShadow: '0 0 32px rgba(147,51,234,0.15)' }}
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-3xl font-bold text-white">
          {initial}
        </div>
      </div>
    </div>
  );
}

ProfileAvatar.propTypes = { name: PropTypes.string };
ProfileAvatar.defaultProps = { name: '' };
