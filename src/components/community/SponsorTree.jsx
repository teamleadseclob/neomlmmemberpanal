/**
 * SponsorTree – Full tree on one scrollable page.
 *
 * • Logged-in user is ALWAYS the root at top.
 * • Clicking any user fetches their children from API and shows below them.
 * • Click again to collapse.
 * • Scrollable horizontally and vertically.
 * • SVG connector paths with rounded corners and V-shaped arrowheads.
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../context/useAuth';
import { gettree, getdownlinestats } from '../../config/apiService';

/* ═══════════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════════ */
const COL_W = 150;
const CONN_H = 40;
const TURN_Y = 14;
const RADIUS = 12;
const STROKE_W = 1.5;
const TIP_W = 6;
const TIP_H = 6.5;

/* ═══════════════════════════════════════════════════════════════
   SVG PATH BUILDERS
   ═══════════════════════════════════════════════════════════════ */
function buildConnPath(childIdx, childCount, colW) {
  const contentW = childCount * colW;
  const cx = contentW / 2;
  const childX = childIdx * colW + colW / 2;
  const dx = childX - cx;
  const absDx = Math.abs(dx);

  if (absDx < 1) return `M ${cx} 0 L ${cx} ${CONN_H - TIP_H - 1}`;

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

function buildArrowTip(childIdx, colW) {
  const x = childIdx * colW + colW / 2;
  const y = CONN_H;
  return `M ${x - TIP_W} ${y - TIP_H} L ${x} ${y} L ${x + TIP_W} ${y - TIP_H}`;
}

/* ═══════════════════════════════════════════════════════════════
   NODE TOOLTIP
   ═══════════════════════════════════════════════════════════════ */
function NodeTooltip({ userId, onClose }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    let cancelled = false;
    getdownlinestats(userId)
      .then((res) => { if (!cancelled) setStats(res?.data ?? null); })
      .catch(() => { if (!cancelled) setStats(null); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [userId]);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  return (
    <div ref={ref} className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 w-52" role="tooltip">
      <div className="rounded-xl border border-[#2a2a4a] bg-[#0d0b2e] shadow-2xl shadow-black/60 p-3">
        {loading ? (
          <div className="flex justify-center py-3">
            <span className="w-5 h-5 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
          </div>
        ) : !stats ? (
          <p className="text-xs text-gray-500 text-center py-2">No data available</p>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#2a2a4a]">
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
              { label: 'Personal SWP', value: `$${(stats.personalSwp ?? 0).toLocaleString()}` },
              { label: 'Trading Capital', value: `$${(stats.tradingCapital ?? 0).toLocaleString()}` },
              { label: 'Team SWP Volume', value: `$${(stats.teamSwpVolume ?? 0).toLocaleString()}` },
              { label: 'Team Trading Cap', value: `$${(stats.teamTradingCapital ?? 0).toLocaleString()}` },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-0.5">
                <span className="text-[10px] text-gray-400">{label}</span>
                <span className="text-[10px] font-semibold text-white">{value}</span>
              </div>
            ))}
          </>
        )}
        <div className="absolute left-1/2 -translate-x-1/2 top-full w-2.5 h-2.5 border-r border-b border-[#2a2a4a] bg-[#0d0b2e] rotate-45 -mt-1.5" />
      </div>
    </div>
  );
}

NodeTooltip.propTypes = { userId: PropTypes.string.isRequired, onClose: PropTypes.func.isRequired };

/* ═══════════════════════════════════════════════════════════════
   NODE CARD
   ═══════════════════════════════════════════════════════════════ */
