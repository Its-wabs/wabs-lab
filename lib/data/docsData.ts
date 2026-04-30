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
    what: 'Each line of text is hidden inside a clipping container...',
    how: [
      {
        text: 'Target your collection of elements — you can use a shared class, or a parent-child selector for more specificity.',
        code: {
          content: `// Shared class\ngsap.from(".item", { stagger: 0.1 });\n\n// Parent-child\ngsap.from(".parent h1", { stagger: 0.1 });`,
          label: 'TARGETING.TS',
        },
      },
      {
        text: 'Apply the easing curve for a liquid feel — power2.out is the go-to for reveals.',
      },
      {
        text: 'Wrap each line in a clip container so overflow is hidden during the emerge.',
        code: {
          content: `gsap.from(".line", {\n  yPercent: 110,\n  ease: "power2.out",\n  stagger: 0.08\n});`,
          label: 'CLIP_REVEAL.TS',
        },
      },
    ],
    useCases: 'Hero headlines, article titles, section intros, menu items.',
    related: ['CHAR STAGGER', 'WORD SHUFFLE', '3D TEXT FLIP'],
  },
  '037': {
    what: 'A rhythmic, sequential opacity reveal...',
    how: [
      {
        text: 'Target a collection of elements sharing a common class, or use a parent-child selector for scoped targeting.',
        code: {
          content: `gsap.from(".card", { opacity: 0, y: 20, stagger: 0.1 });`,
          label: 'TARGET.TS',
        },
      },
      {
        text: "Set the initial state to opacity: 0 with a subtle y offset to create a 'lifting' sensation.",
      },
      {
        text: "Use 'amount' for fixed-duration sequences or 'each' for additive delays based on item count.",
        code: {
          content: `// Fixed total duration\ngsap.from(".card", { stagger: { amount: 0.8 } });\n\n// Per-item delay\ngsap.from(".card", { stagger: { each: 0.12 } });`,
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
    related: ['SCALE STAGGER', 'GRID RADIUS REVEAL', 'BLUR FADE ENTRANCE'],
  },
}
