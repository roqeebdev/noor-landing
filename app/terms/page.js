import InnerPage from '../InnerPage'

export const metadata = {
  title: 'Terms of Service — Noor',
}

const sections = [
  { title: '1. Acceptance of Terms', body: 'By downloading or using Noor, you agree to be bound by these Terms of Service. If you do not agree, please do not use the app.' },
  { title: '2. Description of Service', body: 'Noor is a Quran companion app built on the Quran Foundation APIs. It provides access to Quran text, audio recitations, bookmarks, reading progress tracking, goals, and streaks. Noor is a hackathon build and is provided as-is.' },
  { title: '3. User Accounts', body: 'Noor uses OAuth2 / OpenID Connect via the Quran Foundation identity provider. You are responsible for maintaining the security of your Quran Foundation account. Noor is not liable for any loss resulting from unauthorised access to your account.' },
  { title: '4. Acceptable Use', body: 'You agree not to misuse Noor or the underlying Quran Foundation APIs. This includes attempting to circumvent rate limits, reverse-engineer authentication flows, or use the service in any way that violates the Quran Foundation\'s API terms of use.' },
  { title: '5. Intellectual Property', body: 'Quran text, translations, and audio content are provided by the Quran Foundation and remain their intellectual property. The Noor app code and design are © 2025 Noor. Nothing in these terms transfers ownership of any intellectual property.' },
  { title: '6. Disclaimer of Warranties', body: 'Noor is provided "as is" without warranties of any kind. We do not guarantee uninterrupted access, accuracy of content, or fitness for any particular purpose. Use of the app is at your own risk.' },
  { title: '7. Limitation of Liability', body: 'To the maximum extent permitted by law, Noor and its developers shall not be liable for any indirect, incidental, or consequential damages arising from your use of the app.' },
  { title: '8. Changes to Terms', body: 'We reserve the right to modify these terms at any time. Updated terms will be posted here with a revised date. Continued use of Noor constitutes acceptance.' },
]

export default function Terms() {
  return (
    <InnerPage
      title="Terms of Service"
      label="Legal"
      intro="Please read these Terms of Service carefully before using Noor. They govern your access to and use of the app and its features."
      sections={sections}
      footerLinks={[['Home', '/'], ['Privacy Policy', '/privacy-policy'], ['Quran Foundation', 'https://quran.foundation']]}
    />
  )
}