function NodeCard({ node, isRoot = false, level = 0, isExpanded = false, onToggle }) {
  const [showTooltip, setShowTooltip] = useState(false);

  if (!node || node.empty) {
    return (
      <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg border border-dashed border-[#2a2a4a] bg-[#0a0820]/80 whitespace-nowrap">
        <div className="w-5 h-5 rounded-full bg-[#1a1a3e] flex items-center justify-center">
          <svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
        </div>
        <span className="text-[10px] text-gray-500">No User</span>
      </div>
    );
  }

  const sizes = isRoot
    ? { avatar: 'w-7 h-7', avatarFont: 'text-xs', nameFont: 'text-[11px]', idFont: 'text-[8px]', card: 'px-2.5 py-1.5 border-purple-500/60 bg-gradient-to-br from-[#1a0a3e] to-[#0d0b2e] shadow-lg shadow-purple-500/15' }
    : level === 1
    ? { avatar: 'w-6 h-6', avatarFont: 'text-[10px]', nameFont: 'text-[10px]', idFont: 'text-[7px]', card: 'px-2 py-1.5 border-purple-500/40 bg-[#0d0b2e] shadow-md shadow-purple-500/5' }
    : { avatar: 'w-5 h-5', avatarFont: 'text-[8px]', nameFont: 'text-[9px]', idFont: 'text-[7px]', card: 'px-1.5 py-1 border-purple-500/25 bg-[#0d0b2e]/80 shadow-sm shadow-purple-500/5' };

  return (
    <div className="relative">
      <div data-node-card className={`flex items-center gap-2 rounded-lg border whitespace-nowrap transition-all duration-200 max-w-[120px]
        ${sizes.card} ${isExpanded ? 'ring-1 ring-purple-500/50' : ''} cursor-pointer hover:border-purple-400`}>
        {/* Click to expand/collapse */}
        <button
          type="button"
          onClick={onToggle}
          className="flex items-center gap-2 bg-transparent border-none p-0 cursor-pointer min-w-0 overflow-hidden"
        >
          <div className={`${sizes.avatar} rounded-full bg-gradient-to-br from-[#7F25FB] to-[#D946EF] flex items-center justify-center flex-shrink-0`}>
            <span className={`${sizes.avatarFont} font-bold text-white`}>
              {node.name ? node.name.charAt(0).toUpperCase() : 'N'}
            </span>
          </div>
          <div className="min-w-0 overflow-hidden">
            <p className={`${sizes.nameFont} font-semibold text-white truncate uppercase`}>{node.name}</p>
            <p className={`${sizes.idFont} text-gray-400 font-mono truncate`}>{node.userId}</p>
          </div>
        </button>

        {/* Eye icon for tooltip */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setShowTooltip((v) => !v); }}
          className="flex-shrink-0 w-4 h-4 flex items-center justify-center text-gray-500 hover:text-purple-400 transition-colors bg-transparent border-none cursor-pointer"
          aria-label="View stats"
        >
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>

        {/* Expand/collapse chevron */}
        <svg className={`w-3 h-3 text-purple-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </div>

      {showTooltip && node.userId && (
        <NodeTooltip userId={node.userId} onClose={() => setShowTooltip(false)} />
      )}
    </div>
  );
}

NodeCard.propTypes = { node: PropTypes.object, isRoot: PropTypes.bool, level: PropTypes.number, isExpanded: PropTypes.bool, onToggle: PropTypes.func };

/* ═══════════════════════════════════════════════════════════════
   SVG CONNECTORS — simple vertical + horizontal lines
   ═══════════════════════════════════════════════════════════════ */
function Connectors({ containerRef, childRefs, gradientId, expanded }) {
  const [paths, setPaths] = useState([]);
  const svgRef = useRef(null);

  useEffect(() => {
    const update = () => {
      if (!containerRef.current || !svgRef.current) return;
      const svgRect = svgRef.current.getBoundingClientRect();
      const cx = svgRect.width / 2;
      const newPaths = [];
      childRefs.current.forEach((el) => {
        if (!el) return;
        const cardEl = el.querySelector('[data-node-card]');
        if (!cardEl) return;
        const cardRect = cardEl.getBoundingClientRect();
        const childX = cardRect.left + cardRect.width / 2 - svgRect.left;
        const dx = childX - cx;
        const absDx = Math.abs(dx);
        let path;
        if (absDx < 1) {
          path = `M ${cx} 0 L ${cx} ${CONN_H - TIP_H - 1}`;
        } else {
          const dir = dx > 0 ? 1 : -1;
          const r = Math.min(RADIUS, absDx / 2);
          path = [
            `M ${cx} 0`,
            `L ${cx} ${TURN_Y - r}`,
            `Q ${cx} ${TURN_Y} ${cx + dir * r} ${TURN_Y}`,
            `L ${childX - dir * r} ${TURN_Y}`,
            `Q ${childX} ${TURN_Y} ${childX} ${TURN_Y + r}`,
            `L ${childX} ${CONN_H - TIP_H - 1}`,
          ].join(' ');
        }
        const tipPath = `M ${childX - TIP_W} ${CONN_H - TIP_H} L ${childX} ${CONN_H} L ${childX + TIP_W} ${CONN_H - TIP_H}`;
        newPaths.push({ path, tipPath });
      });
      setPaths(newPaths);
    };
    // Small delay to let DOM settle after expand
    const timer = setTimeout(update, 50);
    const observer = new ResizeObserver(update);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => { clearTimeout(timer); observer.disconnect(); };
  }, [containerRef, childRefs, expanded]);

  return (
    <svg ref={svgRef} width="100%" height={CONN_H} className="block" style={{ overflow: 'visible' }} aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2={CONN_H} gradientUnits="userSpaceOnUse">
          <stop offset="0.2" stopColor="#CB3CFF" />
          <stop offset="0.7" stopColor="#7F25FB" />
        </linearGradient>
      </defs>
      {paths.map((p, i) => (
        <g key={`${gradientId}-${i}`}>
          <path d={p.path} stroke={`url(#${gradientId})`} strokeWidth={STROKE_W} strokeLinecap="round" fill="none" />
          <path d={p.tipPath} stroke={`url(#${gradientId})`} strokeWidth={STROKE_W} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      ))}
    </svg>
  );
}

