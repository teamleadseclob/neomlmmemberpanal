import React from 'react';
const TERMS_LIST = [
  'Users must be at least 18 years of age to participate in the NeoFi ecosystem.',
  'The platform provides advanced market observatory tools; users are solely responsible for their financial decisions.',
  'NeoFi is not liable for losses resulting from market volatility or unauthorized account access.',
  'Data privacy is prioritized; all personal info is encrypted using military-grade protocols.',
];

const NEOFI_TERMS_TEXT = `"NeoFi is primarily an educational and technical observatory platform. We provide data analytics, community access, and software tools. We do not provide licensed investment advice, nor do we function as a traditional brokerage. Trading involves significant risk. Always consult with a certified financial advisor before committing capital."`;

function TermsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* General T&Cs Summary */}
      <div>
        <h3 className="text-xs font-bold text-gray-300 tracking-[0.15em] uppercase mb-4">
          General T&amp;Cs Summary
        </h3>
        <ul className="space-y-3">
          {TERMS_LIST.map((term) => (
            <li key={term} className="flex items-start gap-2.5 text-xs text-gray-400 leading-relaxed">
              <svg
                className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5"
                fill="currentColor" viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                />
              </svg>
              {term}
            </li>
          ))}
        </ul>
      </div>

      {/* NeoFi Basic Terms */}
      <div>
        <h3 className="text-xs font-bold text-gray-300 tracking-[0.15em] uppercase mb-4">
          NeoFi Basic Terms
        </h3>
        <div className="rounded-xl border border-[#1e1e3a] bg-[#0d0b2e]/60 p-4">
          <p className="text-xs text-gray-400 leading-relaxed italic">
            {NEOFI_TERMS_TEXT}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TermsSection;
