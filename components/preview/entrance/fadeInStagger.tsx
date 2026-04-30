'use client'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function StaggerPreview() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // We target the specific class on the H1s
      gsap.from('.stagger-item', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
        repeat: -1,
        repeatDelay: 1.5,
        delay: 0.5,
      })
    },
    { scope: containerRef }
  )

  return (
    <div
      ref={containerRef}
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#EAE5D3]"
    >
      {/* Pattern Lines */}
      <div className="absolute top-16 right-8 left-8 h-px bg-black/10" />

      {/* The staggered items - Note the same class name */}
      <div className="flex flex-col gap-2 text-center">
        <h1 className="stagger-item font-display text-4xl font-black text-[#161412] uppercase">
          Fade In
        </h1>
        <h1 className="stagger-item font-display text-4xl font-black text-[#161412] uppercase">
          But
        </h1>
        <h1 className="stagger-item font-display text-4xl font-black text-[#161412] uppercase italic">
          Staggered.
        </h1>
      </div>

      <div className="absolute right-8 bottom-6 left-8 flex items-center justify-between border-t border-black/5 pt-4">
        <span className="font-mono text-[8px] tracking-widest text-black/30 uppercase">
          stagger: 0.2 · from: start
        </span>
      </div>
    </div>
  )
}
