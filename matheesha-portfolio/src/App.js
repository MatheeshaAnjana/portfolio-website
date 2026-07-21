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

  // stage: 'intro' -> 'transitioning' -> 'main'
  const [stage, setStage] = useState(
    () => (sessionStorage.getItem('introSeen') === '1' ? 'main' : 'intro')
  );
  const [showWelcome, setShowWelcome] = useState(stage === 'intro');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <>
      {/* Main site is always mounted underneath — Welcome/PageTransition sit on top of it */}
      <ScrollProgress />
      <Navbar scrolled={scrolled} theme={theme} toggleTheme={toggleTheme} />
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
    </>
  );
}

export default App;