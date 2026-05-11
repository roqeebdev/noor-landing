import InnerPage from '../InnerPage'

export const metadata = { title: 'Terms of Service — Noor' }

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    body: 'By downloading, installing, or using Noor, you confirm that you are at least 13 years of age and agree to be bound by these Terms of Service. If you are using the Service on behalf of an organisation, you represent that you have the authority to bind that organisation to these Terms.',
  },
  {
    title: '2. Description of Service',
    body: 'Noor is a Quran companion application that provides access to Quran text, translations, audio recitation, and personalised features including bookmarks, collections, reading progress tracking, daily goals, and streaks. The Service is powered by the Quran Foundation Content, Search, and User APIs.',
  },
  {
    title: '3. User Accounts & OAuth2',
    body: 'Core reading and listening features are available without an account. Personalised features — bookmarks, collections, reading progress, goals, and streaks — require signing in via OAuth2 through the Quran Foundation identity provider. You are responsible for maintaining the security of your account credentials. We use Authorization Code flow with PKCE; your password is never shared with or stored by Noor.',
  },
  {
    title: '4. Acceptable Use',
    body: 'You agree not to: use the Service for any unlawful purpose or in violation of these Terms; attempt to reverse-engineer, decompile, or disassemble the application; interfere with or disrupt the integrity or performance of the Service or its underlying APIs; misuse, alter, or present Quranic content in any manner that is disrespectful, misleading, or harmful; or attempt to access the Service through any automated means not authorised by Noor.',
  },
  {
    title: '5. Intellectual Property',
    body: 'Quran text, translations, audio recitations, and related content are provided via the Quran Foundation APIs and remain the intellectual property of their respective rights holders. The Noor application, its branding, design, and any original content are owned by Noor and protected by applicable intellectual property laws.',
  },
  {
    title: '6. Third-Party APIs & Services',
    body: 'Noor integrates with Quran Foundation APIs. Your use of the Service is also subject to the Quran Foundation Developer Terms of Service (api-docs.quran.foundation/legal/developer-terms/) and Privacy Policy. We are not responsible for the availability or conduct of third-party services.',
  },
  {
    title: '7. Disclaimer of Warranties',
    body: 'The Service is provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. We do not warrant that the Service will be uninterrupted, error-free, or free of harmful components.',
  },
  {
    title: '8. Limitation of Liability',
    body: 'To the fullest extent permitted by applicable law, Noor and its developers shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from or related to your use of the Service.',
  },
  {
    title: '9. Changes to Terms',
    body: 'We reserve the right to modify these Terms at any time. We will provide reasonable notice of material changes by updating the date at the top of this page. Your continued use of the Service after changes constitutes acceptance of the revised Terms.',
  },
  {
    title: '10. Governing Law',
    body: 'These Terms shall be governed by and construed in accordance with applicable law, without regard to conflict of law provisions.',
  },
  {
    title: '11. Contact',
    body: 'Questions about these Terms? Contact us at hello@noor-app.com.',
  },
]

export default function Terms() {
  return (
    <InnerPage
      title="Terms of Service"
      label="Legal"
      intro="Please read these Terms carefully before using Noor. By accessing or using our application and website, you agree to be bound by the terms described below."
      sections={SECTIONS}
      footerLinks={[['Home', '/'], ['Privacy Policy', '/privacy-policy']]}
    />
  )
}
