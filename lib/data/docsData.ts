export interface HowStep {
  text: string
  code?: {
    content: string
    label?: string
    language?: string
  }
}

export interface PatternDoc {
  what: string
  how: HowStep[]
  useCases: string
  related: string[]
}

export const DOCS_CONTENT: Record<string, PatternDoc> = {
  '036': {
    what: 'A simple opacity reveal',
    how: [
      {
        text: 'Target your element using a from and opacity 0',
      },
      {
        text: 'Apply the easing curve for a smooth fade like power2.out is the go-to for reveals.',
      },
      {
        text: 'Wrap each line in a clip container so overflow is hidden during the emerge.',
      },
    ],
    useCases: 'Hero headlines, article titles, section intros, menu items.',
    related: ['FADE IN STAGGER', 'CINEMATIC ENTRANCE', 'SCROLL FADE IN'],
  },
  '037': {
    what: 'A rhythmic and sequential opacity reveal',
    how: [
      {
        text: 'Target a collection of elements sharing a common class, or use a parent-child selector for scoped targeting.',
        code: {
          content: ` // we target the child items of a parent element for example h1 is the child and div is the parent
    gsap.from(".parent child", {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out", // change the easing as you please
      stagger: 0.2,   
    })`,
          label: 'STAGGER_TARGET.TS',
        },
      },
      {
        text: "Set the initial state to opacity: 0 with a subtle y offset to create a 'lifting' sensation.",
      },
      {
        text: 'Alternetavily we can also control the direction of the stagger',
        code: {
          content: ` // alternetavily we can also control the direction of the stagger 

    gsap.from(".stagger-item", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger : {
      from : "start", // you can use either start, center, end or random
      ease : "power3.out", // we apply the easing always inside the stagger
      each : 0.6  
      // you can also use amount, amount means the whole animation takes x seconds and each 0.2 (for example) means in 100 item it takes 60 seconds
            }
        
    })`,
          label: 'STAGGER_MODES.TS',
        },
      },
      {
        text: "Leverage grid: 'auto' and from: 'center' to create radiating ripples in responsive layouts.",
        code: {
          content: `gsap.from(".card", {\n  opacity: 0,\n  stagger: {\n    grid: "auto",\n    from: "center",\n    each: 0.08\n  }\n});`,
          label: 'GRID_RIPPLE.TS',
        },
      },
    ],
    useCases:
      'Service grids, portfolio thumbnails, feature lists, pricing tables.',
    related: ['SCALE STAGGER', 'GRID RADIUS REVEAL', 'CINEMATIC ENTRANCE'],
  },
  '038': {
    what: 'A dynamic entrance effect where elements glide into view from outside the viewport bounds.',
    how: [
      {
        text: 'Initialize a horizontal entrance by translating the element from the far right. Use viewport units (vw) or percentages to ensure it starts completely off-screen.',
      },
      {
        text: "For vertical entrances, swap the 'x' property for 'y'. Negative values move from the top, while positive values move from the bottom.",
        code: {
          content: `// Slide down from the top of the screen
gsap.from(".slide-down", {
  y: "-100vh",
  duration: 1.2,
  ease: "expo.out", // A snappier ease for downward movement
})`,
          label: 'SLIDE_VERTICAL.TS',
        },
      },
      {
        text: "Combine the slide with an opacity fade to make the entrance feel more 'cinematic' and less jarring as it crosses the viewport edge.",
        code: {
          content: `// A combined fade and slide
gsap.from(".hero-text", {
  x: -100, // Starts 100px to the left
  opacity: 0,
  duration: 1.5,
  ease: "power4.out",
})`,
          label: 'FADE_SLIDE.TS',
        },
      },
      {
        text: "Pro Tip: When sliding large elements, ensure the parent container has 'overflow: hidden' in CSS to prevent unwanted scrollbars during the animation.",
      },
    ],
    useCases:
      'Sidebar menus, modal windows, notification toasts, and hero section headings.',
    related: ['FADE SLIDE', 'ELASTIC ENTRANCE', 'STAGGERED SLIDE'],
  },
  '039': {
    what: 'A sophisticated reveal technique that transitions elements from a soft, out-of-focus state to crisp clarity.',
    how: [
      {
        text: 'Apply a blur filter using the filter property. This works best when paired with an opacity fade to prevent the "ghosting" effect of a dark blur against light backgrounds.',
      },
      {
        text: 'For text-heavy reveals, use a stagger to create a dreamy sequential focus effect. This is highly effective for hero headers.',
        code: {
          content: `// Sequential text blur reveal
// Best used with split-text libraries or spans
gsap.from(".word", {
  filter: "blur(10px)",
  opacity: 0,
  y: 10,
  stagger: 0.1,
  duration: 1,
  ease: "quad.out",
})`,
          label: 'STAGGERED_BLUR.TS',
        },
      },
      {
        text: "Performance Tip: Filters are GPU-heavy. Always add 'will-change: filter' to your CSS for the target elements to ensure smooth playback, especially on mobile devices.",
        code: {
          content: `/* CSS */
.blur-target {
  will-change: filter, opacity;
}`,
          label: 'OPTIMIZATION.CSS',
        },
      },
      {
        text: "Combine with a slight scale-up (e.g., from 0.9 to 1) to give the impression of the object moving toward the camera's focal plane.",
        code: {
          content: `gsap.from(".image-reveal", {
  filter: "blur(30px)",
  scale: 0.9,
  opacity: 0,
  duration: 2,
  ease: "expo.out",
})`,
          label: 'FOCAL_REVEAL.TS',
        },
      },
    ],
    useCases:
      'High-end landing pages, hero typography, background image loading, and "dream-sequence" UI transitions.',
    related: ['CINEMATIC ENTRANCE', 'FADE SLIDE', 'ZOOM REVEAL'],
  },

  '040': {
    what: 'A coordinate-aware stagger that treats elements as a grid, allowing for an organic ripple effects that radiate from a specific point.',
    how: [
      {
        text: 'Use grid: "auto" to let GSAP automatically calculate rows and columns based on the elements\' visual layout. Setting "from: center" creates a circular ripple effect.',
      },
      {
        text: "You can isolate the stagger flow to a specific axis. Setting axis: 'x' will make all items in a column animate simultaneously, while the stagger moves horizontally.",
        code: {
          content: `// Horizontal Column-by-Column Stagger
gsap.from(".card", {
  scale: 0.8,
  opacity: 0,
  stagger: {
    grid: "auto",
    from: "start",
    axis: "x", // Only staggers along the X axis
    each: 0.1
  }
})`,
          label: 'AXIS_STAGGER.TS',
        },
      },
      {
        text: "The 'from' property is highly versatile. Use keywords like 'edges' to animate from the outside in, or 'random' for a chaotic, organic reveal.",
        code: {
          content: `// Outside-In Reveal
gsap.from(".grid-cell", {
  opacity: 0,
  scale: 0,
  stagger: {
    grid: "auto",
    from: "edges",
    amount: 1.5,
    ease: "power3.out"
  }
})`,
          label: 'GRID_EDGES.TS',
        },
      },
      {
        text: 'Performance Tip: For grids with hundreds of items, keep the animation properties simple (like opacity and transform) to maintain 60fps, as grid calculations happen on the main thread.',
      },
    ],
    useCases:
      'Bento-box layouts, photo galleries, dashboard widgets, and numeric keypads.',
    related: ['STAGGER FADE IN', 'SCALE STAGGER', 'BLUR REVEAL'],
  },
}
