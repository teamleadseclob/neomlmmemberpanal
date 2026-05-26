/**
 * SponsorTree – 3-level paginated tree with infinite children.
 *
 * • Shows current parent + its direct children + each child's children (grandchildren).
 * • Clicking an active child "drills down" (makes it the new parent).
 * • Breadcrumb trail lets you navigate back up.
 * • Children scroll horizontally with ←/→ buttons.
 * • Dynamic SVG connector paths fan out from parent center to each child
 *   with rounded corners and V-shaped arrowheads (matching Bottom.svg style).
 * • Fetches data from the gettree API endpoint.
 */

import React, { useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../context/useAuth';
import { gettree, getdownlinestats } from '../../config/apiService';

/* ═══════════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════════ */
const COL_W    = 200;   // column width per child
const CONN_H   = 90;    // connector SVG height
const TURN_Y   = 28;    // y-position of the horizontal turn
const RADIUS   = 14;    // corner radius (rounded bends)
const STROKE_W = 1.85;  // stroke width (matches Bottom.svg)
const TIP_W    = 7;     // arrowhead half-width
const TIP_H    = 7.5;   // arrowhead height

/* ═══════════════════════════════════════════════════════════════
   SVG PATH BUILDERS
   (match Bottom.svg: gradient #CB3CFF→#7F25FB, rounded turns, V-tip)
   ═══════════════════════════════════════════════════════════════ */

/** L-shaped path from parent center → horizontal → down to child */
function buildConnPath(childIdx, childCount) {
  const contentW = childCount * COL_W;
  const cx = contentW / 2;                       // parent center X
  const childX = childIdx * COL_W + COL_W / 2;   // child center X
  const dx = childX - cx;
  const absDx = Math.abs(dx);

  // Straight-down when child is directly below parent
  if (absDx < 1) {
    return `M ${cx} 0 L ${cx} ${CONN_H - TIP_H - 1}`;
  }

  const dir = dx > 0 ? 1 : -1;
  const r = Math.min(RADIUS, absDx / 2);

  return [
    `M ${cx} 0`,
    `L ${cx} ${TURN_Y - r}`,
    `Q ${cx} ${TURN_Y} ${cx + dir * r} ${TURN_Y}`,
    `L ${childX - dir * r} ${TURN_Y}`,
    `Q ${childX} ${TURN_Y} ${childX} ${TURN_Y + r}`,
    `L ${childX} ${CONN_H - TIP_H - 1}`,
  ].join(' ');
}

/** V-shaped arrowhead pointing down */
function buildArrowTip(childIdx, ) {
  const x = childIdx * COL_W + COL_W / 2;
  const y = CONN_H;
  return `M ${x - TIP_W} ${y - TIP_H} L ${x} ${y} L ${x + TIP_W} ${y - TIP_H}`;
}

/* ═══════════════════════════════════════════════════════════════
   STYLE HELPERS — eliminates nested ternaries in JSX
   ═══════════════════════════════════════════════════════════════ */

/** Returns size class for the avatar circle */
function getAvatarSize(isParent, isSmall) {
  if (isParent) return 'w-10 h-10';
  if (isSmall) return 'w-6 h-6';
  return 'w-8 h-8';
}

/** Returns font-size class for the avatar letter */
function getAvatarFont(isParent, isSmall) {
  if (isParent) return 'text-sm';
  if (isSmall) return 'text-[9px]';
  return 'text-[11px]';
}

/** Returns font-size class for the node name */
function getNameFont(isParent, isSmall) {
  if (isParent) return 'text-sm';
  if (isSmall) return 'text-[10px]';
  return 'text-xs';
}

/** Returns padding/border classes for the node card wrapper */
function getCardStyle(isParent, isSmall) {
  if (isParent) {
    return 'px-5 py-3 border-purple-500/60 bg-gradient-to-br from-[#1a0a3e] to-[#0d0b2e] shadow-lg shadow-purple-500/15';
  }
  if (isSmall) {
    return 'px-2.5 py-2 border-purple-500/25 bg-[#0d0b2e]/80 shadow-sm shadow-purple-500/5';
  }
  return 'px-3.5 py-2.5 border-purple-500/40 bg-[#0d0b2e] shadow-md shadow-purple-500/5';
}

/** Stable key for a node — avoids array-index-only keys */
function nodeKey(node, fallbackIndex) {
  return node?.userId || node?._id || `slot-${fallbackIndex}`;
}

/* ═══════════════════════════════════════════════════════════════
   EMPTY CARD — shown for vacant slots
   ═══════════════════════════════════════════════════════════════ */
function EmptyCard() {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-[#2a2a4a] bg-[#0a0820]/80 whitespace-nowrap">
      <div className="w-7 h-7 rounded-full bg-[#1a1a3e] flex items-center justify-center flex-shrink-0">
        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      </div>
      <span className="text-xs text-gray-500 font-medium">No User</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NODE TOOLTIP — fetches and displays downline stats
   ═══════════════════════════════════════════════════════════════ */
function NodeTooltip({ userId, onClose }) {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const ref = useRef(null)

  useEffect(() => {
    let cancelled = false
    getdownlinestats(userId)
      .then((res) => { if (!cancelled) setStats(res?.data ?? null) })
      .catch(() => { if (!cancelled) setStats(null) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [userId])

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose() }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  return (
    <div
      ref={ref}
      className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 w-56"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
      role="tooltip"
    >
      <div className="rounded-xl border border-[#2a2a4a] bg-[#0d0b2e] shadow-2xl shadow-black/60 p-3">
        {loading ? (
          <div className="flex justify-center py-3">
            <span className="w-5 h-5 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
          </div>
        ) : !stats ? (
          <p className="text-xs text-gray-500 text-center py-2">No data available</p>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-[#2a2a4a]">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#7F25FB] to-[#D946EF] flex items-center justify-center flex-shrink-0">
                <span className="text-[9px] font-bold text-white">{stats.name?.[0]?.toUpperCase()}</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-white uppercase">{stats.name}</p>
                <p className="text-[9px] text-gray-400 font-mono">{stats.userId}</p>
              </div>
              <span className="ml-auto text-[9px] font-bold text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded-full">{stats.rank}</span>
            </div>
            {[
              { label: 'Personal SWP',       value: `$${(stats.personalSwp ?? 0).toLocaleString()}` },
              { label: 'Trading Capital',    value: `$${(stats.tradingCapital ?? 0).toLocaleString()}` },
              { label: 'Team SWP Volume',    value: `$${(stats.teamSwpVolume ?? 0).toLocaleString()}` },
              { label: 'Team Trading Cap',   value: `$${(stats.teamTradingCapital ?? 0).toLocaleString()}` },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-1">
                <span className="text-[10px] text-gray-400">{label}</span>
                <span className="text-[10px] font-semibold text-white">{value}</span>
              </div>
            ))}
          </>
        )}
        {/* Arrow */}
        <div className="absolute left-1/2 -translate-x-1/2 top-full w-2.5 h-2.5 border-r border-b border-[#2a2a4a] bg-[#0d0b2e] rotate-45 -mt-1.5" />
      </div>
    </div>
  )
}

NodeTooltip.propTypes = {
  userId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}

/* ═══════════════════════════════════════════════════════════════
   NODE CARD — active user
   ═══════════════════════════════════════════════════════════════ */
function NodeCard({ node, onClick, isParent = false, size = 'normal' }) {
  const [showTooltip, setShowTooltip] = useState(false)

  if (!node || node.empty) {
    return <EmptyCard />;
  }

  const hasChildren = node.children && node.children.length > 0;
  const canDrill = !isParent && hasChildren;
  const isSmall = size === 'small';

  const cardCls = getCardStyle(isParent, isSmall);
  const drillCls = canDrill
    ? 'cursor-pointer hover:border-purple-400 hover:shadow-purple-500/20 hover:scale-[1.03] transition-all duration-200'
    : 'cursor-default';
  const chevronCls = isSmall ? 'w-3 h-3' : 'w-3.5 h-3.5';
  const idFontCls = isSmall ? 'text-[8px]' : 'text-[10px]';

  return (
    <div className="relative">
      <div className={`flex items-center gap-2.5 rounded-lg border whitespace-nowrap ${cardCls} ${drillCls}`}>
        {/* Avatar */}
        <button
          type="button"
          onClick={canDrill ? onClick : undefined}
          className="flex items-center gap-2.5 bg-transparent border-none p-0 cursor-inherit"
          title={canDrill ? `View ${node.name}'s network` : undefined}
        >
          <div className={`${getAvatarSize(isParent, isSmall)} rounded-full bg-gradient-to-br from-[#7F25FB] to-[#D946EF] flex items-center justify-center flex-shrink-0`}>
            <span className={`${getAvatarFont(isParent, isSmall)} font-bold text-white`}>
              {node.name ? node.name.charAt(0).toUpperCase() : 'N'}
            </span>
          </div>
          <div className="min-w-0">
            <p className={`${getNameFont(isParent, isSmall)} font-semibold text-white truncate uppercase`}>{node.name}</p>
            <p className={`${idFontCls} text-gray-400 font-mono truncate`}>{node.userId}</p>
          </div>
        </button>

        {/* Eye button */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setShowTooltip((v) => !v); }}
          className={`flex-shrink-0 ${isSmall ? 'w-4 h-4' : 'w-5 h-5'} flex items-center justify-center text-gray-500 hover:text-purple-400 transition-colors bg-transparent border-none cursor-pointer`}
          aria-label="View stats"
        >
          <svg width={isSmall ? 12 : 14} height={isSmall ? 12 : 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>

        {/* Drill chevron */}
        {canDrill && (
          <button
            type="button"
            onClick={onClick}
            className="flex-shrink-0 bg-transparent border-none cursor-pointer p-0"
          >
            <svg className={`${chevronCls} text-purple-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        )}
      </div>

      {/* Tooltip */}
      {showTooltip && node.userId && (
        <NodeTooltip userId={node.userId} onClose={() => setShowTooltip(false)} />
      )}
    </div>
  );
}

NodeCard.propTypes = {
  node: PropTypes.shape({
    empty: PropTypes.bool,
    name: PropTypes.string,
    userId: PropTypes.string,
    children: PropTypes.array,
  }),
  onClick: PropTypes.func,
  isParent: PropTypes.bool,
  size: PropTypes.oneOf(['normal', 'small']),
}
NodeCard.defaultProps = {
  node: null,
  onClick: undefined,
  isParent: false,
  size: 'normal',
}

/** Scroll chevron button */
function ScrollBtn({ direction, onClick }) {
  const isLeft = direction === 'left';
  return (
    <button
      type="button"
      onClick={onClick}
      className={`absolute ${isLeft ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 z-10
                  w-9 h-9 rounded-full bg-[#1a1a3e]/90 border border-[#2a2a4a]
                  text-gray-400 hover:text-white hover:border-purple-500/40
                  flex items-center justify-center cursor-pointer
                  transition-all duration-200 backdrop-blur-sm shadow-lg`}
      aria-label={`Scroll ${direction}`}
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d={isLeft ? 'M15.75 19.5 8.25 12l7.5-7.5' : 'm8.25 4.5 7.5 7.5-7.5 7.5'} />
      </svg>
    </button>
  );
}

ScrollBtn.propTypes = {
  direction: PropTypes.oneOf(['left', 'right']).isRequired,
  onClick: PropTypes.func.isRequired,
}

/* ═══════════════════════════════════════════════════════════════
   SVG CONNECTORS COMPONENT — reusable for any level
   ═══════════════════════════════════════════════════════════════ */
function Connectors({ childCount, contentW, gradientId }) {
  if (childCount === 0) return null;
  return (
    <svg
      width={contentW}
      height={CONN_H}
      viewBox={`0 0 ${contentW} ${CONN_H}`}
      className="block"
      style={{ overflow: 'visible' }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2={CONN_H}
                        gradientUnits="userSpaceOnUse">
          <stop offset="0.2"  stopColor="#CB3CFF" />
          <stop offset="0.7"  stopColor="#7F25FB" />
        </linearGradient>
      </defs>

      {Array.from({ length: childCount }).map((_, i) => {
        const key = `${gradientId}-path-${i}`;
        return (
          <g key={key}>
            <path
              d={buildConnPath(i, childCount)}
              stroke={`url(#${gradientId})`}
              strokeWidth={STROKE_W}
              strokeLinecap="round"
              fill="none"
            />
            <path
              d={buildArrowTip(i, )}
              stroke={`url(#${gradientId})`}
              strokeWidth={STROKE_W}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </g>
        );
      })}
    </svg>
  );
}

Connectors.propTypes = {
  childCount: PropTypes.number.isRequired,
  contentW: PropTypes.number.isRequired,
  gradientId: PropTypes.string.isRequired,
}

/* ═══════════════════════════════════════════════════════════════
   GRANDCHILDREN SUB-TREE for a single child
   ═══════════════════════════════════════════════════════════════ */
const GCOL_W = 140;
const GC_CONN_H = 60;

function buildGcConnPath(childIdx, childCount) {
  const contentW = childCount * GCOL_W;
  const cx = contentW / 2;
  const childX = childIdx * GCOL_W + GCOL_W / 2;
  const dx = childX - cx;
  const absDx = Math.abs(dx);
  const turnY = 18;
  const r = Math.min(10, absDx / 2);

  if (absDx < 1) {
    return `M ${cx} 0 L ${cx} ${GC_CONN_H - TIP_H - 1}`;
  }

  const dir = dx > 0 ? 1 : -1;
  return [
    `M ${cx} 0`,
    `L ${cx} ${turnY - r}`,
    `Q ${cx} ${turnY} ${cx + dir * r} ${turnY}`,
    `L ${childX - dir * r} ${turnY}`,
    `Q ${childX} ${turnY} ${childX} ${turnY + r}`,
    `L ${childX} ${GC_CONN_H - TIP_H - 1}`,
  ].join(' ');
}

function buildGcArrowTip(childIdx, ) {
  const x = childIdx * GCOL_W + GCOL_W / 2;
  const y = GC_CONN_H;
  return `M ${x - 5} ${y - 6} L ${x} ${y} L ${x + 5} ${y - 6}`;
}

function GrandchildrenTree({ grandchildren, onDrillGrandchild, parentId }) {
  if (!grandchildren || grandchildren.length === 0) return null;

  const gcContentW = grandchildren.length * GCOL_W;
  const gradId = `gcGrad-${parentId}`;

  return (
    <div className="mt-1">
      {/* Grandchild connectors */}
      <svg
        width={gcContentW}
        height={GC_CONN_H}
        viewBox={`0 0 ${gcContentW} ${GC_CONN_H}`}
        className="block mx-auto"
        style={{ overflow: 'visible' }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2={GC_CONN_H}
                          gradientUnits="userSpaceOnUse">
            <stop offset="0.2"  stopColor="#CB3CFF" stopOpacity="0.6" />
            <stop offset="0.7"  stopColor="#7F25FB" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {grandchildren.map((gc, i) => {
          const key = `${nodeKey(gc, i)}-gc-conn`;
          return (
            <g key={key}>
              <path
                d={buildGcConnPath(i, grandchildren.length)}
                stroke={`url(#${gradId})`}
                strokeWidth={1.4}
                strokeLinecap="round"
                fill="none"
              />
              <path
                d={buildGcArrowTip(i)}
                stroke={`url(#${gradId})`}
                strokeWidth={1.4}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </g>
          );
        })}
      </svg>

      {/* Grandchildren row */}
      <div className="flex justify-center">
        {grandchildren.map((gc, i) => (
          <div key={nodeKey(gc, i)}
               className="flex justify-center flex-shrink-0"
               style={{ width: GCOL_W + 'px' }}>
            <NodeCard node={gc} onClick={() => onDrillGrandchild(gc)} size="small" />
          </div>
        ))}
      </div>
    </div>
  );
}

GrandchildrenTree.propTypes = {
  grandchildren: PropTypes.array,
  onDrillGrandchild: PropTypes.func.isRequired,
  parentId: PropTypes.string,
}
GrandchildrenTree.defaultProps = {
  grandchildren: [],
  parentId: 'default',
}

/* ══════════════════════════════════════════════════════════════
   LOADING / ERROR STATES — extracted to reduce main complexity
   ══════════════════════════════════════════════════════════════ */
function TreeLoading() {
  return (
    <div className="rounded-xl p-5 md:p-6" style={{ background: '#181F3033', border: '1px solid #FFFFFF0D' }}>
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-purple-500/30 border-t-purple-500 animate-spin" />
        <p className="text-sm text-gray-400">Loading sponsor tree…</p>
      </div>
    </div>
  );
}

function TreeError({ message }) {
  return (
    <div className="rounded-xl p-5 md:p-6" style={{ background: '#181F3033', border: '1px solid #FFFFFF0D' }}>
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
          <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
        </div>
        <p className="text-sm text-gray-400">{message}</p>
        <button
          type="button"
          onClick={() => globalThis.location.reload()}
          className="px-4 py-2 text-xs font-medium text-purple-300 border border-purple-500/30 rounded-lg
                     hover:bg-purple-500/10 transition-all duration-200 cursor-pointer"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

TreeError.propTypes = {
  message: PropTypes.string.isRequired,
}

function TreeEmpty() {
  return (
    <div className="text-center py-10">
      <div className="w-12 h-12 rounded-xl bg-[#1a1a3e] flex items-center justify-center mx-auto mb-3">
        <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
        </svg>
      </div>
      <p className="text-sm text-gray-500">No referrals in this branch yet.</p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   BREADCRUMB NAV — extracted to reduce main complexity
   ══════════════════════════════════════════════════════════════ */
function BreadcrumbNav({ crumbs, navPath, goBack, setNavPath }) {
  if (navPath.length === 0) return null;

  return (
    <div className="flex items-center gap-2.5 mb-5 flex-wrap">
      <button type="button" onClick={goBack}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                   border border-[#2a2a4a] bg-[#1a1a2e] text-gray-300
                   hover:border-purple-500/30 hover:text-white transition-all duration-200 cursor-pointer">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        Back
      </button>
      <nav className="flex items-center gap-1 text-xs text-gray-500  overflow-x-auto">
        {crumbs.map((name, i) => (
          <span key={`crumb-${name}-${navPath.slice(0, i).join('-')}`} className="flex items-center gap-1 whitespace-nowrap">
            {i > 0 && <span className="text-gray-600">/</span>}
            <button type="button" onClick={() => setNavPath(navPath.slice(0, i))}
              className={`bg-transparent uppercase border-none cursor-pointer transition-colors
                ${i === crumbs.length - 1 ? 'text-purple-400 font-medium' : 'text-gray-500 hover:text-purple-400'}`}>
              {name}
            </button>
          </span>
        ))}
      </nav>
    </div>
  );
}

BreadcrumbNav.propTypes = {
  crumbs: PropTypes.arrayOf(PropTypes.string).isRequired,
  navPath: PropTypes.arrayOf(PropTypes.number).isRequired,
  goBack: PropTypes.func.isRequired,
  setNavPath: PropTypes.func.isRequired,
}

/* ══════════════════════════════════════════════════════════════
   HOOK — fetch tree data
   ══════════════════════════════════════════════════════════════ */
function useTreeData(userId) {
  const [treeData, setTreeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    if (!userId) return undefined;

    async function fetchTree() {
      setLoading(true);
      setError(null);
      try {
        const res = await gettree(userId);
        if (cancelled) return;
        if (res.success && res.data) {
          setTreeData(res.data);
        } else {
          setError(res.message || 'Failed to load tree data');
        }
      } catch (err) {
        if (!cancelled) {
          setError(err?.response?.data?.message || err.message || 'Failed to load tree data');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchTree();
    return () => { cancelled = true; };
  }, [userId]);

  return { treeData, loading, error };
}

/** Walk the navPath to resolve the currently selected node */
function resolveNode(root, navPath) {
  let node = root;
  for (const idx of navPath) {
    if (!node?.children?.[idx]) break;
    node = node.children[idx];
  }
  return node;
}

/** Build breadcrumb labels from the root along navPath */
function buildCrumbs(root, navPath) {
  const crumbs = [];
  let tmp = root;
  for (const idx of navPath) {
    crumbs.push(tmp.name || '...');
    if (tmp.children?.[idx]) tmp = tmp.children[idx];
  }
  crumbs.push(tmp.name || '...');
  return crumbs;
}

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════ */

function SponsorTree() {
  const { user } = useAuth();
  const { treeData, loading, error } = useTreeData(user?.userId);
  const [navPath, setNavPath] = useState([]);
  const scrollRef = useRef(null);

  const currentNode = treeData ? resolveNode(treeData, navPath) : null;
  const children = currentNode?.children || [];
  const contentW = children.length * COL_W;

  /* ── Scroll to center when level changes ── */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const sl = (el.scrollWidth - el.clientWidth) / 2;
    el.scrollTo({ left: Math.max(0, sl) });
  }, [navPath]);

  /* ── Navigation ── */
  const drillDown = useCallback((i) => setNavPath((p) => [...p, i]), []);
  const goBack    = useCallback(() => setNavPath((p) => p.slice(0, -1)), []);

  const drillToGrandchild = (parentIdx, grandchild) => {
    const node = resolveNode(treeData, navPath);
    const parent = node?.children?.[parentIdx];
    if (!parent) return;
    const gcIdx = parent.children?.findIndex(
      (gc) => gc._id === grandchild._id || gc.userId === grandchild.userId
    );
    if (gcIdx >= 0) setNavPath((p) => [...p, parentIdx, gcIdx]);
  };

  const scroll = (dir) => scrollRef.current?.scrollBy({ left: dir * COL_W, behavior: 'smooth' });
  const showScrollBtns = children.length > 4;

  /* ── Early returns for loading / error ── */
  if (loading) return <TreeLoading />;
  if (error || !treeData) return <TreeError message={error || 'No tree data available'} />;

  const crumbs = buildCrumbs(treeData, navPath);

  return (
    <div className="rounded-xl p-5 md:p-6" style={{ background: '#181F3033', border: '1px solid #FFFFFF0D' }}>

      <BreadcrumbNav crumbs={crumbs} navPath={navPath} goBack={goBack} setNavPath={setNavPath} />

      {/* ── Tree area (scrollable) ── */}
      <div className="relative">
        {showScrollBtns && <ScrollBtn direction="left"  onClick={() => scroll(-1)} />}
        {showScrollBtns && <ScrollBtn direction="right" onClick={() => scroll(1)} />}

        <div ref={scrollRef} className="overflow-x-auto scroll-smooth pb-3"
          style={{ scrollbarColor: '#1e1e3a #0d0b2e' }}>

          <div style={{ width: contentW > 0 ? contentW + 'px' : 'auto', minWidth: '100%' }}
               className="flex justify-center">
            <div style={{ width: contentW > 0 ? contentW + 'px' : 'auto' }}>

              {/* ── Level 1: Parent node ── */}
              <div className="flex justify-center pb-0">
                <NodeCard node={currentNode} isParent />
              </div>

              {/* ── Level 1→2 connectors ── */}
              {children.length > 0 && (
                <Connectors childCount={children.length} contentW={contentW} gradientId="treeConnGrad" />
              )}

              {/* ── Level 2: Children + Level 3: Grandchildren ── */}
              {children.length > 0 && (
                <div className="flex">
                  {children.map((child, i) => (
                    <div key={nodeKey(child, i)}
                         className="flex flex-col items-center flex-shrink-0"
                         style={{ width: COL_W + 'px' }}>
                      <NodeCard node={child} onClick={() => drillDown(i)} />

                      {child.children && child.children.length > 0 && (
                        <GrandchildrenTree
                          grandchildren={child.children}
                          parentId={nodeKey(child, i)}
                          onDrillGrandchild={(gc) => drillToGrandchild(i, gc)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Empty state ── */}
      {children.length === 0 && currentNode && !currentNode.empty && <TreeEmpty />}
    </div>
  );
}

export default SponsorTree;
