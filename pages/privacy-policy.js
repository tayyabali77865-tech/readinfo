import Head from 'next/head';
import Link from 'next/link';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://readinfo-mu.vercel.app';

const PAGE_TITLE = 'Privacy Policy – ReadInfo Pakistan';
const PAGE_DESC =
  'ReadInfo Privacy Policy. Learn how we collect, use, and protect your personal information when you visit our news portal. Your privacy is our priority.';
const CANONICAL_URL = `${SITE_URL}/privacy-policy`;
const LAST_UPDATED = '2026-01-01';

export default function PrivacyPolicy() {
  const schemaWebPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: PAGE_TITLE,
    description: PAGE_DESC,
    url: CANONICAL_URL,
    inLanguage: 'en-PK',
    dateModified: LAST_UPDATED,
    isPartOf: { '@type': 'WebSite', name: 'ReadInfo', url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'ReadInfo',
      url: SITE_URL,
    },
  };

  const schemaBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: CANONICAL_URL },
    ],
  };

  const sectionStyle = {
    marginBottom: '32px',
  };
  const h2Style = {
    fontSize: '20px',
    marginBottom: '12px',
    color: 'var(--text-primary)',
  };
  const pStyle = {
    color: 'var(--text-secondary)',
    lineHeight: '1.8',
    marginBottom: '12px',
  };

  return (
    <>
      <Head>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESC} />
        <link rel="canonical" href={CANONICAL_URL} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="ReadInfo" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ReadInfo" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESC} />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:locale" content="en_PK" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@readinfo" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESC} />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebPage) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }}
        />
      </Head>

      <div className="container">
        <div style={{ padding: '60px 0', maxWidth: '800px', margin: '0 auto' }}>
          {/* Breadcrumb */}
          <nav className="breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: '24px' }}>
            <Link href="/">🏠 Home</Link>
            <span>›</span>
            <span>Privacy Policy</span>
          </nav>

          <h1 style={{ fontSize: '32px', marginBottom: '8px', color: 'var(--text-primary)' }}>
            Privacy Policy
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '14px' }}>
            Last Updated: January 1, 2026
          </p>

          <div style={sectionStyle}>
            <p style={pStyle}>
              Welcome to ReadInfo (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;).
              This Privacy Policy explains how we collect, use, disclose, and safeguard your
              information when you visit our website. Please read this policy carefully. If you
              disagree with its terms, please discontinue use of our site.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>1. Information We Collect</h2>
            <p style={pStyle}>
              We may collect information about you in various ways when you use our website:
            </p>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: '2', paddingLeft: '20px' }}>
              <li>
                <strong>Usage Data:</strong> Pages visited, time spent, browser type, IP address,
                and referring URLs — collected automatically via analytics tools.
              </li>
              <li>
                <strong>Cookies:</strong> Small data files stored on your device to improve user
                experience and analyze traffic.
              </li>
              <li>
                <strong>Communications:</strong> If you contact us via email, we collect your email
                address and the content of your message.
              </li>
            </ul>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>2. How We Use Your Information</h2>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: '2', paddingLeft: '20px' }}>
              <li>To operate and maintain our website</li>
              <li>To understand and analyze how our website is used</li>
              <li>To improve our content and user experience</li>
              <li>To respond to your comments or questions</li>
              <li>To display relevant advertisements (via third-party ad networks)</li>
            </ul>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>3. Third-Party Services</h2>
            <p style={pStyle}>
              We may use third-party services including Google Analytics and advertising
              networks. These services may collect information sent by your browser as part of a
              web page request. Their use of information is governed by their respective privacy
              policies.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>4. Cookies</h2>
            <p style={pStyle}>
              We use cookies to enhance your browsing experience. You can instruct your browser
              to refuse all cookies or to indicate when a cookie is being sent. However, some
              parts of the site may not function properly without cookies.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>5. Data Security</h2>
            <p style={pStyle}>
              We take reasonable measures to protect your information. However, no method of
              transmission over the Internet is 100% secure, and we cannot guarantee absolute
              security.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>6. Children&apos;s Privacy</h2>
            <p style={pStyle}>
              Our website is not directed to children under 13. We do not knowingly collect
              personal information from children under 13. If you are a parent and believe your
              child has provided us with personal information, please contact us immediately.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>7. Changes to This Policy</h2>
            <p style={pStyle}>
              We may update this Privacy Policy from time to time. We will notify you of any
              changes by posting the new policy on this page with a new &ldquo;Last Updated&rdquo;
              date.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>8. Contact Us</h2>
            <p style={pStyle}>
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <div
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                padding: '20px',
                borderRadius: '12px',
              }}
            >
              <p style={{ marginBottom: '8px', color: 'var(--text-secondary)' }}>
                📧{' '}
                <a href="mailto:admin@readinfo.org.pk" style={{ color: 'var(--accent)' }}>
                  admin@readinfo.org.pk
                </a>
              </p>
              <p style={{ color: 'var(--text-secondary)' }}>
                🌐 <strong>ReadInfo</strong> — Pakistan&apos;s News Portal
              </p>
            </div>
          </div>

          <div style={{ marginTop: '40px' }}>
            <Link href="/" className="featured-cta" style={{ display: 'inline-flex' }}>
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
