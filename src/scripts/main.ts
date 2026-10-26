import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const header = document.querySelector<HTMLElement>('.site-header')!;
const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle')!;
const mobileNav = document.querySelector<HTMLElement>('#mobile-nav')!;
let lenis: Lenis | undefined;

// One animation clock for scrolling and scroll-linked effects.
const tick = (time: number) => lenis?.raf(time * 1000);
function syncScrollPreference() {
  lenis?.destroy();
  lenis = undefined;
  gsap.ticker.remove(tick);
  if (!motionQuery.matches) {
    lenis = new Lenis({ duration: 1.1, smoothWheel: true, syncTouch: false });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
  }
}
syncScrollPreference();
motionQuery.addEventListener('change', syncScrollPreference);

function closeMenu(returnFocus = false) {
  mobileNav.hidden = true;
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Buka menu navigasi');
  if (returnFocus) toggle.focus();
}
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  mobileNav.hidden = !open;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Tutup menu navigasi' : 'Buka menu navigasi');
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileNav.hidden) closeMenu(true);
});
document.addEventListener('click', event => {
  if (!mobileNav.hidden && !header.contains(event.target as Node)) closeMenu();
});
window.matchMedia('(min-width: 768px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

// All in-page navigation uses Lenis; the browser is a no-JS/reduced-motion fallback.
document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const hash = link.getAttribute('href');
    if (!hash || hash === '#') return;
    const target = document.getElementById(hash.slice(1));
    if (!target) return;
    event.preventDefault();
    closeMenu();
    const finish = () => {
      history.replaceState(null, '', hash);
      // Focus the content wrapper so keyboard navigation continues at the
      // destination without adding section landmarks to the Tab sequence.
      const focusTarget = target.querySelector<HTMLElement>('[data-anchor-focus]') ?? target;
      focusTarget.focus({ preventScroll: true });
    };
    // Lenis already accounts for the CSS scroll-padding-top.
    const scrollTarget = target.parentElement?.classList.contains('pin-spacer') ? target.parentElement : target;
    if (lenis) {
      const destination = hash === '#home' ? 0 : scrollTarget;
      const padding = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      const targetY = hash === '#home' ? 0 : scrollTarget.getBoundingClientRect().top + window.scrollY - padding;
      const distance = Math.abs(window.scrollY - targetY);
      // Long returns need time to accelerate and settle instead of dropping
      // most of the page distance in the first frames of the default ease-out.
      lenis.scrollTo(destination, {
        duration: gsap.utils.clamp(.9, 2.8, .8 + distance / 4500),
        easing: gsap.parseEase('power2.inOut'),
        onComplete: finish,
      });
    }
    else { scrollTarget.scrollIntoView({ behavior: 'instant', block: 'start' }); finish(); }
  });
});

window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 24);
}, { passive: true });

const media = gsap.matchMedia();

// Preserve the original line breaks and emphasis; hide only the visual word
// fragments from assistive technology and expose one intact heading label.
document.querySelectorAll<HTMLElement>('#hero-title, #menu-title, #story-title, #order-title, #closing-title').forEach(heading => {
  heading.setAttribute('aria-label', heading.innerText.replace(/\s+/g, ' ').trim());
  const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) if (walker.currentNode.textContent?.trim()) nodes.push(walker.currentNode as Text);
  nodes.forEach(node => {
    const fragment = document.createDocumentFragment();
    node.textContent!.split(/(\s+)/).forEach(word => {
      if (!word.trim()) { fragment.append(document.createTextNode(word)); return; }
      const mask = document.createElement('span');
      mask.className = 'word-mask';
      mask.setAttribute('aria-hidden', 'true');
      const inner = document.createElement('span');
      inner.className = 'motion-word';
      inner.textContent = word;
      mask.append(inner);
      fragment.append(mask);
    });
    node.replaceWith(fragment);
  });
});

