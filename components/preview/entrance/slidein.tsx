'use client'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const SlideIn = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from('.slide', {
        x: '100vh',
        duration: 1,
        ease: 'power2.inOut',
        repeat: -1,
        repeatDelay: 1,
      })
    },
    { scope: containerRef }
  )

  return (
    <div
      ref={containerRef}
      className="relative flex h-full w-full flex-col justify-end overflow-hidden bg-[#EAE5D3] px-8 pb-12"
    >
      <p className="absolute top-6 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.5em] text-black/30 uppercase">
        Motion Patterns
      </p>

      <div className="absolute top-16 right-8 left-8 h-px bg-black/10" />

      <p className="absolute right-8 bottom-52 left-8 mb-4 font-mono text-[10px] tracking-[0.5em] text-black/40 uppercase">
        Transform
      </p>

      <h1 className="slide font-display absolute right-8 bottom-14 left-8 text-[clamp(2rem,6vw,5rem)] leading-[0.88] font-black text-[#161412] uppercase">
        Slide
        <br />
        <span className="text-[#A59676] italic">In.</span>
      </h1>

      <div className="absolute right-8 bottom-6 left-8 flex items-center justify-between border-t border-black/5 pt-4">
        <span className="font-mono text-[8px] tracking-widest text-black/30 uppercase">
          GSAP · power2.inOut · 1.5s
        </span>
      </div>
    </div>
  )
}

export default SlideIn
