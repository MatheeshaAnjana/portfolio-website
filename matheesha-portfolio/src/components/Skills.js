import React, { useState } from 'react';
import { Container, Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import useScrollReveal from '../hooks/useScrollReveal';
import './Skills.css';

const SKILL_CATEGORIES = [
  {
    category: 'Frontend',
    skills: [
      { name: 'HTML5',               level: 95, icon: '🌐' },
      { name: 'CSS3',                level: 90, icon: '🎨' },
      { name: 'JavaScript (ES6+)',   level: 90, icon: '⚡' },
      { name: 'React.js',            level: 85, icon: '⚛️' },
      { name: 'Bootstrap',           level: 88, icon: '🅱️' },
      { name: 'Responsive Design',   level: 90, icon: '📐' },
      { name: 'DOM Manipulation',    level: 85, icon: '🧩' },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'PHP',                 level: 80, icon: '🐘' },
      { name: 'Python',              level: 85, icon: '🐍' },
      { name: 'Flask',               level: 82, icon: '🧪' },
      { name: 'REST API',            level: 85, icon: '🔗' },
      { name: 'CRUD Operations',     level: 88, icon: '🗂️' },
      { name: 'MVC Architecture',    level: 80, icon: '🏗️' },
    ],
  },
  {
    category: 'Mobile',
    skills: [
      { name: 'Flutter',             level: 85, icon: '🐦' },
      { name: 'Dart',                level: 82, icon: '🎯' },
      { name: 'Firebase Integration',level: 85, icon: '🔥' },
      { name: 'Android Studio',      level: 78, icon: '🤖' },
      { name: 'Kotlin',              level: 70, icon: '📱' },
      { name: 'React Native',        level: 65, icon: '⚛️' },
    ],
  },
  {
    category: 'Database',
    skills: [
      { name: 'MySQL',               level: 88, icon: '🐬' },
      { name: 'Firebase Realtime DB',level: 85, icon: '🔥' },
      { name: 'Database Design',     level: 85, icon: '🗄️' },
      { name: 'Oracle',              level: 80, icon: '🔺' },
      { name: 'MongoDB',             level: 78, icon: '🍃' },
      { name: 'SQLite',              level: 80, icon: '💾' },
    ],
  },
  {
    category: 'Languages',
    skills: [
      { name: 'JavaScript',          level: 90, icon: '⚡' },
      { name: 'Python',              level: 85, icon: '🐍' },
      { name: 'Java',                level: 80, icon: '☕' },
      { name: 'C#',                  level: 75, icon: '#️⃣' },
      { name: 'Dart',                level: 80, icon: '🎯' },
      { name: 'PHP',                 level: 80, icon: '🐘' },
    ],
  },
  {
    category: 'Tools & SE',
    skills: [
      { name: 'Git',                 level: 90, icon: '🔧' },
      { name: 'GitHub',              level: 90, icon: '🐙' },
      { name: 'VS Code',             level: 95, icon: '💻' },
      { name: 'IntelliJ',            level: 80, icon: '🧠' },
      { name: 'Postman',             level: 85, icon: '📮' },
      { name: 'XAMPP',               level: 82, icon: '🖥️' },
      { name: 'OOP',                 level: 85, icon: '🧱' },
      { name: 'UI/UX Principles',    level: 78, icon: '🎯' },
    ],
  },
];

function Skills() {
  const [activeFilter, setActiveFilter] = useState(SKILL_CATEGORIES[0].category);
  const [headerRef, headerVisible]   = useScrollReveal();
  const [filtersRef, filtersVisible] = useScrollReveal();
  // Tracks the grid itself — bars only fill once this is scrolled into view
  const [gridRef, gridVisible]       = useScrollReveal({ threshold: 0.2 });

  const activeCategory = SKILL_CATEGORIES.find((c) => c.category === activeFilter);

  return (
    <section id="skills" className="skills section-border-top" style={{ background: 'var(--bg-primary)' }}>
      <Container>
        <div ref={headerRef} className={`reveal ${headerVisible ? 'is-visible' : ''}`}>
          <p className="section-label">What I Know</p>
          <h2 className="section-title section-title--underline">Technical Skills</h2>
          <p className="section-subtitle">
            A well-rounded toolkit for building full-stack web and mobile applications from the ground up.
          </p>
        </div>

        <div ref={filtersRef} className={`reveal ${filtersVisible ? 'is-visible' : ''}`}>
          <ButtonGroup className="skills__filters mb-4">
            {SKILL_CATEGORIES.map((cat) => (
              <Button
                key={cat.category}
                variant={activeFilter === cat.category ? 'primary' : 'outline-secondary'}
                className={`skills__filter-btn ${activeFilter === cat.category ? 'skills__filter-btn--active' : ''}`}
                onClick={() => setActiveFilter(cat.category)}
              >
                {cat.category}
              </Button>
            ))}
          </ButtonGroup>
        </div>

        {/* key={activeFilter} forces remount so bars reset to 0% on filter change too */}
        <Row ref={gridRef} className="g-4" key={activeFilter}>
          {activeCategory.skills.map((skill, i) => (
            <Col key={skill.name} lg={3} md={4} sm={6}>
              <div
                className={`skills__skill-card skills__skill-card--animate ${gridVisible ? 'is-visible' : ''}`}
                style={{ '--delay': `${i * 0.06}s` }}
              >
                <div className="skills__skill-top">
                  <span className="skills__skill-icon">{skill.icon}</span>
                  <div>
                    <p className="skills__skill-name">{skill.name}</p>
                    <p className="skills__skill-level">{skill.level}%</p>
                  </div>
                </div>
                <div className="skills__bar-track">
                  <div
                    className="skills__bar-fill"
                    style={{
                      width: gridVisible ? `${skill.level}%` : '0%',
                      transitionDelay: `${i * 0.06 + 0.15}s`,
                    }}
                  />
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Skills;