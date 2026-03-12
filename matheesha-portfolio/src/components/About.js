import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './About.css';

// Quick stats shown in small cards
const STATS = [
  { value: '2+', label: 'Years Learning' },
  { value: '5+', label: 'Projects Built' },
  { value: '4+', label: 'Certifications' },
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

function About() {
  return (
    <section id="about" className="about section-border-top" style={{ background: 'var(--bg-secondary)' }}>
      <Container>
        {/* Section header */}
        <p className="section-label">Who I Am</p>
        <h2 className="section-title">About Me</h2>

        <Row className="gy-5 align-items-start">

          {/* ── Left: biography text ── */}
          <Col lg={7}>
            <p className="about__para">
              I'm a dedicated and passionate Software Engineering student based in
              Kurunegala, Sri Lanka. With hands-on experience building full-stack web
              and mobile applications, I thrive on turning ideas into real-world products.
            </p>
            <p className="about__para">
              My toolkit spans beautiful UIs with <strong>React.js</strong>, cross-platform
              mobile apps with <strong>Flutter</strong>, and backend systems using{' '}
              <strong>PHP</strong>, <strong>Flask</strong>, <strong>MySQL</strong>, and{' '}
              <strong>Firebase</strong>. I'm equally comfortable designing database schemas
              and crafting pixel-perfect interfaces.
            </p>
            <p className="about__para">
              Currently pursuing my Higher National Diploma in Software Engineering at NIBM,
              I'm always expanding my skills and looking for opportunities to contribute to
              innovative software solutions.
            </p>

            {/* Contact info grid */}
            <Row className="about__info-grid g-3 mt-2">
              {[
                { label: 'Location', value: 'Kurunegala, Sri Lanka', href: null },
                { label: 'Email', value: 'matheeshaanjana01@gmail.com', href: 'mailto:matheeshaanjana01@gmail.com' },
                { label: 'Phone', value: '+94 77 165 6886', href: 'tel:+94771656886' },
                { label: 'GitHub', value: 'github.com/MatheeshaAnjana', href: 'https://github.com/MatheeshaAnjana' },
              ].map((item) => (
                <Col xs={12} sm={6} key={item.label}>
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
            <Row className="g-3 mb-4">
              {STATS.map((s) => (
                <Col xs={6} key={s.label}>
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
            <Card className="about__edu-card">
              <Card.Body>
                <h5 className="about__edu-title">Education</h5>
                {EDUCATION.map((item, i) => (
                  <div className="about__timeline-item" key={i}>
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
          </Col>

        </Row>
      </Container>
    </section>
  );
}

export default About;
