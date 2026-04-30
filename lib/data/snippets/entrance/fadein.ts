export const fadein = `// 1. Setup
import { gsap } from 'gsap'

// 2. Animation Logic
gsap.from(".target", {
  y: 50,
  opacity: 0,
  duration: 1.5,
  ease: "power2.inOut"
});`
