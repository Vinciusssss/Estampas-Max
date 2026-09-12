function autoTagSectionIntros() {
  document.querySelectorAll('section > div:first-of-type, header > div:first-of-type').forEach((el) => {
    if (!el.classList.contains('reveal') && !el.id) {
      el.classList.add('reveal');
    }
  });
}

export function initReveal() {
  autoTagSectionIntros();
  const targets = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || targets.length === 0) {
    targets.forEach((t) => t.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((t) => observer.observe(t));
}
