import { useEffect, useRef, useState } from 'react';

/**
 * Reusable scroll-reveal hook.
 * Attach the returned ref to any element; once it scrolls into view,
 * `isVisible` flips to true (one-shot — it won't re-hide on scroll away).
 *
 * @param {Object} options
 * @param {number} options.threshold - fraction of element visible before triggering (0–1)
 * @param {string} options.rootMargin - shrinks/grows the trigger area, e.g. '-80px'
 */
function useScrollReveal({ threshold = 0.15, rootMargin = '0px 0px -60px 0px' } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect users who prefer reduced motion — show immediately, no animation delay
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node); // animate once, then stop watching
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isVisible];
}

export default useScrollReveal;