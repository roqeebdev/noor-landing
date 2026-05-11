import InnerPage from '../InnerPage'

export const metadata = { title: 'Privacy Policy — Noor' }

const SECTIONS = [
  {
    title: '1. Information We Collect',
    body: 'We collect information you provide when signing in via OAuth2 — including your email address and display name from the Quran Foundation identity provider. Within the app we collect bookmarks, personal collections, notes, reading session progress, goals, and streak data that you create. We also collect anonymised, aggregated analytics to understand how features are used and improve performance.',
  },
  {
    title: '2. How We Use Your Information',
    body: 'We use your information to deliver and improve the Noor experience: syncing your bookmarks, collections, and reading progress across devices; personalising your goals and streak tracking; communicating with you about app updates or support; and complying with our legal obligations. We do not use your data for advertising.',
  },
  {
    title: '3. Quran Foundation API Data',
    body: 'Noor serves Quran text, translations, and audio recitations via the Quran Foundation Content, Search, and User APIs. We do not store Quran Foundation API content on our own infrastructure — all content is fetched at runtime and used in accordance with the Quran Foundation Developer Terms of Service (api-docs.quran.foundation/legal/developer-terms/).',
  },
  {
    title: '4. OAuth2 Authentication & User Scopes',
    body: 'If you choose to sign in, we use OAuth2 Authorization Code flow with PKCE and OpenID Connect via the Quran Foundation hosted identity provider. We request only the scopes our features require: openid, offline_access, user, bookmark, collection, reading_session, preference, goal, and streak. Client secrets are stored exclusively on our backend — never in the mobile app. We never receive or store your password.',
  },
  {
    title: '5. Data Sharing',
    body: 'We do not sell, rent, or share your personal data with third parties for commercial purposes. We may share data with service providers who assist us in operating the app, under strict confidentiality agreements, or as required by applicable law.',
  },
  {
    title: '6. Data Retention & Deletion',
    body: 'We retain your data for as long as your account is active or as needed to provide the Service. You may request deletion of your data at any time by contacting us at hello@noor-app.com. Upon request, we will delete all personal data within 30 days.',
  },
  {
    title: "7. Children's Privacy",
    body: 'Noor is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have done so, we will delete that information promptly.',
  },
  {
    title: '8. Changes to This Policy',
    body: 'We may update this Privacy Policy from time to time. We will notify you of material changes by updating the date at the top of this page and, where appropriate, via in-app notification. Continued use of the Service after any changes constitutes acceptance of the updated policy.',
  },
  {
    title: '9. Contact Us',
    body: 'If you have questions about this Privacy Policy or how we handle your data, please email hello@noor-app.com.',
  },
]

export default function PrivacyPolicy() {
  return (
    <InnerPage
      title="Privacy Policy"
      label="Legal"
      intro="This Privacy Policy describes how Noor collects, uses, and protects information about you when you use our mobile application and website. We are committed to handling your data with care and transparency."
      sections={SECTIONS}
      footerLinks={[['Home', '/'], ['Terms of Service', '/terms']]}
    />
  )
}
