import { useEffect, useRef, useState } from 'react';

const testimonials = [
  {
    quote: "Switching was the best decision I made for my family. The coverage is exceptional and the process was completely painless.",
    name: "Maria G.",
    role: "Covered California Member",
    initials: "MG",
    color: "#3B82F6",
  },
  {
    quote: "I didn't think I'd qualify for Medicare benefits at my age. They walked me through everything and saved me thousands.",
    name: "Robert T.",
    role: "Medicare Enrollee",
    initials: "RT",
    color: "#F59E0B",
  },
  {
    quote: "Our entire team is now covered under a plan that actually fits our budget. I wish I'd done this years ago.",
    name: "Sandra L.",
    role: "Small Business Owner",
    initials: "SL",
    color: "#60A5FA",
  },
  {
    quote: "When my accident happened, I was so relieved I had the right coverage. The claims process was fast and stress-free.",
    name: "James K.",
    role: "Accident Plan Holder",
    initials: "JK",
    color: "#FCD34D",
  },
  {
    quote: "The critical illness plan gave my whole family peace of mind. Knowing we're protected lets us focus on what matters most.",
    name: "Diana R.",
    role: "Critical Illness Plan Holder",
    initials: "DR",
    color: "#A78BFA",
  },
  {
    quote: "I called expecting a sales pitch and got a real conversation instead. They found me a plan I could actually afford.",
    name: "Carlos M.",
    role: "Hospital Confinement Member",
    initials: "CM",
    color: "#34D399",
  },
];

function Stars() {
  return (
    <div style={{ display: 'flex', gap: '3px', marginBottom: '1.2rem' }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#FCD34D">
          <path d="M7 1L8.5 5H13L9.5 7.5L11 11.5L7 9L3 11.5L4.5 7.5L1 5H5.5L7 1Z"/>
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: hovered ? 'rgba(59,130,246,0.06)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${hovered ? `${t.color}55` : 'rgba(240,237,232,0.07)'}`,
        borderRadius: '4px',
        padding: '2.5rem 2rem',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.97)',
        transition: `opacity 0.8s ease ${index * 0.12}s, transform 0.8s ease ${index * 0.12}s, box-shadow 0.3s ease, border 0.3s ease, background 0.3s ease`,
        boxShadow: hovered
          ? `0 0 40px ${t.color}25, 0 8px 32px rgba(0,0,0,0.5)`
          : '0 4px 24px rgba(0,0,0,0.35)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem',
      }}
    >
      {/* Giant quotemark */}
      <span
        className="font-display"
        style={{
          position: 'absolute',
          top: '1rem',
          left: '1.5rem',
          fontSize: '5rem',
          lineHeight: 1,
          color: `${t.color}18`,
          fontWeight: 900,
          userSelect: 'none',
          transition: 'color 0.3s ease',
          ...(hovered && { color: `${t.color}30` }),
        }}
        aria-hidden="true"
      >
        &ldquo;
      </span>

      <Stars />

      {/* Quote */}
      <p
        className="font-display"
        style={{
          fontSize: '1.02rem',
          fontStyle: 'italic',
          fontWeight: 400,
          lineHeight: 1.7,
          color: 'rgba(240,237,232,0.8)',
          margin: 0,
          position: 'relative',
          zIndex: 1,
        }}
      >
        &ldquo;{t.quote}&rdquo;
      </p>

      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginTop: '0.5rem' }}>
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: `${t.color}18`,
            border: `1px solid ${t.color}55`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: hovered ? `0 0 14px ${t.color}40` : 'none',
            transition: 'box-shadow 0.3s ease',
          }}
        >
          <span
            className="font-mono"
            style={{ fontSize: '0.7rem', color: t.color, letterSpacing: '0.05em' }}
          >
            {t.initials}
          </span>
        </div>
        <div>
          <p
            className="font-display"
            style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F0EDE8', margin: 0 }}
          >
            {t.name}
          </p>
          <p
            className="font-mono"
            style={{
              fontSize: '0.6rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: t.color,
              margin: 0,
              opacity: 0.8,
            }}
          >
            {t.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const titleRef = useRef(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTitleVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="about"
      style={{
        background: 'linear-gradient(to bottom, #020408, #030610)',
        padding: '7rem 2rem 8rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Section separator */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '40%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(252,211,77,0.25), transparent)',
        }}
      />

      {/* Header */}
      <div
        ref={titleRef}
        style={{
          textAlign: 'center',
          marginBottom: '4rem',
          opacity: titleVisible ? 1 : 0,
          transform: titleVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        <span
          className="font-mono"
          style={{
            fontSize: '0.65rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(252,211,77,0.6)',
            display: 'block',
            marginBottom: '1rem',
          }}
        >
          Client Stories
        </span>
        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 900,
            color: '#F0EDE8',
            margin: '0 0 1rem',
            lineHeight: 1.1,
          }}
        >
          Trusted by{' '}
          <span
            style={{
              background: 'linear-gradient(120deg, #FCD34D, #F59E0B)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Real People
          </span>
        </h2>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.95rem',
            fontWeight: 300,
            color: 'rgba(240,237,232,0.4)',
            maxWidth: '420px',
            margin: '1rem auto 0',
            lineHeight: 1.7,
          }}
        >
          See what our clients say about finding the right coverage for their lives.
        </p>
        <div
          style={{
            width: '40px',
            height: '1px',
            background: 'rgba(252,211,77,0.4)',
            margin: '1.5rem auto 0',
          }}
        />
      </div>

      {/* Cards grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        {testimonials.map((t, i) => (
          <TestimonialCard key={t.name} t={t} index={i} />
        ))}
      </div>
    </section>
  );
}
