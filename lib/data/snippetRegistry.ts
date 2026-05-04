import { blurReveal } from './snippets/entrance/blurReveal'
import { cinematicEntrance } from './snippets/entrance/cinematicEntrance'
import { clipLeft } from './snippets/entrance/clipLeft'
import { fadein } from './snippets/entrance/fadein'
import { fadeinstagger } from './snippets/entrance/fadeinstagger'
import { slidein } from './snippets/entrance/slidein'
import { staggerGrid } from './snippets/entrance/staggerGrid'

export const SNIPPET_REGISTRY: Record<string, string> = {
  '036': fadein,
  '037': fadeinstagger,
  '038': slidein,
  '039': blurReveal,
  '040': staggerGrid,
  '041': clipLeft,
  '042': cinematicEntrance,
}
