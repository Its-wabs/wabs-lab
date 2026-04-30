export const PATTERNS = {
  creative: [
    {
      id: 'C01',
      name: 'Constellation Nav',
      sub: 'MotionPath · quickTo · orbital',
    },
    {
      id: 'C02',
      name: 'Liquid Transition',
      sub: 'SVG clipPath · blob morph · cursor',
    },
    {
      id: 'C03',
      name: 'SVG Displacement',
      sub: 'feTurbulence · feDisplacementMap · GSAP',
    },
    {
      id: 'C04',
      name: 'Arabic Letter Physics',
      sub: 'SplitText · CustomEase · RTL spring',
    },
    { id: 'C05', name: 'Satin Fabric', sub: 'R3F · Verlet cloth · WebGL' },
  ],
  hover: [
    { id: '005', name: 'Magnetic Pull', sub: 'quickTo · proximity · lerp' },
    { id: '006', name: 'Tilt Card', sub: 'mousemove · rotateX · rotateY' },
    { id: '007', name: 'Cursor Follow', sub: 'quickTo · offset · smooth' },
    {
      id: '008',
      name: 'Distortion Hover',
      sub: 'SVG filter · baseFrequency · scale',
    },
    {
      id: '009',
      name: 'Elastic Underline',
      sub: 'scaleX · transformOrigin · elastic',
    },
    { id: '010', name: 'Reveal on Hover', sub: 'clipPath · height · stagger' },
    {
      id: '011',
      name: '3D Flip Card',
      sub: 'rotateY · backface · perspective',
    },
    { id: '012', name: 'Ghost Trail', sub: 'clone · opacity · stagger' },
    { id: '013', name: 'Morph SVG', sub: 'MorphSVGPlugin · path data' },
  ],
  text: [
    {
      id: '014',
      name: 'Clip Reveal',
      sub: 'SplitText · yPercent · overflow hidden',
    },
    {
      id: '015',
      name: 'Scramble Text',
      sub: 'ScrambleTextPlugin · chars · speed',
    },
    { id: '016', name: 'Counter Up', sub: 'ScrollTrigger · snap · ease' },
    {
      id: '017',
      name: 'Char Stagger',
      sub: 'SplitText · stagger · from center',
    },
    { id: '018', name: 'Typewriter', sub: 'SplitText · duration · stagger' },
    {
      id: '019',
      name: 'Word Shuffle',
      sub: 'SplitText · yPercent · stagger grid',
    },
    {
      id: '020',
      name: 'Highlight Sweep',
      sub: 'scaleX · transformOrigin · color',
    },
    {
      id: '021',
      name: '3D Text Flip',
      sub: 'rotateX · SplitText · perspective',
    },
    { id: '022', name: 'Glitch Text', sub: 'x · skewX · repeat · timeline' },
    {
      id: '023',
      name: 'Kinetic Tracks',
      sub: 'ScrollTrigger · scrub · multi-dir',
    },
  ],
  scroll: [
    {
      id: '024',
      name: 'Parallax Layers',
      sub: 'ScrollTrigger · scrub · depth',
    },
    { id: '025', name: 'Pin + Scrub', sub: 'pin · scrub · anticipatePin' },
    { id: '026', name: 'Horizontal Scroll', sub: 'xPercent · pin · scrub' },
    { id: '027', name: 'Reveal on Enter', sub: 'ScrollTrigger · once · start' },
    {
      id: '028',
      name: 'Stagger Reveal',
      sub: 'ScrollTrigger · batch · stagger',
    },
    { id: '029', name: 'Progress Bar', sub: 'scaleX · scrub · ease none' },
    { id: '030', name: 'Section Wipe', sub: 'clipPath · pin · scrub' },
    { id: '031', name: 'Lenis Smooth', sub: 'Lenis · ScrollTrigger · lerp' },
    { id: '032', name: 'Sticky Sidebar', sub: 'pin · end · scrub 0' },
    {
      id: '033',
      name: 'Image Sequence',
      sub: 'canvas · ScrollTrigger · scrub',
    },
    {
      id: '034',
      name: '3D Card Scroll',
      sub: 'rotateX · ScrollTrigger · scrub',
      plugins: ['ScrollTrigger'],
    },
    { id: '035', name: 'Zoom Section', sub: 'scale · pin · scrub' },
  ],
  entrance: [
    {
      id: '036',
      name: 'Fade in',
      sub: 'opacity · y · power3.out',
      plugins: ['Core'],
    },
    {
      id: '037',
      name: 'Fade In Stagger',
      sub: 'opacity · y · stagger · power3.out',
      plugins: ['Core'],
    },
    { id: '038', name: 'Slide In', sub: 'xPercent · ease · stagger' },
    { id: '039', name: 'Blur Reveal', sub: 'filter blur · opacity · duration' },

    {
      id: '040',
      name: 'Stagger Grid',
      sub: 'scale · stagger grid from center',
    },
    {
      id: '041',
      name: 'Clip from Left',
      sub: 'clipPath inset · duration · ease',
    },
    {
      id: '042',
      name: 'Cinematic Entrance',
      sub: 'timeline · duration · ease',
    },
  ],
}
