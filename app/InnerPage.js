import Link from 'next/link'

/* Self-contained styles — no dependency on font CSS variables */
const S = {
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
    height: 68, padding: '0 56px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    background: 'rgba(5,16,12,0.92)',
    backdropFilter: 'blur(20px) saturate(1.5)',
    borderBottom: '1px solid rgba(201,151,43,0.12)',
  },
  logoText: {
    fontSize: 17, fontWeight: 700, letterSpacing: 6, color: '#C9972B',
    fontFamily: "'Palatino Linotype', Georgia, serif",
  },
  main: {
    minHeight: '100vh', padding: '140px 56px 100px',
    maxWidth: 820, margin: '0 auto',
  },
  eyebrow: {
    fontFamily: "'Palatino Linotype', Georgia, serif",
    fontSize: 10, letterSpacing: 4, color: '#C9972B',
    textTransform: 'uppercase', marginBottom: 16,
    display: 'flex', alignItems: 'center', gap: 12,
  },
  h1: {
    fontFamily: "'Palatino Linotype', Georgia, serif",
    fontSize: 54, fontWeight: 700, color: '#F0E8D5',
    lineHeight: 1.05, marginBottom: 10,
  },
  updated: {
    fontFamily: 'system-ui, sans-serif',
    fontSize: 13, color: 'rgba(240,232,213,0.35)',
    letterSpacing: 1, marginBottom: 56,
  },
  intro: {
    fontFamily: 'system-ui, sans-serif',
    fontSize: 16, lineHeight: 1.8, color: 'rgba(240,232,213,0.65)',
    fontWeight: 300, marginBottom: 52,
  },
  divider: {
    height: 1, marginBottom: 52,
    background: 'linear-gradient(90deg, #C9972B 0%, rgba(201,151,43,0.3) 50%, transparent 100%)',
  },
  h2: {
    fontFamily: "'Palatino Linotype', Georgia, serif",
    fontSize: 20, fontWeight: 600, color: '#C9972B',
    marginBottom: 14, marginTop: 44,
  },
  p: {
    fontFamily: 'system-ui, sans-serif',
    fontSize: 15, lineHeight: 1.82, color: 'rgba(240,232,213,0.65)',
    fontWeight: 300, marginBottom: 0,
  },
  footer: {
    borderTop: '1px solid rgba(201,151,43,0.1)',
    padding: '36px 56px', textAlign: 'center',
  },
  footerLink: {
    fontFamily: "'Palatino Linotype', Georgia, serif",
    fontSize: 9.5, letterSpacing: 3, textTransform: 'uppercase',
    color: 'rgba(201,151,43,0.55)', textDecoration: 'none', margin: '0 16px',
  },
}

export default function InnerPage({ title, label, intro, sections, footerLinks }) {
  return (
    <>
      <nav style={S.nav}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
          <svg width="30" height="30" viewBox="0 0 80 80">
            <defs>
              <radialGradient id="igbg" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1A6B4A"/>
                <stop offset="100%" stopColor="#0A3D2E"/>
              </radialGradient>
            </defs>
            <circle cx="40" cy="40" r="38" fill="url(#igbg)" stroke="rgba(201,151,43,0.35)" strokeWidth="1"/>
            <circle cx="40" cy="34" r="18" fill="#C9972B"/>
            <circle cx="47" cy="29" r="14" fill="#0A3D2E"/>
            <polygon points="40,12 41.8,18.5 48.5,18.5 43,22 44.8,28.5 40,25 35.2,28.5 37,22 31.5,18.5 38.2,18.5" fill="#C9972B"/>
          </svg>
          <span style={S.logoText}>NOOR</span>
        </Link>
        <Link href="/" style={{ fontFamily: "'Palatino Linotype', Georgia, serif", fontSize: 9.5, letterSpacing: 3, color: 'rgba(240,232,213,0.5)', textDecoration: 'none', textTransform: 'uppercase' }}>
          ← Back Home
        </Link>
      </nav>

      <main style={S.main}>
        <p style={S.eyebrow}>
          <span style={{ width: 24, height: 1, background: '#C9972B', display: 'inline-block', flexShrink: 0 }}/>
          {label}
        </p>
        <h1 style={S.h1}>{title}</h1>
        <p style={S.updated}>Last updated: May 2025</p>

        <p style={S.intro}>{intro}</p>
        <div style={S.divider}/>

        {sections.map((s, i) => (
          <div key={i} style={{ marginBottom: 36 }}>
            <h2 style={S.h2}>{s.title}</h2>
            <p style={S.p}>{s.body}</p>
          </div>
        ))}
      </main>

      <footer style={S.footer}>
        {footerLinks.map(([label, href]) => (
          <Link key={label} href={href} style={S.footerLink}>{label}</Link>
        ))}
      </footer>
    </>
  )
}
