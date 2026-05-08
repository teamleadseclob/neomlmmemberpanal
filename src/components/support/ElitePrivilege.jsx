import React from 'react';
import privacy from "../../assets/support/privacy.png";

function ElitePrivilege() {
  return (
    <div className="rounded-xl p-5 md:p-6 relative" style={{ background: 'linear-gradient(#081028, #081028) padding-box, linear-gradient(128.49deg, #CB3CFF 19.86%, #7F25FB 68.34%) border-box', border: '1px solid transparent', borderRadius: '12px' }}>
      {/* Badge */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
          <img src={privacy} alt="Privacy" />
        </div>
        <span
          className="text-[10px] uppercase tracking-[2px] font-bold bg-clip-text text-transparent"
          style={{ backgroundImage: 'linear-gradient(128.49deg, #CB3CFF 19.86%, #7F25FB 68.34%)' }}
        >
          Elite Privilege
        </span>
      </div>

      <h3 className="text-xl font-bold text-white mb-2 leading-tight">
        Direct Compliance Support
      </h3>
      <p className="text-xs text-gray-400 leading-relaxed mb-5">
        As an Elite Member, you have a dedicated compliance officer for immediate assistance with heavy transactions.
      </p>

      <button
        type="button"
        className="w-full py-2.5 rounded-lg text-xs font-semibold tracking-wide
                   text-white hover:opacity-90 transition-opacity duration-200 cursor-pointer border-none"
        style={{ background: 'linear-gradient(135deg, #CB3CFF, #7F25FB)' }}
      >
        Connect Live
      </button>
    </div>
  );
}

export default ElitePrivilege;
