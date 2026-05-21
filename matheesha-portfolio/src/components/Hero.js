import React, { useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import profileImg from '../assets/profile.png';
import cvFile     from '../assets/Matheesha_Amarathunga_CV.pdf';
import './Hero.css';

function Hero() {
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const orb3Ref = useRef(null);

  useEffect(() => {
    const onMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      if (orb1Ref.current) orb1Ref.current.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px)`;
      if (orb2Ref.current) orb2Ref.current.style.transform = `translate(${-x * 0.28}px, ${-y * 0.28}px)`;
      if (orb3Ref.current) orb3Ref.current.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`;
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  const goToProjects = () =>
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="hero">
      {/* Ambient orbs */}
      <div className="hero__orb hero__orb--1" ref={orb1Ref} />
      <div className="hero__orb hero__orb--2" ref={orb2Ref} />
      <div className="hero__orb hero__orb--3" ref={orb3Ref} />
      <div className="hero__grid" />

      <Container className="hero__container h-100">
        {/* stretch so columns fill hero height → image can anchor to bottom */}
        <Row className="align-items-stretch h-100 gy-5">

          {/* LEFT — Text content */}
          <Col lg={6} className="hero__content">
            {/* Compact pill badge */}
            <div className="hero__avail-badge">
              <span className="hero__avail-dot" />
              Available for work
            </div>

            <h1 className="hero__title">
              <span className="hero__greeting">Hi, I'm</span>
              <span className="hero__name d-block">Matheesha</span>
              <span className="hero__name hero__name--sub d-block">Amarathunga</span>
            </h1>

            <p className="hero__role">
              <span className="hero__role-hl">Full-Stack</span> Software Engineer
            </p>

            <div className="hero__actions">
              <a href={cvFile} download="Matheesha_Amarathunga_CV.pdf" className="hero__btn-primary">
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
                Download CV
              </a>
              <button className="hero__btn-secondary" onClick={goToProjects}>
                View Projects
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>

            <div className="hero__socials">
              <a href="https://linkedin.com/in/matheesha-amarathunga-87221a373" target="_blank" rel="noopener noreferrer" className="hero__social" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="https://github.com/MatheeshaAnjana" target="_blank" rel="noopener noreferrer" className="hero__social" aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
              <a href="mailto:matheeshaanjana01@gmail.com" className="hero__social" aria-label="Email">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="17" height="17">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-10 7L2 7"/>
                </svg>
              </a>
              <a href="tel:+94771656886" className="hero__social" aria-label="Phone">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="17" height="17">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.72 6.72l1.28-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </a>
              <a href="https://wa.me/94771656886" target="_blank" rel="noopener noreferrer" className="hero__social hero__social--whatsapp" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </Col>

          {/* RIGHT — Photo, bottom-anchored */}
          <Col lg={6} className="hero__visual justify-content-center">
            <div className="hero__img-wrapper">
              <div className="hero__glow-disc" />
              <div className="hero__ring hero__ring--outer" />
              <div className="hero__ring hero__ring--inner" />
              <div className="hero__circle-backdrop" />
              <img
                src={profileImg}
                alt="Matheesha Amarathunga"
                className="hero__img"
              />
              <span className="hero__chip hero__chip--1">⚛️ React</span>
              <span className="hero__chip hero__chip--2">🐦 Flutter</span>
              <span className="hero__chip hero__chip--3">🐍 Python</span>
              <span className="hero__chip hero__chip--4">🎯 Dart</span>
              <span className="hero__chip hero__chip--5">🔧 Git</span>
              <span className="hero__chip hero__chip--6">☕ Java</span>
            </div>
          </Col>

        </Row>
      </Container>

      <div className="hero__scroll-hint">
        <div className="hero__scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}

export default Hero;