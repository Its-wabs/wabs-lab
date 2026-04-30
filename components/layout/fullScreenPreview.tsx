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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              id="Cursor-Hand--Streamline-Pixel"
              height="32"
              width="32"
            >
              <desc>Cursor Hand Streamline Icon: https://streamlinehq.com</desc>
              <title>cursor-hand</title>
              <g>
                <path
                  d="M26.67 13.71h1.52v10.67h-1.52Z"
                  fill="currentColor"
                  strokeWidth="1"
                ></path>
                <path
                  d="M25.14 27.43H9.91v-1.52H8.38v1.52H6.86V32h21.33v-4.57h-1.52v-3.05h-1.53Zm0 3.05H22.1v-1.53h3.04Z"
                  fill="currentColor"
                  strokeWidth="1"
                ></path>
                <path
                  d="M25.14 12.19h1.53v1.52h-1.53Z"
                  fill="currentColor"
                  strokeWidth="1"
                ></path>
                <path
                  d="M22.1 13.71h1.52v4.58H22.1Z"
                  fill="currentColor"
                  strokeWidth="1"
                ></path>
                <path
                  d="M22.1 10.67h3.04v1.52H22.1Z"
                  fill="currentColor"
                  strokeWidth="1"
                ></path>
                <path
                  d="M17.53 13.71h1.52v4.58h-1.52Z"
                  fill="currentColor"
                  strokeWidth="1"
                ></path>
                <path
                  d="M12.95 13.71h1.53v4.58h-1.53Z"
                  fill="currentColor"
                  strokeWidth="1"
                ></path>
                <path
                  d="m12.95 10.67 9.15 0 0 -1.53 -7.62 0 0 -7.62 -1.53 0 0 9.15z"
                  fill="currentColor"
                  strokeWidth="1"
                ></path>
                <path
                  d="M9.91 0h3.04v1.52H9.91Z"
                  fill="currentColor"
                  strokeWidth="1"
                ></path>
                <path
                  d="m8.38 19.81 1.53 0 0 -18.29 -1.53 0 0 10.67 -1.52 0 0 1.52 1.52 0 0 6.1z"
                  fill="currentColor"
                  strokeWidth="1"
                ></path>
                <path
                  d="M6.86 24.38h1.52v1.53H6.86Z"
                  fill="currentColor"
                  strokeWidth="1"
                ></path>
                <path
                  d="M5.34 21.33h1.52v3.05H5.34Z"
                  fill="currentColor"
                  strokeWidth="1"
                ></path>
                <path
                  d="M5.34 13.71h1.52v1.53H5.34Z"
                  fill="currentColor"
                  strokeWidth="1"
                ></path>
                <path
                  d="M3.81 15.24h1.53v6.09H3.81Z"
                  fill="currentColor"
                  strokeWidth="1"
                ></path>
              </g>
            </svg>
          </button>
          <button
            onClick={() => onNavigate(nextPattern, false)}
            className="pm-fs-move-btn rotate-90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              id="Cursor-Hand--Streamline-Pixel"
              height="32"
              width="32"
            >
              <desc>Cursor Hand Streamline Icon: https://streamlinehq.com</desc>
              <title>cursor-hand</title>
              <g>
                <path
                  d="M26.67 13.71h1.52v10.67h-1.52Z"
                  fill="currentColor"
                  strokeWidth="1"
                ></path>
                <path
                  d="M25.14 27.43H9.91v-1.52H8.38v1.52H6.86V32h21.33v-4.57h-1.52v-3.05h-1.53Zm0 3.05H22.1v-1.53h3.04Z"
                  fill="currentColor"
                  strokeWidth="1"
                ></path>
                <path
                  d="M25.14 12.19h1.53v1.52h-1.53Z"
                  fill="currentColor"
                  strokeWidth="1"
                ></path>
                <path
                  d="M22.1 13.71h1.52v4.58H22.1Z"
                  fill="currentColor"
                  strokeWidth="1"
                ></path>
                <path
                  d="M22.1 10.67h3.04v1.52H22.1Z"
                  fill="currentColor"
                  strokeWidth="1"
                ></path>
                <path
                  d="M17.53 13.71h1.52v4.58h-1.52Z"
                  fill="currentColor"
                  strokeWidth="1"
                ></path>
                <path
                  d="M12.95 13.71h1.53v4.58h-1.53Z"
                  fill="currentColor"
                  strokeWidth="1"
                ></path>
                <path
                  d="m12.95 10.67 9.15 0 0 -1.53 -7.62 0 0 -7.62 -1.53 0 0 9.15z"
                  fill="currentColor"
                  strokeWidth="1"
                ></path>
                <path
                  d="M9.91 0h3.04v1.52H9.91Z"
                  fill="currentColor"
                  strokeWidth="1"
                ></path>
                <path
                  d="m8.38 19.81 1.53 0 0 -18.29 -1.53 0 0 10.67 -1.52 0 0 1.52 1.52 0 0 6.1z"
                  fill="currentColor"
                  strokeWidth="1"
                ></path>
                <path
                  d="M6.86 24.38h1.52v1.53H6.86Z"
                  fill="currentColor"
                  strokeWidth="1"
                ></path>
                <path
                  d="M5.34 21.33h1.52v3.05H5.34Z"
                  fill="currentColor"
                  strokeWidth="1"
                ></path>
                <path
                  d="M5.34 13.71h1.52v1.53H5.34Z"
                  fill="currentColor"
                  strokeWidth="1"
                ></path>
                <path
                  d="M3.81 15.24h1.53v6.09H3.81Z"
                  fill="currentColor"
                  strokeWidth="1"
                ></path>
              </g>
            </svg>
          </button>
          <button onClick={onClose} className="pm-fs-esc-btn">
            [ ESC ]
          </button>
        </div>
      </header>

      <div className="pm-fs-stage">
        {/* The Paper Stack */}
        <div className="pm-fs-paper-back" />
        <div
          className="pm-fs-paper-front"
          style={{ display: 'block', overflow: 'hidden' }}
        >
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
