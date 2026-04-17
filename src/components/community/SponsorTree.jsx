/**
 * SponsorTree – 2-level paginated tree with infinite children.
 *
 * • Only the current parent + its direct children are shown at once.
 * • Clicking an active child "drills down" (makes it the new parent).
 * • Breadcrumb trail lets you navigate back up.
 * • Children scroll horizontally with ←/→ buttons.
 * • Dynamic SVG connector paths fan out from parent center to each child
 *   with rounded corners and V-shaped arrowheads (matching Bottom.svg style).
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

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
   MOCK TREE DATA  (replace with API data in production)
   ═══════════════════════════════════════════════════════════════ */
const TREE_DATA = {
  name: 'Daniel', id: 'APEX786456', active: true,
  children: [
    {
      name: 'Daniel', id: 'APEX786456', active: true,
      children: [
        { name: 'Ravi', id: 'APEX786776', active: true, children: [{ empty: true }, { empty: true }] },
        { name: 'Nava', id: 'APEX786776', active: true, children: [
          { name: 'Snitch', id: 'APEX786776', active: true, children: [] },
          { name: 'Nava', id: 'APEX786778', active: true, children: [] },
        ]},
        { name: 'Sarah', id: 'APEX786800', active: true, children: [{ empty: true }] },
      ],
    },
    {
      name: 'Navi', id: 'APEX786776', active: true,
      children: [
        { name: 'Alexa', id: 'APEX784776', active: true, children: [{ empty: true }, { empty: true }] },
        { name: 'Rex', id: 'APEX789100', active: true, children: [] },
      ],
    },
    {
      name: 'Alexa', id: 'APEX784776', active: true,
      children: [
        { name: 'Priya', id: 'APEX789200', active: true, children: [] },
        { name: 'Zara', id: 'APEX789201', active: true, children: [{ empty: true }] },
        { name: 'Neo', id: 'APEX789202', active: true, children: [] },
      ],
    },
    {
      name: 'Marco', id: 'APEX789001', active: true,
      children: [{ name: 'Elena', id: 'APEX789300', active: true, children: [] }],
    },
    {
      name: 'Snitch', id: 'APEX786776', active: true,
      children: [{ empty: true }, { name: 'Victor', id: 'APEX789400', active: true, children: [] }],
    },
    {
      name: 'Lisa', id: 'APEX789002', active: true,
      children: [
        { name: 'Jun', id: 'APEX789500', active: true, children: [] },
        { name: 'Maya', id: 'APEX789501', active: true, children: [] },
        { name: 'Raj', id: 'APEX789502', active: true, children: [] },
        { name: 'Kim', id: 'APEX789503', active: true, children: [] },
      ],
    },
    { name: 'Priya', id: 'APEX789003', active: true, children: [] },
    { empty: true },
    { empty: true },
  ],
};

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
    `M ${cx} 0`,                                           // start at parent center
    `L ${cx} ${TURN_Y - r}`,                               // vertical down
    `Q ${cx} ${TURN_Y} ${cx + dir * r} ${TURN_Y}`,         // rounded turn → horizontal
    `L ${childX - dir * r} ${TURN_Y}`,                     // horizontal segment
    `Q ${childX} ${TURN_Y} ${childX} ${TURN_Y + r}`,       // rounded turn → vertical
    `L ${childX} ${CONN_H - TIP_H - 1}`,                   // vertical down to arrow
  ].join(' ');
}

/** V-shaped arrowhead pointing down */
function buildArrowTip(childIdx, childCount) {
  const x = childIdx * COL_W + COL_W / 2;
  const y = CONN_H;
  return `M ${x - TIP_W} ${y - TIP_H} L ${x} ${y} L ${x + TIP_W} ${y - TIP_H}`;
}

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

