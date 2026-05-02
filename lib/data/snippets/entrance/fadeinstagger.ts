export const fadeinstagger = `
import gsap from 'gsap';

// Basic Stagger: Targets all elements with the class simultaneously
gsap.from(".stagger-item", {
  y: 40,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
  stagger: 0.2
});
      `
