export default function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        background: '#020408',
        borderTop: '1px solid rgba(240,237,232,0.06)',
        padding: '3rem 2rem',
        textAlign: 'center',
        zIndex: 10,
      }}
    >
      <div style={{ marginBottom: '1.5rem' }}>
        <span
          className="font-display"
          style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F0EDE8', letterSpacing: '0.3em' }}
        >
          B<span style={{ color: '#FCD34D' }}>L</span>AST
        </span>
      </div>

      <p
        className="font-mono"
        style={{
          fontSize: '0.65rem',
          letterSpacing: '0.18em',
          color: 'rgba(240,237,232,0.22)',
          textTransform: 'uppercase',
        }}
      >
        &copy; {new Date().getFullYear()} &nbsp;·&nbsp; Insurance of the Future &nbsp;·&nbsp; All rights reserved
      </p>
    </footer>
  );
}
