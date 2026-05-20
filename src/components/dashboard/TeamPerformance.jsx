import React from 'react';
import PropTypes from 'prop-types'
import currentImg    from '../../assets/dashboard/current.png'
import affiliatesImg from '../../assets/dashboard/afliates.png'
import downlineImg   from '../../assets/dashboard/downline.png'
import swpImg        from '../../assets/dashboard/swp2.png'
import tradingImg    from '../../assets/dashboard/trading.png'

function TeamPerformance({ data, totalInvested }) {
  const items = [
    { img: currentImg,    label: 'CURRENT RANK',    value: data?.currentRank ?? 'No Rank Achieved' },
    { img: affiliatesImg, label: 'TOTAL AFFILIATES', value: data?.totalDirectReferrals ?? 0 },
    { img: downlineImg,   label: 'TOTAL DOWNLINES',  value: data?.totalDownline ?? 0 },
    { img: swpImg,        label: 'SWP PURCHASED',    value: `$${(data?.totalSwpPurchased ?? 0).toLocaleString()}` },
    { img: tradingImg,    label: 'TEAM SWP VOLUME',  value: `$${(data?.totalTeamSwpVolume ?? 0).toLocaleString()}` },
    { img: tradingImg,    label: 'TOTAL INVESTED',  value: `$${(totalInvested ?? 0).toLocaleString()}` },
  ]

  return (
    <div className="mb-6">
      <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
        <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
        </svg>
        Team Performance
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-[#1e1e3a] bg-[#181F30]/60 p-4 text-center hover:border-purple-500/30 transition-colors duration-200"
          >
            <div className="w-9 h-9 rounded-lg bg-[#1a1a3e] flex items-center justify-center mx-auto mb-2.5">
              <img src={item.img} className="w-4 h-4 object-contain" alt="" />
            </div>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium mb-1">{item.label}</p>
            <p className="text-base font-bold text-white">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

TeamPerformance.propTypes = { data: PropTypes.object, swpBalance: PropTypes.number }
TeamPerformance.defaultProps = { data: null, swpBalance: 0 }

export default TeamPerformance
