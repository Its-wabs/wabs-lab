'use client'
import { useEffect, useRef, useState } from 'react'
import { PatternData } from '../ui/patternmodal'

import { SNIPPET_REGISTRY } from '@/lib/data/snippetRegistry'
import DocumentationPaper from '../ui/DocumentationPaper'
import { DOCS_CONTENT } from '@/lib/data/docsData'
import CodePanel from '../ui/codePanel'

export interface PatternProps {
  pattern: PatternData
  allPatterns: PatternData[]
  complexity: String
  onClose: () => void
  onReplay: () => void
  onNavigate: (pattern: PatternData) => void
}

export default function TechnicalDocs({
  pattern,
  complexity,
  allPatterns,
  onClose,
  onReplay,
  onNavigate,
}: PatternProps) {
  const [copied, setCopied] = useState(false)
  const codeWrapperRef = useRef<HTMLDivElement>(null)

  const currentIndex = allPatterns.findIndex((p) => p.id === pattern.id)
  const prevPattern =
    allPatterns[(currentIndex - 1 + allPatterns.length) % allPatterns.length]
  const nextPattern = allPatterns[(currentIndex + 1) % allPatterns.length]

  const activeCode =
    SNIPPET_REGISTRY[pattern.id] ||
    `// Code for pattern ${pattern.id} is coming soon...`

  useEffect(() => {
    if (codeWrapperRef.current) {
      codeWrapperRef.current.scrollTop = 0
    }
  }, [pattern.id])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      console.error('Failed to copy!', err)
    }
  }

  const content = DOCS_CONTENT[pattern.id] || {
    what: pattern.sub,
    how: ['Implementation details pending...'],
    useCases: 'General motion design.',
    related: [],
  }

  return (
    <section className="pm-docs">
      {/*  Header */}
      <div className="pm-docs-header">
        <span className="pm-docs-num">02</span>
        <div className="pm-docs-divider" />
        <span className="pm-docs-label">DOCUMENTATION + IMPLEMENTATION</span>
        <div className="pm-docs-divider" />
        <button onClick={onClose} className="pm-doc-esc-btn">
          [ CLOSE ]
        </button>
      </div>

      {/* Meta Bar: Category | Complexity | Plugin */}
      <div className="pm-docs-meta-bar">
        <div className="pm-meta-cell">
          <span className="pm-meta-label">CATEGORY</span>
          <span className="pm-meta-value">
            {pattern.category.toUpperCase()}
          </span>
        </div>
        <div className="pm-meta-cell">
          <span className="pm-meta-label">COMPLEXITY</span>
          <span className="pm-meta-value">{complexity}</span>
        </div>
        <div className="pm-meta-cell">
          <span className="pm-meta-label">PLUGIN</span>
          <span className="pm-meta-value">
            {pattern.plugins && pattern.plugins.length > 0
              ? pattern.plugins.join(' / ').toUpperCase()
              : 'GSAP CORE'}
          </span>
        </div>
        <div className="pm-meta-spacer">
          <button className="pm-replay-btn" onClick={onReplay}>
            REPLAY
          </button>
          <button
            className="pm-code-copy-main"
            title="Copy to Clipboard"
            onClick={handleCopy}
          >
            {copied ? '✓ COPIED' : '↗ COPY CODE'}
          </button>
        </div>
      </div>

      <div className="pm-docs-grid">
        {/* Left: The Paper*/}
        <div className="pm-docs-left">
          <div className="pm-arrow-l hidden">left</div>
          <div className="pm-paper-stack">
            <div className="pm-paper-layer" />
            <div className="pm-paper-main">
              <DocumentationPaper content={content} />
            </div>
          </div>
          <div className="pm-arrow-r hidden">right</div>
        </div>

        {/* Right: Code Editor Panel */}
        <div className="pm-docs-right">
          <CodePanel
            code={activeCode}
            filename={`${pattern.name.replace(/\s+/g, '_').toUpperCase()}.TS - PATTERN ${pattern.id}`}
          />
        </div>
      </div>

      {/* Persistent Footer Navigation */}
      <footer className="pm-docs-nav">
        <div
          className="pm-nav-btn prev"
          onClick={() => onNavigate(prevPattern)}
        >
          <span className="pm-nav-dir">← PREVIOUS</span>
          <span className="pm-nav-name">{prevPattern.name.toUpperCase()}</span>
        </div>
        <div
          className="pm-nav-btn next"
          onClick={() => onNavigate(nextPattern)}
        >
          <span className="pm-nav-dir">NEXT →</span>
          <span className="pm-nav-name">{nextPattern.name.toUpperCase()}</span>
        </div>
      </footer>
    </section>
  )
}
