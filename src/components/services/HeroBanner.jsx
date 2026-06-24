import React from 'react';
import contestBanner from '../../assets/service/contestbanner.png';
import learningBanner from '../../assets/service/learningbanner.png';
import toolsBanner from '../../assets/service/toolsbanner.png';

const BANNERS = {
  contest: contestBanner,
  learning: learningBanner,
  tools: toolsBanner,
};

function HeroBanner({ activeTab }) {
  return (
    <div className="rounded-xl overflow-hidden mb-6">
      <img src={BANNERS[activeTab]} alt={`${activeTab} banner`} className="w-full h-114 object-fill" />
    </div>
  );
}

export default HeroBanner;
