import React, { useState, useEffect, useRef } from 'react';
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

/* Counts up from 0 to `target` once `active` flips true, eased out so it
   settles rather than ticking linearly — synced roughly to the bar fill
   via `delay`. Falls back to showing the target instantly under
   prefers-reduced-motion. */
function AnimatedPercent({ target, active, delay = 0, duration = 900 }) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!active) {
      setValue(0);
      return undefined;
    }
    if (prefersReduced) {
      setValue(target);
      return undefined;
    }

    let start;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };

    timeoutRef.current = setTimeout(() => {
      rafRef.current = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timeoutRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, [active, target, delay, duration]);

  return <>{value}%</>;
}

/* Renders one category's grid of skill cards. Deliberately its own
   component (rather than inline JSX in Skills()) so that giving it
   `key={activeFilter}` at the call site fully remounts it — and with it,
   the local `filled` state below — every time the user switches tabs.

   `revealed` is the one-shot "has this section been scrolled into view
   at least once" flag from the parent. `filled` is a SEPARATE, local
   flag that starts false on every mount and flips true a beat later —
   so switching tabs (which remounts this component thanks to the key)
   always replays the 0 → target fill, instead of only playing once
   ever like `revealed` does. */
function SkillsGrid({ activeCategory, revealed }) {
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    if (!revealed) return undefined;

    // Wait a frame (or two) before flipping — if we set `filled` true in
    // the very same paint the cards are created in, the browser has no
    // "0%" state to transition FROM, so nothing would visibly animate.
    let raf2;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setFilled(true));
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [revealed]);

  return (
    <Row className="g-4">
      {activeCategory.skills.map((skill, i) => {
        const delaySeconds = i * 0.06;
        return (
          <Col key={skill.name} lg={3} md={4} sm={6}>
            <div
              className={`skills__skill-card skills__skill-card--pop ${filled ? 'is-visible' : ''}`}
              style={{ '--delay': `${delaySeconds}s` }}
            >
              <div className="skills__skill-top">
                <span className="skills__skill-icon">{skill.icon}</span>
                <div>
                  <p className="skills__skill-name">{skill.name}</p>
                  <p className="skills__skill-level">
                    <AnimatedPercent
                      target={skill.level}
                      active={filled}
                      delay={delaySeconds * 1000 + 150}
                    />
                  </p>
                </div>
              </div>
              <div className="skills__bar-track">
                <div
                  className="skills__bar-fill"
                  style={{
                    width: filled ? `${skill.level}%` : '0%',
                    transitionDelay: `${delaySeconds + 0.15}s`,
                  }}
                />
              </div>
            </div>
          </Col>
        );
      })}
    </Row>
  );
}

function Skills() {
  const [activeFilter, setActiveFilter] = useState(SKILL_CATEGORIES[0].category);
  const [headerRef, headerVisible]   = useScrollReveal();
  const [filtersRef, filtersVisible] = useScrollReveal();
  // Tracks the grid wrapper — one-shot "has it ever been scrolled into
  // view" flag. Stays on this stable, non-remounted wrapper div so the
  // IntersectionObserver isn't torn down and re-created every tab switch.
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

        {/* Filter pills now pop in one after another instead of the whole
            row fading in as one block */}
        <div ref={filtersRef}>
          <ButtonGroup className="skills__filters mb-4">
            {SKILL_CATEGORIES.map((cat, i) => (
              <Button
                key={cat.category}
                variant={activeFilter === cat.category ? 'primary' : 'outline-secondary'}
                className={`skills__filter-btn skills__filter-btn--pop ${activeFilter === cat.category ? 'skills__filter-btn--active' : ''} ${filtersVisible ? 'is-visible' : ''}`}
                style={{ '--delay': `${i * 0.05}s` }}
                onClick={() => setActiveFilter(cat.category)}
              >
                {cat.category}
              </Button>
            ))}
          </ButtonGroup>
        </div>

        {/* key={activeFilter} remounts SkillsGrid on every tab switch,
            which resets its internal `filled` state and replays the
            0 → target fill/pop/count-up from scratch each time. */}
        <div ref={gridRef}>
          <SkillsGrid key={activeFilter} activeCategory={activeCategory} revealed={gridVisible} />
        </div>
      </Container>
    </section>
  );
}

export default Skills;