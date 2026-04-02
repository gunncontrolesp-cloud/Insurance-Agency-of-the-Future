export default function Nav() {
  return (
    <nav
      className="nav-animated fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-8 py-6"
      style={{ opacity: 0 }}
    >
      {/* Nav Links — centered */}
      <div className="hidden md:flex items-center gap-4">
        {['Home', 'About', 'Services', 'Blog'].map((link) => (
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

      {/* Mobile menu icon */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        aria-label="Menu"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block h-px w-6"
            style={{ background: 'rgba(240,237,232,0.6)' }}
          />
        ))}
      </button>
    </nav>
  );
}
