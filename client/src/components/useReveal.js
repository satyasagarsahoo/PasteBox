import { useEffect } from 'react';

export default function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');

    // Immediately reveal all on mount (staggered)
    elements.forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), 150 * i);
    });

    // Also observe for any late-rendered elements
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
