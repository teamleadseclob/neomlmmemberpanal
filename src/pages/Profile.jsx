import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getprofile, updateprofile, uploadAvatar } from '../config/apiService';
import ProfileCard from '../components/profile/ProfileCard';
import InviteBanner from '../components/trading/InviteBanner';
import KYCForm from '../components/kyc/KYCForm';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getprofile()
      .then((res) => setUser(res?.data))
      .catch(() => toast.error('Failed to load profile'))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async ({ fullName, password, confirmPassword, gender, country, state, mobile, address, dob }, avatarFile) => {
    if (password && password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const payload = {};
      if (fullName) payload.name = fullName;
      if (gender)  payload.gender  = gender;
      if (country) payload.country = country;
      if (state)   payload.state   = state;
      if (mobile)  payload.phoneNumber = mobile;
      if (address) payload.address = address;
      if (dob)     payload.dob     = dob;
      if (password) payload.newPassword = password;

      // Upload avatar first if a file was selected
      if (avatarFile) {
        const avatarRes = await uploadAvatar(avatarFile);
        payload.profileImage = avatarRes.data.url;
      }

      if (!Object.keys(payload).length) { toast('Nothing to update'); return; }
      const res = await updateprofile(payload);
      const fresh = await getprofile();
      setUser(fresh?.data);
      const stored = localStorage.getItem('user');
      if (stored && payload.name) {
        localStorage.setItem('user', JSON.stringify({ ...JSON.parse(stored), name: payload.name }));
      }
      toast.success(res?.message || 'Profile updated successfully');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Profile Settings</h1>
          <p className="text-sm text-gray-400">Manage Your Account Identity And Security Credentials.</p>
        </div>
        <div className="flex items-center gap-2 bg-[#0d0d1f] border border-[#1e1e3a] rounded-xl px-4 py-2.5 flex-shrink-0">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">User ID</span>
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
          <span className="text-sm font-bold bg-gradient-to-r from-[#7F25FB] to-[#CB3CFF] bg-clip-text text-transparent tracking-wider">
            {user?.userId || '—'}
          </span>
        </div>
      </div>

      {/* Profile form card */}
      {user && <ProfileCard key={user?.profileImage || 'no-avatar'} user={user} onSave={handleSave} />}

      {/* KYC */}
      <KYCForm />

      {/* Network banner */}
      <InviteBanner />

    </div>
  );
}
