'use client'

import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import gsap from 'gsap'

const PATTERNS = {
  creative: [
    {
      id: '001',
      name: 'Constellation Nav',
      sub: 'MotionPath · quickTo · orbital',
    },
    {
      id: '002',
      name: 'Liquid Transition',
      sub: 'SVG clipPath · blob morph · cursor',
    },
    {
      id: '003',
      name: 'SVG Displacement',
      sub: 'feTurbulence · feDisplacementMap · GSAP',
    },
    {
      id: '004',
      name: 'Arabic Letter Physics',
      sub: 'SplitText · CustomEase · RTL spring',
    },
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
    },
    { id: '035', name: 'Zoom Section', sub: 'scale · pin · scrub' },
  ],
  entrance: [
    { id: '036', name: 'Fade Up', sub: 'opacity · y · power3.out' },
    { id: '037', name: 'Scale In', sub: 'scale · opacity · back.out' },
    { id: '038', name: 'Slide In', sub: 'xPercent · ease · stagger' },
    { id: '039', name: 'Blur Reveal', sub: 'filter blur · opacity · duration' },
    {
      id: '040',
      name: 'Rotate In',
      sub: 'rotation · transformOrigin · elastic',
    },
    {
      id: '041',
      name: 'Stagger Grid',
      sub: 'scale · stagger grid from center',
    },
    {
      id: '042',
      name: 'Clip from Left',
      sub: 'clipPath inset · duration · ease',
    },
    { id: '043', name: 'Satin Fabric', sub: 'R3F · Verlet cloth · WebGL' },
  ],
}

const CATEGORIES = [
  { key: 'creative' as const, label: 'CREATIVE', offset: '4%' },
  { key: 'hover' as const, label: 'HOVER', offset: '32%' },
  { key: 'text' as const, label: 'TEXT', offset: '58%' },
  { key: 'scroll' as const, label: 'SCROLL', offset: '18%' },
  { key: 'entrance' as const, label: 'ENTRANCE', offset: '44%' },
]

