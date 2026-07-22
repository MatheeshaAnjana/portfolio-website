import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import useScrollReveal from '../hooks/useScrollReveal';
import './About.css';

// Quick stats shown in small cards
const STATS = [
  { value: '2+', label: 'Years Learning' },
  { value: '20+', label: 'Projects Built' },
  { value: '10+', label: 'Certifications' },
  { value: '∞',  label: 'Curiosity' },
];

// Education timeline data
const EDUCATION = [
  {
    degree: 'Higher National Diploma in Software Engineering',
    school:  'National Institute of Business Management (NIBM)',
    year:    '2025 – Present',
    active:  true,
  },
  {
    degree: 'Diploma in Software Engineering',
    school:  'National Institute of Business Management (NIBM)',
    year:    '2024 – 2025',
    active:  false,
  },
];

const CONTACT_INFO = [
  { label: 'Location', value: 'Kurunegala, Sri Lanka', href: null },
  { label: 'Email', value: 'matheeshaanjana01@gmail.com', href: 'mailto:matheeshaanjana01@gmail.com' },
  { label: 'Phone', value: '+94 77 165 6886', href: 'tel:+94771656886' },
  { label: 'GitHub', value: 'github.com/MatheeshaAnjana', href: 'https://github.com/MatheeshaAnjana' },
];

function About() {
  const [headerRef, headerVisible] = useScrollReveal();
  const [bioRef, bioVisible]       = useScrollReveal();
  const [infoRef, infoVisible]     = useScrollReveal();
  const [statsRef, statsVisible]   = useScrollReveal();
  const [eduRef, eduVisible]       = useScrollReveal();

  return (
    <section id="about" className="about section-border-top" style={{ background: 'var(--bg-secondary)' }}>
      <Container>
        {/* Section header */}
        <div ref={headerRef} className={`reveal ${headerVisible ? 'is-visible' : ''}`}>
          <p className="section-label">Who I Am</p>
          <h2 className="section-title section-title--underline">About Me</h2>
        </div>

        <Row className="gy-5 align-items-start">

          {/* ── Left: biography text ── */}
          <Col lg={7}>
            <div ref={bioRef} className={`reveal ${bioVisible ? 'is-visible' : ''}`}>
              <p className="about__para">
                  I'm a Software Engineering undergraduate based in Kurunegala, Sri Lanka,
                  passionate about building modern, scalable, and user-centered digital
                  solutions. With hands-on experience in full-stack web and mobile
                  application development, I enjoy transforming ideas into responsive,
                  high-performance, and real-world software applications.
                </p>

                <p className="about__para">
                  My technical expertise includes developing interactive user interfaces with{" "}
                  <strong>React.js</strong>, building cross-platform mobile applications using{" "}
                  <strong>Flutter</strong>, and creating backend systems with{" "}
                  <strong>Spring Boot</strong>, <strong>Flask</strong>, <strong>PHP</strong>,{" "}
                  and REST APIs. I also work with databases and cloud technologies including{" "}
                  <strong>MySQL</strong>, <strong>Oracle Database</strong>,{" "}
                  <strong>MongoDB</strong>, and <strong>Firebase</strong>.
                </p>

                <p className="about__para">
                  Currently pursuing my Higher National Diploma in Software Engineering at
                  NIBM, I continuously expand my skills through academic and personal
                  projects focused on full-stack development, mobile applications, database
                  systems, and modern software engineering practices. I'm always eager to
                  contribute to innovative and impactful software solutions.
                </p>
            </div>

            {/* Contact info grid */}
            <Row ref={infoRef} className="about__info-grid g-3 mt-2">
              {CONTACT_INFO.map((item, i) => (
                <Col
                  xs={12} sm={6}
                  key={item.label}
                  className={`reveal-stagger ${infoVisible ? 'is-visible' : ''}`}
                  style={{ '--delay': `${i * 0.08}s` }}
                >
                  <p className="about__info-label">{item.label}</p>
                  {item.href
                    ? <a href={item.href} className="about__info-value about__info-link" target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{item.value}</a>
                    : <p className="about__info-value">{item.value}</p>
                  }
                </Col>
              ))}
            </Row>
          </Col>

          {/* ── Right: stats + education ── */}
          <Col lg={5}>
            {/* Stats cards (Bootstrap Row) */}
            <Row ref={statsRef} className="g-3 mb-4">
              {STATS.map((s, i) => (
                <Col
                  xs={6}
                  key={s.label}
                  className={`reveal-stagger ${statsVisible ? 'is-visible' : ''}`}
                  style={{ '--delay': `${i * 0.08}s` }}
                >
                  <Card className="about__stat-card text-center">
                    <Card.Body>
                      <p className="about__stat-value">{s.value}</p>
                      <p className="about__stat-label">{s.label}</p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Education timeline card */}
            <div ref={eduRef} className={`reveal ${eduVisible ? 'is-visible' : ''}`}>
              <Card className="about__edu-card">
                <Card.Body>
                  <h5 className="about__edu-title">Education</h5>
                  {EDUCATION.map((item, i) => (
                    <div
                      className={`about__timeline-item reveal-stagger ${eduVisible ? 'is-visible' : ''}`}
                      style={{ '--delay': `${0.2 + i * 0.12}s` }}
                      key={i}
                    >
                      <div className={`about__dot ${item.active ? 'about__dot--active' : ''}`} />
                      <div>
                        <span className="about__edu-year">{item.year}</span>
                        {item.active && <span className="about__edu-badge">Current</span>}
                        <p className="about__edu-degree">{item.degree}</p>
                        <p className="about__edu-school">{item.school}</p>
                      </div>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </div>
          </Col>

        </Row>
      </Container>
    </section>
  );
}

export default About;