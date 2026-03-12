import React, { useState } from 'react';
import { Navbar as BsNavbar, Nav, Container } from 'react-bootstrap';
import './Navbar.css';

// Navigation links — href matches the section id
const NAV_LINKS = [
  { label: 'Home',           href: '#hero' },
  { label: 'About',          href: '#about' },
  { label: 'Skills',         href: '#skills' },
  { label: 'Projects',       href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact',        href: '#contact' },
];

function Navbar({ scrolled }) {
  const [expanded, setExpanded] = useState(false);

  // Smooth scroll to section and close mobile menu
  const handleNavClick = (e, href) => {
    e.preventDefault();
    setExpanded(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <BsNavbar
      expand="lg"
      fixed="top"
      expanded={expanded}
      onToggle={setExpanded}
      className={`portfolio-navbar ${scrolled ? 'portfolio-navbar--scrolled' : ''}`}
    >
      <Container>
        {/* Brand / Logo */}
        <BsNavbar.Brand
          href="#hero"
          className="portfolio-navbar__brand"
          onClick={(e) => handleNavClick(e, '#hero')}
        >
          <span className="brand-bracket">&lt;</span>
          MA
          <span className="brand-bracket">/&gt;</span>
        </BsNavbar.Brand>

        {/* Mobile hamburger toggle */}
        <BsNavbar.Toggle aria-controls="main-nav" className="portfolio-navbar__toggle" />

        {/* Collapsible nav links */}
        <BsNavbar.Collapse id="main-nav">
          <Nav className="ms-auto align-items-lg-center gap-lg-1">
            {NAV_LINKS.map((link) => (
              <Nav.Link
                key={link.label}
                href={link.href}
                className="portfolio-navbar__link"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </Nav.Link>
            ))}

            {/* Hire Me CTA button */}
            <a
              href="mailto:matheeshaanjana01@gmail.com"
              className="portfolio-navbar__cta ms-lg-2"
            >
              Hire Me
            </a>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}

export default Navbar;
