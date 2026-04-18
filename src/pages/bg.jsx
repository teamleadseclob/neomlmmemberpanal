import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const N = 130;
const CONN = 190;

// Exact color ramp from GIF: crimson-pink top → electric purple bottom
function yColor(y, H) {
  const t = Math.max(0, Math.min(1, y / H));
  let r, g, b;
  if (t < 0.45) {
    const s = t / 0.45;
    r = Math.round(220 - s * 20);
    g = 0;
    b = Math.round(60 + s * 80);
  } else {
    const s = (t - 0.45) / 0.55;
    r = Math.round(200 - s * 140);
    g = 0;
    b = Math.round(140 + s * 115);
  }
  return { r, g, b };
}

PlexusBackground.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
}
PlexusBackground.defaultProps = {
  style: undefined,
}

export default function PlexusBackground({ children, style }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W, H, animId;
    const pts = [];

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    function initNodes() {
      pts.length = 0;
      for (let i = 0; i < N; i++) {
        pts.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: 1 + Math.random() * 2,
          ph: Math.random() * Math.PI * 2,
          sp: 0.006 + Math.random() * 0.016,
        });
      }
    }

    function drawBackground() {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, W, H);

      let g = ctx.createRadialGradient(W * 0.05, 0, 0, W * 0.05, 0, W * 0.7);
      g.addColorStop(0, "rgba(80,0,20,0.55)");
      g.addColorStop(0.4, "rgba(50,0,15,0.2)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      g = ctx.createRadialGradient(W * 0.85, H, 0, W * 0.85, H, W * 0.75);
      g.addColorStop(0, "rgba(40,0,80,0.5)");
      g.addColorStop(0.5, "rgba(20,0,50,0.15)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      g = ctx.createRadialGradient(W * 0.68, H * 0.38, 0, W * 0.68, H * 0.38, H * 0.28);
      g.addColorStop(0, "rgba(60,0,100,0.12)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      drawBackground();

      for (const p of pts) {
        p.x += p.vx; p.y += p.vy; p.ph += p.sp;
        if (p.x < -30) p.x = W + 30; else if (p.x > W + 30) p.x = -30;
        if (p.y < -30) p.y = H + 30; else if (p.y > H + 30) p.y = -30;
      }

      // Edges
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        const ca = yColor(a.y, H);
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < CONN) {
            const al = Math.pow(1 - d / CONN, 1.4);
            const cb = yColor(b.y, H);
            const lg = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            lg.addColorStop(0, `rgba(${ca.r},${ca.g},${ca.b},${(al * 0.75).toFixed(3)})`);
            lg.addColorStop(1, `rgba(${cb.r},${cb.g},${cb.b},${(al * 0.75).toFixed(3)})`);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = lg;
            ctx.lineWidth = 0.5 + al * 1.2;
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const p of pts) {
        const pulse = 0.75 + 0.25 * Math.sin(p.ph);
        const c = yColor(p.y, H);
        const gr = p.r * 8 * pulse;

        const gw = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, gr);
        gw.addColorStop(0, `rgba(${Math.min(255, c.r + 80)},${Math.min(255, c.g + 30)},${Math.min(255, c.b + 80)},0.95)`);
        gw.addColorStop(0.25, `rgba(${c.r},${c.g},${c.b},0.4)`);
        gw.addColorStop(0.6, `rgba(${c.r},${c.g},${c.b},0.1)`);
        gw.addColorStop(1, `rgba(${c.r},${c.g},${c.b},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, gr, 0, Math.PI * 2);
        ctx.fillStyle = gw;
        ctx.fill();

        // Bright near-white core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,200,255,0.95)";
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    resize();
    initNodes();
    draw();

    const ro = new ResizeObserver(() => { resize(); initNodes(); });
    ro.observe(canvas.parentElement);
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: "100vh", background: "#000", overflow: "hidden", ...style }}>
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", pointerEvents: "none" }}
      />
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>{children}</div>
    </div>
  );
}