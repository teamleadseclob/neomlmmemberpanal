import { useEffect, useRef, useState, useCallback } from 'react';
import { getgraph } from '../../config/apiService';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const PAD    = { left: 0, right: 10, top: 10, bottom: 5 };

function getDynamicYLabels(dataPoints) {
  const values = dataPoints.map((d) => d.value).filter((v) => Number.isFinite(v) && v >= 0)
  const maxVal = values.length > 0 ? Math.max(...values) * 1.1 : 1
  const safeMax = maxVal > 0 ? maxVal : 1
  const step = safeMax / 6
  return Array.from({ length: 7 }, (_, i) => {
    const v = step * i
    if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`
    if (v >= 1000)    return `${(v / 1000).toFixed(0)}K`
    return `${Math.round(v)}`
  })
}

function getPoints(canvas, dataPoints) {
  const rect   = canvas.getBoundingClientRect()
  const chartW = rect.width  - PAD.left - PAD.right
  const chartH = rect.height - PAD.top  - PAD.bottom
  const values = dataPoints.map((d) => d.value).filter((v) => Number.isFinite(v) && v >= 0)
  const maxVal = values.length > 0 ? Math.max(...values) * 1.1 : 1
  const safeMax = maxVal > 0 ? maxVal : 1
  return dataPoints.map((d, i) => ({
    x:     PAD.left + (i / Math.max(dataPoints.length - 1, 1)) * chartW,
    y:     PAD.top  + chartH - ((Number.isFinite(d.value) ? d.value : 0) / safeMax) * chartH,
    value: d.value,
    day:   d.day,
  }))
}

function drawChart(canvas, dataPoints, progress = 1, hoverIdx = -1) {
  const ctx  = canvas.getContext('2d');
  const dpr  = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width  = rect.width  * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const width  = rect.width;
  const height = rect.height;
  const chartW = width  - PAD.left - PAD.right;
  const chartH = height - PAD.top  - PAD.bottom;

  ctx.clearRect(0, 0, width, height);

  const values  = dataPoints.map((d) => d.value).filter((v) => Number.isFinite(v) && v >= 0)
  const maxVal  = values.length > 0 ? Math.max(...values) * 1.1 : 1
  const safeMax = maxVal > 0 ? maxVal : 1
  const points  = dataPoints.map((d, i) => ({
    x: PAD.left + (i / Math.max(dataPoints.length - 1, 1)) * chartW,
    y: PAD.top  + chartH - ((Number.isFinite(d.value) ? d.value : 0) / safeMax) * chartH,
  }))

  const clipX = PAD.left + chartW * progress;
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, clipX, height);
  ctx.clip();

  const grad = ctx.createLinearGradient(0, PAD.top, 0, PAD.top + chartH);
  grad.addColorStop(0, 'rgba(127,37,251,0.35)');
  grad.addColorStop(1, 'rgba(127,37,251,0.0)');

  ctx.beginPath();
  ctx.moveTo(points[0].x, PAD.top + chartH);
  points.forEach((p, i) => {
    if (i === 0) { ctx.lineTo(p.x, p.y); return; }
    const prev = points[i - 1];
    const cx1  = prev.x + (p.x - prev.x) * 0.4;
    const cx2  = p.x    - (p.x - prev.x) * 0.4;
    ctx.bezierCurveTo(cx1, prev.y, cx2, p.y, p.x, p.y);
  });
  ctx.lineTo(points.at(-1).x, PAD.top + chartH);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.beginPath();
  points.forEach((p, i) => {
    if (i === 0) { ctx.moveTo(p.x, p.y); return; }
    const prev = points[i - 1];
    const cx1  = prev.x + (p.x - prev.x) * 0.4;
    const cx2  = p.x    - (p.x - prev.x) * 0.4;
    ctx.bezierCurveTo(cx1, prev.y, cx2, p.y, p.x, p.y);
  });
  ctx.strokeStyle = '#9333ea';
  ctx.lineWidth   = 2.5;
  ctx.stroke();
  ctx.restore();

  if (hoverIdx >= 0 && hoverIdx < points.length) {
    const hp = points[hoverIdx];
    ctx.save();
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = 'rgba(203,60,255,0.4)';
    ctx.lineWidth   = 1;
    ctx.beginPath();
    ctx.moveTo(hp.x, PAD.top);
    ctx.lineTo(hp.x, PAD.top + chartH);
    ctx.stroke();
    ctx.restore();

    ctx.beginPath();
    ctx.arc(hp.x, hp.y, 9, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(203,60,255,0.2)';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(hp.x, hp.y, 5, 0, Math.PI * 2);
    ctx.fillStyle   = '#CB3CFF';
    ctx.fill();
    ctx.strokeStyle = '#020717';
    ctx.lineWidth   = 2;
    ctx.stroke();
  }
}

function formatValue(v) {
  if (v >= 1000) return `$${(v / 1000).toFixed(1)}k`;
  return `$${v}`;
}

function xLabels(days) {
  return Array.from({ length: days }, (_, i) => {
    const d = i + 1;
    const isLast     = d === days;
    const isMultOf5  = d % 5 === 0;
    if (isMultOf5 && !isLast && days - d < 3) return '';
    return (d === 1 || isMultOf5 || isLast) ? String(d) : '';
  });
}

function RevenueChart() {
  const canvasRef   = useRef(null);
  const wrapperRef  = useRef(null);
  const progressRef = useRef(0);
  const hoverIdxRef = useRef(-1);
  const dataRef     = useRef([]);

  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const [selectedYear]                    = useState(now.getFullYear());
  const [dropdownOpen,  setDropdownOpen]  = useState(false);
  const [tooltip,       setTooltip]       = useState(null);
  const [dataPoints,    setDataPoints]    = useState([]);
  const [totalRevenue,  setTotalRevenue]  = useState(0);
  const [loading,       setLoading]       = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getgraph(selectedMonth + 1, selectedYear)
      .then((res) => {
        if (cancelled) return;
        const daily = res.data?.dailyRevenue ?? [];
        const pts   = daily.map((d) => ({ day: d.day, value: d.value }));
        setDataPoints(pts);
        setTotalRevenue(res.data?.totalRevenue ?? 0);
      })
      .catch(() => { if (!cancelled) setDataPoints([]); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [selectedMonth, selectedYear]);

  dataRef.current = dataPoints;

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) drawChart(canvas, dataRef.current, progressRef.current, hoverIdxRef.current);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dataPoints.length === 0) return;
    progressRef.current = 0;
    hoverIdxRef.current = -1;
    setTooltip(null);

    const DURATION = 1400;
    let rafId = null, startTime = null;
    const ease = (t) => 1 - (1 - t) ** 3;

    const animate = (ts) => {
      if (!startTime) startTime = ts;
      const elapsed  = ts - startTime;
      const progress = ease(Math.min(elapsed / DURATION, 1));
      progressRef.current = progress;
      drawChart(canvas, dataRef.current, progress, hoverIdxRef.current);
      if (elapsed < DURATION) rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [dataPoints]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const handleResize = () => drawChart(canvas, dataRef.current, 1, hoverIdxRef.current);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = useCallback((e) => {
    const canvas  = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper || dataRef.current.length === 0) return;

    const rect   = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const pts    = getPoints(canvas, dataRef.current);

    let nearest = 0, minDist = Infinity;
    pts.forEach((p, i) => {
      const d = Math.abs(p.x - mouseX);
      if (d < minDist) { minDist = d; nearest = i; }
    });

    hoverIdxRef.current = nearest;
    redraw();

    const wRect = wrapper.getBoundingClientRect();
    setTooltip({
      x:     rect.left - wRect.left + pts[nearest].x,
      y:     rect.top  - wRect.top  + pts[nearest].y,
      value: dataRef.current[nearest].value,
      day:   dataRef.current[nearest].day,
    });
  }, [redraw]);

  const handleMouseLeave = useCallback(() => {
    hoverIdxRef.current = -1;
    redraw();
    setTooltip(null);
  }, [redraw]);

  const labels = xLabels(dataPoints.length);

  return (
    <div className="rounded-xl border border-[#1e1e3a] p-5 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-sm text-gray-400">Monthly Revenue</h3>
          <span className="text-xl font-bold text-white">{formatValue(totalRevenue)}</span>
          {loading && <span className="w-4 h-4 rounded-full border-2 border-purple-500/30 border-t-purple-500 animate-spin" />}
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" />{' '}Revenue
          </span>

          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen((o) => !o)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#2a2a4a] bg-[#0f0f1e]
                         text-xs text-gray-300 hover:border-purple-500/50 hover:text-white
                         transition-all duration-150 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              {MONTHS[selectedMonth]} {selectedYear}
              <svg className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-1.5 z-50 w-44 rounded-xl border border-[#2a2a4a] bg-[#0f0f1e] shadow-2xl shadow-black/50 overflow-hidden">
                <div className="grid grid-cols-3 gap-1 p-2">
                  {MONTHS.map((m, i) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => { setSelectedMonth(i); setDropdownOpen(false); }}
                      className={`py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-150 cursor-pointer border-none
                        ${i === selectedMonth
                          ? 'bg-gradient-to-r from-[#7F25FB] to-[#CB3CFF] text-white shadow-lg shadow-purple-500/20'
                          : 'bg-transparent text-gray-400 hover:bg-[#1a1a3e] hover:text-white'}`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex-1 flex flex-col">
          <div ref={wrapperRef} className="relative flex-1 min-h-40 max-h-80">
            <canvas
              ref={canvasRef}
              className="w-full h-full block cursor-crosshair"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            />

            {tooltip && (
              <div
                key={`${tooltip.day}-${selectedMonth}`}
                className="absolute pointer-events-none z-10"
                style={{
                  left:      tooltip.x,
                  top:       tooltip.y,
                  transform: 'translate(-50%, -115%)',
                  animation: 'tooltipPop 180ms cubic-bezier(0.34,1.56,0.64,1) forwards',
                }}
              >
                <div className="bg-[#1a1a3e] border border-[#2e2e5e] rounded-lg px-3 py-1.5 text-center shadow-xl whitespace-nowrap">
                  <p className="text-sm font-bold text-white">{formatValue(tooltip.value)}</p>
                  <p className="text-[10px] text-gray-500">{MONTHS[selectedMonth]} {tooltip.day}, {selectedYear}</p>
                </div>
                <div className="w-2 h-2 bg-[#1a1a3e] border-r border-b border-[#2e2e5e] rotate-45 mx-auto -mt-1" />
              </div>
            )}
          </div>

          <div className="relative h-5 pt-2 select-none">
            {labels.map((l, i) => {
              if (!l) return null;
              const pct = (i / Math.max(dataPoints.length - 1, 1)) * 100;
              return (
                <span
                  key={`day-${l}-${i}`}
                  className="absolute text-[10px] text-gray-600 -translate-x-1/2"
                  style={{ left: `${pct}%` }}
                >
                  {l}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes tooltipPop {
          from { opacity: 0; transform: translate(-50%, -105%) scale(0.8); }
          to   { opacity: 1; transform: translate(-50%, -115%) scale(1); }
        }
      `}</style>
    </div>
  );
}

export default RevenueChart;
