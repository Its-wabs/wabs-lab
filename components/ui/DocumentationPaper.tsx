'use client'
import { useRef, useState, useCallback, useEffect } from 'react'
import { PatternDoc } from '@/lib/data/docsData'
import CodePanel from './codePanel'

interface PaperProps {
  content: PatternDoc
}

export default function DocumentationPaper({ content }: PaperProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [scrollable, setScrollable] = useState(false)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0
      setProgress(0)
    }
  }, [content])

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const max = el.scrollHeight - el.clientHeight
    if (max <= 0) {
      setScrollable(false)
      return
    }
    setScrollable(true)
    setProgress(el.scrollTop / max)
  }, [])

  const setScrollEl = useCallback(
    (el: HTMLDivElement | null) => {
      ;(scrollRef as React.MutableRefObject<HTMLDivElement | null>).current = el
      if (el) {
        const max = el.scrollHeight - el.clientHeight
        setScrollable(max > 0)
        setProgress(el.scrollTop / (max || 1))
      }
    },
    [content]
  )

  return (
    <div className="relative flex h-full">
      {/* THREAD SCROLL INDICATOR */}
      {scrollable && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-8 bottom-8 left-10 z-10 w-[1.5px]"
        >
          {/* Track */}
          <div className="bg-ink/10 absolute inset-0 rounded-sm" />

          {/* Fill Line */}
          <div
            className="bg-ink/45 linear absolute inset-x-0 top-0 rounded-sm transition-[height] duration-75"
            style={{ height: `${progress * 100}%` }}
          />

          {/* The Knot */}
          <div
            className="bg-ink/55 linear absolute left-1/2 h-1.25 w-1.25 -translate-x-1/2 -translate-y-1/2 rounded-full transition-[top] duration-75"
            style={{ top: `${progress * 100}%` }}
          />
        </div>
      )}

      {/* SCROLLABLE PAPER CONTENT */}
      <div
        ref={setScrollEl}
        onScroll={handleScroll}
        className="paper-scroll-area scrollbar-none h-full flex-1 overflow-x-hidden overflow-y-auto pr-2 pl-10"
      >
        {/* 01 — WHAT THIS DOES */}
        <section className="pm-paper-section">
          <div className="mb-2 flex items-center gap-3">
            <span className="pm-paper-tag">01</span>
            <h4 className="pm-paper-sub">WHAT THIS DOES</h4>
          </div>
          <p className="pm-paper-text">{content.what}</p>
        </section>

        {/* 02 — HOW IT WORKS */}
        <section className="pm-paper-section">
          <div className="mb-2 flex items-center gap-3">
            <span className="pm-paper-tag">02</span>
            <h4 className="pm-paper-sub">HOW IT WORKS</h4>
          </div>
          <ul className="pm-paper-list">
            {content.how.map((step, i) => (
              <li key={i} className="flex flex-col gap-2">
                <div className="flex gap-3">
                  <span className="pm-step-num shrink-0">{i + 1}</span>
                  <p className="pm-paper-text">{step.text}</p>
                </div>
                {step.code && (
                  <div className="mt-1 ml-6 w-full">
                    <CodePanel
                      code={step.code.content}
                      filename={step.code.label}
                      language={step.code.language ?? 'javascript'}
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* 03 — USE CASES */}
        <section className="pm-paper-section">
          <div className="mb-2 flex items-center gap-3">
            <span className="pm-paper-tag">03</span>
            <h4 className="pm-paper-sub">USE CASES</h4>
          </div>
          <p className="pm-paper-text">{content.useCases}</p>
        </section>

        {/* 04 — RELATED PATTERNS */}
        <section className="pm-paper-section">
          <div className="mb-2 flex items-center gap-3">
            <span className="pm-paper-tag">04</span>
            <h4 className="pm-paper-sub">RELATED PATTERNS</h4>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {content.related.map((item) => (
              <button key={item} className="pm-related-tag">
                {item}
              </button>
            ))}
          </div>
        </section>

        <div className="h-8" />
      </div>
    </div>
  )
}