Connectors.propTypes = { containerRef: PropTypes.object.isRequired, childRefs: PropTypes.object.isRequired, gradientId: PropTypes.string.isRequired, expanded: PropTypes.bool };

/* ═══════════════════════════════════════════════════════════════
   TREE NODE — Recursive, fetches children on click
   ═══════════════════════════════════════════════════════════════ */
function TreeNode({ node, level = 0, parentKey = 'root', defaultOpen = false, autoOpenDepth = 0 }) {
  const [expanded, setExpanded] = useState(defaultOpen);
  const [children, setChildren] = useState(defaultOpen && node?.children ? node.children : null);
  const [loading, setLoading] = useState(false);
  const [childAutoOpen, setChildAutoOpen] = useState(autoOpenDepth > 0 ? autoOpenDepth - 1 : 0);

  // Auto-fetch children when defaultOpen/autoOpenDepth is set but children not yet loaded
  useEffect(() => {
    if ((defaultOpen || autoOpenDepth > 0) && children === null && node?.userId) {
      setLoading(true);
      gettree(node.userId)
        .then((res) => {
          if (res.success && res.data?.children) setChildren(res.data.children);
          else setChildren([]);
          setExpanded(true);
        })
        .catch(() => setChildren([]))
        .finally(() => setLoading(false));
    }
  }, []);

  const handleToggle = useCallback(() => {
    if (expanded) {
      setExpanded(false);
      return;
    }
    // If already fetched, just expand
    if (children !== null) {
      setChildAutoOpen(1);
      setExpanded(true);
      return;
    }
    // Fetch children from API
    if (!node?.userId) return;
    setLoading(true);
    gettree(node.userId)
      .then((res) => {
        if (res.success && res.data?.children) {
          setChildren(res.data.children);
        } else {
          setChildren([]);
        }
        setChildAutoOpen(1);
        setExpanded(true);
      })
      .catch(() => setChildren([]))
      .finally(() => setLoading(false));
  }, [expanded, children, node?.userId]);

  if (!node) return null;

  const gradId = `grad-${parentKey}-${level}`;
  const containerRef = useRef(null);
  const childRefs = useRef([]);

  return (
    <div className="flex flex-col items-center">
      {/* Node card */}
      <NodeCard node={node} isRoot={level === 0} level={level} isExpanded={expanded} onToggle={handleToggle} />

      {/* Loading spinner */}
      {loading && (
        <div className="flex justify-center py-3">
          <span className="w-4 h-4 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
        </div>
      )}

      {/* Children (only when expanded) */}
      {expanded && children && children.length > 0 && (
        <div ref={containerRef} className="flex flex-col items-center">
          <Connectors containerRef={containerRef} childRefs={childRefs} gradientId={gradId} expanded={expanded} />
          <div className="flex gap-3">
            {children.map((child, i) => {
              const key = child?.userId || child?._id || `${parentKey}-${i}`;
              return (
                <div key={key} ref={(el) => { childRefs.current[i] = el; }} className="flex flex-col items-center">
                  <TreeNode node={child} level={level + 1} parentKey={key} defaultOpen={level < 2} autoOpenDepth={childAutoOpen} />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* No children message */}
      {expanded && children && children.length === 0 && (
        <p className="text-[9px] text-gray-500 mt-2">No downline</p>
      )}
    </div>
  );
}

TreeNode.propTypes = { node: PropTypes.object, level: PropTypes.number, parentKey: PropTypes.string, defaultOpen: PropTypes.bool, autoOpenDepth: PropTypes.number };

/* ═══════════════════════════════════════════════════════════════
   LOADING / ERROR
   ═══════════════════════════════════════════════════════════════ */
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
        <button type="button" onClick={() => globalThis.location.reload()}
          className="px-4 py-2 text-xs font-medium text-purple-300 border border-purple-500/30 rounded-lg hover:bg-purple-500/10 transition-all duration-200 cursor-pointer">
          Retry
        </button>
      </div>
    </div>
  );
}

TreeError.propTypes = { message: PropTypes.string.isRequired };

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
function SponsorTree() {
  const { user } = useAuth();
  const [rootData, setRootData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.userId) return;
    let cancelled = false;
    setLoading(true);
    gettree(user.userId)
      .then((res) => {
        if (cancelled) return;
        if (res.success && res.data) setRootData(res.data);
        else setError(res.message || 'Failed to load tree data');
      })
      .catch((err) => {
        if (!cancelled) setError(err?.response?.data?.message || err.message || 'Failed to load tree data');
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [user?.userId]);

  if (loading) return <TreeLoading />;
  if (error || !rootData) return <TreeError message={error || 'No tree data available'} />;

  return (
    <div className="rounded-xl p-5 md:p-6" style={{ background: '#181F3033', border: '1px solid #FFFFFF0D' }}>
      {/* Scrollable container */}
      {/* Draggable scrollable container */}
      <div
        className="overflow-auto rounded-lg cursor-grab active:cursor-grabbing select-none"
        style={{ scrollbarColor: '#1e1e3a #0d0b2e', maxHeight: '80vh' }}
        onMouseDown={(e) => {
          const el = e.currentTarget;
          el.dataset.dragging = 'true';
          el.dataset.startX = e.clientX;
          el.dataset.startY = e.clientY;
          el.dataset.scrollLeft = el.scrollLeft;
          el.dataset.scrollTop = el.scrollTop;
        }}
        onMouseMove={(e) => {
          const el = e.currentTarget;
          if (el.dataset.dragging !== 'true') return;
          e.preventDefault();
          const dx = e.clientX - Number(el.dataset.startX);
          const dy = e.clientY - Number(el.dataset.startY);
          el.scrollLeft = Number(el.dataset.scrollLeft) - dx;
          el.scrollTop = Number(el.dataset.scrollTop) - dy;
        }}
        onMouseUp={(e) => { e.currentTarget.dataset.dragging = 'false'; }}
        onMouseLeave={(e) => { e.currentTarget.dataset.dragging = 'false'; }}
      >
        <div className="min-w-max py-6 px-4">
          <TreeNode node={rootData} level={0} parentKey="root" defaultOpen />
        </div>
      </div>
    </div>
  );
}

export default SponsorTree;