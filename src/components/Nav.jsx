import { useState } from 'react';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const links = ['Home', 'About', 'Services', 'Blog'];

  return (
    <>
      <nav
        className="nav-animated fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-6 py-5"
        style={{ opacity: 0 }}
      >
        {/* Desktop — centered buttons */}
        <div className="hidden md:flex items-center gap-4">
          {links.map((link) => (
            <a
              key={link}
              href="#"
              className="btn-blast"
              style={{ padding: '0.55rem 1.4rem', fontSize: '0.68rem' }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Mobile — hamburger toggle (right-aligned) */}
        <div className="md:hidden w-full flex justify-end">
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            style={{
              background: 'rgba(59,130,246,0.08)',
              border: '1px solid rgba(96,165,250,0.4)',
              padding: '0.5rem 0.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              cursor: 'pointer',
            }}
          >
            {open ? (
              /* X icon */
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 2L16 16M16 2L2 16" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            ) : (
              /* Hamburger icon */
              <>
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    style={{
                      display: 'block',
                      width: '20px',
                      height: '1px',
                      background: 'rgba(96,165,250,0.8)',
                    }}
                  />
                ))}
              </>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-40"
        style={{
          paddingTop: '72px',
          background: 'rgba(2,4,8,0.96)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(96,165,250,0.15)',
          transform: open ? 'translateY(0)' : 'translateY(-110%)',
          transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          padding: '80px 1.5rem 2rem',
        }}
      >
        {links.map((link) => (
          <a
            key={link}
            href="#"
            className="btn-blast"
            onClick={() => setOpen(false)}
            style={{ width: '100%', justifyContent: 'center', fontSize: '0.75rem' }}
          >
            {link}
          </a>
        ))}
      </div>
    </>
  );
}
