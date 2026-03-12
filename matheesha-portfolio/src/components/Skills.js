import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './Skills.css';

// Each category contains an icon + list of skills
const SKILL_CATEGORIES = [
  {
    icon: '🎨', category: 'Frontend',
    skills: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js', 'Bootstrap', 'Responsive Design', 'DOM Manipulation'],
  },
  {
    icon: '⚙️', category: 'Backend',
    skills: ['PHP', 'Python', 'Flask', 'REST API', 'CRUD Operations', 'MVC Architecture'],
  },
  {
    icon: '📱', category: 'Mobile',
    skills: ['Flutter', 'Dart', 'Firebase Integration', 'Android Studio'],
  },
  {
    icon: '🗄️', category: 'Database',
    skills: ['MySQL', 'Firebase Realtime DB', 'Database Design', 'Normalization'],
  },
  {
    icon: '💻', category: 'Languages',
    skills: ['JavaScript', 'Python', 'Java', 'C#', 'Dart', 'PHP'],
  },
  {
    icon: '🛠️', category: 'Tools & SE',
    skills: ['Git', 'GitHub', 'VS Code', 'XAMPP', 'OOP', 'SDLC', 'UI/UX Principles'],
  },
];

function Skills() {
  return (
    <section id="skills" className="skills section-border-top" style={{ background: 'var(--bg-primary)' }}>
      <Container>
        <p className="section-label">What I Know</p>
        <h2 className="section-title">Technical Skills</h2>
        <p className="section-subtitle">
          A well-rounded toolkit for building full-stack web and mobile applications from the ground up.
        </p>

        {/* Bootstrap grid of skill cards — 3 columns on large, 2 on medium, 1 on mobile */}
        <Row className="g-4">
          {SKILL_CATEGORIES.map((cat, i) => (
            <Col key={cat.category} lg={4} md={6}>
              <Card
                className="skills__card h-100"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <Card.Body>
                  {/* Card header: icon + category name */}
                  <div className="skills__card-header">
                    <span className="skills__icon">{cat.icon}</span>
                    <h5 className="skills__category">{cat.category}</h5>
                  </div>

                  {/* Skill tags */}
                  <div className="skills__tags">
                    {cat.skills.map((skill) => (
                      <span key={skill} className="skills__tag">{skill}</span>
                    ))}
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

export default Skills;
