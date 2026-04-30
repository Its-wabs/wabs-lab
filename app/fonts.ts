// app/fonts.ts
import localFont from 'next/font/local'

export const offBit = localFont({
  src: [
    {
      path: '../public/fonts/OffBit-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    { path: '../public/fonts/OffBit-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--offbit',
  display: 'swap',
})

export const offBit101 = localFont({
  src: [
    { path: '../public/fonts/OffBit-101.ttf', weight: '400', style: 'normal' },
    {
      path: '../public/fonts/OffBit-101Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--offbit101',
  display: 'swap',
})

export const offBitDot = localFont({
  src: [
    { path: '../public/fonts/OffBit-Dot.ttf', weight: '400', style: 'normal' },
    {
      path: '../public/fonts/OffBit-DotBold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--offbitdot',
  display: 'swap',
})
