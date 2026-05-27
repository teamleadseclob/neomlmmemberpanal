import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

/* ── Hook ─────────────────────────────────────────────────────────── */
export function useCountUp(target, duration = 1200) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (target === 0) { setValue(0); return; }
    let startTime = null;
    const ease = (t) => 1 - (1 - t) ** 3;

    const animate = (ts) => {
      if (!startTime) startTime = ts;
      const progress = ease(Math.min((ts - startTime) / duration, 1));
      setValue(target * progress);
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return value;
}

/* ── Component ────────────────────────────────────────────────────── */

/**
 * AnimatedAmount — counts up from 0 to `value` on mount / value change.
 *
 * Props:
 *   value      {number}  — target number
 *   className  {string}  — class applied to the wrapper <p>
 *   large      {boolean} — splits dollars / cents for a big hero display
 *   duration   {number}  — animation duration in ms (default 1200)
 *   prefix     {string}  — prefix symbol (default '$')
 */
export default function AnimatedAmount({ value, className, large, duration, prefix, style }) {
  const safeVal  = Number.isFinite(value) ? value : 0
  const animated = useCountUp(safeVal, duration);
  const dollars  = Math.floor(animated);
  const cents    = ((animated % 1) * 100).toFixed(0).padStart(2, '0');

  // Check if gradient classes are applied so we can propagate to children
  const hasGradient = className?.includes('bg-clip-text')

  return (
    <p className={className} style={style}>
      <span className={hasGradient ? 'bg-gradient-to-r from-[#CB3CFF] to-[#7F25FB] bg-clip-text text-transparent' : ''}>
        {prefix}{dollars.toLocaleString()}.
      </span>
      {large
        ? <span className="text-2xl md:text-3xl text-gray-400 font-semibold ml-0.5">{cents}</span>
        : <span className={hasGradient ? 'bg-gradient-to-r from-[#CB3CFF] to-[#7F25FB] bg-clip-text text-transparent' : ''}>{cents}</span>
      }
    </p>
  );
}

AnimatedAmount.propTypes = {
  value:     PropTypes.number.isRequired,
  className: PropTypes.string,
  large:     PropTypes.bool,
  duration:  PropTypes.number,
  prefix:    PropTypes.string,
  style:     PropTypes.object,
};

AnimatedAmount.defaultProps = {
  className: '',
  large:     false,
  duration:  1200,
  prefix:    '$',
  style:     undefined,
};
