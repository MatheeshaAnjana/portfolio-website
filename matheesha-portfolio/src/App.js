import React, { useState, useEffect } from 'react';
import Navbar    from './components/Navbar';
import Hero      from './components/Hero';
import About     from './components/About';
import Skills    from './components/Skills';
import Projects  from './components/Projects';
//import Certifications from './components/Certifications';
//import Contact   from './components/Contact';
//import Footer    from './components/Footer';

function App() {
  // Track whether the user has scrolled past 50 px (for navbar style)
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <Navbar scrolled={scrolled} />

      <main>
       <Hero />
        <About />
        <Skills />
        <Projects />
        {/*<Certifications />
        <Contact /> */}
      </main>

      {/* <Footer /> */}
    </>
  );
}

export default App;
