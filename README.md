# Noor — Divine Light 🌙

A Flutter-powered Quran companion app built for the Quran Foundation API Hackathon 2025.

## What Noor Uses
- **Content API** — All 114 Surahs, 6,236 Ayahs, 50+ translations
- **Audio API** — Word-by-word recitation from 100+ Qaris
- **Search API** — Semantic verse search by meaning or keyword
- **User APIs** — Bookmarks, Collections, Reading Progress, Goals, Streaks
- **OAuth2 / OIDC** — Authorization Code + PKCE via Quran Foundation identity provider

## OAuth2 Scopes Used
`openid` `offline_access` `user` `bookmark` `collection` `reading_session` `preference` `goal` `streak`

## Local Dev
```bash
npm install
npm run dev
# → http://localhost:3000
```

## Deploy to Vercel
```bash
# Option A: CLI
npx vercel

# Option B: GitHub → vercel.com → Import repo → Deploy
```

## Form Fields (after deploy)

| Field                    | Value                                          |
|--------------------------|------------------------------------------------|
| App Name                 | Noor                                           |
| Client URL               | `https://your-app.vercel.app`                  |
| Redirect URI             | `https://your-app.vercel.app/callback`         |
| Logo URL                 | `https://your-app.vercel.app/logo.svg`         |
| Privacy Policy URL       | `https://your-app.vercel.app/privacy-policy`   |
| Terms of Service URL     | `https://your-app.vercel.app/terms`            |
| Post-logout Redirect URI | `https://your-app.vercel.app/logout`           |
