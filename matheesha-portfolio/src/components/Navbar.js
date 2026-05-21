import React, { useState, useEffect } from 'react';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home',     href: '#hero' },
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications',    href: '#certifications' },
  { label: 'Contact',  href: '#contact' },
];

/* ── Concept F Logo — reused in Navbar & Footer ── */
export function LogoMark({ size = 'md' }) {
  const s = size === 'sm' ? 0.78 : size === 'lg' ? 1.25 : 1;
  const w = Math.round(124 * s);
  const h = Math.round(48 * s);
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 124 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Matheesha Amarathunga logo"
      style={{ overflow: 'visible' }}
    >
      {/* Angular left-chevron bracket */}
      <path
        d="M20 2 L4 24 L20 46"
        stroke="#dc2626"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Faint echo line for depth */}
      <path
        d="M26 8 L14 24 L26 40"
        stroke="rgba(220,38,38,0.22)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* M — white/dark depending on theme, handled via CSS */}
      <text
        x="34"
        y="34"
        fontFamily="'Syne', system-ui, sans-serif"
        fontSize="26"
        fontWeight="800"
        fill="currentColor"
        letterSpacing="-1"
        className="logo-m"
      >M</text>
      {/* A — always red */}
      <text
        x="61"
        y="34"
        fontFamily="'Syne', system-ui, sans-serif"
        fontSize="26"
        fontWeight="800"
        fill="#dc2626"
        letterSpacing="-1"
      >A</text>
      {/* Red underline bar */}
      <rect x="34" y="38" width="56" height="2.5" rx="1.25" fill="#dc2626" />
      {/* Dot accent */}
      <circle cx="96" cy="39.25" r="2.5" fill="#dc2626" />
    </svg>
  );
}

function Navbar({ scrolled, theme, toggleTheme }) {
  const [activeSection, setActiveSection] = useState('#hero');
  const [menuOpen, setMenuOpen]           = useState(false);

  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.querySelector(l.href)).filter(Boolean);
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(s => observer.observe(s));
    return () => sections.forEach(s => observer.unobserve(s));
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating island wrapper */}
      <div className="di-nav-wrapper">
        <nav className={`di-nav ${scrolled ? 'di-nav--scrolled' : ''}`}>

          {/* Logo */}
          <a href="#hero" className="di-brand" onClick={e => handleNavClick(e, '#hero')} aria-label="Home">
            <LogoMark size="sm" />
          </a>

          {/* Desktop links */}
          <ul className="di-links">
            {NAV_LINKS.map(link => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`di-link ${activeSection === link.href ? 'di-link--active' : ''}`}
                  onClick={e => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="di-actions">
            <button
              className="di-theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1"  x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22"  x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1"  y1="12" x2="3"  y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36"/>
                  <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                </svg>
              )}
              <span className="di-theme-label">{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>

            <a
              href="https://mail.google.com/mail/?view=cm&to=matheeshaanjana01@gmail.com&su=Hiring%20Inquiry%20%E2%80%93%20Let%27s%20Work%20Together&body=Hi%20Matheesha%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20I%27d%20love%20to%20discuss%20a%20potential%20opportunity%20with%20you.%0A%0AName%3A%20%0ACompany%2FProject%3A%20%0ADetails%3A%20%0A%0ALooking%20forward%20to%20hearing%20from%20you!%0A%0ARegards%2C"
              target="_blank"
              rel="noopener noreferrer"
              className="di-cta"
            >Hire Me</a>

            <button
              className={`di-hamburger ${menuOpen ? 'di-hamburger--open' : ''}`}
              onClick={() => setMenuOpen(p => !p)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile dropdown */}
      <div className={`di-mobile-menu ${menuOpen ? 'di-mobile-menu--open' : ''}`}>
        <div className="di-mobile-logo">
          <LogoMark size="md" />
        </div>
        <ul>
          {NAV_LINKS.map(link => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`di-mobile-link ${activeSection === link.href ? 'di-mobile-link--active' : ''}`}
                onClick={e => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="di-mobile-footer">
          <button className="di-theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? '☀ Light mode' : '☾ Dark mode'}
          </button>
          <a
              href="https://mail.google.com/mail/?view=cm&to=matheeshaanjana01@gmail.com&su=Hiring%20Inquiry%20%E2%80%93%20Let%27s%20Work%20Together&body=Hi%20Matheesha%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20I%27d%20love%20to%20discuss%20a%20potential%20opportunity%20with%20you.%0A%0AName%3A%20%0ACompany%2FProject%3A%20%0ADetails%3A%20%0A%0ALooking%20forward%20to%20hearing%20from%20you!%0A%0ARegards%2C"
              target="_blank"
              rel="noopener noreferrer"
              className="di-cta di-cta--block"
            >Hire Me</a>
        </div>
      </div>

      {menuOpen && <div className="di-overlay" onClick={() => setMenuOpen(false)} />}
    </>
  );
}

export default Navbar;