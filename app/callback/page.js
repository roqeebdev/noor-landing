'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function CallbackPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    if (error) {
      // Deep link error back to app
      window.location.href = `com.noor.app://auth/callback?error=${error}`;
      return;
    }

    if (code) {
      // Deep link the code + state back to the Flutter app
      const params = new URLSearchParams({ code, ...(state && { state }) });
      window.location.href = `com.noor.app://auth/callback?${params.toString()}`;
    }
  }, [searchParams]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'sans-serif',
      background: '#0f0f0f',
      color: '#fff',
    }}>
      <p>Completing sign in, please wait...</p>
    </div>
  );
}
