import Link from 'next/link'

export const metadata = { title: 'Signed Out — Noor' }

export default function Logout() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ textAlign: 'center', padding: '72px 52px', border: '1px solid rgba(201,151,43,0.18)', background: 'linear-gradient(135deg, rgba(15,42,30,0.7), rgba(10,28,21,0.6))', maxWidth: 440, width: '100%' }}>
        <p style={{ fontFamily: "'Scheherazade New','Amiri',serif", fontSize: 52, color: 'rgba(201,151,43,0.45)', marginBottom: 24 }}>نور</p>
        <h1 style={{ fontFamily: "'Palatino Linotype', Georgia, serif", fontSize: 30, fontWeight: 700, color: '#F0E8D5', marginBottom: 12 }}>
          Signed Out
        </h1>
        <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: 14, color: 'rgba(240,232,213,0.55)', lineHeight: 1.72, fontWeight: 300, marginBottom: 10 }}>
          JazakAllahu Khairan for using Noor.
        </p>
        <p style={{ fontFamily: "'Scheherazade New','Amiri',serif", fontSize: 22, color: 'rgba(201,151,43,0.55)', direction: 'rtl', marginBottom: 44 }}>
          جَزَاكَ اللَّهُ خَيْرًا
        </p>
        <Link href="/" style={{
          display: 'inline-block', padding: '14px 40px',
          background: 'rgba(201,151,43,0.08)', border: '1px solid rgba(201,151,43,0.28)',
          fontFamily: "'Palatino Linotype', Georgia, serif", fontSize: 10, letterSpacing: 3,
          color: '#C9972B', textDecoration: 'none', textTransform: 'uppercase',
        }}>Return Home</Link>
      </div>
    </main>
  )
}
