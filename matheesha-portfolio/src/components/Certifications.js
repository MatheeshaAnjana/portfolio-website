import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import useScrollReveal from '../hooks/useScrollReveal';
import './Certifications.css';

const CERTS = [
  {
    title:       'Foundations of Cybersecurity',
    issuer:      'Google via Coursera',
    icon:        '🛡️',
    color:       '#ea4335',
    description: 'Covers core cybersecurity concepts including threat detection, security frameworks, and risk mitigation as part of the Google Cybersecurity Certificate.',
    verify:      'https://coursera.org/verify/BUVET2G24BK6',
  },
  {
    title:       'Google Network Security Specialization',
    issuer:      'Google via Coursera',
    icon:        '🔐',
    color:       '#34a853',
    description: 'Covers network security, intrusion detection, hardening, and incident response with tools like Wireshark and Suricata.',
  },
  {
    title:       'Meta Front-End Developer',
    issuer:      'Meta',
    icon:        '🏅',
    color:       '#0081fb',
    description: 'Professional certificate covering React, web development, and front-end best practices.',
  },
  {
    title:       'UI/UX with Freelancing',
    issuer:      'IT Guru Global',
    icon:        '🎨',
    color:       '#6c63ff',
    description: 'Comprehensive UI/UX design principles combined with freelancing strategies for digital products.',
  },
  {
    title:       'Certificate in Graphic Designing',
    issuer:      'ACVAMAS',
    icon:        '✏️',
    color:       '#f9ca24',
    description: 'Foundational graphic design skills including visual communication and design tools.',
  },
  {
    title:       'Listening and Speech',
    issuer:      'The Open University',
    icon:        '🎓',
    color:       '#00d4aa',
    description: 'Communication and language proficiency course enhancing professional presentation skills.',
  },
];

function Certifications() {
  const [headerRef, headerVisible] = useScrollReveal();
  const [gridRef, gridVisible]     = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="certifications" className="certifications section-border-top" style={{ background: 'var(--bg-primary)' }}>
      <Container>
        <div ref={headerRef} className={`reveal ${headerVisible ? 'is-visible' : ''}`}>
          <p className="section-label">Credentials</p>
          <h2 className="section-title section-title--underline">Certifications</h2>
          <p className="section-subtitle">
            Continuous learning through professional development and recognized certifications.
          </p>
        </div>

        <Row ref={gridRef} className="g-4">
          {CERTS.map((cert, i) => (
            <Col
              key={cert.title}
              lg={6}
              className={`cert-card--lift-in ${gridVisible ? 'is-visible' : ''}`}
              style={{ '--delay': `${i * 0.12}s` }}
            >
              <Card className="cert-card h-100">
                <Card.Body className="d-flex align-items-center gap-3">

                  {/* Icon box with per-cert color */}
                  <div
                    className="cert-card__icon"
                    style={{ background: `${cert.color}14`, border: `1px solid ${cert.color}28` }}
                  >
                    {cert.icon}
                  </div>

                  {/* Text content */}
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-baseline gap-2 flex-wrap">
                      <h5 className="cert-card__title">{cert.title}</h5>
                      <span className="cert-card__issuer" style={{ color: cert.color }}>
                        {cert.issuer}
                      </span>
                    </div>
                    <p className="cert-card__desc">{cert.description}</p>
                    {cert.verify && (
                      <a
                        href={cert.verify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cert-card__verify"
                        style={{ color: cert.color }}
                      >
                        Verify credential →
                      </a>
                    )}
                  </div>

                  {/* Award icon on the right */}
                  <div className="cert-card__award">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <circle cx="12" cy="8" r="6"/>
                      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
                    </svg>
                  </div>

                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Certifications;