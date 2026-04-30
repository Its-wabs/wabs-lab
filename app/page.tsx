'use client'

import { useGSAP } from '@gsap/react'
import { useRef, useState } from 'react'
import gsap from 'gsap'
import PatternModal, { PatternData } from '@/components/ui/patternmodal'
import { PATTERNS } from '@/lib/constants/patterns'

const CATEGORIES = [
  { key: 'creative' as const, label: 'CREATIVE', offset: '4%' },
  { key: 'hover' as const, label: 'HOVER', offset: '32%' },
  { key: 'text' as const, label: 'TEXT', offset: '58%' },
  { key: 'scroll' as const, label: 'SCROLL', offset: '18%' },
  { key: 'entrance' as const, label: 'ENTRANCE', offset: '44%' },
]

export default function Page() {
  const container = useRef<HTMLDivElement>(null)

  const [activePattern, setActivePattern] = useState<PatternData | null>(null)
  const [originRect, setOriginRect] = useState<DOMRect | null>(null)

  // Handle Tab Clicks
  const handleTabClick = (
    e: React.MouseEvent<HTMLDivElement>,
    pattern: any,
    catKey: string
  ) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setOriginRect(rect)
    setActivePattern({ ...pattern, category: catKey })
  }

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(
        {
          tiny: '(max-height: 679px)',
          short: '(max-height: 849px) and (min-height: 680px)',
          tall: '(min-height: 850px)',
        },
        (context) => {
          const { tiny, short } = context.conditions as any

          const drawerScale = tiny ? 0.85 : short ? 1 : 1.3

          const drawerOrigin = '50% 100%'

          //  INITIAL SETUP
          gsap.set(['.nav', '.subbar', '.footer', '.drawerBottom'], {
            opacity: 0,
            y: -10,
          })
          // Drawer starts Centered and flat
          gsap.set('.drawer', {
            opacity: 0,
            rotateX: 0,
            y: 100,
            scale: 1.5,
            transformPerspective: 2000,
            transformOrigin: drawerOrigin,
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
            .to(
              '.load-l',
              { width: '100vw', duration: 2, ease: 'power1.in' },
              0
            )
            .to(
              '.load-r',
              { width: '100vw', duration: 2, ease: 'power1.in' },
              0
            )
            .to(
              '.load-l',
              { opacity: 0, duration: 0.1, ease: 'power1.in' },
              2.1
            )
            .to(
              '.load-r',
              { opacity: 0, duration: 0.1, ease: 'power1.in' },
              2.1
            )
            .to('.introTop', { yPercent: -100, duration: 1.2 }, 2.2)
            .to('.introBottom', { yPercent: 100, duration: 1.2 }, 2.2)
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
                scale: drawerScale,
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
        }
      )
    },
    { scope: container }
  )

  return (
    <div className="container-wrapper" ref={container}>
      {activePattern && originRect && (
        <PatternModal
          pattern={activePattern}
          originRect={originRect}
          onClose={() => setActivePattern(null)}
        />
      )}

      {/* INTRO OVERLAY */}
      <div className="introOverlay">
        {/* TOP CURTAIN */}
        <div className="introPart introTop">
          <span className="introEyebrow">WABS LAB</span>
          <span className="introSub">Animation library</span>

          <div className="introRule" />
        </div>
        <div className="load-l bg-primary absolute top-1/2 left-1/2 h-0.5 w-0 -translate-x-1/2 -translate-y-1/2" />
        <div className="load-r bg-primary absolute top-1/2 right-1/2 h-0.5 w-0 translate-x-1/2 -translate-y-1/2" />

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
          <span className="navLink">ABOUT</span>
          <a
            href="https://github.com/Its-wabs/wabs-lab"
            target="empty"
            className="navCta"
          >
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
          <button onClick={() => {}} className="journeyBtn">
            journey mode
          </button>
          <div className="subRight">
            {['ENTRANCE', 'SCROLL', 'TEXT', 'HOVER'].map((c) => (
              <span key={c} className="subCat">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="main">
        {/* ARCHIVE / DRAWER VIEW */}
        <div className="drawerScene">
          <div className="drawer">
            <div className="tabsStack">
              <div className="tabBacker" />
              {CATEGORIES.map((cat) => (
                <div key={cat.key} className="categoryGroup">
                  <div
                    className="categoryTab"
                    style={{ marginLeft: cat.offset }}
                  >
                    <span className="catLabel">{cat.label}</span>
                    <span className="catCount">
                      {String(PATTERNS[cat.key].length).padStart(3, '0')}
                    </span>
                  </div>

                  {PATTERNS[cat.key].map((p) => (
                    <div
                      key={p.id}
                      onClick={(e) => handleTabClick(e, p, cat.key)}
                      className="patternTab"
                    >
                      <div className="tabBody">
                        <div className="tabEar">
                          <span className="tabId">{p.id}</span>
                        </div>
                        <div className="tabContent">
                          <span className="tabName">{p.name}</span>
                          <span className="tabSub">{p.sub}</span>
                        </div>
                        <span className="tabArrow">↗</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="drawerFloor" />
            <div className="drawerBase">
              <div className="drawerHandle" />
            </div>
          </div>
        </div>
      </div>

      <div className="mobileGate">
        <h1>
          THIS DRAWER DOESN'T FIT IN YOUR POCKET.
          <br />
          <span>DESKTOP ONLY</span> FOR NOW.
        </h1>
      </div>

      {/* Bottom label strip*/}
      <div className="lab-footer-overlay">
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
          <span className="footRight">V 1.0 - 2026</span>
        </footer>
      </div>
    </div>
  )
}
