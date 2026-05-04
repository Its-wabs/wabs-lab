import HandIcon from '../ui/handicon'
import { PatternData } from '../ui/patternmodal'
import { PREVIEW_REGISTRY } from '@/lib/utils/preview-registry'

export interface PatternProps {
  pattern: PatternData
  allPatterns: PatternData[]
  onClose: () => void
  onNavigate: (pattern: PatternData, shouldScroll: boolean) => void
}

export default function InteractiveStage({
  pattern,
  allPatterns,
  onClose,
  onNavigate,
}: PatternProps) {
  const SelectedPreview = PREVIEW_REGISTRY[pattern.id]
  const currentIndex = allPatterns.findIndex((p) => p.id === pattern.id)
  const prevPattern =
    allPatterns[(currentIndex - 1 + allPatterns.length) % allPatterns.length]
  const nextPattern = allPatterns[(currentIndex + 1) % allPatterns.length]
  return (
    <section className="pm-fs-preview">
      {/* Header */}
      <header className="pm-fs-header">
        <div className="pm-fs-breadcrumb">
          <span>WABS LAB</span>
          <span>→</span>
          <span>{pattern.category}</span>
          <span>→</span>
          <span className="pm-fs-breadcrumb-active">{pattern.name}</span>
        </div>
        <div className="pm-fs-btn">
          <button
            onClick={() => onNavigate(prevPattern, false)}
            className="pm-fs-move-btn -scale-y-100 rotate-90"
          >
            <HandIcon />
          </button>
          <button
            onClick={() => onNavigate(nextPattern, false)}
            className="pm-fs-move-btn rotate-90"
          >
            <HandIcon />
          </button>
          <button onClick={onClose} className="pm-fs-esc-btn">
            [ ESC ]
          </button>
        </div>
      </header>

      <div className="pm-fs-stage">
        {/* The Paper Stack */}
        <div className="pm-fs-paper-back" />
        <div className="pm-fs-paper-front">
          {SelectedPreview ? (
            <SelectedPreview />
          ) : (
            <div className="flex h-full flex-col items-center justify-center opacity-20">
              <span className="font-mono text-xs">ID_{pattern.id}</span>
              <span className="font-mono text-[10px]">COMING SOON</span>
            </div>
          )}
        </div>

        {/* Scroll Hint */}
        <div className="pm-fs-scroll-hint">
          <span className="pm-fs-scroll-text">SCROLL FOR DOCS</span>
        </div>

        {/* Metadata Footer */}
        <footer className="pm-fs-footer">
          <div className="pm-fs-id-group">
            <span className="pm-fs-big-id">{pattern.id}</span>
            <span className="pm-fs-big-name">{pattern.name}</span>
          </div>

          <div className="pm-fs-tags">
            <span className="pm-fs-tag">BEGINNER</span>
            <span className="pm-fs-tag">SCROLLTRIGGER</span>
            <span className="pm-fs-tag">TEXT</span>
          </div>
        </footer>
      </div>
    </section>
  )
}
