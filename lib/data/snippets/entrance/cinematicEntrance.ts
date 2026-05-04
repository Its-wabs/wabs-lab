export const cinematicEntrance = `// 1. Setup
import { gsap } from 'gsap'

// 2. Animation Logic

const CinematicTl = gsap.timeline();

CinematicTl
  // 1 - GRID STAGGER
  .to('.ce-cell', {
    scale: 1,
    opacity: 1,
    duration: 0.7,
    ease: 'power3.out',
    stagger: {
      grid: 'auto',
      from: 'center',
      amount: 0.9,
    },
  }, 0)

  // 2 - CLIP PATH REVEAL
  .to('.ce-frame', {
    clipPath: 'inset(0% 0% 0% 0%)',
    duration: 1.1,
    ease: 'expo.inOut',
  }, 1.2)

  // 3 - BLUR FADE HEADING
  .to('.ce-heading', {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    duration: 1.1,
    ease: 'power3.out',
  }, 2.6)

  // 4 - SECONDARY TEXT
  .to('.ce-sub', {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power2.out',
  }, 3.6)

  // 5 - NAV + META STAGGER
  .to('.ce-nav', {
    opacity: 1,
    x: 0,
    duration: 0.55,
    ease: 'power2.out',
    stagger: 0.08,
  }, 4.2)
  .to('.ce-meta', {
    opacity: 1,
    duration: 0.4,
    ease: 'power2.out',
    stagger: 0.06,
  }, 4.5)

  // EXIT SEQUENCE
  .to(['.ce-heading', '.ce-sub', '.ce-nav', '.ce-meta'], {
    opacity: 0,
    y: -10,
    duration: 0.6,
    ease: 'power2.in',
    stagger: 0.04,
  }, 7.5)
  .to('.ce-frame', {
    opacity: 0,
    duration: 0.5,
    ease: 'power2.in',
  }, 7.6)
  .to('.ce-cell', {
    scale: 0,
    opacity: 0,
    duration: 0.5,
    ease: 'power2.in',
    stagger: {
      grid: 'auto',
      from: 'center',
      amount: 0.4,
    },
  }, 7.8);
  `
