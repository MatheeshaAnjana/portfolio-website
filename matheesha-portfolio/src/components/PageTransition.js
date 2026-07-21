import React, { useEffect, useState } from 'react';
import './PageTransition.css';

/**
 * Full-screen frosted glass panel that wipes upward to cover the
 * screen (blurring whatever's behind it), then wipes further up
 * and off-screen to reveal the new content underneath.
 */
function PageTransition({ onCovered, onComplete }) {
  const [phase, setPhase] = useState('cover'); // 'cover' -> 'reveal'

  useEffect(() => {
    const coverTimer = setTimeout(() => {
      onCovered();
      setPhase('reveal');
    }, 550);

    const doneTimer = setTimeout(() => {
      onComplete();
    }, 550 + 700);

    return () => {
      clearTimeout(coverTimer);
      clearTimeout(doneTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className={`page-transition page-transition--${phase}`} />;
}

export default PageTransition;