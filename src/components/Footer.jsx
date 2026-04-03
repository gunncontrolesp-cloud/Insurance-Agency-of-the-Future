const footerLinks = {
  Services: [
    'Life Insurance',
    'Medicare',
    'Business Insurance',
    'Accident Coverage',
    'Critical Illness',
    'Hospital Confinement',
  ],
  Company: ['About Us', 'Our Team', 'Blog', 'Careers', 'Press'],
  Support: ['Contact Us', 'FAQ', 'Privacy Policy', 'Terms of Service', 'Accessibility'],
};

function FooterLink({ children }) {
  return (
    <li>
      <a
        href="#"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.85rem',
          fontWeight: 300,
          color: 'rgba(240,237,232,0.4)',
          textDecoration: 'none',
          transition: 'color 0.25s ease',
          display: 'inline-block',
        }}
        onMouseEnter={(e) => (e.target.style.color = 'rgba(240,237,232,0.9)')}
        onMouseLeave={(e) => (e.target.style.color = 'rgba(240,237,232,0.4)')}
      >
        {children}
      </a>
    </li>
  );
}

function ContactItem({ icon, label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
      <span style={{ color: '#60A5FA', flexShrink: 0, marginTop: '1px' }}>{icon}</span>
      <div>
        <p style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '0.58rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(96,165,250,0.6)',
          marginBottom: '0.2rem',
        }}>
          {label}
        </p>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.88rem',
          fontWeight: 300,
          color: 'rgba(240,237,232,0.65)',
          lineHeight: 1.5,
        }}>
          {value}
        </p>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        background: '#020408',
        zIndex: 10,
        overflow: 'hidden',
      }}
    >
      {/* Top glow separator */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.3), rgba(252,211,77,0.2), rgba(96,165,250,0.3), transparent)',
      }} />

      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '300px',
        background: 'radial-gradient(ellipse at 50% 100%, rgba(59,130,246,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Main footer content */}
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '5rem 2rem 3rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '3rem',
      }}>

        {/* Brand column */}
        <div style={{ gridColumn: 'span 1' }}>
          <a
            href="#"
            className="font-display"
            style={{
              fontSize: '1.4rem',
              fontWeight: 900,
              color: '#F0EDE8',
              letterSpacing: '0.06em',
              textDecoration: 'none',
              display: 'inline-block',
              marginBottom: '1.25rem',
            }}
          >
            Insurance of the <span style={{ color: '#FCD34D' }}>Future</span>
          </a>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.85rem',
            fontWeight: 300,
            color: 'rgba(240,237,232,0.4)',
            lineHeight: 1.75,
            marginBottom: '2rem',
            maxWidth: '240px',
          }}>
            Modern coverage solutions for individuals, families, and businesses — built for the world that's coming.
          </p>

          {/* Contact details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <ContactItem
              icon={
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M2 3C2 2.45 2.45 2 3 2H5.5L6.5 5L5 6.5C5.8 8.1 6.9 9.2 8.5 10L10 8.5L13 9.5V12C13 12.55 12.55 13 12 13C6.5 13 2 8.5 2 3Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                </svg>
              }
              label="Phone"
              value="(800) 555-0199"
            />
            <ContactItem
              icon={
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <rect x="1.5" y="3.5" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M1.5 5L7.5 9L13.5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              }
              label="Email"
              value="hello@insurancefuture.com"
            />
            <ContactItem
              icon={
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M7.5 1C5 1 3 3 3 5.5C3 9 7.5 14 7.5 14C7.5 14 12 9 12 5.5C12 3 10 1 7.5 1Z" stroke="currentColor" strokeWidth="1.2"/>
                  <circle cx="7.5" cy="5.5" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
                </svg>
              }
              label="Address"
              value={"123 Future Blvd, Suite 400\nLos Angeles, CA 90001"}
            />
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading}>
            <h4 style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.62rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(96,165,250,0.7)',
              marginBottom: '1.25rem',
            }}>
              {heading}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {links.map((link) => (
                <FooterLink key={link}>{link}</FooterLink>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid rgba(240,237,232,0.06)',
        padding: '1.5rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        <p className="font-mono" style={{
          fontSize: '0.6rem',
          letterSpacing: '0.15em',
          color: 'rgba(240,237,232,0.2)',
          textTransform: 'uppercase',
        }}>
          &copy; {new Date().getFullYear()} Insurance of the Future. All rights reserved.
        </p>

        {/* Social icons */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {[
            {
              label: 'Facebook',
              icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3H8.5C7.7 3 7 3.7 7 4.5V6H5V8H7V13H9V8H11L11.5 6H9V4.5C9 4.2 9.2 4 9.5 4H11V3H10Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/></svg>,
            },
            {
              label: 'LinkedIn',
              icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.1"/><path d="M5 7V11M5 5V5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M8 11V8.5C8 7.7 8.7 7 9.5 7C10.3 7 11 7.7 11 8.5V11" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>,
            },
            {
              label: 'X',
              icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
            },
          ].map(({ label, icon }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              style={{
                width: '32px',
                height: '32px',
                border: '1px solid rgba(96,165,250,0.2)',
                borderRadius: '3px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(240,237,232,0.35)',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(96,165,250,0.6)';
                e.currentTarget.style.color = '#60A5FA';
                e.currentTarget.style.boxShadow = '0 0 12px rgba(59,130,246,0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(96,165,250,0.2)';
                e.currentTarget.style.color = 'rgba(240,237,232,0.35)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