/** Node card — active user or empty slot */
function NodeCard({ node, onClick, isParent = false }) {
  if (node.empty) {
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

  const hasChildren = node.children && node.children.length > 0;
  const canDrill = !isParent && hasChildren;

  return (
    <button
      type="button"
      onClick={canDrill ? onClick : undefined}
      className={`
        flex items-center gap-2.5 rounded-lg border whitespace-nowrap text-left
        ${isParent
          ? 'px-5 py-3 border-purple-500/60 bg-gradient-to-br from-[#1a0a3e] to-[#0d0b2e] shadow-lg shadow-purple-500/15'
          : 'px-3.5 py-2.5 border-purple-500/40 bg-[#0d0b2e] shadow-md shadow-purple-500/5'}
        ${canDrill
          ? 'cursor-pointer hover:border-purple-400 hover:shadow-purple-500/20 hover:scale-[1.03] transition-all duration-200'
          : 'cursor-default'}
      `}
      title={canDrill ? `View ${node.name}'s network` : undefined}
    >
      <div className={`${isParent ? 'w-10 h-10' : 'w-8 h-8'} rounded-full bg-gradient-to-br from-[#7F25FB] to-[#D946EF] flex items-center justify-center flex-shrink-0`}>
        <span className={`${isParent ? 'text-sm' : 'text-[11px]'} font-bold text-white`}>N</span>
      </div>
      <div className="min-w-0">
        <p className={`${isParent ? 'text-sm' : 'text-xs'} font-semibold text-white truncate`}>{node.name}</p>
        <p className="text-[10px] text-gray-400 font-mono truncate">{node.id}</p>
      </div>
      {canDrill && (
        <svg className="w-3.5 h-3.5 text-purple-400 flex-shrink-0 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      )}
    </button>
  );
}

NodeCard.propTypes = {
  node: PropTypes.shape({
    empty: PropTypes.bool,
    name: PropTypes.string,
    id: PropTypes.string,
    children: PropTypes.array,
  }).isRequired,
  onClick: PropTypes.func,
  isParent: PropTypes.bool,
}
NodeCard.defaultProps = {
  onClick: undefined,
  isParent: false,
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

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════ */
ScrollBtn.propTypes = {
  direction: PropTypes.oneOf(['left', 'right']).isRequired,
  onClick: PropTypes.func.isRequired,
}

function SponsorTree() {
  const [navPath, setNavPath] = useState([]);
  const scrollRef = useRef(null);

  /* ── Resolve current node by navigating down the path ── */
  let currentNode = TREE_DATA;
  for (const idx of navPath) {
    if (currentNode.children?.[idx]) {
      currentNode = currentNode.children[idx];
    }
  }
  const children = currentNode.children || [];
  const contentW = children.length * COL_W;

  /* ── Scroll to center when level changes ── */
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      const sl = (el.scrollWidth - el.clientWidth) / 2;
      el.scrollTo({ left: Math.max(0, sl) });
    }
  }, [navPath]);

  /* ── Navigation ── */
  const drillDown = useCallback((i) => setNavPath((p) => [...p, i]), []);
  const goBack    = useCallback(() => setNavPath((p) => p.slice(0, -1)), []);

  /* ── Breadcrumbs ── */
  const crumbs = [];
  let tmp = TREE_DATA;
  for (const idx of navPath) {
    crumbs.push(tmp.name || '...');
    if (tmp.children?.[idx]) tmp = tmp.children[idx];
  }
  crumbs.push(tmp.name || '...');

  /* ── Scroll helpers ── */
  const scroll = (dir) => scrollRef.current?.scrollBy({ left: dir * COL_W, behavior: 'smooth' });
  const showScrollBtns = children.length > 4;

  return (
    <div className="rounded-xl border border-[#1e1e3a] bg-[#0d0b2e]/40 p-5 md:p-6">

      {/* ── Breadcrumb nav ── */}
      {navPath.length > 0 && (
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
          <nav className="flex items-center gap-1 text-xs text-gray-500 overflow-x-auto">
            {crumbs.map((name, i) => (
              <span key={name + String(i)} className="flex items-center gap-1 whitespace-nowrap">
                {i > 0 && <span className="text-gray-600">/</span>}
                <button type="button" onClick={() => setNavPath(navPath.slice(0, i))}
                  className={`bg-transparent border-none cursor-pointer transition-colors
                    ${i === crumbs.length - 1 ? 'text-purple-400 font-medium' : 'text-gray-500 hover:text-purple-400'}`}>
                  {name}
                </button>
              </span>
            ))}
          </nav>
        </div>
      )}

      {/* ── Tree area (scrollable) ── */}
      <div className="relative">
        {showScrollBtns && <ScrollBtn direction="left"  onClick={() => scroll(-1)} />}
        {showScrollBtns && <ScrollBtn direction="right" onClick={() => scroll(1)} />}

        <div ref={scrollRef} className="overflow-x-auto scroll-smooth pb-3"
          style={{ scrollbarColor: '#1e1e3a #0d0b2e' }}>

          {/* Inner wrapper — exact content width, centered */}
          <div style={{ width: contentW > 0 ? contentW + 'px' : 'auto', minWidth: '100%' }}
               className="flex justify-center">
            <div style={{ width: contentW > 0 ? contentW + 'px' : 'auto' }}>

              {/* ── Parent node (centered) ── */}
              <div className="flex justify-center pb-0">
                <NodeCard node={currentNode} isParent />
              </div>

              {/* ── SVG connector paths ── */}
              {children.length > 0 && (
                <svg
                  width={contentW}
                  height={CONN_H}
                  viewBox={`0 0 ${contentW} ${CONN_H}`}
                  className="block"
                  style={{ overflow: 'visible' }}
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="treeConnGrad" x1="0" y1="0" x2="0" y2={CONN_H}
                                    gradientUnits="userSpaceOnUse">
                      <stop offset="0.2"  stopColor="#CB3CFF" />
                      <stop offset="0.7"  stopColor="#7F25FB" />
                    </linearGradient>
                  </defs>

                  {children.map((child, i) => (
                    <g key={child.id ?? `conn-${i}`}>
                      {/* L-shaped path */}
                      <path
                        d={buildConnPath(i, children.length)}
                        stroke="url(#treeConnGrad)"
                        strokeWidth={STROKE_W}
                        strokeLinecap="round"
                        fill="none"
                      />
                      {/* V-arrowhead */}
                      <path
                        d={buildArrowTip(i, children.length)}
                        stroke="url(#treeConnGrad)"
                        strokeWidth={STROKE_W}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </g>
                  ))}
                </svg>
              )}

              {/* ── Children row ── */}
              {children.length > 0 && (
                <div className="flex">
                  {children.map((child, i) => (
                    <div key={child.id ?? `empty-${i}`}
                         className="flex justify-center flex-shrink-0"
                         style={{ width: COL_W + 'px' }}>
                      <NodeCard node={child} onClick={() => drillDown(i)} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Empty state ── */}
      {children.length === 0 && !currentNode.empty && (
        <div className="text-center py-10">
          <div className="w-12 h-12 rounded-xl bg-[#1a1a3e] flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
            </svg>
          </div>
          <p className="text-sm text-gray-500">No referrals in this branch yet.</p>
        </div>
      )}
    </div>
  );
}

export default SponsorTree;
