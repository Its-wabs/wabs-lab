export const blurReveal = `// 1. Setup
import { gsap } from 'gsap'

// 2. Animation Logic
gsap.from('.blur-reveal', {
        opacity: 0,
        filter: 'blur(10px)',
        duration: 1.5,
      })`
