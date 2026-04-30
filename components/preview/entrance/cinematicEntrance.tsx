'use client'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const CinematicEntrance = () => {
  const container = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  useGSAP(
    () => {
      // gsap.set() all properties back to their start values.
      const resetAll = () => {
        gsap.set('.ce-cell', { scale: 0, opacity: 0 })
        gsap.set('.ce-frame', { clipPath: 'inset(0% 100% 0% 0%)', opacity: 1 })
        gsap.set('.ce-heading', { opacity: 0, filter: 'blur(24px)', y: 32 })
        gsap.set('.ce-sub', { opacity: 0, y: 18 })
        gsap.set('.ce-nav', { opacity: 0, x: -16 })
        gsap.set('.ce-meta', { opacity: 0 })
        gsap.set('.ce-progress', { scaleX: 0, transformOrigin: 'left center' })
      }

      resetAll()

      //  MASTER TIMELINE
      // repeat / repeatDelay are timeline-level props, not defaults.
      tlRef.current = gsap.timeline({
        repeat: -1,
        repeatDelay: 2,
        onRepeat: resetAll, // hard reset before each loop
      })

      const tl = tlRef.current

      tl

        // 1 - GRID STAGGER
        // Teaches: stagger config object, grid: 'auto', from: 'center'
        .to(
          '.ce-cell',
          {
            scale: 1,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            stagger: {
              grid: 'auto',
              from: 'center',
              amount: 0.9,
            },
          },
          0
        )

        // Progress bar tracks the whole sequence
        .to(
          '.ce-progress',
          {
            scaleX: 1,
            duration: 10, // full sequence duration
            ease: 'none',
          },
          0
        )

        // 2 - CLIP PATH REVEAL
        // Teaches: clipPath as a reveal mechanism

        .to(
          '.ce-frame',
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.1,
            ease: 'expo.inOut',
          },
          1.2
        )

        // 3 - BLUR FADE HEADING
        // Teaches: filter blur as an animation property
        // Note: always animate blur TO 0, never FROM 0 to a value

        .to(
          '.ce-heading',
          {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
          },
          2.6
        )

        // 4 - SECONDARY TEXT
        .to(
          '.ce-sub',
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
          },
          3.6
        )

        // 5 - NAV + META STAGGER
        // Teaches: stagger on small UI elements
        .to(
          '.ce-nav',
          {
            opacity: 1,
            x: 0,
            duration: 0.55,
            ease: 'power2.out',
            stagger: 0.08,
          },
          4.2
        )
        .to(
          '.ce-meta',
          {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
            stagger: 0.06,
          },
          4.5
        )

        // 6 - HOLD (5.2s – 7.5s)
        // Everything visible — let the viewer read

        // Finally - EXIT
        // A single coordinated fade-out. Note: we also reset
        // filter here because opacity: 0 alone won't clear blur
        .to(
          ['.ce-heading', '.ce-sub', '.ce-nav', '.ce-meta'],
          {
            opacity: 0,
            y: -10,
            duration: 0.6,
            ease: 'power2.in',
            stagger: 0.04,
          },
          7.5
        )
        .to(
          '.ce-frame',
          {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in',
          },
          7.6
        )
        .to(
          '.ce-cell',
          {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in',
            stagger: {
              grid: 'auto',
              from: 'center',
              amount: 0.4,
            },
          },
          7.8
        )
    },
    { scope: container }
  )

  return (
    <div
      ref={container}
      className="bg-ink relative flex h-full w-full flex-col overflow-hidden text-[#E8E3D5]"
    >
      {/* BACKGROUND GRID */}
      <div className="pointer-events-none absolute inset-0 grid grid-cols-8 grid-rows-5 gap-1.25 p-0">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="ce-cell border-[0.5px] border-[#e8e3d5]/[0.07] bg-[#e8e3d5]/2.5"
          />
        ))}
      </div>

      {/* NAV */}
      <nav className="relative z-10 flex shrink-0 items-center justify-between px-8">
        <div className="ce-nav font-offbit text-[9px] font-black tracking-[0.22em] text-[#e8e3d5]/50 uppercase">
          WABS / LAB
        </div>

        <div className="flex items-center gap-8">
          {['Archive', 'Patterns', 'Index'].map((item) => (
            <span
              key={item}
              className="ce-nav font-101 cursor-pointer text-[9px] font-black tracking-[0.18em] text-[#e8e3d5]/28 uppercase"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="ce-nav font-offbit text-ink3/55 border-ink3/25 rounded-[1px] border-[0.5px] px-2.5 py-0.75 text-[9px] font-black tracking-[0.18em] uppercase">
          ↗ GITHUB
        </div>
      </nav>

      {/* HERO CONTENT */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-8 py-5">
        {/* CLIP REVEAL FRAME  */}
        <div className="ce-frame bg-ink3 border-ink3/22 relative mb-6 h-[28%] w-full overflow-hidden rounded-xs border-[0.5px]">
          {/* Frame label */}
          <div className="font-offbit absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] font-black tracking-[0.28em] text-[#e8e3d5] uppercase">
            THIS IS A LIVE PREVIEW
          </div>
        </div>

        {/* MAIN HEADING  */}
        <h1 className="ce-heading font-display mb-4 text-[clamp(52px,10vw,96px)] leading-[0.86] font-black tracking-[-0.025em] text-[#e8e3d5]/90 uppercase">
          Atmospheric
          <br />
          <span className="text-transparent [-webkit-text-stroke:1.5px_rgba(232,227,213,0.45)]">
            Motion
          </span>
          <span className="text-ink3/75 mt-[0.15em] block text-[0.55em]">
            Archive.
          </span>
        </h1>

        {/*  SUB TEXT */}
        <p className="ce-sub font-101 m-0 max-w-90 text-[10px] leading-[1.8] font-black tracking-widest text-[#e8e3d5]/35">
          Five entrance techniques composed
          <br />
          into a single coordinated timeline.
        </p>
      </div>

      {/* FOOTER */}
      <footer className="relative z-10 flex shrink-0 items-center justify-between p-[0.65rem_1.75rem]">
        <span className="ce-meta font-offbit text-[8px] font-black tracking-[0.22em] text-[#e8e3d5]/20 uppercase">
          Pattern 044 : Cinematic Entrance
        </span>

        <span className="ce-meta font-offbit text-ink3/35 text-[8px] font-black tracking-[0.18em] uppercase">
          GSAP · Timeline · Stagger · ClipPath · Blur
        </span>

        <span className="ce-meta font-offbit text-[8px] font-black tracking-[0.18em] text-[#e8e3d5]/20 uppercase">
          WABS LAB
        </span>
      </footer>

      {/* PROGRESS BAR  */}
      <div className="absolute right-0 bottom-0 left-0 h-0.5 overflow-hidden bg-[#e8e3d5]/6">
        <div className="ce-progress bg-ink3/[0.55] h-full origin-left" />
      </div>
    </div>
  )
}

export default CinematicEntrance
