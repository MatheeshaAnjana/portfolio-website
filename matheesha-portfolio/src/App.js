import React, { useState, useEffect } from 'react';
import Navbar          from './components/Navbar';
import Hero            from './components/Hero';
import About           from './components/About';
import Skills          from './components/Skills';
import Projects        from './components/Projects';
import Certifications  from './components/Certifications';
import Contact         from './components/Contact';
import Footer          from './components/Footer';
import Welcome         from './components/Welcome';
import PageTransition  from './components/PageTransition';
import ScrollProgress  from './components/ScrollProgress';
import './styles/reveal.css';
import './App.css';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme]       = useState('dark');

  // Intro stage: 'intro' -> 'transitioning' -> 'main'
  const [stage, setStage] = useState(
    () => (sessionStorage.getItem('introSeen') === '1' ? 'main' : 'intro')
  );
  const [showWelcome, setShowWelcome] = useState(stage === 'intro');

  // Nav-triggered glass transition (independent of the intro one)
  const [navTarget, setNavTarget] = useState(null); // href string or null

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const handleNavigate = (href) => {
    if (navTarget) return; // ignore clicks while a transition is already running
    setNavTarget(href);
  };

  return (
    <>
      <ScrollProgress />
      <Navbar
        scrolled={scrolled}
        theme={theme}
        toggleTheme={toggleTheme}
        onNavigate={handleNavigate}
      />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />

      {showWelcome && (
        <Welcome onFinish={() => setStage('transitioning')} />
      )}

      {stage === 'transitioning' && (
        <PageTransition
          onCovered={() => setShowWelcome(false)}
          onComplete={() => setStage('main')}
        />
      )}

      {navTarget && (
        <PageTransition
          onCovered={() => {
            document.querySelector(navTarget)?.scrollIntoView({ behavior: 'auto', block: 'start' });
          }}
          onComplete={() => setNavTarget(null)}
        />
      )}
    </>
  );
}

export default App;