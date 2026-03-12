import React, { useEffect, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import profileImg from '../assets/profile.png';
import cvFile     from '../assets/Matheesha_Amarathunga_CV.pdf';
import './Hero.css';

function Hero() {
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);

  // Subtle parallax on the background orbs following the mouse
  useEffect(() => {
    const onMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 25;
      const y = (e.clientY / window.innerHeight - 0.5) * 25;
      if (orb1Ref.current) orb1Ref.current.style.transform = `translate(${x * 0.45}px, ${y * 0.45}px)`;
      if (orb2Ref.current) orb2Ref.current.style.transform = `translate(${-x * 0.3}px, ${-y * 0.3}px)`;
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  // Smooth scroll to Projects section
  const goToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero">
      {/* Decorative background blobs */}
      <div className="hero__orb hero__orb--1" ref={orb1Ref} />
      <div className="hero__orb hero__orb--2" ref={orb2Ref} />
      {/* Subtle grid overlay */}
      <div className="hero__grid" />

      <Container className="hero__container">
        <Row className="align-items-center gy-5">

          {/* ── Left column: text content ── */}
          <Col lg={6} className="hero__content">

            {/* "Available for work" badge */}
            <div className="hero__badge">
              <span className="hero__badge-dot" />
              Available for work
            </div>

            {/* Name heading */}
            <h1 className="hero__title">
              <span className="hero__greeting">Hi, I'm</span>
              <span className="hero__name d-block">Matheesha</span>
              <span className="hero__name hero__name--sub d-block">Amarathunga</span>
            </h1>

            {/* Role subtitle */}
            <p className="hero__role">
              <span className="hero__role-highlight">Full-Stack</span> Software Engineer
            </p>

            {/* Short description */}
            <p className="hero__description">
              Dedicated software engineering student crafting real-world solutions
              through React, Flutter, Firebase, and Python. Passionate about clean
              code and user-centered design.
            </p>

            {/* Action buttons */}
            <div className="hero__actions d-flex flex-wrap gap-3">
              {/* Download CV button */}
              <a href={cvFile} download="Matheesha_Amarathunga_CV.pdf" className="hero__btn-primary">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
                Download CV
              </a>

              {/* View Projects button */}
              <Button variant="outline" className="hero__btn-secondary" onClick={goToProjects}>
                View Projects
              </Button>
            </div>

            {/* Social links */}
            <div className="hero__socials d-flex gap-3 mt-4">
              {/* LinkedIn */}
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hero__social" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>

              {/* GitHub */}
              <a href="https://github.com/MatheeshaAnjana" target="_blank" rel="noopener noreferrer" className="hero__social" aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>

              {/* Email */}
              <a href="mailto:matheeshaanjana01@gmail.com" className="hero__social" aria-label="Email">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-10 7L2 7"/>
                </svg>
              </a>

              {/* Phone */}
              <a href="tel:+94771656886" className="hero__social" aria-label="Phone">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.72 6.72l1.28-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </a>
            </div>
          </Col>

          {/* ── Right column: profile image ── */}
          <Col lg={6} className="hero__visual d-flex justify-content-center">
            <div className="hero__img-wrapper">
              {/* Spinning decorative rings */}
              <div className="hero__ring hero__ring--outer" />
              <div className="hero__ring hero__ring--inner" />

              {/* Profile photo */}
              <div className="hero__img-circle">
                <img src={profileImg} alt="Matheesha Amarathunga" className="hero__img" />
              </div>

              {/* Floating tech badges */}
              <span className="hero__badge-float hero__badge-float--1">⚛️ React</span>
              <span className="hero__badge-float hero__badge-float--2">🐦 Flutter</span>
              <span className="hero__badge-float hero__badge-float--3">🔥 Firebase</span>
            </div>
          </Col>

        </Row>
      </Container>

      {/* Scroll hint */}
      <div className="hero__scroll-hint">
        <div className="hero__scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}

export default Hero;
