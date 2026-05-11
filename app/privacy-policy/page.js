import InnerPage from '../InnerPage'

export const metadata = {
  title: 'Privacy Policy — Noor',
}

const sections = [
  { title: '1. Information We Collect', body: 'Noor collects only the information necessary to provide the service. When you sign in via OAuth2 / OpenID Connect through the Quran Foundation identity provider, we receive a user identifier and the scopes you grant (bookmarks, reading sessions, goals, streaks, and preferences). We do not collect passwords — authentication is handled entirely by the Quran Foundation.' },
  { title: '2. How We Use Your Information', body: 'Your data is used solely to power the Noor experience: syncing bookmarks and collections across devices, resuming your reading progress, tracking goals and streaks, and applying your display preferences. We do not sell, rent, or share personal data with third parties for marketing purposes.' },
  { title: '3. Data Storage & Security', body: 'Token exchange occurs on a secure backend server; access tokens and refresh tokens are never stored in the app bundle or exposed to client-side JavaScript. All communication with Quran Foundation APIs uses HTTPS. We follow industry-standard practices to protect your data.' },
  { title: '4. Third-Party Services', body: 'Noor is built on the Quran Foundation Content, Audio, and User APIs. Your use of these services is also governed by the Quran Foundation\'s own privacy policy, available at quran.foundation. We have no control over data practices at that platform.' },
  { title: '5. Your Rights', body: 'You may revoke Noor\'s access to your Quran Foundation account at any time through your account settings on quran.foundation. Upon revocation, Noor will no longer be able to read or write any user data on your behalf.' },
  { title: '6. Changes to This Policy', body: 'We may update this Privacy Policy from time to time. Changes will be posted here with an updated date. Continued use of Noor after changes constitutes acceptance of the revised policy.' },
  { title: '7. Contact', body: 'Questions about this policy? Reach out via the GitHub repository linked in the app.' },
]

export default function PrivacyPolicy() {
  return (
    <InnerPage
      title="Privacy Policy"
      label="Legal"
      intro="Noor is committed to protecting your privacy. This policy explains what information we collect, how we use it, and the choices you have."
      sections={sections}
      footerLinks={[['Home', '/'], ['Terms of Service', '/terms'], ['Quran Foundation', 'https://quran.foundation']]}
    />
  )
}
