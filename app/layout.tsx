// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import { offBit, offBit101, offBitDot } from './fonts'

export const metadata: Metadata = {
  title: 'WABS Lab - Animation Pattern Archive',
  description: '024 open-source GSAP animation patterns.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${offBit.variable} ${offBit101.variable} ${offBitDot.variable} antialiased`}
    >
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
