'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'

/* ── Islamic 8-point star polygon ── */
const STAR = '100,20 113.4,67.7 156.6,43.4 132.3,86.6 180,100 132.3,113.4 156.6,156.6 113.4,132.3 100,180 86.6,132.3 43.4,156.6 67.7,113.4 20,100 67.7,86.6 43.4,43.4 86.6,67.7'

const FEATURES = [
  { icon: '٣٠', tag: 'Content API', title: 'Full Quran Text', desc: '114 Surahs with Arabic text, transliterations, and 50+ translations in every language. Mushaf-accurate layouts powered by the Quran Foundation Content API.' },
  { icon: '♪', tag: 'Audio API', title: 'Audio Recitation', desc: 'Word-by-word playback with highlighted text from world-renowned Qaris. Stream high-quality audio directly via the Quran Foundation Audio API.' },
  { icon: '◈', tag: 'bookmark · collection', title: 'Bookmarks & Collections', desc: 'Save Ayahs, build personal collections, and access them across every device — synced in real-time via OAuth2-authenticated user endpoints.' },
  { icon: '◎', tag: 'reading_session', title: 'Reading Progress', desc: 'Track every session, resume exactly where you left off. Your full reading history is preserved securely via the User Reading Session API.' },
  { icon: '✦', tag: 'goal · streak', title: 'Goals & Streaks', desc: 'Set daily reading goals, track your streaks, and celebrate milestones. The Goals API powers a personalised consistency engine.' },
  { icon: '⊕', tag: 'Search API', title: 'Semantic Search', desc: 'Find any verse by meaning, keyword, or theme with vector-powered semantic search. Results are ranked and deeply linked to audio and translation.' },
]

const SCOPES = [
  { scope: 'openid',          desc: 'Identity' },
  { scope: 'bookmark',        desc: 'Saved Ayahs' },
  { scope: 'collection',      desc: 'Verse sets' },
  { scope: 'reading_session', desc: 'Progress' },
  { scope: 'goal',            desc: 'Daily targets' },
  { scope: 'streak',          desc: 'Consistency' },
  { scope: 'preference',      desc: 'Settings' },
  { scope: 'offline_access',  desc: 'Refresh tokens' },
]

const STEPS = [
  { n: '01', title: 'Sign In', desc: 'OAuth2 Authorization Code with PKCE via the Quran Foundation hosted login — no passwords stored in the app.' },
  { n: '02', title: 'Explore', desc: 'Browse 114 Surahs, search by meaning, play recitations, and discover verse-by-verse translations.' },
  { n: '03', title: 'Reflect', desc: 'Bookmark Ayahs, build collections, set daily goals, and watch your streaks grow over time.' },
]

const MARQUEE = [
  '"With hardship comes ease" · 94:6',
  '"He is with you wherever you are" · 57:4',
  '"In remembrance of Allah do hearts find rest" · 13:28',
  '"Allah does not burden beyond what one can bear" · 2:286',
  '"Remember Me, and I will remember you" · 2:152',
  '"Indeed, Allah is with the patient" · 2:153',
]

