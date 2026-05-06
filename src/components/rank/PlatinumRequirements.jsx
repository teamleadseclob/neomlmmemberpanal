import PropTypes from 'prop-types';

function RequirementRow({ label, current, required, unit }) {
  const pct     = required > 0 ? Math.min(Math.round((current / required) * 100), 100) : 0;
  const done    = pct >= 100;
  const remaining = required - current;

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-gray-400">{label}</span>
        <span className="text-xs text-white font-semibold">
          {unit === '$' ? `$${current.toLocaleString()} / $${required.toLocaleString()}` : `${current} / ${required} Members`}
        </span>
      </div>
      <div className="w-full h-1.5 bg-[#1a1a3e] rounded-full overflow-hidden mb-1.5">
        <div
          className="h-full rounded-full bg-linear-to-r from-[#7F25FB] to-[#CB3CFF] transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold flex items-center gap-1">
          {done ? 'COMPLETED' : `${pct}% COMPLETE`}
          {done && (
            <svg className="w-3.5 h-3.5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
            </svg>
          )}
        </span>
        {!done && (
          <span className="text-[10px] uppercase tracking-wider font-semibold text-purple-400">
            {unit === '$' ? `$${remaining.toLocaleString()} REMAINING` : `${remaining} MORE NEEDED`}
          </span>
        )}
      </div>
    </div>
  );
}

RequirementRow.propTypes = {
  label:    PropTypes.string.isRequired,
  current:  PropTypes.number.isRequired,
  required: PropTypes.number.isRequired,
  unit:     PropTypes.string,
};
RequirementRow.defaultProps = { unit: '' };

function PlatinumRequirements({ nextRank }) {
  if (!nextRank) {
    return (
      <div className="rounded-xl p-5 md:p-6 h-full flex items-center justify-center" style={{ background: '#181F3033', border: '1px solid #FFFFFF0D' }}>
        <p className="text-sm text-gray-500">No rank data available.</p>
      </div>
    );
  }

  const { criteria } = nextRank;

  return (
    <div className="rounded-xl p-5 md:p-6 h-full" style={{ background: '#181F3033', border: '1px solid #FFFFFF0D' }}>
      <h3 className="text-base font-bold text-white mb-5">{nextRank.name} Rank Requirements</h3>

      <div className="flex flex-col gap-5">
        <RequirementRow
          label="Total SWP Volume"
          current={criteria.totalSwpVolume.current}
          required={criteria.totalSwpVolume.required}
          unit="$"
        />
        <RequirementRow
          label="Capped Volume"
          current={criteria.cappedVolume.current}
          required={criteria.cappedVolume.required}
          unit="$"
        />
        <RequirementRow
          label="Required Teams"
          current={criteria.requiredTeams.current}
          required={criteria.requiredTeams.required}
          unit="members"
        />
      </div>
    </div>
  );
}

PlatinumRequirements.propTypes = {
  nextRank: PropTypes.shape({
    name:    PropTypes.string,
    reward:  PropTypes.number,
    criteria: PropTypes.shape({
      requiredTeams:   PropTypes.object,
      totalSwpVolume:  PropTypes.object,
      cappedVolume:    PropTypes.object,
    }),
  }),
};
PlatinumRequirements.defaultProps = { nextRank: null };

export default PlatinumRequirements;
