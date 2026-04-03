import { useEffect, useRef, useState } from 'react';
import ParticleCanvas from './ParticleCanvas';

function useIntersection(ref, options = {}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.15, ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return visible;
}

export default function Hero() {
  const headlineRef = useRef(null);
  const subRef = useRef(null);

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: '#020408',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* ── Canvas particle layer ── */}
      <ParticleCanvas />

      {/* ── Amber light beams (CSS) ── */}
      <div className="beam-layer beam-layer-1" />
      <div className="beam-layer beam-layer-2" />
      <div className="beam-layer beam-layer-3" />

      {/* ── Radial vignette ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 90% 85% at 50% 50%, transparent 30%, rgba(2,4,8,0.7) 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* ── Bottom horizon fade ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '35%',
          background: 'linear-gradient(to top, #020408 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* ── Top fade ── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '18%',
          background: 'linear-gradient(to bottom, #020408 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* ── Main content ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '7rem 1.5rem 0',
          maxWidth: '900px',
          width: '100%',
        }}
      >
        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-display"
          style={{
            fontSize: 'clamp(2.8rem, 8vw, 7rem)',
            fontWeight: 900,
            lineHeight: 1.02,
            letterSpacing: '-0.02em',
            marginBottom: '0.2em',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 1s ease 0.3s, transform 1s ease 0.3s',
          }}
        >
          <span style={{ color: '#F0EDE8', display: 'block' }}>Insurance of</span>
          <span className="text-shimmer" style={{ display: 'block' }}>
            the Future
          </span>
        </h1>

        {/* Italic sub-headline */}
        <p
          className="font-display"
          style={{
            fontSize: 'clamp(1rem, 2.2vw, 1.35rem)',
            fontStyle: 'italic',
            fontWeight: 400,
            color: 'rgba(240,237,232,0.55)',
            marginTop: '1.2rem',
            marginBottom: '0',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 1s ease 0.55s, transform 1s ease 0.55s',
          }}
        >
          Coverage that moves at the speed of now.
        </p>

        {/* Divider */}
        <div
          style={{
            width: '40px',
            height: '1px',
            background: 'rgba(252,211,77,0.4)',
            margin: '2rem auto',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 1s ease 0.7s',
          }}
        />

        {/* Body copy */}
        <p
          ref={subRef}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
            fontWeight: 300,
            lineHeight: 1.75,
            color: 'rgba(240,237,232,0.5)',
            maxWidth: '520px',
            margin: '0 auto 3rem',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(25px)',
            transition: 'opacity 1s ease 0.75s, transform 1s ease 0.75s',
          }}
        >
          A new era of protection — bold, intelligent, always on.
          Insurance reimagined for the world that's coming.
        </p>


      </div>

      {/* ── Scroll indicator ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          opacity: loaded ? 0.4 : 0,
          transition: 'opacity 1s ease 1.8s',
        }}
      >
        <span
          className="font-mono"
          style={{ fontSize: '0.55rem', letterSpacing: '0.25em', color: '#F0EDE8', textTransform: 'uppercase' }}
        >
          Scroll
        </span>
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, rgba(240,237,232,0.6), transparent)',
            overflow: 'hidden',
          }}
        >
          <div
            className="scroll-dot"
            style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(to bottom, transparent, rgba(96,165,250,0.9), transparent)',
            }}
          />
        </div>
      </div>
    </section>
  );
}
