import { useEffect, useRef } from 'react';

export default function ServicesBackground() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    const nodes = [];

    function resize() {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const NODE_COUNT = 55;
    const MAX_DIST = 180;

    class Node {
      constructor() { this.reset(true); }
      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : (Math.random() < 0.5 ? -10 : height + 10);
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.r = 1 + Math.random() * 2;
        this.baseOpacity = 0.2 + Math.random() * 0.5;
        this.opacity = 0;
        this.life = 0;
        this.maxLife = 400 + Math.random() * 400;
        // Mostly blue, some amber
        this.isAmber = Math.random() < 0.15;
        this.color = this.isAmber ? '252,211,77' : '96,165,250';
        this.glowing = Math.random() < 0.3;
        this.pulseOffset = Math.random() * Math.PI * 2;
      }
      update(t) {
        this.life++;
        this.x += this.vx;
        this.y += this.vy;

        // Gentle boundary bounce
        if (this.x < 0 || this.x > width)  this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Fade in / out
        const fadeLen = 60;
        if (this.life < fadeLen) {
          this.opacity = (this.life / fadeLen) * this.baseOpacity;
        } else if (this.life > this.maxLife - fadeLen) {
          this.opacity = ((this.maxLife - this.life) / fadeLen) * this.baseOpacity;
        } else {
          // Gentle pulse
          this.opacity = this.baseOpacity * (0.85 + 0.15 * Math.sin(t * 1.5 + this.pulseOffset));
        }

        if (this.life >= this.maxLife) this.reset();
      }
      draw(t) {
        const pulse = 0.85 + 0.15 * Math.sin(t * 2 + this.pulseOffset);
        const r = this.r * pulse;

        if (this.glowing) {
          const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, r * 8);
          grd.addColorStop(0, `rgba(${this.color},${this.opacity * 0.8})`);
          grd.addColorStop(1, `rgba(${this.color},0)`);
          ctx.beginPath();
          ctx.arc(this.x, this.y, r * 8, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < NODE_COUNT; i++) nodes.push(new Node());

    function drawEdges() {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > MAX_DIST) continue;

          const alpha = (1 - dist / MAX_DIST) * Math.min(a.opacity, b.opacity) * 0.6;
          const useAmber = a.isAmber && b.isAmber;
          const color = useAmber ? '252,211,77' : '96,165,250';

          // Draw line
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${color},${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();

          // Travelling dot along the edge (occasional)
          if (dist < 100 && Math.random() < 0.002) {
            const prog = (Date.now() % 2000) / 2000;
            const tx = a.x + (b.x - a.x) * prog;
            const ty = a.y + (b.y - a.y) * prog;
            ctx.beginPath();
            ctx.arc(tx, ty, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${color},${alpha * 2})`;
            ctx.fill();
          }
        }
      }
    }

    function tick() {
      const t = Date.now() / 1000;
      ctx.clearRect(0, 0, width, height);
      nodes.forEach(n => n.update(t));
      drawEdges();
      nodes.forEach(n => n.draw(t));
      animRef.current = requestAnimationFrame(tick);
    }
    tick();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.65,
      }}
    />
  );
}
