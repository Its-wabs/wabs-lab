export const clipLeft = `// 1. Setup
import { gsap } from 'gsap'

// 2. Animation Logic

gsap.to('.clip-target', {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.5,
        ease: 'power4.inOut',
        repeat: -1,
        repeatDelay: 1,
      })
`