media.add('(prefers-reduced-motion: no-preference)', () => {
  const entrance = gsap.timeline({ defaults: { ease: 'power3.out' } });
  entrance.from('.header-inner > *', { y: -18, opacity: 0, duration: .7, stagger: .06, clearProps: 'transform,opacity' }, 0)
    .from('.hero .eyebrow', { y: 18, opacity: 0, duration: .7, clearProps: 'transform,opacity' }, .12)
    .from('#hero-title .motion-word', { yPercent: 115, rotation: 5, duration: 1.05, stagger: .055, clearProps: 'transform' }, .2)
    .from('.hero-sub, .hero-actions', { y: 28, opacity: 0, duration: .8, stagger: .08, clearProps: 'transform,opacity' }, .65)
    .from('.hero-photo', { scale: 1.12, opacity: .3, duration: 1.7, clearProps: 'transform,opacity' }, .1)
    .from('.hero-note', { y: 30, opacity: 0, duration: 1, clearProps: 'transform,opacity' }, .8);

  gsap.to('.hero-copy', { yPercent: -24, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom 15%', scrub: true } });
  gsap.to('.hero-photo img', { y: 100, scale: 1.18, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero-note', { y: -65, rotation: 4, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.page-progress > span', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: true } });

  document.querySelectorAll<HTMLElement>('#menu-title, #story-title, #order-title, #closing-title').forEach(heading => {
    gsap.from(heading.querySelectorAll('.motion-word'), {
      yPercent: 112, rotation: 4, opacity: .15, stagger: .07, ease: 'power2.out',
      scrollTrigger: { trigger: heading, start: 'top 94%', end: 'top 48%', scrub: true },
    });
  });
  document.querySelectorAll<HTMLElement>('.section-intro .eyebrow, .intro-description, .menu-tools, .story-copy > p, .story-copy blockquote, .story-copy > a, .order-intro, .order-note').forEach(element => {
    gsap.from(element, { y: 28, opacity: 0, duration: .75, ease: 'power3.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: element, start: 'top 92%', once: true } });
  });

  gsap.fromTo('.story-photo', { y: 70, rotation: -11 }, { y: -25, rotation: -3, ease: 'none', scrollTrigger: { trigger: '.story-section', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.fromTo('.story-photo img', { scale: 1.22, clipPath: 'inset(12% 12% 12% 12% round 80px)' }, { scale: 1, clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: { trigger: '.story-photo', start: 'top 95%', end: 'top 30%', scrub: true } });
  gsap.to('.homemade-seal', { rotation: -35, ease: 'none', scrollTrigger: { trigger: '.story-section', start: 'top bottom', end: 'bottom top', scrub: true } });

  document.querySelectorAll<HTMLElement>('.step').forEach((step, index) => {
    gsap.from(step.querySelector('.step-line'), { scaleX: 0, ease: 'none', scrollTrigger: { trigger: step, start: 'top 86%', end: 'top 48%', scrub: true } });
    gsap.from(step.querySelectorAll('.step-top, h3, p'), { y: 40, opacity: 0, duration: .75, delay: index * .08, stagger: .08, ease: 'power3.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: step, start: 'top 86%', once: true } });
    gsap.from(step.querySelector('.step-symbol'), { rotation: -70, scale: .8, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: step, start: 'top 86%', once: true } });
  });

  gsap.fromTo('.closing-surface', { clipPath: 'inset(12% 10% 12% 10% round 180px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: { trigger: '.closing-section', start: 'top 95%', end: 'top 35%', scrub: true } });
  gsap.from('.closing-section .button', { y: 35, scale: .95, opacity: 0, duration: .8, ease: 'power3.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: '.closing-section .button', start: 'top 92%', once: true } });
  gsap.fromTo('.closing-bread', { rotation: -12, y: 24 }, { rotation: 6, y: -20, ease: 'none', scrollTrigger: { trigger: '.closing-section', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.from('.footer-top > *', { y: 35, opacity: 0, stagger: .08, duration: .8, ease: 'power3.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: '.site-footer', start: 'top 90%', once: true } });
  gsap.from('.footer-signature > span', { yPercent: 105, rotation: 5, ease: 'none', scrollTrigger: { trigger: '.site-footer', start: 'top 95%', end: 'bottom bottom', scrub: true } });

  const sections = ['#home', '#journey', '#menu', '#cerita', '#cara-pesan', '.closing-section'];
  sections.forEach(selector => {
    const activate = () => {
      document.querySelectorAll<HTMLAnchorElement>('.desktop-nav a').forEach(link => link.classList.toggle('is-current', link.getAttribute('href') === selector));
    };
    ScrollTrigger.create({ trigger: selector, start: 'top 45%', end: 'bottom 45%', onEnter: activate, onEnterBack: activate });
  });
});

// A single, scroll-scrubbed chapter. CSS sticky keeps the scene in place;
// the page itself stays scrollable and navigation can skip straight to the menu.
const journey = document.querySelector<HTMLElement>('.journey')!;
const panels = gsap.utils.toArray<HTMLElement>('.journey-panel');
const chapters = [...document.querySelectorAll<HTMLElement>('.journey-steps li')];
function setChapter(index: number) {
  chapters.forEach((chapter, chapterIndex) => {
    const active = chapterIndex === index;
    chapter.classList.toggle('is-current', active);
    if (active) chapter.setAttribute('aria-current', 'step');
    else chapter.removeAttribute('aria-current');
  });
}

const journeyMotionQuery = '(min-width: 600px) and (min-height: 620px) and (prefers-reduced-motion: no-preference), (min-width: 360px) and (min-height: 740px) and (prefers-reduced-motion: no-preference)';
media.add(journeyMotionQuery, () => {
  journey.classList.add('journey-enhanced');
  const story = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: journey,
      start: () => `top ${header.offsetHeight}px`,
      end: 'bottom bottom',
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: self => setChapter(self.progress >= .64 ? 2 : self.progress >= .3 ? 1 : 0),
    },
  });
  story.to('.journey-progress span', { scaleX: 1, duration: 3 }, 0);
  panels.forEach((panel, index) => {
    const image = panel.querySelector('img');
    if (index > 0) {
      story.to(panels[index - 1], { opacity: 0, y: -35, duration: .28 }, index - .3);
      story.fromTo(panel, { opacity: 0, y: 45 }, { opacity: 1, y: 0, duration: .3 }, index - .12);
    }
    story.fromTo(image, { scale: 1.15 }, { scale: 1, duration: 1.1 }, Math.max(0, index - .2));
  });
  lenis?.resize();
  return () => {
    journey.classList.remove('journey-enhanced');
    setChapter(0);
    lenis?.resize();
  };
});

media.add({
  enhanced: journeyMotionQuery,
  motion: '(prefers-reduced-motion: no-preference)',
}, context => {
  const { enhanced, motion } = context.conditions!;
  if (!motion || enhanced) return;
  panels.forEach(panel => {
    gsap.from(panel.querySelectorAll('.journey-photo, .journey-copy'), {
      y: 20, opacity: 0, duration: .6, stagger: .08, ease: 'power3.out', clearProps: 'transform,opacity',
      scrollTrigger: { trigger: panel, start: 'top 88%', once: true },
    });
  });
});

media.add('(prefers-reduced-motion: reduce)', () => {
  panels.forEach(panel => {
    gsap.from(panel, {
      opacity: 0, duration: .15, clearProps: 'opacity',
      scrollTrigger: { trigger: panel, start: 'top 95%', once: true },
    });
  });
});

let refreshCatalog = () => {};
media.add('(min-width: 600px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)', () => {
  const section = document.querySelector<HTMLElement>('#menu')!;
  const viewport = document.querySelector<HTMLElement>('.catalog-viewport')!;
  const rail = document.querySelector<HTMLElement>('#product-grid')!;
  const progress = gsap.quickSetter('.catalog-scroll-hint > div > span', 'scaleX');
  let travel: gsap.core.Tween | undefined;
  // Load the full horizontal rail on entry so later cards are ready before
  // scrolling reveals them; keep below-the-fold images lazy outside the pin.
  const setCatalogLoading = (active: boolean) => {
    const loading = active ? 'eager' : 'lazy';
    rail.querySelectorAll('img').forEach(image => {
      if (image.loading !== loading) image.loading = loading;
    });
  };
  section.classList.add('catalog-motion');

  const rebuild = (keepMenuVisible = false) => {
    travel?.scrollTrigger?.kill();
    travel?.kill();
    travel = undefined;
    setCatalogLoading(false);
    gsap.set(rail, { x: 0 });
    progress(0);
    const distance = Math.max(0, rail.scrollWidth - viewport.clientWidth);
    section.classList.toggle('catalog-no-travel', distance <= 5);
    if (distance > 5) {
      travel = gsap.to(rail, {
        x: () => -(rail.scrollWidth - viewport.clientWidth), ease: 'none',
        onUpdate() { progress(this.progress()); },
        scrollTrigger: {
          trigger: section, start: () => `top ${header.offsetHeight}px`,
          end: () => `+=${Math.max(650, rail.scrollWidth - viewport.clientWidth)}`,
          pin: true, scrub: true, invalidateOnRefresh: true,
          onUpdate: self => setCatalogLoading(self.scroll() >= self.start && self.scroll() <= self.end),
          onRefresh: self => setCatalogLoading(self.scroll() >= self.start && self.scroll() <= self.end),
        },
      });
    }
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    lenis?.resize();
    if (keepMenuVisible) {
      const target = section.parentElement?.classList.contains('pin-spacer') ? section.parentElement : section;
      if (lenis) lenis.scrollTo(target, { immediate: true });
      else target.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  };
  refreshCatalog = () => rebuild(true);
  rebuild();

  // Keyboard navigation brings each off-screen product into the same story.
  const focusProduct = (event: FocusEvent) => {
    const target = event.target as HTMLElement;
    const card = target.closest<HTMLElement>('.product');
    const trigger = travel?.scrollTrigger;
    if (!card || !trigger || !target.matches(':focus-visible')) return;
    const distance = rail.scrollWidth - viewport.clientWidth;
    const fraction = Math.min(1, Math.max(0, card.offsetLeft / distance));
    const destination = trigger.start + (trigger.end - trigger.start) * fraction;
    if (lenis) lenis.scrollTo(destination, { immediate: true });
    else window.scrollTo({ top: destination });
    viewport.scrollLeft = 0;
  };
  viewport.addEventListener('focusin', focusProduct);
  return () => {
    travel?.scrollTrigger?.kill();
    travel?.kill();
    gsap.set(rail, { clearProps: 'transform' });
    setCatalogLoading(false);
    section.classList.remove('catalog-motion', 'catalog-no-travel');
    viewport.removeEventListener('focusin', focusProduct);
    refreshCatalog = () => {};
    lenis?.resize();
  };
});

media.add('(prefers-reduced-motion: no-preference)', () => {
  document.querySelectorAll<HTMLElement>('.product').forEach(product => {
    // In the pinned rail all cards remain visible; in the regular grid each
    // photograph opens like a shutter and its caption follows separately.
    if (product.closest('.catalog-motion')) return;
    gsap.fromTo(product.querySelector('.product-media'), { clipPath: 'inset(15% 0% 85% 0%)', scale: 1.08 }, { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1, ease: 'power3.out', clearProps: 'clipPath,transform', scrollTrigger: { trigger: product, start: 'top 90%', once: true } });
    gsap.from(product.querySelector('.product-caption'), { y: 25, opacity: 0, duration: .7, ease: 'power3.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: product, start: 'top 85%', once: true } });
  });
});

// Magnetic labels move inside their buttons, preserving stable hit targets.
document.querySelectorAll<HTMLAnchorElement>('.button').forEach(button => {
  const content = document.createElement('span');
  content.className = 'button-content';
  while (button.firstChild) content.append(button.firstChild);
  button.append(content);
});
media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
  const listeners: Array<() => void> = [];
  document.querySelectorAll<HTMLElement>('.button').forEach(button => {
    const content = button.querySelector('.button-content')!;
    const x = gsap.quickTo(content, 'x', { duration: .3, ease: 'power3.out' });
    const y = gsap.quickTo(content, 'y', { duration: .3, ease: 'power3.out' });
    const move = (event: PointerEvent) => {
      const box = button.getBoundingClientRect();
      x((event.clientX - box.left - box.width / 2) * .12);
      y((event.clientY - box.top - box.height / 2) * .18);
    };
    const leave = () => { x(0); y(0); };
    button.addEventListener('pointermove', move);
    button.addEventListener('pointerleave', leave);
    listeners.push(() => { button.removeEventListener('pointermove', move); button.removeEventListener('pointerleave', leave); });
  });
  return () => listeners.forEach(remove => remove());
});

const filters = document.querySelectorAll<HTMLButtonElement>('[data-filter]');
const products = [...document.querySelectorAll<HTMLElement>('.product')];
const count = document.querySelector<HTMLElement>('.menu-count')!;
filters.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;
    filters.forEach(filter => {
      const active = filter === button;
      filter.classList.toggle('is-active', active);
      filter.setAttribute('aria-pressed', String(active));
    });
    gsap.killTweensOf(products);
    // Reveal tweens must not leave filtered cards invisible on their return.
    ScrollTrigger.getAll().forEach(trigger => {
      if (products.includes(trigger.trigger as HTMLElement)) {
        trigger.animation?.progress(1);
        trigger.kill();
      }
    });
    products.forEach(product => {
      product.hidden = category !== 'Semua' && product.dataset.category !== category;
      gsap.set(product, { clearProps: 'transform,opacity' });
    });
    const visible = products.filter(product => !product.hidden);
    count.textContent = `${visible.length} pilihan untukmu`;
    refreshCatalog();
    if (!motionQuery.matches) {
      gsap.fromTo(visible, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: .25, stagger: .04, ease: 'power3.out', clearProps: 'transform,opacity' });
    }
    ScrollTrigger.refresh();
    lenis?.resize();
  });
});

document.fonts.ready.then(() => ScrollTrigger.refresh());
window.addEventListener('load', () => { ScrollTrigger.refresh(); lenis?.resize(); }, { once: true });
window.addEventListener('pagehide', () => {
  // Do not destroy a page entering the back-forward cache.
  gsap.ticker.remove(tick);
});
window.addEventListener('pageshow', () => { if (lenis) gsap.ticker.add(tick); });
