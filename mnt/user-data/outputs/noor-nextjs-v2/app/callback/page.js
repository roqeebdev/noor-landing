'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const s = {
  page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 },
  card: { textAlign: 'center', padding: '72px 52px', border: '1px solid rgba(201,151,43,0.18)', background: 'linear-gradient(135deg, rgba(15,42,30,0.7), rgba(10,28,21,0.6))', maxWidth: 460, width: '100%' },
  h1: { fontFamily: "'Palatino Linotype', Georgia, serif", fontSize: 30, fontWeight: 700, color: '#F0E8D5', margin: '24px 0 12px' },
  p: { fontFamily: 'system-ui, sans-serif', fontSize: 14, color: 'rgba(240,232,213,0.55)', lineHeight: 1.72, fontWeight: 300, marginBottom: 32 },
  tag: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 24px', background: 'rgba(201,151,43,0.08)', border: '1px solid rgba(201,151,43,0.2)' },
  tagText: { fontFamily: "'Palatino Linotype', Georgia, serif", fontSize: 10, letterSpacing: 3, textTransform: 'uppercase' },
  back: { fontFamily: "'Palatino Linotype', Georgia, serif", fontSize: 9.5, letterSpacing: 3, color: 'rgba(201,151,43,0.45)', textDecoration: 'none', textTransform: 'uppercase', marginTop: 28, display: 'inline-block' },
  err: { fontSize: 13, color: '#f87171', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', padding: '12px 16px', marginBottom: 24, lineHeight: 1.6, fontFamily: 'monospace' },
}

export default function Callback() {
  const [st, setSt] = useState('loading')
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    const p = new URLSearchParams(window.location.search)
    const err = p.get('error')
    if (err) { setSt('error'); setErrMsg(p.get('error_description') || err) }
    else if (p.get('code')) setSt('success')
    else setSt('loading')
  }, [])

  const ring = { loading: '#C9972B', success: '#4ade80', error: '#f87171' }[st]
  const labels = { loading: 'Processing', success: 'Authenticated', error: 'Error' }

  return (
    <div style={s.page}>
      <div style={s.card}>
        {/* Animated ring */}
        <div style={{ width: 72, height: 72, margin: '0 auto', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 72 72" width="72" height="72" style={{ position: 'absolute', animation: st === 'loading' ? 'rotateCW 3s linear infinite' : 'none' }}>
            <circle cx="36" cy="36" r="33" fill="none" stroke={ring} strokeWidth="1" strokeDasharray="6 10" opacity="0.5"/>
          </svg>
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: ring, animation: st === 'loading' ? 'glowPulse 1.2s ease-in-out infinite' : 'none' }}/>
        </div>

        <h1 style={s.h1}>{st === 'loading' ? 'Authenticating…' : st === 'success' ? 'Success!' : 'Failed'}</h1>
        <p style={s.p}>
          {st === 'loading' && 'Verifying your identity via the Quran Foundation OAuth2 provider. Please wait.'}
          {st === 'success' && 'Authentication complete. Your session is ready — you may return to the app.'}
          {st === 'error' && 'Something went wrong during sign-in. Please try again.'}
        </p>

        {st === 'error' && errMsg && <p style={s.err}>{errMsg}</p>}

        <div style={s.tag}>
          {st === 'loading' && <span style={{ width: 6, height: 6, borderRadius: '50%', background: ring, animation: 'glowPulse 1s ease-in-out infinite' }}/>}
          <span style={{ ...s.tagText, color: ring }}>{labels[st]}</span>
        </div>

        <br/>
        <Link href="/" style={s.back}>← Return Home</Link>
      </div>
    </div>
  )
}
