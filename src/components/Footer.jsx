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
