import React, { useState, useEffect } from 'react';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home',           href: '#hero' },
  { label: 'About',          href: '#about' },
  { label: 'Skills',         href: '#skills' },
  { label: 'Projects',       href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact',        href: '#contact' },
];

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
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`di-nav ${scrolled ? 'di-nav--scrolled' : ''} ${menuOpen ? 'di-nav--open' : ''}`}>

        {/* Logo icon */}
        <div className="di-logo-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5z" fill="rgba(255,255,255,0.95)" />
            <path d="M2 17l10 5 10-5" stroke="rgba(255,255,255,0.80)" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M2 12l10 5 10-5" stroke="rgba(255,255,255,0.55)" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Brand text */}
        <a
          href="#hero"
          className="di-brand"
          onClick={e => handleNavClick(e, '#hero')}
        >
          <span className="di-brand__bracket">&lt;</span>
          MA
          <span className="di-brand__bracket">/&gt;</span>
        </a>

        {/* Desktop nav links */}
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

        {/* Right actions */}
        <div className="di-actions">
          <button
            className="di-theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
              </svg>
            )}
            <span className="di-theme-label">
              {theme === 'dark' ? 'Light' : 'Dark'}
            </span>
          </button>

          <a href="mailto:matheeshaanjana01@gmail.com" className="di-cta">
            Hire Me
          </a>

          <button
            className={`di-hamburger ${menuOpen ? 'di-hamburger--open' : ''}`}
            onClick={() => setMenuOpen(p => !p)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <div className={`di-mobile-menu ${menuOpen ? 'di-mobile-menu--open' : ''}`}>
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
          <a href="mailto:matheeshaanjana01@gmail.com" className="di-cta di-cta--block">
            Hire Me
          </a>
        </div>
      </div>

      {menuOpen && (
        <div className="di-overlay" onClick={() => setMenuOpen(false)} />
      )}
    </>
  );
}

export default Navbar;