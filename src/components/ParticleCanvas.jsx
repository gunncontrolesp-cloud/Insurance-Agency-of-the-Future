import { useEffect, useRef } from 'react';

export default function ParticleCanvas() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    const particles = [];
    const streaks = [];

    function resize() {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Warp streak class — horizontal light streaks shooting past
    class Streak {
      constructor() { this.reset(); }
      reset() {
        this.y = Math.random() * height * 0.75 + height * 0.1;
        this.x = -200;
        this.length = 80 + Math.random() * 300;
        this.speed = 8 + Math.random() * 22;
        this.opacity = 0.15 + Math.random() * 0.55;
        this.thickness = 0.3 + Math.random() * 1.2;
        // bias toward blue, occasional amber
        this.isAmber = Math.random() < 0.12;
        this.delay = Math.random() * 3000;
        this.active = false;
        setTimeout(() => { this.active = true; }, this.delay);
      }
      update() {
        if (!this.active) return;
        this.x += this.speed;
        if (this.x > width + this.length) this.reset();
      }
      draw() {
        if (!this.active) return;
        const grad = ctx.createLinearGradient(this.x, this.y, this.x + this.length, this.y);
        const color = this.isAmber
          ? `rgba(252,211,77,${this.opacity})`
          : `rgba(147,197,253,${this.opacity})`;
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(0.2, color);
        grad.addColorStop(0.8, color);
        grad.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.length, this.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = this.thickness;
        ctx.stroke();
      }
    }

    // Star / particle class — floating blue sparks
    class Particle {
      constructor() { this.reset(true); }
      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + 10;
        this.size = 0.5 + Math.random() * 2;
        this.speedY = -(0.3 + Math.random() * 1.4);
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.opacity = 0;
        this.maxOpacity = 0.3 + Math.random() * 0.7;
        this.fadeIn = true;
        this.life = 0;
        this.maxLife = 180 + Math.random() * 260;
        // Mostly blue, some white, rare amber
        const r = Math.random();
        if (r < 0.65)      this.color = `rgba(147,197,253,`;
        else if (r < 0.85) this.color = `rgba(219,234,254,`;
        else if (r < 0.95) this.color = `rgba(252,211,77,`;
        else               this.color = `rgba(240,237,232,`;
        // Clusters toward bottom-center
        if (initial) {
          this.y = height * 0.4 + Math.random() * height * 0.6;
        }
        this.glowing = Math.random() < 0.25;
      }
      update() {
        this.life++;
        this.x += this.speedX;
        this.y += this.speedY;
        // fade in then fade out
        if (this.life < 40) {
          this.opacity = Math.min(this.maxOpacity, (this.life / 40) * this.maxOpacity);
        } else if (this.life > this.maxLife - 40) {
          this.opacity = Math.max(0, ((this.maxLife - this.life) / 40) * this.maxOpacity);
        }
        if (this.life >= this.maxLife || this.y < -10) this.reset();
      }
      draw() {
        if (this.glowing) {
          const glow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 5);
          glow.addColorStop(0, `${this.color}${this.opacity})`);
          glow.addColorStop(1, `${this.color}0)`);
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * 5, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color}${this.opacity})`;
        ctx.fill();
      }
    }

    // Init particles and streaks
    for (let i = 0; i < 180; i++) particles.push(new Particle());
    for (let i = 0; i < 28; i++)  streaks.push(new Streak());

    // Warp-core central glow (the vanishing point)
    function drawWarpCore() {
      const cx = width * 0.5;
      const cy = height * 0.48;

      // Outer haze
      const outerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(width, height) * 0.45);
      outerGlow.addColorStop(0, 'rgba(59,130,246,0.04)');
      outerGlow.addColorStop(0.5, 'rgba(30,64,175,0.02)');
      outerGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = outerGlow;
      ctx.fillRect(0, 0, width, height);

      // Inner core pulse
      const t = Date.now() / 1000;
      const pulse = 0.5 + 0.5 * Math.sin(t * 1.2);
      const coreR = 2 + pulse * 3;
      const coreGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 20);
      coreGlow.addColorStop(0, `rgba(147,197,253,${0.6 + pulse * 0.4})`);
      coreGlow.addColorStop(0.3, `rgba(96,165,250,${0.2 + pulse * 0.2})`);
      coreGlow.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(cx, cy, coreR * 20, 0, Math.PI * 2);
      ctx.fillStyle = coreGlow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(219,234,254,${0.7 + pulse * 0.3})`;
      ctx.fill();
    }

    // Blue horizon glow at bottom
    function drawHorizon() {
      const grad = ctx.createLinearGradient(0, height * 0.65, 0, height);
      grad.addColorStop(0, 'transparent');
      grad.addColorStop(0.5, 'rgba(59,130,246,0.06)');
      grad.addColorStop(1, 'rgba(30,58,138,0.15)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, height * 0.65, width, height * 0.35);
    }

    function tick() {
      ctx.clearRect(0, 0, width, height);
      drawHorizon();
      drawWarpCore();
      streaks.forEach(s => { s.update(); s.draw(); });
      particles.forEach(p => { p.update(); p.draw(); });
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
      className="particle-canvas"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  );
}
