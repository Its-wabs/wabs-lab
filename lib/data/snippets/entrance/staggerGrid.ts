export const staggerGrid = `
// 1. Setup
import { gsap } from 'gsap'

// We target the specific class on the h1 element
      gsap.from('.stagger-item', {
        y: 40,
        opacity: 0,
        stagger: {
          grid: 'auto',
          from: 'center',
          amount: 0.6,
        },
      })

`
