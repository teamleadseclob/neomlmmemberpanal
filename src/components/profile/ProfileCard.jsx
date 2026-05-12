import { useState } from 'react';
import PropTypes from 'prop-types';
import ProfileAvatar from './ProfileAvatar';
import ProfileField from './ProfileField';
import ProfilePasswordFields from './ProfilePasswordFields';
import ProfileConfirmModal from './ProfileConfirmModal';
import CountrySelect from './CountrySelect';
import CustomSelect from './CustomSelect';

const EditIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const GENDERS  = ['Male', 'Female', 'Other'];

const validatePassword = (pw, cpw) => {
  const e = {};
  if (pw.length < 6)          { e.password = 'Minimum 6 characters'; return e; }
  if (!/[A-Z]/.test(pw))      { e.password = 'Must include an uppercase letter'; return e; }
  if (!/\d/.test(pw))         { e.password = 'Must include a number'; return e; }
  if (!cpw)                   { e.confirmPassword = 'Please confirm your password'; return e; }
  if (pw !== cpw)             { e.confirmPassword = 'Passwords do not match'; }
  return e;
};

const validateForm = (form) => {
  const e = {};
  if (!form.fullName.trim()) e.fullName = 'Full name is required';
  if (form.password) Object.assign(e, validatePassword(form.password, form.confirmPassword));
  return e;
};

export default function ProfileCard({ user, onSave }) {
  const [editing, setEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    fullName:        user?.name        || '',
    gender:          user?.gender      || '',
    country:         user?.country     || '',
    state:           user?.state       || '',
    mobile:          user?.phoneNumber  || user?.mobile || '',
    address:         user?.address     || '',
    dob:             user?.dob         || '',
    password:        '',
    confirmPassword: '',
  });

  const set = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    setErrors((p) => ({ ...p, [field]: '' }));
  };

  const handleCancel = () => {
    setForm({
      fullName: user?.name || '', gender: user?.gender || '',
      country: user?.country || '', state: user?.state || '',
      mobile: user?.phoneNumber || user?.mobile || '', address: user?.address || '',
      dob: user?.dob || '', password: '', confirmPassword: '',
    });
    setErrors({});
    setEditing(false);
  };

  const handleSaveClick = () => {
    const e = validateForm(form);
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setShowModal(true);
  };

  const handleConfirm = async () => {
    setLoading(true);
    await onSave(form);
    setLoading(false);
    setShowModal(false);
    setEditing(false);
    setForm((p) => ({ ...p, password: '', confirmPassword: '' }));
  };

  return (
    <>
      <div className="rounded-2xl border border-[#1e1e3a] bg-[#0d0d1f] p-6 md:p-8">
        <div className="flex flex-col sm:flex-row gap-8">

          <ProfileAvatar name={user?.name} />

          <div className="flex-1 flex flex-col gap-5">

            {/* Header */}
            <div className="flex items-center justify-between">
              <p className="text-white font-semibold text-base">{user?.name || '—'}</p>
              {!editing && (
                <button type="button" onClick={() => setEditing(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-purple-400 border border-purple-500/40 bg-purple-500/10 hover:bg-purple-500/20 transition-colors cursor-pointer">
                  <EditIcon /> Edit Profile
                </button>
              )}
            </div>

            {/* Row 1: Full Name + Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <ProfileField label="Full Name" value={form.fullName} editing={editing}
                onChange={set('fullName')} error={errors.fullName} />
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Gender</p>
                {editing
                  ? <CustomSelect value={form.gender} onChange={(val) => { setForm((p) => ({ ...p, gender: val })); setErrors((p) => ({ ...p, gender: '' })); }} options={GENDERS} placeholder="Select gender" error={errors.gender} />
                  : <p className="text-white text-base border-b border-[#2a2a4a] pb-1.5">{form.gender || '—'}</p>
                }
              </div>
            </div>

            {/* Row 2: Country + State */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Country</p>
                {editing
                  ? <CountrySelect value={form.country} onChange={(val) => { setForm((p) => ({ ...p, country: val })); setErrors((p) => ({ ...p, country: '' })); }} error={errors.country} />
                  : <p className="text-white text-base border-b border-[#2a2a4a] pb-1.5">{form.country || '—'}</p>
                }
              </div>
              <ProfileField label="State" value={form.state} editing={editing}
                onChange={set('state')} />
            </div>

            {/* Row 3: Email + Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <ProfileField label="Email Address" value={user?.email || ''} editing={false} />
              <ProfileField label="Mobile Number" value={form.mobile} editing={editing}
                onChange={set('mobile')} type="tel" />
            </div>

            {/* Row 4: Address + DOB */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <ProfileField label="Address" value={form.address} editing={editing}
                onChange={set('address')} />
              <ProfileField label="Date of Birth" value={form.dob} editing={editing}
                onChange={set('dob')} type="date" />
            </div>

            {/* Row 5: Password + Confirm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <ProfilePasswordFields
                editing={editing}
                password={form.password}
                confirmPassword={form.confirmPassword}
                onPasswordChange={set('password')}
                onConfirmChange={set('confirmPassword')}
                errors={errors}
              />
            </div>

            {/* Actions */}
            {editing && (
              <div className="flex gap-4 mt-2">
                <button type="button" onClick={handleCancel}
                  className="flex-1 py-3.5 rounded-xl text-sm font-semibold text-white border border-[#2a2a4a] bg-transparent hover:bg-white/5 transition-colors cursor-pointer">
                  Cancel
                </button>
                <button type="button" onClick={handleSaveClick}
                  className="flex-1 py-3.5 rounded-xl text-sm font-bold text-white border-none cursor-pointer bg-gradient-to-r from-purple-600 to-purple-500 hover:shadow-[0_8px_24px_rgba(147,51,234,0.4)] transition-all duration-200">
                  Save
                </button>
              </div>
            )}

          </div>
        </div>
      </div>

      {showModal && (
        <ProfileConfirmModal
          onConfirm={handleConfirm}
          onCancel={() => setShowModal(false)}
          loading={loading}
        />
      )}
    </>
  );
}

ProfileCard.propTypes = {
  user:   PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};
