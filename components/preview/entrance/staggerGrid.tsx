'use client'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function StaggerGrid() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // We target the specific class on the h1 element
      gsap.from('.stagger-item', {
        y: 40,
        opacity: 0,
        stagger: {
          grid: 'auto',
          from: 'center',
          amount: 0.6,
        },
        repeat: -1,
        repeatDelay: 2.5,
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
      <div className="grid grid-cols-3 items-center justify-center gap-3">
        <h1 className="stagger-item font-display text-4xl font-black text-[#161412] uppercase">
          item 1
        </h1>
        <h1 className="stagger-item font-display text-4xl font-black text-[#161412] uppercase">
          item 2
        </h1>
        <h1 className="stagger-item font-display text-4xl font-black text-[#161412] uppercase">
          item 3
        </h1>
        <h1 className="stagger-item font-display text-4xl font-black text-[#161412] uppercase">
          item 4
        </h1>
        <h1 className="stagger-item font-display text-4xl font-black text-[#161412] uppercase">
          item 5
        </h1>
        <h1 className="stagger-item font-display text-4xl font-black text-[#161412] uppercase">
          item 6
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
