import React, { useEffect, useState } from 'react';
import './ScrollProgress.css';

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(pct);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // set initial value
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="scroll-progress">
      <div className="scroll-progress__fill" style={{ width: `${progress}%` }} />
    </div>
  );
}

export default ScrollProgress;