/* ── Custom counter hook ── */
function useCounter(target, duration = 2200) {
  const [val, setVal] = useState(0)
  const elRef = useRef(null)
  const started = useRef(false)
  useEffect(() => {
    const el = elRef.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const t0 = performance.now()
        const tick = (now) => {
          const p = Math.min((now - t0) / duration, 1)
          const ease = 1 - Math.pow(1 - p, 3)
          setVal(Math.round(ease * target))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        obs.disconnect()
      }
    }, { threshold: 0.6 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration])
  return [val, elRef]
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const srRefs = useRef([])

  // Animated stat counters
  const [surahs, refS] = useCounter(114)
  const [ayahs, refA] = useCounter(6236)
  const [trans, refT] = useCounter(50)
  const [reciters, refR] = useCounter(100)

  useEffect(() => {
    // Nav scroll
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    // Scroll reveal
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.1 }
    )
    srRefs.current.forEach(el => el && obs.observe(el))
    return () => { window.removeEventListener('scroll', onScroll); obs.disconnect() }
  }, [])

  // Hero parallax on mouse move
  const onMouseMove = useCallback((e) => {
    const { innerWidth: w, innerHeight: h } = window
    setMouse({ x: (e.clientX / w - 0.5) * 30, y: (e.clientY / h - 0.5) * 20 })
  }, [])

  const sr = (delay = 0) => (el) => {
    if (!el) return
    const cls = ['sr', `sr-d${delay}`]
    cls.forEach(c => el.classList.add(c))
    srRefs.current.push(el)
  }

  return (
    <div onMouseMove={onMouseMove}>

      {/* ── NAV ── */}
      <nav className={`site-nav${scrolled ? ' scrolled' : ''}`}>
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:12, textDecoration:'none' }}>
          <LogoMark size={34} />
          <span style={{ fontFamily:'var(--display)', fontSize:17, fontWeight:700, letterSpacing:6, color:'var(--gold)' }}>NOOR</span>
        </Link>
        <div style={{ display:'flex', gap:36, alignItems:'center' }}>
          {[['Features','#features'],['About','#about'],['GitHub','https://github.com']].map(([l,h]) => (
            <a key={l} href={h} style={{ fontFamily:'var(--display)', fontSize:9.5, letterSpacing:3, color:'var(--cream-55)', textDecoration:'none', textTransform:'uppercase', transition:'color .2s' }}
              onMouseEnter={e=>e.target.style.color='var(--gold)'}
              onMouseLeave={e=>e.target.style.color='var(--cream-55)'}>{l}</a>
          ))}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', overflow:'hidden', paddingTop:68 }}>

        {/* Ambient orbs */}
        <div style={{ position:'absolute', top:'20%', left:'50%', width:700, height:700, background:'radial-gradient(circle, rgba(201,151,43,0.06) 0%, transparent 60%)', borderRadius:'50%', transform:'translate(-40%,-50%)', animation:'orbFloat 20s ease-in-out infinite', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', bottom:'10%', left:'10%', width:400, height:400, background:'radial-gradient(circle, rgba(26,107,74,0.1) 0%, transparent 65%)', borderRadius:'50%', animation:'orbFloat 26s ease-in-out infinite 8s', pointerEvents:'none' }}/>

        {/* Floating particles */}
        {['p1','p2','p3','p4','p5','p6','p7','p8'].map(c => <div key={c} className={`particle ${c}`}/>)}

        {/* Arabic watermark */}
        <div className="arabic-wm" style={{ position:'absolute', right:'-40px', top:'50%', transform:'translateY(-50%)', fontFamily:"'Scheherazade New','Amiri',serif", fontSize:'clamp(200px,32vw,420px)', color:'var(--gold)', animation:'glowPulse 7s ease-in-out infinite', lineHeight:0.9, userSelect:'none', pointerEvents:'none', zIndex:0 }}>
          نور
        </div>

        {/* Animated star */}
        <div style={{
          position:'absolute', right:'5%', top:'50%',
          width:'min(460px,44vw)', aspectRatio:'1',
          transform:`translateY(-50%) translate(${mouse.x * 0.4}px,${mouse.y * 0.4}px)`,
          transition:'transform 0.1s linear',
          zIndex:1, animation:'starPulse 6s ease-in-out infinite',
        }}>
          <StarSVG />
        </div>

        {/* Hero copy */}
        <div style={{ position:'relative', zIndex:2, maxWidth:700, padding:'80px 56px 80px 80px' }}>
          <p className="eyebrow enter enter-0" style={{ marginBottom:28 }}>Quran Foundation Hackathon 2025</p>

          <h1 className="enter enter-1" style={{ fontFamily:'var(--display)', fontWeight:900, fontSize:'clamp(52px,7.5vw,100px)', lineHeight:1.0, letterSpacing:'-1.5px', color:'var(--cream)', marginBottom:32 }}>
            The Quran,<br/>
            <em style={{ color:'var(--gold-2)', fontStyle:'italic' }}>always</em><br/>
            with you.
          </h1>

          <div className="gold-hr enter enter-2" style={{ width:72, marginBottom:32 }} />

          <p className="enter enter-2" style={{ fontFamily:'var(--body)', fontSize:17, lineHeight:1.78, color:'var(--cream-55)', fontWeight:300, maxWidth:440, marginBottom:48 }}>
            Noor is a Flutter companion app built on the Quran Foundation APIs — full Quran text, audio recitation, bookmarks, reading progress, goals, and more. All beautifully synced.
          </p>

          <div className="enter enter-3" style={{ display:'flex', gap:16, flexWrap:'wrap', marginBottom:64 }}>
            <a href="#" className="btn-primary">Download App</a>
            <a href="#features" className="btn-ghost">See Features</a>
          </div>

          {/* Live Ayah card */}
          <div className="card enter enter-4" style={{ padding:'28px 32px', maxWidth:420 }}>
            <p style={{ fontFamily:'var(--display)', fontSize:9, letterSpacing:4, color:'var(--gold)', textTransform:'uppercase', marginBottom:16 }}>Ayah of the Day</p>
            <p style={{ fontFamily:"'Scheherazade New','Amiri',serif", fontSize:28, color:'var(--gold-3)', lineHeight:1.7, textAlign:'right', direction:'rtl', marginBottom:14 }}>
              إِنَّ مَعَ الْعُسْرِ يُسْرًا
            </p>
            <p style={{ fontFamily:'var(--body)', fontSize:14, color:'var(--cream-55)', fontWeight:300, lineHeight:1.65, marginBottom:10 }}>
              "Indeed, with hardship comes ease."
            </p>
            <p style={{ fontFamily:'var(--display)', fontSize:9, letterSpacing:3, color:'rgba(201,151,43,0.45)', textTransform:'uppercase' }}>Surah Ash-Sharh · 94:6</p>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ background:'var(--gold)', overflow:'hidden', padding:'14px 0', borderTop:'1px solid rgba(0,0,0,0.15)' }}>
        <div style={{ display:'flex', animation:'marqueeLeft 28s linear infinite', width:'max-content' }}
          onMouseEnter={e=>e.currentTarget.style.animationPlayState='paused'}
          onMouseLeave={e=>e.currentTarget.style.animationPlayState='running'}>
          {[...MARQUEE,...MARQUEE].map((t,i) => (
            <span key={i} style={{ display:'inline-flex', alignItems:'center', gap:20, fontFamily:'var(--display)', fontSize:10.5, fontWeight:600, letterSpacing:2, color:'#05100C', textTransform:'uppercase', whiteSpace:'nowrap', padding:'0 28px' }}>
              <span style={{ opacity:0.35, fontSize:14 }}>✦</span>{t}
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS ── */}
      <section style={{ padding:'0 80px', borderBottom:'1px solid var(--border)' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)' }}>
          {[
            { ref:refS, val:surahs,    suffix:'',  label:'Surahs' },
            { ref:refA, val:ayahs,     suffix:'',  label:'Ayahs' },
            { ref:refT, val:trans,     suffix:'+', label:'Translations' },
            { ref:refR, val:reciters,  suffix:'+', label:'Reciters' },
          ].map((s,i) => (
            <div key={i} ref={s.ref} style={{ padding:'72px 24px', textAlign:'center', borderRight: i<3 ? '1px solid var(--border)' : 'none' }}>
              <p className="shimmer" style={{ fontFamily:'var(--display)', fontSize:64, fontWeight:900, lineHeight:1, marginBottom:12 }}>
                {s.val.toLocaleString()}{s.suffix}
              </p>
              <p style={{ fontFamily:'var(--display)', fontSize:10, letterSpacing:4, color:'var(--cream-30)', textTransform:'uppercase' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding:'120px 80px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <p className="eyebrow sr" ref={sr()} style={{ marginBottom:20 }}>What Noor Does</p>
          <h2 className="h2 sr sr-d1" ref={sr(1)} style={{ maxWidth:540, marginBottom:18 }}>
            Built on every <em>API</em><br/>they offer
          </h2>
          <p className="sr sr-d2" ref={sr(2)} style={{ fontFamily:'var(--body)', fontSize:16, color:'var(--cream-55)', fontWeight:300, maxWidth:460, marginBottom:72, lineHeight:1.75 }}>
            From Content to OAuth2 — Noor integrates the full Quran Foundation API surface to create the most complete Quran experience on mobile.
          </p>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:2 }}>
            {FEATURES.map((f,i) => (
              <div key={i} className={`card sr sr-d${(i%3)+1}`} ref={sr((i%3)+1)} style={{ padding:'44px 36px' }}
                onMouseMove={e => {
                  const r = e.currentTarget.getBoundingClientRect()
                  const x = ((e.clientX - r.left) / r.width - 0.5) * 14
                  const y = ((e.clientY - r.top) / r.height - 0.5) * 10
                  e.currentTarget.style.transform = `translateY(-8px) rotateX(${-y}deg) rotateY(${x}deg) scale(1.005)`
                }}
                onMouseLeave={e => { e.currentTarget.style.transform = '' }}>

                {/* Corner star accent */}
                <div style={{ position:'absolute', top:-1, right:-1, opacity:0.12 }}>
                  <svg viewBox="0 0 50 50" width="50" height="50">
                    <polygon points={STAR} transform="scale(0.22) translate(14,14)" fill="var(--gold)"/>
                  </svg>
                </div>

                {/* Tag */}
                <p style={{ fontFamily:'var(--display)', fontSize:8, letterSpacing:3, color:'rgba(201,151,43,0.55)', textTransform:'uppercase', marginBottom:20 }}>
                  {f.tag}
                </p>

                <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:20 }}>
                  <div style={{ width:44, height:44, background:'rgba(201,151,43,0.08)', border:'1px solid rgba(201,151,43,0.2)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <span style={{ fontFamily:'var(--display)', fontSize:16, color:'var(--gold)', fontWeight:700 }}>{f.icon}</span>
                  </div>
                  <h3 style={{ fontFamily:'var(--display)', fontSize:18, fontWeight:700, color:'var(--cream)', lineHeight:1.2 }}>{f.title}</h3>
                </div>

                <p style={{ fontFamily:'var(--body)', fontSize:14, lineHeight:1.78, color:'var(--cream-55)', fontWeight:300 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AYAH SPOTLIGHT ── */}
      <section style={{ position:'relative', padding:'120px 80px', background:'var(--bg-1)', overflow:'hidden', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)' }}>
        {/* Background star grid */}
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', opacity:0.03, pointerEvents:'none' }}>
          <svg viewBox="0 0 200 200" width="900" height="900">
            {[1,0.7,0.45].map((s,i) => (
              <polygon key={i} points={STAR} fill="none" stroke="var(--gold)" strokeWidth="0.5"
                transform={`translate(${100*(1-s)},${100*(1-s)}) scale(${s})`}/>
            ))}
          </svg>
        </div>
        <div style={{ maxWidth:760, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
          <p className="eyebrow sr" ref={sr()} style={{ justifyContent:'center', marginBottom:48 }}>Featured Verse</p>
          <p className="sr sr-d1" ref={sr(1)} style={{ fontFamily:"'Scheherazade New','Amiri',serif", fontSize:'clamp(30px,5vw,54px)', color:'var(--gold-3)', lineHeight:1.9, direction:'rtl', marginBottom:44 }}>
            أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ
          </p>
          <div className="gold-hr sr sr-d2" ref={sr(2)} style={{ width:72, margin:'0 auto 36px' }}/>
          <p className="sr sr-d2" ref={sr(2)} style={{ fontFamily:'var(--display)', fontStyle:'italic', fontSize:'clamp(17px,2.5vw,26px)', color:'var(--cream)', fontWeight:400, lineHeight:1.5, marginBottom:24 }}>
            "Verily, in the remembrance of Allah<br/>do hearts find rest."
          </p>
          <p className="sr sr-d3" ref={sr(3)} style={{ fontFamily:'var(--display)', fontSize:10, letterSpacing:4, color:'rgba(201,151,43,0.45)', textTransform:'uppercase' }}>Surah Ar-Ra'd · 13:28</p>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="about" style={{ padding:'120px 80px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <p className="eyebrow sr" ref={sr()} style={{ marginBottom:20 }}>How It Works</p>
          <h2 className="h2 sr sr-d1" ref={sr(1)} style={{ marginBottom:80 }}>
            Simple. Secure. <em>Spiritual.</em>
          </h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:0 }}>
            {STEPS.map((s,i) => (
              <div key={i} className={`sr sr-d${i+1}`} ref={sr(i+1)} style={{ padding:'0 40px 0 0', borderRight: i<2 ? '1px solid var(--border)' : 'none', paddingRight: i<2 ? 60 : 0, paddingLeft: i>0 ? 60 : 0 }}>
                <p style={{ fontFamily:'var(--display)', fontSize:76, fontWeight:900, color:'transparent', WebkitTextStroke:'1px rgba(201,151,43,0.2)', lineHeight:1, marginBottom:24 }}>{s.n}</p>
                <h3 style={{ fontFamily:'var(--display)', fontSize:24, fontWeight:700, color:'var(--cream)', marginBottom:18 }}>{s.title}</h3>
                <div className="gold-hr" style={{ width:36, marginBottom:20 }}/>
                <p style={{ fontFamily:'var(--body)', fontSize:15, lineHeight:1.78, color:'var(--cream-55)', fontWeight:300 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OAUTH2 SCOPES ── */}
      <section style={{ padding:'100px 80px', background:'var(--bg-1)', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:64, flexWrap:'wrap' }}>
            <div style={{ flex:'0 0 320px' }}>
              <p className="eyebrow sr" ref={sr()} style={{ marginBottom:20 }}>OAuth2 + OIDC</p>
              <h2 className="h2 sr sr-d1" ref={sr(1)} style={{ fontSize:'clamp(28px,3.5vw,44px)', marginBottom:20 }}>
                User data,<br/><em>secured right</em>
              </h2>
              <p className="sr sr-d2" ref={sr(2)} style={{ fontFamily:'var(--body)', fontSize:15, lineHeight:1.78, color:'var(--cream-55)', fontWeight:300 }}>
                Noor uses Authorization Code flow with PKCE and OpenID Connect via the Quran Foundation identity provider. Token exchange happens on a secure backend — never exposed in the app.
              </p>
            </div>
            <div className="sr sr-d2" ref={sr(2)} style={{ flex:1, minWidth:300 }}>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:2 }}>
                {SCOPES.map((s,i) => (
                  <div key={i} className="card" style={{ padding:'20px 16px', textAlign:'center' }}>
                    <p style={{ fontFamily:'var(--display)', fontSize:8.5, letterSpacing:1.5, color:'var(--gold)', marginBottom:8, textTransform:'lowercase' }}>{s.scope}</p>
                    <p style={{ fontFamily:'var(--body)', fontSize:11, color:'var(--cream-55)', fontWeight:300 }}>{s.desc}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontFamily:'var(--display)', fontSize:9, letterSpacing:3, color:'rgba(201,151,43,0.35)', textTransform:'uppercase', marginTop:16, textAlign:'right' }}>
                Powered by api-docs.quran.foundation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section style={{ padding:'72px 80px', borderBottom:'1px solid var(--border)' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:32 }}>
          <div className="sr" ref={sr()}>
            <p className="eyebrow" style={{ marginBottom:12 }}>Built With</p>
            <p style={{ fontFamily:'var(--display)', fontSize:26, fontWeight:700, color:'var(--cream)' }}>Quran Foundation APIs</p>
          </div>
          <div className="sr sr-d2" ref={sr(2)} style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            {['Content API v4','Search API','User APIs','OAuth2 / OIDC','Flutter / Dart'].map((t,i) => (
              <span key={i} style={{ fontFamily:'var(--display)', fontSize:9, letterSpacing:2.5, color:'var(--gold)', padding:'10px 18px', border:'1px solid var(--border)', background:'rgba(201,151,43,0.04)', textTransform:'uppercase' }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ position:'relative', padding:'160px 80px', textAlign:'center', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'50%', left:'50%', width:900, height:900, background:'radial-gradient(circle, rgba(201,151,43,0.055) 0%, transparent 60%)', transform:'translate(-50%,-50%)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', top:'50%', left:'50%', width:300, height:300, background:'radial-gradient(circle, rgba(26,107,74,0.12) 0%, transparent 60%)', transform:'translate(-50%,-50%)', pointerEvents:'none' }}/>
        <div style={{ position:'relative', zIndex:1, maxWidth:640, margin:'0 auto' }}>
          <p className="eyebrow sr" ref={sr()} style={{ justifyContent:'center', marginBottom:28 }}>Begin Your Journey</p>
          <h2 className="h2 sr sr-d1" ref={sr(1)} style={{ marginBottom:28, textAlign:'center' }}>
            Light your path<br/>through the <em>Quran</em>
          </h2>
          <p className="sr sr-d2" ref={sr(2)} style={{ fontFamily:'var(--body)', fontSize:17, lineHeight:1.78, color:'var(--cream-55)', fontWeight:300, marginBottom:52 }}>
            Download Noor and experience the Quran with the depth it deserves — beautifully designed, spiritually intentional.
          </p>
          <div className="sr sr-d3" ref={sr(3)} style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
            <a href="#" className="btn-primary">App Store</a>
            <a href="#" className="btn-primary">Google Play</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop:'1px solid var(--border)', padding:'44px 80px', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:24 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <LogoMark size={28} />
          <span style={{ fontFamily:'var(--display)', fontSize:13, fontWeight:700, letterSpacing:5, color:'var(--gold)' }}>NOOR</span>
        </div>
        <div style={{ display:'flex', gap:28, flexWrap:'wrap' }}>
          {[['Privacy Policy','/privacy-policy'],['Terms of Service','/terms'],['Quran Foundation','https://quran.foundation']].map(([l,h]) => (
            <Link key={l} href={h} style={{ fontFamily:'var(--display)', fontSize:9.5, letterSpacing:3, color:'var(--cream-30)', textDecoration:'none', textTransform:'uppercase', transition:'color .2s' }}
              onMouseEnter={e=>e.target.style.color='var(--gold)'}
              onMouseLeave={e=>e.target.style.color='var(--cream-30)'}>{l}</Link>
          ))}
        </div>
        <p style={{ fontFamily:'var(--body)', fontSize:12, color:'rgba(240,232,213,0.2)', letterSpacing:1 }}>© 2025 Noor · Hackathon Build</p>
      </footer>
    </div>
  )
}

/* ── Islamic Geometric Star ── */
function StarSVG() {
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ overflow:'visible' }}>
      <defs>
        <radialGradient id="sg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(201,151,43,0.12)"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="110" fill="url(#sg)"/>
      {/* Orbit rings */}
      <circle cx="100" cy="100" r="94" fill="none" stroke="rgba(201,151,43,0.05)" strokeWidth="1" strokeDasharray="3 9"/>
      <circle cx="100" cy="100" r="76" fill="none" stroke="rgba(201,151,43,0.07)" strokeWidth="1" strokeDasharray="6 6"/>
      {/* Outer star — slow CW */}
      <g style={{ animation:'rotateCW 80s linear infinite', transformOrigin:'100px 100px' }}>
        <polygon points={STAR} fill="none" stroke="rgba(201,151,43,0.18)" strokeWidth="0.8"/>
      </g>
      {/* Mid star — CCW */}
      <g style={{ animation:'rotateCCW 55s linear infinite', transformOrigin:'100px 100px' }}>
        <polygon points={STAR} transform="scale(0.65) translate(35,35)" fill="none" stroke="rgba(201,151,43,0.28)" strokeWidth="1"/>
      </g>
      {/* Inner star — CW faster */}
      <g style={{ animation:'rotateCW 30s linear infinite', transformOrigin:'100px 100px' }}>
        <polygon points={STAR} transform="scale(0.38) translate(62,62)" fill="rgba(201,151,43,0.06)" stroke="rgba(201,151,43,0.55)" strokeWidth="1.4"/>
      </g>
      {/* Floating core */}
      <g style={{ animation:'floatY 7s ease-in-out infinite', transformOrigin:'100px 100px' }}>
        <circle cx="100" cy="100" r="20" fill="rgba(201,151,43,0.07)" stroke="rgba(201,151,43,0.35)" strokeWidth="1"/>
        <circle cx="100" cy="100" r="5"  fill="rgba(201,151,43,0.75)"/>
        <circle cx="100" cy="100" r="10" fill="none" stroke="rgba(201,151,43,0.2)" strokeWidth="0.5"/>
      </g>
    </svg>
  )
}

/* ── Logo mark ── */
function LogoMark({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" style={{ flexShrink:0 }}>
      <defs>
        <radialGradient id="lbg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1A6B4A"/>
          <stop offset="100%" stopColor="#0A3D2E"/>
        </radialGradient>
      </defs>
      <circle cx="40" cy="40" r="38" fill="url(#lbg)" stroke="rgba(201,151,43,0.35)" strokeWidth="1"/>
      <circle cx="40" cy="34" r="18" fill="#C9972B"/>
      <circle cx="47" cy="29" r="14" fill="#0A3D2E"/>
      <polygon points="40,12 41.8,18.5 48.5,18.5 43,22 44.8,28.5 40,25 35.2,28.5 37,22 31.5,18.5 38.2,18.5" fill="#C9972B"/>
      <text x="40" y="60" fontFamily="Georgia,serif" fontSize="11" fontWeight="bold" fill="#C9972B" textAnchor="middle" letterSpacing="3">NOOR</text>
    </svg>
  )
}
