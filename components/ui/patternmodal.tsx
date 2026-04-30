'use client'

import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import FullScreenPreview from '../layout/fullScreenPreview'
import TechnicalDocs from '../layout/TechnicalDocs'
import { PREVIEW_REGISTRY } from '@/lib/utils/preview-registry'
import { PATTERNS } from '@/lib/constants/patterns'

import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { SNIPPET_REGISTRY } from '@/lib/data/snippetRegistry'
gsap.registerPlugin(ScrollToPlugin)

export type PatternData = {
  id: string
  name: string
  sub: string
  category: string
  plugins?: string[]
}

interface PatternModalProps {
  pattern: PatternData
  originRect: DOMRect
  onClose: () => void
}

const COMPLEXITY: Record<string, string> = {
  creative: 'ADVANCED',
  hover: 'INTERMEDIATE',
  text: 'INTERMEDIATE',
  scroll: 'INTERMEDIATE',
  entrance: 'BASIC',
}

export default function PatternModal({
  pattern,
  originRect,
  onClose,
}: PatternModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const folderRef = useRef<HTMLDivElement>(null)
  const tabsRowRef = useRef<HTMLDivElement>(null)
  const openBtnRef = useRef<HTMLDivElement>(null)
  const fullscreenRef = useRef<HTMLDivElement>(null)
  const masterTl = useRef<gsap.core.Timeline | null>(null)

  const allPatterns = Object.entries(PATTERNS).flatMap(([category, patterns]) =>
    patterns.map((p) => ({ ...p, category }))
  )

  const [activePattern, setActivePattern] = useState<PatternData>(pattern)

  const [copied, setCopied] = useState(false)

  const activeCode =
    SNIPPET_REGISTRY[pattern.id] ||
    `// Code for pattern ${pattern.id} is coming soon...`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      console.error('Failed to copy!', err)
    }
  }

  const handleNavigate = (next: PatternData, shouldScroll: boolean = true) => {
    setActivePattern(next)
    if (shouldScroll) {
      handleScrollToTop()
    }
  }

  const SelectedPreview = PREVIEW_REGISTRY[activePattern.id]

  const complexity = COMPLEXITY[activePattern.category] ?? 'INTERMEDIATE'

  const [phase, setPhase] = useState<'folder' | 'fullscreen'>('folder')

  useGSAP(() => {
    if (!folderRef.current || !overlayRef.current) return

    // 1. Initial State: Snap exactly to the clicked tab position
    gsap.set(folderRef.current, {
      top: originRect.top,
      left: originRect.left,
      width: originRect.width,
      height: originRect.height,
      xPercent: 0,
      yPercent: 0,
      borderRadius: '4px',
    })

    // 2. Define the "Master" intro timeline (Tab -> Center Folder)
    masterTl.current = gsap.timeline({
      paused: true,
      onReverseComplete: onClose,
    })

    masterTl.current
      .to(overlayRef.current, { opacity: 1, duration: 0.4 }, 0)
      .to(
        folderRef.current,
        {
          top: '50%',
          left: '50%',
          xPercent: -50,
          yPercent: -50,
          width: 720,
          height: 480,
          duration: 0.65,
          ease: 'expo.out',
        },
        0
      )
      .fromTo(
        tabsRowRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35 },
        0.25
      )
      .fromTo(
        openBtnRef.current,
        { x: -120, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.35, ease: 'expo.inOut' },
        0.3
      )
      .fromTo(
        '.pm-action-animator-copy',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: 'expo.inOut' },
        0.65
      )
      .fromTo(
        '.pm-action-animator-esc',
        { y: 40, x: -65, opacity: 0 },
        { y: 0, x: 0, opacity: 1, duration: 0.35, ease: 'expo.inOut' },
        0.95
      )

    masterTl.current.play()
  }, [])

  const handleOpen = () => {
    if (phase === 'fullscreen') return
    setPhase('fullscreen')

    const tl = gsap.timeline()
    tl.to(openBtnRef.current, { opacity: 0, x: -60, duration: 0.2 })
      .to(
        folderRef.current,
        {
          top: 0,
          left: 0,
          xPercent: 0,
          yPercent: 0,
          width: '100vw',
          height: '100vh',
          borderRadius: 0,
          duration: 0.6,
          ease: 'expo.inOut',
        },
        0
      )
      .to(
        fullscreenRef.current,
        {
          opacity: 1,
          pointerEvents: 'all',
          duration: 0.4,
        },
        0.2
      )
  }

  const handleClose = () => {
    if (phase === 'fullscreen') {
      // Transition from Fullscreen back to Centered Folder
      const collapseTl = gsap.timeline({
        onComplete: () => {
          setPhase('folder')
        },
      })

      collapseTl
        .to(fullscreenRef.current, {
          opacity: 0,
          pointerEvents: 'none',
          duration: 0.3,
        })
        .to(
          folderRef.current,
          {
            top: '50%',
            left: '50%',
            xPercent: -50,
            yPercent: -50,
            width: 720,
            height: 480,
            borderRadius: '4px',
            duration: 0.6,
            ease: 'expo.inOut',
          },
          0
        )
        .fromTo(
          openBtnRef.current,
          { x: -60, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.35, ease: 'expo.inOut' },
          0.35
        )
        .fromTo(
          '.pm-action-animator-copy',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35, ease: 'expo.inOut' },
          0.65
        )
        .fromTo(
          '.pm-action-animator-esc',
          { y: 40, x: -65, opacity: 0 },
          { y: 0, x: 0, opacity: 1, duration: 0.35, ease: 'expo.inOut' },
          0.95
        )
    } else {
      // Already in folder phase? Just reverse the master intro
      masterTl.current?.reverse()
    }
  }

  const handleScrollToTop = () => {
    gsap.to(fullscreenRef.current, {
      scrollTo: { y: 0 },
      duration: 1,
      ease: 'expo.out',
    })
  }

  return (
    <div className="pm-root">
      {/* Backdrop */}
      <div ref={overlayRef} onClick={handleClose} className="pm-overlay" />

      {/* THE PHYSICAL FOLDER */}
      <div ref={folderRef} className="pm-folder">
        {/* Back card  */}
        <div className="pm-folder-back" />

        {/* Tabs row */}
        <div ref={tabsRowRef} className="pm-tabs-row">
          <div className="pm-tab-ear">
            <span className="pm-tab-id">{activePattern.id}</span>
            <span className="pm-tab-name">{activePattern.name}</span>
          </div>
        </div>

        {/* ── SANDWICHED ACTIONS  */}
        <div className="pm-action-animator-copy" onClick={handleCopy}>
          <div className="pm-action-copy">
            {copied ? '✓ COPIED' : '↗ COPY CODE'}
          </div>
        </div>

        <div className="pm-action-animator-esc">
          <div className="pm-action-esc" onClick={handleClose}>
            [ ESC ]
          </div>
        </div>

        {/* Open button  */}
        <div ref={openBtnRef} onClick={handleOpen} className="pm-open-btn">
          <span className="pm-open-label">OPEN</span>
        </div>

        {/* Main folder front body */}
        <div className="pm-folder-body">
          <div className="pm-preview-area">
            <div className="pm-preview-dot-bg" />
            {SelectedPreview ? (
              <SelectedPreview />
            ) : (
              <div className="flex h-full flex-col items-center justify-center opacity-20">
                <span className="font-mono text-xs">ID_{activePattern.id}</span>
                <span className="font-mono text-[10px]">COMING SOON</span>
              </div>
            )}
          </div>
          <div className="pm-folder-footer">
            <span className="pm-folder-footer-text">
              WABS LAB . ARCHIVE v1.0
            </span>
            <span className="pm-folder-footer-text">
              {activePattern.category.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Fullscreen content reveal */}
        <div ref={fullscreenRef} className="pm-fullscreen">
          {/* Section 01: Interactive preview */}
          <FullScreenPreview
            pattern={activePattern}
            allPatterns={allPatterns}
            onClose={handleClose}
            onNavigate={handleNavigate}
          />

          {/* Section 02: Documentation */}
          <TechnicalDocs
            allPatterns={allPatterns}
            pattern={activePattern}
            complexity={complexity}
            onClose={handleClose}
            onReplay={handleScrollToTop}
            onNavigate={handleNavigate}
          />
        </div>
      </div>
    </div>
  )
}
