import React, { useState, useRef, useEffect } from 'react';
import { Container, ButtonGroup, Button } from 'react-bootstrap';
import useScrollReveal from '../hooks/useScrollReveal';
import './Projects.css';

// Project images — add matching files to src/assets/projects/
import imgPortfolio     from '../assets/projects/portfolio.jpg';
import imgSmartGadget   from '../assets/projects/smart-gadget.jpg';
import imgTumericWeb    from '../assets/projects/thetumeric-web.jpg';
import imgTumericMobile from '../assets/projects/thetumeric-mobile.jpg';
import imgRobot         from '../assets/projects/assistive-robot.jpg';
import imgPetShop       from '../assets/projects/pet-shop.jpg';
import imgSmartQueue    from '../assets/projects/smart-queue.jpg';
import imgLearnify      from '../assets/projects/learnify.jpg';
import imgSmartMedicineRobot from '../assets/projects/smart-medicine-robot.jpg';
import imgLoanApproval from '../assets/projects/loan-approval.jpg';

const PROJECTS = [
  {
  title:       'Learnify – Learning Management System',
  subtitle:    'Full-Stack MERN Web Application',
  description: 'A complete full-stack LMS with three role-based portals — Student, Instructor, and Admin — featuring JWT authentication, video-based course delivery with Cloudinary uploads, real-time notifications, mock payment enrollment flow, course progress tracking, and a glassmorphism UI with dark/light mode.',
  tech:        ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'JWT', 'Cloudinary', 'Framer Motion'],
  features:    ['Role-based access control', 'Video & PDF lesson upload', 'Real-time notifications', 'Mock payment & enrollment'],
  image:       imgLearnify,
  emoji:       '🎓',
  color:       '#0a84ff',
  type:        'Web',
  github:      'https://github.com/MatheeshaAnjana/learnify-lms-website.git',
  demo:        null,
},
{
  title:       'Loan Approval Prediction System',
  subtitle:    'Machine Learning & Flask Deployment',
  description: 'An end-to-end machine learning pipeline that predicts loan approval outcomes using binary classification. Includes full data preprocessing, feature engineering, comparison of three ML models (Logistic Regression, KNN, Random Forest), hyperparameter tuning with GridSearchCV, and deployment as a Flask web application.',
  tech:        ['Python', 'scikit-learn', 'Flask', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'joblib'],
  features:    ['3-model comparison & evaluation', 'GridSearchCV hyperparameter tuning', 'Feature engineering & SelectKBest', 'Flask web app deployment'],
  image:       imgLoanApproval,
  emoji:       '🏦',
  color:       '#f39c12',
  type:        'ML',
  github:      'https://github.com/MatheeshaAnjana/loan-approval-prediction-ml.git',
  demo:        null,
},
{
  title:       'Smart Hospital Medicine Cart System',
  subtitle:    'IoT-Based Healthcare Automation System',
  description: 'An IoT-powered smart medicine cart that automates medicine delivery using ESP32, RFID patient identification, Firebase cloud services, a React web dashboard, and a mobile application for real-time monitoring and patient safety.',
  tech:        ['React', 'Firebase', 'ESP32', 'RFID', 'Arduino', 'JavaScript', 'IoT'],
  features:    ['RFID patient verification', 'Real-time medicine tracking', 'Hospital dashboard', 'Mobile monitoring'],
  image:       imgSmartMedicineRobot,
  emoji:       '🤖',
  color:       '#00b894',
  type:        'Robotics',
  github:      'https://github.com/MatheeshaAnjana/your-repository',
  demo:        null,
},
  {
    title:       'Personal Portfolio Website',
    subtitle:    'Interactive Developer Portfolio',
    description: 'A fully custom React portfolio with a deep black × crimson red × Apple liquid glass design system, floating dynamic island navbar, parallax hero, and smooth section animations.',
    tech:        ['React', 'Bootstrap', 'CSS3', 'JavaScript', 'GitHub Pages'],
    features:    ['Apple liquid glass UI', 'Dynamic island navbar', 'Dark / Light theme', 'Parallax mouse-tracking hero'],
    image:       imgPortfolio,
    emoji:       '🎨',
    color:       '#dc2626',
    type:        'Web',
    github:      'https://github.com/MatheeshaAnjana/portfolio-website.git',
    demo:        'https://MatheeshaAnjana.github.io/portfolio-website',
  },
  {
    title:       'Smart Gadget Marketplace',
    subtitle:    'Full-Stack E-Commerce System',
    description: 'A full-stack e-commerce marketplace for tech gadgets featuring product management, order processing, activity logging, and real-time analytics using hybrid database integration.',
    tech:        ['Python', 'Flask', 'Oracle SQL', 'MongoDB', 'HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    features:    ['Role-based authentication', 'Shopping cart & checkout', 'PL/SQL procedures & triggers', 'Analytics dashboard'],
    image:       imgSmartGadget,
    emoji:       '🛒',
    color:       '#4da6ff',
    type:        'Web',
    github:      'https://github.com/MatheeshaAnjana/smart-gadget-marketplace-system.git',
    demo:        null,
  },
  {
    title:       'AI-Integrated Restaurant Management System',
    subtitle:    'Web Application',
    description: 'A web-based restaurant management platform with admin dashboard, order tracking, and analytics to streamline operations and support data-driven decision making.',
    tech:        ['HTML', 'CSS', 'JavaScript', 'PHP', 'Firebase'],
    features:    ['Admin dashboard', 'Order & menu management', 'Customer & staff management', 'Sales analytics'],
    image:       imgTumericWeb,
    emoji:       '🌐',
    color:       '#f9ca24',
    type:        'Web',
    categories:  ['Web', 'AI'],
    github:      'https://github.com/MatheeshaAnjana/TheTumeric-FoodDeliveryWebSite.git',
    demo:        null,
  },
  {
    title:       'Restaurant Management System',
    subtitle:    'Mobile Application',
    description: 'A mobile application for customers to browse menus, place orders, and track orders in real time with Firebase integration.',
    tech:        ['Flutter', 'Dart', 'Firebase'],
    features:    ['Real-time order tracking', 'Firebase authentication', 'Menu browsing', 'User-friendly UI'],
    image:       imgTumericMobile,
    emoji:       '🍽️',
    color:       '#ff6b6b',
    type:        'Mobile',
    github:      'https://github.com/MatheeshaAnjana/TheTumeric-FoodDeliveryMobileApp.git',
    demo:        null,
  },
  {
    title:       'Assistive Service Robot',
    subtitle:    'IoT & Robotics Project',
    description: 'A smart robotic assistant designed to support elderly individuals with obstacle detection, Wi-Fi control, and lightweight item delivery.',
    tech:        ['ESP32', 'IoT', 'Embedded Systems', 'Sensors'],
    features:    ['Obstacle detection', 'Wi-Fi control', 'Object delivery', 'Real-time control system'],
    image:       imgRobot,
    emoji:       '🤖',
    color:       '#00a8ff',
    type:        'Robotics',
    github:      'https://www.linkedin.com/posts/matheesha-amarathunga_githubcopilot-softwareengineering-learning-ugcPost-7446916550856486913-3-2c?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFxnIVYB2sxjgObYHP-r_6ChfkURfX-CxVk',
    demo:        'https://www.linkedin.com/feed/update/urn:li:activity:7438821197938589696/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFxnIVYB2sxjgObYHP-r_6ChfkURfX-CxVk',
  },
  {
    title:       'Pet Shop Management System',
    subtitle:    'Full-Stack Web Application',
    description: 'A full-stack system to manage pet owners, pets, veterinary services, and appointments using a React frontend and Spring Boot backend.',
    tech:        ['React', 'Spring Boot', 'Java', 'MySQL'],
    features:    ['Owner & pet management', 'Appointment scheduling', 'REST API backend', 'Database integration'],
    image:       imgPetShop,
    emoji:       '🐾',
    color:       '#6c63ff',
    type:        'Web',
    github:      'https://github.com/Dasanayaka-K-S/pet-shop-management-system.git',
    demo:        null,
  },
  {
    title:       'Smart Campus Queue Management',
    subtitle:    'Web System',
    description: 'A queue management system designed to reduce waiting time in campus services through token generation and real-time queue tracking.',
    tech:        ['HTML', 'CSS', 'JavaScript', 'Python', 'Flask'],
    features:    ['Token generation', 'Real-time queue updates', 'Admin control panel', 'Priority handling'],
    image:       imgSmartQueue,
    emoji:       '🏫',
    color:       '#00d4aa',
    type:        'Web',
    github:      'https://github.com/MatheeshaAnjana/Smart_Queue_Management_Project.git',
    demo:        null,
  },
];

