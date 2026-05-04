// components/ui/CodePanel.tsx
'use client'
import { useRef, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Copy, Check } from 'lucide-react'

interface CodePanelProps {
  code: string
  filename?: string
  language?: string
}

export default function CodePanel({
  code,
  filename,
  language = 'javascript',
}: CodePanelProps) {
  const [copied, setCopied] = useState(false)
  const codeWrapperRef = useRef<HTMLDivElement>(null)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      console.error('Failed to copy!', err)
    }
  }

  return (
    <div className="pm-code-panel-wrap">
      <div className="pm-code-panel">
        {filename && (
          <div className="pm-code-banner">
            {filename}
            <button
              onClick={handleCopy}
              className="p-1 transition-colors hover:text-white"
              title="Copy to Clipboard"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
        )}
        <div className="pm-code-wrapper custom-scrollbar" ref={codeWrapperRef}>
          <SyntaxHighlighter
            language={language}
            wrapLongLines={true}
            style={coldarkDark}
            customStyle={{
              margin: 0,
              padding: '1.5rem',
              fontSize: '13px',
              background: 'transparent',
              lineHeight: '1.6',
              overflowX: 'hidden',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              overflowWrap: 'anywhere',
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  )
}
