import { useEffect, useRef } from 'react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const DATA_POINTS = [
  { month: 0, value: 5000 },
  { month: 1, value: 12000 },
  { month: 2, value: 18000 },
  { month: 3, value: 35000 },
  { month: 4, value: 60000 },
  { month: 5, value: 125200 },
  { month: 6, value: 140000 },
  { month: 7, value: 170000 },
  { month: 8, value: 195000 },
  { month: 9, value: 210000 },
  { month: 10, value: 230000 },
  { month: 11, value: 240800 },
];

const MAX_VALUE = 250000;
const Y_LABELS = ['0k', '25K', '50K', '100K', '150K', '200K', '250K'];
const Y_VALUES = [0, 25000, 50000, 100000, 150000, 200000, 250000];

function drawChart(canvas) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const width = rect.width;
  const height = rect.height;
  const padLeft = 0;
  const padRight = 10;
  const padTop = 10;
  const padBottom = 5;
  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  ctx.clearRect(0, 0, width, height);

  /* plot points */
  const points = DATA_POINTS.map((d, i) => ({
    x: padLeft + (i / (DATA_POINTS.length - 1)) * chartW,
    y: padTop + chartH - (d.value / MAX_VALUE) * chartH,
  }));

  /* gradient fill */
  const grad = ctx.createLinearGradient(0, padTop, 0, padTop + chartH);
  grad.addColorStop(0, 'rgba(127, 37, 251, 0.35)');
  grad.addColorStop(1, 'rgba(127, 37, 251, 0.0)');

  ctx.beginPath();
  ctx.moveTo(points[0].x, padTop + chartH);
  points.forEach((p, i) => {
    if (i === 0) {
      ctx.lineTo(p.x, p.y);
      return;
    }
    const prev = points[i - 1];
    const cpx1 = prev.x + (p.x - prev.x) * 0.4;
    const cpx2 = p.x - (p.x - prev.x) * 0.4;
    ctx.bezierCurveTo(cpx1, prev.y, cpx2, p.y, p.x, p.y);
  });
  ctx.lineTo(points.at(-1).x, padTop + chartH);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  /* line */
  ctx.beginPath();
  points.forEach((p, i) => {
    if (i === 0) {
      ctx.moveTo(p.x, p.y);
      return;
    }
    const prev = points[i - 1];
    const cpx1 = prev.x + (p.x - prev.x) * 0.4;
    const cpx2 = p.x - (p.x - prev.x) * 0.4;
    ctx.bezierCurveTo(cpx1, prev.y, cpx2, p.y, p.x, p.y);
  });
  ctx.strokeStyle = '#9333ea';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  /* highlight dot at June */
  const june = points[5];
  ctx.beginPath();
  ctx.arc(june.x, june.y, 5, 0, Math.PI * 2);
  ctx.fillStyle = '#CB3CFF';
  ctx.fill();
  ctx.strokeStyle = '#020717';
  ctx.lineWidth = 2;
  ctx.stroke();
}

function RevenueChart() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    drawChart(canvas);

    const handleResize = () => drawChart(canvas);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="rounded-xl border border-[#1e1e3a] bg-[#]/60 p-5 mb-6">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-sm text-gray-400">Total revenue</h3>
          <span className="text-xl font-bold text-white">$240.8K</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 font-semibold">
            ↑ 24% ↑
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 rounded bg-purple-500 inline-block" />{' '}
            Revenue
          </span>
          <span className="text-gray-600">Jun 2024 - Dec 2024 ▾</span>
        </div>
      </div>

      {/* Chart area */}
      <div className="flex gap-2">
        {/* Y-axis labels */}
        <div className="flex flex-col-reverse justify-between text-[10px] text-gray-600 pr-1 pb-5 select-none">
          {Y_LABELS.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>

        {/* Canvas container */}
        <div className="flex-1 flex flex-col">
          <div className="relative flex-1 min-h-[200px]">
            <canvas ref={canvasRef} className="w-full h-full block" />

            {/* Tooltip overlay for $125.2k */}
            <div
              className="absolute pointer-events-none"
              style={{ left: '45%', top: '35%', transform: 'translate(-50%, -100%)' }}
            >
              <div className="bg-[#1a1a3e] border border-[#2e2e5e] rounded-lg px-3 py-1.5 text-center shadow-xl">
                <p className="text-sm font-bold text-white flex items-center gap-1">
                  $125.2k{' '}
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-green-500/20 text-green-400 font-semibold">
                    ↑ 25% ↑
                  </span>
                </p>
                <p className="text-[10px] text-gray-500">June 01, 2025</p>
              </div>
            </div>
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between text-[10px] text-gray-600 pt-2 select-none">
            {MONTHS.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RevenueChart;