const FILTERS = [
  { label: 'All',      categories: [], icon: null },
  { label: 'Web',      categories: ['Web'], icon: '🌐' },
  { label: 'Mobile',   categories: ['Mobile'], icon: '📱' },
  { label: 'AI & ML',  categories: ['AI', 'ML'], icon: '🧠' },
  { label: 'Robotics', categories: ['Robotics'], icon: '🤖' },
];

function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const scrollRef  = useRef(null);
  const dragState  = useRef({
    isDown: false,
    startX: 0,
    startScroll: 0,
    moved: false,
    lastX: 0,
    lastTime: 0,
    velocity: 0,   // px/ms, smoothed
    rafId: null,
  });
  const prefersReducedRef = useRef(false);
  const [headerRef, headerVisible] = useScrollReveal();
  const [carouselRef, carouselVisible] = useScrollReveal({ threshold: 0.1 });

  useEffect(() => {
    prefersReducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return () => cancelAnimationFrame(dragState.current.rafId);
  }, []);

  const visible = (() => {
    if (activeFilter === 'All') return PROJECTS;
    const filter = FILTERS.find((f) => f.label === activeFilter);
    if (!filter) return PROJECTS;
    return PROJECTS.filter((project) => {
      const categories = project.categories ?? [project.type];
      return categories.some((category) => filter.categories.includes(category));
    });
  })();

  const getRoboticsLinkLabel = (project) => {
    if (project.type === 'Robotics') return 'LinkedIn';
    return 'GitHub';
  };

  const onMouseDown = (e) => {
    const el = scrollRef.current;
    cancelAnimationFrame(dragState.current.rafId); // stop any in-flight momentum glide
    dragState.current = {
      isDown: true,
      startX: e.pageX,
      startScroll: el.scrollLeft,
      moved: false,
      lastX: e.pageX,
      lastTime: performance.now(),
      velocity: 0,
      rafId: null,
    };
    el.classList.add('projects__scroll--dragging');
  };

  const onMouseMove = (e) => {
    if (!dragState.current.isDown) return;
    const el = scrollRef.current;
    const dx = e.pageX - dragState.current.startX;
    if (Math.abs(dx) > 4) dragState.current.moved = true;
    el.scrollLeft = dragState.current.startScroll - dx;

    // Track a smoothed instantaneous velocity so the release "fling" reflects
    // how fast the pointer was actually moving, not just the last pixel jump.
    const now = performance.now();
    const dt = now - dragState.current.lastTime;
    if (dt > 0) {
      const instVelocity = (e.pageX - dragState.current.lastX) / dt;
      dragState.current.velocity = dragState.current.velocity * 0.7 + instVelocity * 0.3;
    }
    dragState.current.lastX = e.pageX;
    dragState.current.lastTime = now;
  };

  const endDrag = () => {
    if (!dragState.current.isDown) return;
    dragState.current.isDown = false;
    const el = scrollRef.current;
    el?.classList.remove('projects__scroll--dragging');
    if (!el) return;

    // Momentum: coast onward in the direction the drag was moving and
    // decelerate smoothly, instead of stopping dead the instant the
    // mouse button is released — this is the bulk of "smoother drag physics".
    let velocity = dragState.current.velocity * 16; // px/ms → approx px/frame at 60fps
    const friction = 0.94;

    const glide = () => {
      if (Math.abs(velocity) < 0.5) return;
      const max = el.scrollWidth - el.clientWidth;
      const next = el.scrollLeft - velocity;
      el.scrollLeft = Math.max(0, Math.min(next, max));
      velocity *= friction;

      if (el.scrollLeft > 0 && el.scrollLeft < max) {
        dragState.current.rafId = requestAnimationFrame(glide);
      }
    };

    if (Math.abs(velocity) > 1) {
      dragState.current.rafId = requestAnimationFrame(glide);
    }
  };

  const onClickCapture = (e) => {
    if (dragState.current.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const onWheel = (e) => {
    const el = scrollRef.current;
    if (!el) return;
    const canScrollX = el.scrollWidth > el.clientWidth;
    if (!canScrollX) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      el.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  };

  // 3D cursor-tilt: rotation is set directly on the DOM node (not via React
  // state) so it tracks the pointer with zero re-render lag. The card's own
  // `transition` (declared once, in Projects.css) handles the smooth
  // spring-back on mouse leave; while actively tilting we drop to a near-
  // instant transition via the `.is-tilting` class so it feels responsive.
  const handleCardMouseMove = (e) => {
    if (dragState.current.isDown) return; // don't fight the carousel drag
    if (prefersReducedRef.current) return;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;  // -0.5 .. 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const maxTilt = 9; // degrees

    card.style.setProperty('--ry', `${(px * maxTilt * 2).toFixed(2)}deg`);
    card.style.setProperty('--rx', `${(-py * maxTilt * 2).toFixed(2)}deg`);
    card.classList.add('is-tilting');
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    card.classList.remove('is-tilting');
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  };

  return (
    <section id="projects" className="projects section-border-top" style={{ background: 'var(--bg-secondary)' }}>
      <Container>
        <div ref={headerRef} className={`reveal ${headerVisible ? 'is-visible' : ''}`}>
          <p className="section-label">What I've Built</p>
          <h2 className="section-title section-title--underline">Projects</h2>
          <p className="section-subtitle">
            Real-world applications built with modern technologies, from mobile apps to full-stack web systems.
          </p>
        </div>

        <ButtonGroup className="projects__filters mb-4">
          {FILTERS.map((f) => (
            <Button
              key={f.label}
              variant={activeFilter === f.label ? 'primary' : 'outline-secondary'}
              className={`projects__filter-btn ${activeFilter === f.label ? 'projects__filter-btn--active' : ''} ${f.label === 'Robotics' ? 'projects__filter-btn--robotics' : ''}`}
              onClick={() => setActiveFilter(f.label)}
            >
              {f.icon && <span className="projects__filter-icon">{f.icon}</span>}
              {f.label}
            </Button>
          ))}
        </ButtonGroup>
      </Container>

      <div
        className="projects__scroll"
        ref={(node) => { scrollRef.current = node; carouselRef.current = node; }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onWheel={onWheel}
        onClickCapture={onClickCapture}
      >
        {visible.map((project, i) => (
          <div
            className={`project-card project-card--slide-in ${project.type === 'Robotics' ? 'project-card--robotics' : ''} ${carouselVisible ? 'is-visible' : ''}`}
            key={`${project.title}-${i}`}
            style={{ '--delay': `${i * 0.09}s` }}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            <div className="project-card__image-wrap">
              <img src={project.image} alt={project.title} className="project-card__image" draggable="false" />
              <span
                className={`project-card__type-badge ${project.type === 'Robotics' ? 'project-card__type-badge--robotics' : ''}`}
              >
                {project.type}
              </span>
            </div>

            <div className="project-card__body">
              <div className="project-card__title-row">
                <div
                  className="project-card__emoji"
                  style={{ background: `${project.color}22`, border: `1px solid ${project.color}50` }}
                >
                  {project.emoji}
                </div>
                <div>
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__subtitle">{project.subtitle}</p>
                </div>
              </div>

              <p className="project-card__desc">{project.description}</p>

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

              <div className="project-card__tech mb-3">
                {project.tech.map((t) => (
                  <span key={t} className="project-card__tech-tag">{t}</span>
                ))}
              </div>

              <div className="d-flex gap-2 mt-auto">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card__link project-card__link--github"
                >
                  {project.type === 'Robotics' ? (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                  )}
                  {getRoboticsLinkLabel(project)}
                </a>

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
                    {project.type === 'Robotics' ? 'View Post' : 'Live Demo'}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;