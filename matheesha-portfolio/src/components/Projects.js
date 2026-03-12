import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, ButtonGroup, Button } from 'react-bootstrap';
import './Projects.css';

// Project data — add GitHub links when you push to GitHub
const PROJECTS = [
  {
    title:       'Restaurant Management System',
    subtitle:    'Mobile Application',
    description: 'A full-featured mobile app for restaurant operations including order placement, menu browsing, and real-time data updates. Integrated Firebase for authentication and database management.',
    tech:        ['Flutter', 'Dart', 'Firebase', 'React'],
    features:    ['Real-time order management', 'Firebase authentication', 'Dynamic menu display', 'Customer & admin UI'],
    emoji:       '🍽️',
    color:       '#ff6b6b',
    type:        'Mobile',
    github:      'https://github.com/MatheeshaAnjana',
    demo:        null,
  },
  {
    title:       'Restaurant Management System',
    subtitle:    'Web Application',
    description: 'A comprehensive web system with admin dashboard, order tracking, and menu management. Built with PHP backend and Firebase for real-time data storage.',
    tech:        ['HTML', 'CSS', 'JavaScript', 'PHP', 'Firebase'],
    features:    ['Admin dashboard', 'Order & kitchen management', 'Menu with image upload', 'Real-time database'],
    emoji:       '🌐',
    color:       '#f9ca24',
    type:        'Web',
    github:      'https://github.com/MatheeshaAnjana',
    demo:        null,
  },
  {
    title:       'Pet Shop Management System',
    subtitle:    'Desktop Application',
    description: 'A management system for handling pet inventory, customer records, and sales transactions. Connected frontend with MySQL database for persistent data storage.',
    tech:        ['HTML', 'CSS', 'JavaScript', 'Java', 'MySQL'],
    features:    ['Product inventory', 'Customer records', 'Sales tracking', 'Database connectivity'],
    emoji:       '🐾',
    color:       '#6c63ff',
    type:        'Web',
    github:      'https://github.com/MatheeshaAnjana',
    demo:        null,
  },
  {
    title:       'Smart Campus Queue Management',
    subtitle:    'Web System',
    description: 'A web-based queue management system designed to reduce waiting time and manage service requests efficiently within a campus environment.',
    tech:        ['HTML', 'CSS', 'JavaScript', 'Python', 'Flask'],
    features:    ['Token generation', 'Real-time queue updates', 'Admin control panel', 'Flask backend'],
    emoji:       '🏫',
    color:       '#00d4aa',
    type:        'Web',
    github:      'https://github.com/MatheeshaAnjana',
    demo:        null,
  },
];

const FILTERS = ['All', 'Web', 'Mobile'];

function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  // Filter projects based on selected tab
  const visible = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.type === activeFilter);

  return (
    <section id="projects" className="projects section-border-top" style={{ background: 'var(--bg-secondary)' }}>
      <Container>
        <p className="section-label">What I've Built</p>
        <h2 className="section-title">Projects</h2>
        <p className="section-subtitle">
          Real-world applications built with modern technologies, from mobile apps to full-stack web systems.
        </p>

        {/* Filter buttons using Bootstrap ButtonGroup */}
        <ButtonGroup className="projects__filters mb-4">
          {FILTERS.map((f) => (
            <Button
              key={f}
              variant={activeFilter === f ? 'primary' : 'outline-secondary'}
              className={`projects__filter-btn ${activeFilter === f ? 'projects__filter-btn--active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </Button>
          ))}
        </ButtonGroup>

        {/* Project cards grid */}
        <Row className="g-4">
          {visible.map((project, i) => (
            <Col key={`${project.title}-${i}`} lg={6}>
              <Card className="project-card h-100">
                <Card.Body className="d-flex flex-column">

                  {/* Card top row: emoji icon + type badge */}
                  <div className="project-card__top d-flex justify-content-between align-items-center mb-3">
                    <div
                      className="project-card__emoji"
                      style={{ background: `${project.color}18`, border: `1px solid ${project.color}30` }}
                    >
                      {project.emoji}
                    </div>
                    <Badge className="project-card__type-badge">{project.type}</Badge>
                  </div>

                  {/* Title & subtitle */}
                  <Card.Title className="project-card__title">{project.title}</Card.Title>
                  <p className="project-card__subtitle">{project.subtitle}</p>

                  {/* Description */}
                  <Card.Text className="project-card__desc">{project.description}</Card.Text>

                  {/* Key features list */}
                  <ul className="project-card__features">
                    {project.features.map((f) => (
                      <li key={f} className="project-card__feature">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div className="project-card__tech mb-3">
                    {project.tech.map((t) => (
                      <span key={t} className="project-card__tech-tag">{t}</span>
                    ))}
                  </div>

                  {/* Action links pushed to bottom */}
                  <div className="d-flex gap-2 mt-auto">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-card__link project-card__link--github"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                      </svg>
                      GitHub
                    </a>

                    {/* Show Live Demo link only when available */}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-card__link project-card__link--demo"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                        </svg>
                        Live Demo
                      </a>
                    )}
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

export default Projects;