export default function Page() {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      //  INITIAL SETUP
      gsap.set(['.nav', '.subbar', '.footer', '.drawerBottom'], {
        opacity: 0,
        y: -10,
      })

      // Drawer starts Centered and flat (0deg)
      gsap.set('.drawer', {
        opacity: 0,
        rotateX: 0,
        y: 100,
        scale: 1.5,
        transformPerspective: 2000,
      })

      // Force the base to be a perfect rectangle initially
      gsap.set('.drawerBase', {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      })

      gsap.set('.tabsStack', { opacity: 0, y: 50 })
      gsap.set('.categoryTab', { opacity: 0, y: 30 })

      // THE MASTER TIMELINE
      const masterTl = gsap.timeline({
        defaults: { ease: 'expo.inOut' },
      })

      masterTl
        // STEP A: THE SPLIT & 2D REVEAL
        .to('.introTop', { yPercent: -100, duration: 1.2 }, 0.2)
        .to('.introBottom', { yPercent: 100, duration: 1.2 }, 0.2)
        .to(
          '.drawer',
          {
            opacity: 1,
            y: '-35vh',
            duration: 1.2,
            ease: 'expo.out',
          },
          '-=1.0'
        )

        // STEP B: THE 3D SNAP (Perspective Reset)
        .to(
          '.drawer',
          {
            y: 0,
            rotateX: 28,
            scale: 1,
            duration: 1.5,
            ease: 'back.inOut(1.1)',
          },
          '-=0.4'
        )
        .to(
          '.drawerBase',
          {
            // Your default CSS trapezoid clip-path
            clipPath: 'polygon(0 0, 100% 0, 96% 100%, 4% 100%)',
            duration: 1.5,
            ease: 'back.inOut(1.1)',
          },
          '<'
        )

        // STEP C: CONTENT DROPS
        .to(
          '.tabsStack',
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          '-=1.2'
        )
        .from(
          '.patternTab',
          {
            y: -30,
            opacity: 0,
            stagger: {
              each: 0.03,
              from: 'start',
              grid: 'auto',
            },
            ease: 'power3.out',
            duration: 1,
          },
          '-=1.0'
        )

        // STEP F: Reveal Categories & Chrome
        .to(
          '.categoryTab',
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'back.out(1.4)',
          },
          '-=0.4'
        )
        .to(
          ['.nav', '.subbar', '.footer', '.drawerBottom'],
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: 'power2.out',
          },
          '-=0.5'
        )

      // TAB HOVER
      const tabs = gsap.utils.toArray<HTMLElement>('.patternTab')

      tabs.forEach((tab) => {
        const body = tab.querySelector<HTMLElement>('.tabBody')
        const ear = tab.querySelector<HTMLElement>('.tabEar')
        const content = tab.querySelector<HTMLElement>('.tabContent')
        const idEl = tab.querySelector<HTMLElement>('.tabId')
        const arrow = tab.querySelector<HTMLElement>('.tabArrow')

        // content starts invisible and slightly left
        gsap.set(content, { opacity: 0, x: -8 })
        gsap.set(arrow, { opacity: 0, x: -6 })

        const hTl = gsap.timeline({
          paused: true,
          defaults: { ease: 'power2.out', duration: 0.22 },
        })

        hTl
          // Tab lifts
          .to(body, {
            y: -16,
            backgroundColor: '#FAFAF8',
            boxShadow:
              '0 -8px 20px rgba(22,20,18,0.10), 0 -2px 5px rgba(22,20,18,0.06)',
            duration: 0.26,
            ease: 'power2.out',
          })
          // ear fills dark
          .to(
            ear,
            {
              backgroundColor: '#26211E',
              duration: 0.2,
            },
            '<'
          )
          // id inverts to light
          .to(
            idEl,
            {
              color: '#F4F2EC',
              duration: 0.18,
            },
            '<'
          )
          // content slides right into view
          .to(
            content,
            {
              opacity: 1,
              x: 0,
              duration: 0.22,
            },
            '<0.04'
          )
          // arrow appears with brief delay
          .to(
            arrow,
            {
              opacity: 0.5,
              x: 0,
              duration: 0.18,
            },
            '<0.07'
          )

        tab.addEventListener('mouseenter', () => hTl.play())
        tab.addEventListener('mouseleave', () => hTl.reverse())
      })

      // CATEGORY TAB HOVER
      gsap.utils.toArray<HTMLElement>('.categoryTab').forEach((ct) => {
        ct.addEventListener('mouseenter', () =>
          gsap.to(ct, { y: -4, duration: 0.18, ease: 'power2.out' })
        )
        ct.addEventListener('mouseleave', () =>
          gsap.to(ct, { y: 0, duration: 0.24, ease: 'power2.inOut' })
        )
      })
    },
    { scope: container }
  )

  return (
    <div className="container-wrapper" ref={container}>
      {/* INTRO OVERLAY */}
      <div className="introOverlay">
        {/* TOP CURTAIN */}
        <div className="introPart introTop">
          <span className="introEyebrow">WABS LAB · ANIMATION LIBRARY</span>
          <div className="introRule" />
        </div>

        {/* BOTTOM CURTAIN */}
        <div className="introPart introBottom">
          <span className="introSub">GSAP PATTERNS · READY TO PULL</span>
          <span className="introCta">OPENING THE DRAWER</span>
        </div>
      </div>

      {/* ── NAV ── */}
      <nav className="nav">
        <div className="navLogo">WABS LAB</div>
        <div className="navRight">
          <span className="navLink">MANIFESTO</span>
          <a href="https://github.com" className="navCta">
            ↗ GITHUB
          </a>
        </div>
      </nav>

      {/* ── SUB BAR ── */}
      <div className="subbar">
        <div className="sub-wrap">
          <div className="subLeft">
            <span className="subCount">043</span>
            <span className="subText">ANIMATION PATTERNS READY</span>
            <span className="subDivider">·</span>
            <span className="subPull">PULL ONE</span>
          </div>
          <div className="hidden">empty</div>
          <button className="journeyBtn">START THE JOURNEY</button>
          <div className="subRight">
            {['ENTRANCE', 'SCROLL', 'TEXT', 'HOVER'].map((c) => (
              <span key={c} className="subCat">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN SCENE  */}
      <main className="main">
        <div className="drawerScene">
          <div className="drawer">
            <div className="tabsStack">
              <div className="tabBacker" />
              {CATEGORIES.map((cat) => (
                <div key={cat.key} className="categoryGroup">
                  {/* Category divider */}
                  <div
                    className="categoryTab"
                    style={{ marginLeft: cat.offset }}
                  >
                    <span className="catLabel">{cat.label}</span>
                    <span className="catCount">
                      {String(PATTERNS[cat.key].length).padStart(3, '0')}
                    </span>
                  </div>

                  {/* Pattern tabs */}
                  {PATTERNS[cat.key].map((p) => (
                    <div key={p.id} className="patternTab">
                      <div className="tabBody">
                        {/* FILE EAR */}
                        <div className="tabEar">
                          <span className="tabId">{p.id}</span>
                        </div>

                        {/* CONTENT */}
                        <div className="tabContent">
                          <span className="tabName">{p.name}</span>
                          <span className="tabSub">{p.sub}</span>
                        </div>

                        {/* ARROW */}
                        <span className="tabArrow">↗</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Drawer chrome  */}
            <div className="drawerFloor" />
            <div className="drawerBase">
              <div className="drawerHandle" />
            </div>
          </div>
        </div>
      </main>

      {/* Bottom label strip*/}
      <div className="drawerBottom">
        <span className="drawerLabel">WABS LAB V1 · FREE FOREVER</span>
      </div>

      {/* Footer */}
      <footer className="footer">
        <span className="footLeft">
          DESIGNED AND BUILT BY{' '}
          <span className="footWabs">
            <a href="http://itswabs.vercel.app/" target="empty">
              WABS
            </a>
          </span>
        </span>
        <span className="footRight">V 1.0 — 2025</span>
      </footer>
    </div>
  )
}
