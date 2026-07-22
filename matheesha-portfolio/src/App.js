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
import CustomCursor    from './components/CustomCursor';
import './styles/reveal.css';
import './App.css';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme]       = useState('dark');

  const [showWelcome, setShowWelcome] = useState(
    () => sessionStorage.getItem('introSeen') !== '1'
  );

  // Hero's entrance animation only plays once Welcome is actually gone.
  // If the intro was already seen this session, Hero animates immediately.
  const [heroRevealed, setHeroRevealed] = useState(
    () => sessionStorage.getItem('introSeen') === '1'
  );

  // Nav-triggered glass transition (unchanged — still used for section jumps)
  const [navTarget, setNavTarget] = useState(null);

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
    if (navTarget) return;
    setNavTarget(href);
  };

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navbar
        scrolled={scrolled}
        theme={theme}
        toggleTheme={toggleTheme}
        onNavigate={handleNavigate}
      />
      <main>
        <Hero revealed={heroRevealed} />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />

      {/* Welcome now handles its own exit (slide up + blur) —
          onFinish just unmounts it once that animation completes,
          and simultaneously flips heroRevealed so Hero's entrance
          animation starts exactly as Welcome disappears */}
      {showWelcome && (
        <Welcome
          onFinish={() => {
            setShowWelcome(false);
            setHeroRevealed(true);
          }}
        />
      )}

      {/* Nav-link glass transition — still used for section jumps */}
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