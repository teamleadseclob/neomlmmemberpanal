import React from 'react';
import PropTypes from 'prop-types'
import { getReferralLink } from './referralLink'

export default function ReferralLinkText({ userId, className }) {
  return (
    <span className={`text-[10px] text-gray-300 font-mono ${className ?? ''}`}>
      {getReferralLink(userId)}
    </span>
  )
}

ReferralLinkText.propTypes = {
  userId: PropTypes.string,
  className: PropTypes.string,
}

ReferralLinkText.defaultProps = {
  userId: undefined,
  className: '',
}
