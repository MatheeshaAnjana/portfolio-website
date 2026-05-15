import React, { useState, useEffect } from 'react';
import Navbar        from './components/Navbar';
import Hero          from './components/Hero';
import About         from './components/About';
import Skills        from './components/Skills';
import Projects      from './components/Projects';
import Certifications from './components/Certifications';
import Contact       from './components/Contact';
import Footer        from './components/Footer';
import './App.css';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme]       = useState('dark'); // 'dark' | 'light'

  // Apply theme to <html> so CSS [data-theme] selector works globally
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () =>
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <>
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
    </>
  );
}

export default App;