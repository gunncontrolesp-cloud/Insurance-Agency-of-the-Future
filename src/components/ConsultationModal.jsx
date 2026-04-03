import { useEffect, useState } from 'react';

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(96,165,250,0.25)',
  borderRadius: '3px',
  padding: '0.75rem 1rem',
  color: '#F0EDE8',
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.9rem',
  outline: 'none',
  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
};

const labelStyle = {
  fontFamily: 'Space Mono, monospace',
  fontSize: '0.62rem',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'rgba(96,165,250,0.7)',
  display: 'block',
  marginBottom: '0.5rem',
};

function Field({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

function FocusInput({ type = 'text', placeholder, value, onChange }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputStyle,
        borderColor: focused ? 'rgba(96,165,250,0.6)' : 'rgba(96,165,250,0.25)',
        boxShadow: focused ? '0 0 18px rgba(59,130,246,0.2)' : 'none',
      }}
    />
  );
}

export default function ConsultationModal({ open, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', times: [] });
  const [submitted, setSubmitted] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function toggleTime(val) {
    setForm((f) => ({
      ...f,
      times: f.times.includes(val)
        ? f.times.filter((t) => t !== val)
        : [...f.times, val],
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  function handleClose() {
    onClose();
    setTimeout(() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', times: [] }); }, 400);
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(2,4,8,0.85)',
          backdropFilter: 'blur(8px)',
          zIndex: 100,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'all' : 'none',
          transition: 'opacity 0.35s ease',
        }}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: open ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -48%) scale(0.96)',
          zIndex: 101,
          width: '100%',
          maxWidth: '480px',
          padding: '0 1rem',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'all' : 'none',
          transition: 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.23,1,0.32,1)',
        }}
      >
        <div
          style={{
            background: '#070d14',
            border: '1px solid rgba(96,165,250,0.25)',
            borderRadius: '6px',
            padding: '2.5rem',
            boxShadow: '0 0 80px rgba(59,130,246,0.15), 0 24px 60px rgba(0,0,0,0.7)',
            position: 'relative',
          }}
        >
          {/* Top accent line */}
          <div style={{
            position: 'absolute',
            top: 0, left: '10%', right: '10%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.6), rgba(252,211,77,0.4), rgba(96,165,250,0.6), transparent)',
          }} />

          {/* Close button */}
          <button
            onClick={handleClose}
            aria-label="Close"
            style={{
              position: 'absolute',
              top: '1.2rem',
              right: '1.2rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(240,237,232,0.4)',
              padding: '4px',
              lineHeight: 1,
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#60A5FA'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(240,237,232,0.4)'}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          {!submitted ? (
            <>
              {/* Header */}
              <div style={{ marginBottom: '2rem' }}>
                <span style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '0.6rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'rgba(96,165,250,0.6)',
                  display: 'block',
                  marginBottom: '0.6rem',
                }}>
                  No obligation
                </span>
                <h2 style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.6rem',
                  fontWeight: 900,
                  color: '#F0EDE8',
                  margin: 0,
                  lineHeight: 1.15,
                }}>
                  Book a Free{' '}
                  <span style={{
                    background: 'linear-gradient(120deg, #FCD34D, #60A5FA)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    Consultation
                  </span>
                </h2>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <Field label="Full Name">
                  <FocusInput placeholder="Jane Smith" value={form.name} onChange={set('name')} />
                </Field>

                <Field label="Email Address">
                  <FocusInput type="email" placeholder="jane@example.com" value={form.email} onChange={set('email')} />
                </Field>

                <Field label="Phone Number">
                  <FocusInput type="tel" placeholder="(555) 000-0000" value={form.phone} onChange={set('phone')} />
                </Field>

                {/* Time to call */}
                <Field label="Best Time to Call">
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem' }}>
                    {['Morning', 'Evening'].map((time) => {
                      const checked = form.times.includes(time);
                      return (
                        <label
                          key={time}
                          style={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            padding: '0.75rem 1rem',
                            border: `1px solid ${checked ? 'rgba(96,165,250,0.6)' : 'rgba(96,165,250,0.2)'}`,
                            borderRadius: '3px',
                            background: checked ? 'rgba(59,130,246,0.1)' : 'rgba(255,255,255,0.02)',
                            cursor: 'pointer',
                            transition: 'all 0.25s ease',
                            boxShadow: checked ? '0 0 14px rgba(59,130,246,0.2)' : 'none',
                          }}
                        >
                          {/* Custom checkbox */}
                          <span style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '3px',
                            border: `1px solid ${checked ? '#60A5FA' : 'rgba(96,165,250,0.35)'}`,
                            background: checked ? 'rgba(59,130,246,0.3)' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            transition: 'all 0.25s ease',
                          }}>
                            {checked && (
                              <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                                <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </span>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleTime(time)}
                            style={{ display: 'none' }}
                          />
                          <span style={{
                            fontFamily: 'Space Mono, monospace',
                            fontSize: '0.68rem',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: checked ? '#93C5FD' : 'rgba(240,237,232,0.5)',
                            transition: 'color 0.25s ease',
                          }}>
                            {time === 'Morning' ? '☀ Morning' : '◗ Evening'}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </Field>

                <button
                  type="submit"
                  className="btn-blast"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem', fontSize: '0.72rem' }}
                >
                  Request Consultation
                </button>
              </form>
            </>
          ) : (
            /* Success state */
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <div style={{
                width: '56px', height: '56px',
                borderRadius: '50%',
                border: '1px solid rgba(96,165,250,0.4)',
                background: 'rgba(59,130,246,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.5rem',
                boxShadow: '0 0 30px rgba(59,130,246,0.3)',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12L10 17L19 8" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.5rem',
                fontWeight: 900,
                color: '#F0EDE8',
                marginBottom: '0.75rem',
              }}>
                You're all set!
              </h2>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.9rem',
                color: 'rgba(240,237,232,0.5)',
                lineHeight: 1.7,
                marginBottom: '2rem',
              }}>
                We'll reach out to <span style={{ color: '#93C5FD' }}>{form.name || 'you'}</span> shortly to confirm your consultation.
              </p>
              <button
                onClick={handleClose}
                className="btn-blast"
                style={{ fontSize: '0.68rem' }}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
