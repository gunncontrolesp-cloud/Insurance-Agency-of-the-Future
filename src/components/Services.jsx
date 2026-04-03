import { useEffect, useRef, useState } from 'react';

const services = [
  {
    title: 'Covered California',
    desc: 'Get affordable health coverage that meets your needs.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="44" height="44">
        <path d="M24 6C24 6 10 12 10 24C10 32 16 38 24 42C32 38 38 32 38 24C38 12 24 6 24 6Z" stroke="#60A5FA" strokeWidth="2" fill="rgba(59,130,246,0.08)"/>
        <path d="M18 24L22 28L30 20" stroke="#FCD34D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Medicare',
    desc: 'See if you qualify to receive federal health coverage.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="44" height="44">
        <rect x="10" y="14" width="28" height="22" rx="3" stroke="#60A5FA" strokeWidth="2" fill="rgba(59,130,246,0.08)"/>
        <path d="M24 20V30M19 25H29" stroke="#FCD34D" strokeWidth="2.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Business',
    desc: 'Health insurance programs for your employees and business.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="44" height="44">
        <rect x="12" y="20" width="24" height="18" rx="2" stroke="#60A5FA" strokeWidth="2" fill="rgba(59,130,246,0.08)"/>
        <path d="M18 20V16C18 13.8 19.8 12 22 12H26C28.2 12 30 13.8 30 16V20" stroke="#60A5FA" strokeWidth="2"/>
        <path d="M12 28H36" stroke="#FCD34D" strokeWidth="1.5"/>
        <rect x="21" y="25" width="6" height="6" rx="1" stroke="#FCD34D" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    title: 'Accident',
    desc: 'Protect yourself financially from unexpected injuries.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="44" height="44">
        <path d="M24 8L28 20H40L30 27L34 39L24 32L14 39L18 27L8 20H20L24 8Z" stroke="#60A5FA" strokeWidth="2" fill="rgba(59,130,246,0.08)" strokeLinejoin="round"/>
        <path d="M24 16V24" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="24" cy="28" r="1.5" fill="#FCD34D"/>
      </svg>
    ),
  },
  {
    title: 'Critical Illness',
    desc: 'Cover out-of-pocket expenses related to a critical illness.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="44" height="44">
        <path d="M24 38C24 38 10 30 10 20C10 15.6 13.6 12 18 12C20.4 12 22.6 13 24 14.8C25.4 13 27.6 12 30 12C34.4 12 38 15.6 38 20C38 30 24 38 24 38Z" stroke="#60A5FA" strokeWidth="2" fill="rgba(59,130,246,0.08)"/>
        <path d="M19 21H23L24.5 18L26 24L27.5 21H29" stroke="#FCD34D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Hospital Confinement',
    desc: 'Cover the costs of a hospital admission or extended stay.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="44" height="44">
        <rect x="8" y="18" width="32" height="20" rx="2" stroke="#60A5FA" strokeWidth="2" fill="rgba(59,130,246,0.08)"/>
        <path d="M16 38V28C16 26.9 16.9 26 18 26H22C23.1 26 24 26.9 24 28V38" stroke="#60A5FA" strokeWidth="1.8"/>
        <path d="M28 26H34V32H28V26Z" stroke="#FCD34D" strokeWidth="1.8"/>
        <path d="M8 24C8 24 14 20 24 20C34 20 40 24 40 24" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M22 12C22 10.9 22.9 10 24 10C25.1 10 26 10.9 26 12V18H22V12Z" stroke="#FCD34D" strokeWidth="1.8"/>
      </svg>
    ),
  },
];

function ServiceCard({ service, index }) {
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
        background: hovered
          ? 'rgba(59,130,246,0.07)'
          : 'rgba(255,255,255,0.025)',
        border: `1px solid ${hovered ? 'rgba(96,165,250,0.5)' : 'rgba(96,165,250,0.12)'}`,
        borderRadius: '4px',
        padding: '2rem 1.75rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '1rem',
        cursor: 'pointer',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s, border 0.3s ease, background 0.3s ease, box-shadow 0.3s ease`,
        boxShadow: hovered
          ? '0 0 35px rgba(59,130,246,0.25), 0 0 80px rgba(59,130,246,0.08), inset 0 0 20px rgba(59,130,246,0.05)'
          : '0 4px 24px rgba(0,0,0,0.4)',
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          background: 'rgba(59,130,246,0.06)',
          border: '1px solid rgba(96,165,250,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          boxShadow: hovered ? '0 0 20px rgba(59,130,246,0.3)' : 'none',
        }}
      >
        {service.icon}
      </div>

      {/* Title */}
      <h3
        className="font-display"
        style={{
          fontSize: '1.15rem',
          fontWeight: 700,
          color: hovered ? '#F0EDE8' : 'rgba(240,237,232,0.85)',
          transition: 'color 0.3s ease',
          margin: 0,
        }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.85rem',
          fontWeight: 300,
          lineHeight: 1.7,
          color: 'rgba(240,237,232,0.45)',
          margin: 0,
        }}
      >
        {service.desc}
      </p>

      {/* CTA */}
      <a
        href="#"
        className="btn-blast"
        style={{
          padding: '0.55rem 1.5rem',
          fontSize: '0.65rem',
          marginTop: '0.5rem',
          animationPlayState: hovered ? 'running' : 'paused',
        }}
      >
        View Details
      </a>
    </div>
  );
}

export default function Services() {
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
      style={{
        background: '#020408',
        padding: '8rem 2rem 6rem',
        position: 'relative',
      }}
    >
      {/* Subtle section separator glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.3), rgba(252,211,77,0.2), rgba(96,165,250,0.3), transparent)',
        }}
      />

      {/* Section header */}
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
            color: 'rgba(96,165,250,0.7)',
            display: 'block',
            marginBottom: '1rem',
          }}
        >
          What We Offer
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
          Learn More About{' '}
          <span
            style={{
              background: 'linear-gradient(120deg, #FCD34D, #60A5FA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Our Services
          </span>
        </h2>
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        {services.map((service, i) => (
          <ServiceCard key={service.title} service={service} index={i} />
        ))}
      </div>

      {/* Book consultation CTA */}
      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        <a href="#" className="btn-blast" style={{ fontSize: '0.72rem' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <rect x="2" y="2" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M5 1V3M9 1V3M2 5H12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          Book Free Consultation
        </a>
      </div>
    </section>
  );
}
