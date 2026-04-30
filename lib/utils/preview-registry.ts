import dynamic from 'next/dynamic'

export const PREVIEW_REGISTRY: Record<string, any> = {
  '036': dynamic(() => import('@/components/preview/entrance/fadein')),
  '037': dynamic(() => import('@/components/preview/entrance/fadeInStagger')),
  '038': dynamic(() => import('@/components/preview/entrance/slidein')),
  '039': dynamic(() => import('@/components/preview/entrance/blurReveal')),
  '040': dynamic(() => import('@/components/preview/entrance/staggerGrid')),
  '041': dynamic(() => import('@/components/preview/entrance/clipleft')),
  '042': dynamic(
    () => import('@/components/preview/entrance/cinematicEntrance')
  ),
  // etc
}
