import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

function getN()    { return window.innerWidth < 768 ? 80 : 200 }
function getCONN() { return window.innerWidth < 768 ? 150 : 270 }
function getSTARS(){ return window.innerWidth < 768 ? 3  : 6   }

function yColor(y, H, boost = 0) {
  const t = Math.max(0, Math.min(1, y / H));
  let r, g, b;
  if (t < 0.45) {
    const s = t / 0.45;
    r = Math.round(220 - s * 20 + boost);
    g = 0;
    b = Math.round(60 + s * 80 + boost);
  } else {
    const s = (t - 0.45) / 0.55;
    r = Math.round(200 - s * 140 + boost);
    g = 0;
    b = Math.round(140 + s * 115 + boost);
  }
  return { r: Math.min(255, r), g: Math.min(255, g), b: Math.min(255, b) };
}

PlexusBackground.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};
PlexusBackground.defaultProps = {
  style: undefined,
};

export default function PlexusBackground({ children, style }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W, H, animId;
    const pts = [];
    const stars = [];
    const ripples = [];
    let mouseX = -9999, mouseY = -9999;
    let N = getN(), CONN = getCONN(), STAR_COUNT = getSTARS();

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initNodes() {
      pts.length = 0;
      for (let i = 0; i < N; i++) {
        const depth = 0.3 + Math.random() * 0.7;
        pts.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.35 * depth,
          vy: (Math.random() - 0.5) * 0.35 * depth,
          r: (0.8 + Math.random() * 1.8) * depth,
          ph: Math.random() * Math.PI * 2,
          sp: 0.005 + Math.random() * 0.018,
          depth,
          wobbleAmp: Math.random() * 0.6,
          wobbleFreq: 0.01 + Math.random() * 0.03,
          wobblePh: Math.random() * Math.PI * 2,
        });
      }
    }

    function spawnStar() {
      const edge = Math.floor(Math.random() * 4);
      let x, y, angle;
      if (edge === 0) { x = Math.random() * W; y = 0; angle = Math.PI * (0.2 + Math.random() * 0.6); }
      else if (edge === 1) { x = W; y = Math.random() * H; angle = Math.PI * (0.7 + Math.random() * 0.6); }
      else if (edge === 2) { x = Math.random() * W; y = H; angle = Math.PI * (1.2 + Math.random() * 0.6); }
      else { x = 0; y = Math.random() * H; angle = Math.PI * (1.7 + Math.random() * 0.6); }
      const speed = 2.5 + Math.random() * 3.5;
      const size = 2.5 + Math.random() * 2.5;
      stars.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1, tail: [], size });
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

      // Shooting stars
      if (Math.random() < 0.015 && stars.length < STAR_COUNT) spawnStar();
      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i];
        s.tail.unshift({ x: s.x, y: s.y });
        if (s.tail.length > 38) s.tail.pop();
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.01;
        if (s.life <= 0 || s.x < -50 || s.x > W + 50 || s.y < -50 || s.y > H + 50) {
          stars.splice(i, 1);
          continue;
        }
        for (let j = 0; j < s.tail.length; j++) {
          const al = (1 - j / s.tail.length) * s.life * 0.9;
          const c = yColor(s.tail[j].y, H, 60);
          const r = Math.max(0.2, s.size * (1 - j / s.tail.length));
          ctx.beginPath();
          ctx.arc(s.tail[j].x, s.tail[j].y, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${al.toFixed(3)})`;
          ctx.fill();
        }
        // Bright glowing head
        const hc = yColor(s.y, H, 80);
        const headGlow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 5);
        headGlow.addColorStop(0, `rgba(255,220,255,${s.life.toFixed(3)})`);
        headGlow.addColorStop(0.3, `rgba(${hc.r},${hc.g},${hc.b},${(s.life * 0.6).toFixed(3)})`);
        headGlow.addColorStop(1, `rgba(${hc.r},${hc.g},${hc.b},0)`);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * 5, 0, Math.PI * 2);
        ctx.fillStyle = headGlow;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,230,255,${s.life.toFixed(3)})`;
        ctx.fill();
      }

      // Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.radius += 3.5;
        rp.life -= 0.022;
        if (rp.life <= 0) { ripples.splice(i, 1); continue; }
        const c = yColor(rp.y, H, 30);
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},${(rp.life * 0.4).toFixed(3)})`;
        ctx.lineWidth = 1.5 * rp.life;
        ctx.stroke();
      }

      // Update node positions
      for (const p of pts) {
        p.wobblePh += p.wobbleFreq;
        p.x += p.vx + Math.sin(p.wobblePh) * p.wobbleAmp;
        p.y += p.vy + Math.cos(p.wobblePh * 1.3) * p.wobbleAmp;
        p.ph += p.sp;

        // Mouse repulsion
        const mdx = p.x - mouseX, mdy = p.y - mouseY;
        const md = Math.hypot(mdx, mdy);
        if (md < 120 && md > 0) {
          const f = (120 - md) / 120 * 0.6;
          p.x += (mdx / md) * f;
          p.y += (mdy / md) * f;
        }

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
            const depthFactor = (a.depth + b.depth) / 2;
            const al = Math.pow(1 - d / CONN, 1.5) * depthFactor;
            const cb = yColor(b.y, H);
            const mouseDist = Math.hypot((a.x + b.x) / 2 - mouseX, (a.y + b.y) / 2 - mouseY);
            const mouseBoost = mouseDist < 100 ? (100 - mouseDist) / 100 * 0.5 : 0;
            const finalAl = Math.min(1, al * 0.8 + mouseBoost);
            const lg = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            lg.addColorStop(0, `rgba(${ca.r},${ca.g},${ca.b},${finalAl.toFixed(3)})`);
            lg.addColorStop(1, `rgba(${cb.r},${cb.g},${cb.b},${finalAl.toFixed(3)})`);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = lg;
            ctx.lineWidth = (0.4 + al * 1.5) * depthFactor;
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const p of pts) {
        const pulse = 0.75 + 0.25 * Math.sin(p.ph);
        const c = yColor(p.y, H);
        const mdx = p.x - mouseX, mdy = p.y - mouseY;
        const mouseDist = Math.hypot(mdx, mdy);
        const mouseScale = mouseDist < 80 ? 1 + (80 - mouseDist) / 80 * 1.5 : 1;
        const isMob = W < 768;
        const glowMult = isMob ? 3 : 8;
        const gr = p.r * glowMult * pulse * p.depth * mouseScale;

        if (!isMob) {
          const gw = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, gr);
          gw.addColorStop(0, `rgba(${Math.min(255, c.r + 80)},${Math.min(255, c.g + 30)},${Math.min(255, c.b + 80)},0.95)`);
          gw.addColorStop(0.25, `rgba(${c.r},${c.g},${c.b},0.4)`);
          gw.addColorStop(0.6, `rgba(${c.r},${c.g},${c.b},0.1)`);
          gw.addColorStop(1, `rgba(${c.r},${c.g},${c.b},0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, gr, 0, Math.PI * 2);
          ctx.fillStyle = gw;
          ctx.fill();
        }

        const coreR = p.r * pulse * p.depth * mouseScale;
        ctx.beginPath();
        ctx.arc(p.x, p.y, coreR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${Math.min(255, c.r + 80)},${Math.min(255, c.g + 30)},${Math.min(255, c.b + 80)},0.95)`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) * (W / rect.width);
      mouseY = (e.clientY - rect.top) * (H / rect.height);
    }

    function onMouseLeave() {
      mouseX = -9999;
      mouseY = -9999;
    }

    function onClick(e) {
      const rect = canvas.getBoundingClientRect();
      const cx = (e.clientX - rect.left) * (W / rect.width);
      const cy = (e.clientY - rect.top) * (H / rect.height);

      for (let i = 0; i < 3; i++) {
        ripples.push({ x: cx, y: cy, radius: 0, life: 1 });
      }
      for (let i = 0; i < 4; i++) {
        pts.push({
          x: cx + (Math.random() - 0.5) * 30,
          y: cy + (Math.random() - 0.5) * 30,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          r: 1 + Math.random() * 2,
          ph: Math.random() * Math.PI * 2,
          sp: 0.008 + Math.random() * 0.02,
          depth: 0.5 + Math.random() * 0.5,
          wobbleAmp: Math.random() * 0.5,
          wobbleFreq: 0.01 + Math.random() * 0.03,
          wobblePh: 0,
        });
        if (pts.length > N + 40) pts.shift();
      }
    }

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("click", onClick);

    resize();
    initNodes();
    draw();

    const ro = new ResizeObserver(() => {
      N = getN(); CONN = getCONN(); STAR_COUNT = getSTARS();
      resize(); initNodes();
    });
    ro.observe(canvas.parentElement);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", minHeight: "100vh", height: "100%", background: "#000", overflow: "hidden", ...style }}>
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "block" }}
      />
      <div style={{ position: "relative", zIndex: 1, width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        {children}
      </div>
    </div>
  );
}