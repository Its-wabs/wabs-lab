'use client'

import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useRouter } from 'next/navigation'

gsap.registerPlugin(ScrollTrigger)
const About = () => {
  const container = useRef<HTMLDivElement>(null)

  const router = useRouter()

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(
        {
          tiny: '(max-height: 679px)',
          short: '(max-height: 849px) and (min-height: 680px)',
          tall: '(min-height: 850px)',
        },
        (context) => {
          //const { tiny, short } = context.conditions as any

          // THE MASTER TIMELINE
          const masterTl = gsap.timeline({
            defaults: { ease: 'expo.inOut' },
          })

          masterTl
            // STEP A: THE SPLIT & 2D REVEAL
            .to(
              '.load-l',
              { width: '100vw', duration: 2, ease: 'power1.in' },
              0
            )
            .to(
              '.load-r',
              { width: '100vw', duration: 2, ease: 'power1.in' },
              0
            )
            .to(
              '.load-l',
              { opacity: 0, duration: 0.1, ease: 'power1.in' },
              2.1
            )
            .to(
              '.load-r',
              { opacity: 0, duration: 0.1, ease: 'power1.in' },
              2.1
            )
            .to('.introTop', { yPercent: -100, duration: 1.2 }, 2.2)
            .to('.introBottom', { yPercent: 100, duration: 1.2 }, 2.2)
        }
      )
    },
    { scope: container }
  )

  const handleNavigate = () => {
    const masterTl = gsap.timeline({
      defaults: { ease: 'expo.inOut' },
      onComplete: () => router.push('/'),
    })

    masterTl

      .to('.introTop', { yPercent: 0, duration: 1.2 }, 0)
      .to('.introBottom', { yPercent: 0, duration: 1.2 }, 0)
  }

  return (
    <div className="container-wrapper" ref={container}>
      {/* INTRO OVERLAY */}
      <div className="introOverlay">
        {/* TOP CURTAIN */}
        <div className="introPart introTop">
          <span className="introEyebrow">WABS LAB</span>
          <span className="introSub">Animation library</span>

          <div className="introRule" />
        </div>
        <div className="load-l bg-primary absolute top-1/2 left-1/2 h-0.5 w-0 -translate-x-1/2 -translate-y-1/2" />
        <div className="load-r bg-primary absolute top-1/2 right-1/2 h-0.5 w-0 translate-x-1/2 -translate-y-1/2" />

        {/* BOTTOM CURTAIN */}
        <div className="introPart introBottom">
          <span className="introSub">GSAP PATTERNS · READY TO PULL</span>
          <span className="introCta">OPENING THE DRAWER</span>
        </div>
      </div>

      {/* ── NAV ── */}
      <nav className="nav">
        <div className="navLogo cursor-pointer" onClick={handleNavigate}>
          WABS LAB
        </div>
        <button onClick={handleNavigate} className="journeyBtn">
          Open the drawer
        </button>
        <div className="navRight">
          <div className="about-tab">
            <span className="navLink underline underline-offset-3">ABOUT</span>
          </div>

          <a
            href="https://github.com/Its-wabs/wabs-lab"
            target="empty"
            className="navCta"
          >
            ↗ GITHUB
          </a>
        </div>
      </nav>
      <div className="flex flex-col items-center justify-center gap-0 pt-4 pb-32">
        <div className="about-main">
          <div className="about-paper-bg" />

          <section className="about-s1">
            <h1 className="about-h1">
              THE GAP BETWEEN
              <br />
              KNOWING AND MAKING
            </h1>
            <p className="about-body">
              There are hundreds of GSAP tutorials. They teach you the syntax of
              the library. Then you open a blank file and realize you still
              don't know where to start. In a way syntax was never the issue.{' '}
              <em>Judgment</em> is. Most resources teach you{' '}
              <em>how to animate</em>. WABS Lab teaches you the patterns so you
              can connect them to create your own thing, it's like a vocabulary
              of decisions rather than an instruction manual.
            </p>
            <blockquote className="about-blockquote">
              MOST ANIMATION RESOURCES TEACH SYNTAX.
              <br />
              NONE OF THEM TEACH TASTE.
            </blockquote>
            <p className="about-body">
              WABS Lab exists to close that gap. Every pattern here has a master
              implementation with explanations of what GSAP does and what{' '}
              <em>WABS</em> uses it for. You can copy each pattern and
              understand how it works. More importantly, you can understand why
              it works and when to use it. This library gives you the notes
              instead of the song tutorial, so you can make your own music.
            </p>
          </section>

          <div className="about-meta-card">
            <div className="about-binder-clip">
              <div className="clip-body" />
              <div className="clip-base" />
            </div>
            <div className="about-meta-rows">
              <span className="about-meta-label">WABS STUDIO</span>
              <span className="about-meta-label">ALGERIA</span>
              <div className="about-meta-divider" />
              <span className="about-meta-stat">043 DOCUMENTED</span>
              <span className="about-meta-label">MIT - FREE FOREVER</span>
              <div className="about-meta-divider" />
              <span className="about-meta-date">APR - 2026</span>
            </div>
          </div>

          <section className="about-s2">
            <div className="about-s2-left">
              <div className="about-s2-group">
                <span className="about-s2-sublabel">BACKGROUND</span>
                <span className="about-s2-item">6 YEARS AS AN ARTIST</span>
                <span className="about-s2-item">
                  DIGITAL 2D CHARACTER ILLUSTRATOR
                </span>
              </div>
              <div className="about-s2-group">
                <span className="about-s2-sublabel">POSITION</span>
                <span className="about-s2-item">DESIGN ENGINEER</span>
                <span className="about-s2-item">CREATIVE DEVELOPER</span>
              </div>
            </div>
            <div className="about-s2-right">
              <h2 className="about-s2-h2">
                BUILT BY SOMEONE WHO DRAWS <br />
                NOT JUST SOMEONE WHO CODES
              </h2>
              <p className="about-s2-body">
                WABS is a self-taught design engineer with six years of digital
                art and illustration before a line of code was written. This
                library is built from that perspective: animations are not
                decorations. They are decisions about how something should feel
                and how much weight a word carries when it enters a screen. That
                sensibility comes from the artist.
              </p>
            </div>
          </section>

          <section className="about-s3">
            <div className="about-s3-paper">
              <h2 className="about-s3-h2">
                FOUR SHIFTS THAT
                <br />
                CLOSE THE GAP
              </h2>
              <ol className="about-principles">
                {[
                  {
                    label: 'COMPREHENSION AND OWNERSHIP ARE DIFFERENT SKILLS',
                    body: 'You can follow a tutorial exactly and reproduce the result perfectly but still open a blank file the next day with no idea where to start. Understanding what happened is not the same as knowing how to begin.',
                  },
                  {
                    label: 'A DECISION YOU CANNOT EXPLAIN IS NOT YOURS YET',
                    body: 'If you cannot say why you chose that duration or that ease, you are still copying even if no one can tell. The goal is to reach the point where every value has a reason, even if that reason becomes instinct.',
                  },
                  {
                    label: 'PATTERNS ARE PUZZLE PIECES, NOT RECIPES',
                    body: 'A recipe tells you what to make. Puzzle pieces let you build what you imagine. Every pattern here is designed to be recombined, not reproduced. The sequence in your head is a valid starting point.',
                  },
                  {
                    label: 'TASTE IS BUILT BY MAKING DELIBERATE CHOICES',
                    body: 'Not by watching more tutorials. Every time you choose an ease with intention, name what you want to feel, or reject a value because it is wrong for this moment, that is taste being trained.',
                  },
                ].map((p, i) => (
                  <li key={i} className="about-principle">
                    <span className="about-principle-num">
                      {['I', 'II', 'III', 'IV'][i]}
                    </span>
                    <div>
                      <span className="about-principle-label">{p.label}</span>
                      <p className="about-principle-body">{p.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="about-s3-right">
              <span className="about-s3-num">04</span>
              <span className="about-s3-sublabel">THE FOUR SHIFTS</span>
              <p className="about-s3-desc">
                Not rules to follow. Each one describes a specific moment when
                learning becomes ownership and the blank file stops being blank.
              </p>
              <div className="about-s3-stats">
                <div>
                  <span className="about-s3-stat-label">PATTERN COUNT</span>
                  <span className="about-s3-stat-val">043</span>
                </div>
                <div>
                  <span className="about-s3-stat-label">FREE FOREVER</span>
                  <span className="about-s3-stat-val">MIT</span>
                </div>
              </div>
            </div>
          </section>

          {/*NEWSLETTER */}
          <section className="about-newsletter">
            <p className="about-nl-text tracking-wider uppercase">
              {' '}
              NEW PATTERNS GET DOCUMENTED AS THEY ARE BUILT. STAY CONNECTED.
            </p>
            <div className="about-nl-form">
              <input
                className="about-nl-input"
                type="email"
                placeholder="submit you email"
              />
              <button className="about-nl-btn">SUBMIT</button>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <span className="footLeft">
          DESIGNED AND BUILT BY{' '}
          <span className="footWabs">
            <a href="http://itswabs.vercel.app/" target="empty">
              WABS
            </a>
          </span>
        </span>
        <span className="footRight">V 1.0 - 2026</span>
      </footer>
    </div>
  )
}

export default About
