import { useState } from 'react';
import SendInvitationModal from './SendInvitationModal';

function ReferralHeader() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Referral Hub</h1>
        <p className="text-[8px] md:text-sm text-gray-400">
          Manage your kinetic network and accelerate your earnings capacity.
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 flex-shrink-0">

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 md:mt-6 rounded-md text-xs font-bold
                     bg-linear-to-r from-[#D946EF] to-[#CB3CFF] text-white
                     hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200 border-none cursor-pointer"
        >
          Send Referral
        </button>
      </div>
    </div>
      {showModal && <SendInvitationModal onClose={() => setShowModal(false)} />}
    </>
  );
}

export default ReferralHeader;
