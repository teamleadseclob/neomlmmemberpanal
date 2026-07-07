import { useEffect } from 'react';

export default function useScrollAnimations() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const settings = el.dataset.settings;
            if (!settings) return;
            try {
              const parsed = JSON.parse(settings);
              const anim = parsed._animation || parsed.animation;
              const delay = parseInt(parsed._animation_delay || parsed.animation_delay || '0', 10);
              if (anim) {
                setTimeout(() => {
                  el.style.animationFillMode = 'both';
                  el.classList.remove('elementor-invisible');
                  el.classList.add('animated', anim);
                }, delay);
              }
            } catch (e) { /* ignore */ }
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('[data-settings]');
      elements.forEach((el) => {
        try {
          const settings = JSON.parse(el.dataset.settings);
          if (settings._animation || settings.animation) {
            el.classList.add('elementor-invisible');
            observer.observe(el);
          }
        } catch (e) { /* ignore */ }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);
}
