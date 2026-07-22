import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const HOVER_SELECTOR = 'a, button, [role="button"], input, textarea, select, .di-link, .di-cta, .hero__chip';
const TAIL_LENGTH = 6; // number of trailing dots behind the main dot

function CustomCursor() {
  const dotRef = useRef(null);
  const tailRefs = useRef([]);
  // Each tail point lerps toward the one in front of it, so motion
  // ripples backward smoothly instead of every dot chasing the mouse directly
  const points = useRef(
    Array.from({ length: TAIL_LENGTH + 1 }, () => ({ x: 0, y: 0 }))
  );
  const mouse = useRef({ x: 0, y: 0 });

  const [isTouch, setIsTouch] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const touch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    setIsTouch(touch);
    if (touch) return;

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      setIsHovering(!!(target.closest && target.closest(HOVER_SELECTOR)));
    };

    const onLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);

    let rafId;
    const LERP_MAIN = 1;      // main dot follows mouse exactly, no lag
    const LERP_TAIL = 0.35;   // how quickly each tail point catches up to the one ahead of it

    const tick = () => {
      // Point 0 = main dot, snaps straight to mouse
      points.current[0].x += (mouse.current.x - points.current[0].x) * LERP_MAIN;
      points.current[0].y += (mouse.current.y - points.current[0].y) * LERP_MAIN;

      // Each subsequent point eases toward the previous point's position,
      // so the tail moves slowly and smoothly, lagging progressively more
      for (let i = 1; i < points.current.length; i++) {
        const prev = points.current[i - 1];
        const cur = points.current[i];
        cur.x += (prev.x - cur.x) * LERP_TAIL;
        cur.y += (prev.y - cur.y) * LERP_TAIL;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${points.current[0].x}px, ${points.current[0].y}px)`;
      }
      tailRefs.current.forEach((node, i) => {
        const pt = points.current[i + 1];
        if (node && pt) {
          node.style.transform = `translate(${pt.x}px, ${pt.y}px)`;
        }
      });

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Tail dots — rendered first so they sit visually behind the main dot */}
      {Array.from({ length: TAIL_LENGTH }).map((_, i) => (
        <div
          key={i}
          ref={(node) => { tailRefs.current[i] = node; }}
          className={`cursor-tail-dot ${isVisible ? 'is-visible' : ''}`}
          style={{ '--i': i }}
        />
      ))}

      {/* Main dot — follows the mouse exactly, no lag */}
      <div
        ref={dotRef}
        className={`cursor-main-dot ${isHovering ? 'cursor-main-dot--hover' : ''} ${isVisible ? 'is-visible' : ''}`}
      />
    </>
  );
}

export default CustomCursor;