import React from 'react';
import PropTypes from 'prop-types';
import faq from "../../assets/support/faq.png";

const FAQ_ITEMS = [
  {
    title:       'Payout Processing Times',
    description: 'Standard withdrawal timelines for fiat and crypto.',
    category:    'Withdrawal',
    message:     'Hi, I have a question about payout processing times and standard withdrawal timelines for fiat and crypto.',
  },
  {
    title:       'Reset 2FA Authentication',
    description: 'Secure steps to regain account access.',
    category:    'Account Issues',
    message:     'Hi, I need help resetting my 2FA authentication to regain access to my account.',
  },
  {
    title:       'Tier Benefit Upgrades',
    description: 'How to qualify for Platinum and Elite status.',
    category:    'Commission & Rewards',
    message:     'Hi, I would like to know how to qualify for Platinum and Elite tier benefit upgrades.',
  },
];

function FaqQuickLinks({ onSelect }) {
  return (
    <div className="rounded-xl p-5 md:p-6" style={{ background: '#181F3033', border: '1px solid #FFFFFF0D' }}>
      <div className="flex items-center gap-2 mb-4">
        <img src={faq} alt="FAQ" className="w-6" />
        <h3 className="text-sm font-bold text-white">FAQ Quick Links</h3>
      </div>

      <div className="flex flex-col gap-3">
        {FAQ_ITEMS.map((item) => (
          <button
            key={item.title}
            type="button"
            onClick={() => onSelect?.({ category: item.category, subject: item.title, message: item.message })}
            className="rounded-lg border border-[#1e1e3a] px-4 py-3 text-left cursor-pointer hover:border-purple-500/40 hover:bg-purple-500/5 transition-all duration-200 bg-transparent w-full group"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-white mb-0.5 group-hover:text-purple-300 transition-colors">{item.title}</p>
              <svg className="w-3.5 h-3.5 text-purple-400/50 group-hover:text-purple-400 transition-colors flex-shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed">{item.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

FaqQuickLinks.propTypes = {
  onSelect: PropTypes.func,
}

FaqQuickLinks.defaultProps = {
  onSelect: null,
}

export default FaqQuickLinks;
