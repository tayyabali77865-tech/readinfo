import Head from 'next/head';
import Link from 'next/link';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://readinfo-mu.vercel.app';

const PAGE_TITLE = 'About ReadInfo – Pakistan\'s Leading News Portal';
const PAGE_DESC =
  'ReadInfo is Pakistan\'s top digital news portal. We deliver breaking news, government schemes, BISP updates, jobs, scholarships, and exam results — all in one place. Learn about our mission and team.';
const CANONICAL_URL = `${SITE_URL}/about`;

export default function AboutPage() {
  const schemaAbout = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: PAGE_TITLE,
    description: PAGE_DESC,
    url: CANONICAL_URL,
    inLanguage: 'en-PK',
    isPartOf: { '@type': 'WebSite', name: 'ReadInfo', url: SITE_URL },
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: 'ReadInfo',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'admin@readinfo.org.pk',
        contactType: 'customer support',
        availableLanguage: ['English', 'Urdu'],
        areaServed: 'PK',
      },
      sameAs: ['https://readinfo.org.pk', 'https://readinfos.com'],
    },
  };

  const schemaBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'About Us', item: CANONICAL_URL },
    ],
  };

  return (
    <>
      <Head>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESC} />
        <meta
          name="keywords"
          content="about readinfo, readinfo pakistan, readinfo news portal, pakistan news website, readinfo team, readinfo contact"
        />
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaAbout) }}
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
            <span>About Us</span>
          </nav>

          <h1 style={{ fontSize: '32px', marginBottom: '24px', color: 'var(--text-primary)' }}>
            About ReadInfo
          </h1>

          <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.8' }}>
            <strong>ReadInfo</strong> is Pakistan&apos;s leading digital news portal, delivering
            accurate, timely, and trusted information to millions of readers every day. We are
            committed to keeping Pakistanis informed about the news and updates that matter most
            to their lives.
          </p>

          <h2 style={{ fontSize: '22px', margin: '32px 0 16px', color: 'var(--text-primary)' }}>
            Our Mission
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.8' }}>
            Our mission is to provide free, reliable, and up-to-date information covering breaking
            news, government schemes, BISP &amp; Ehsaas program updates, public sector jobs,
            scholarships, and exam results — all in one accessible platform. We believe every
            Pakistani deserves access to timely and accurate information.
          </p>

          <h2 style={{ fontSize: '22px', margin: '32px 0 16px', color: 'var(--text-primary)' }}>
            What We Cover
          </h2>
          <ul
            style={{
              color: 'var(--text-secondary)',
              lineHeight: '2',
              paddingLeft: '20px',
              marginBottom: '20px',
            }}
          >
            <li>🔴 <strong>Breaking News</strong> — Pakistan &amp; International</li>
            <li>💼 <strong>Government Jobs</strong> — Federal, Provincial &amp; Military</li>
            <li>🎓 <strong>Scholarships</strong> — Local &amp; International (Fully Funded)</li>
            <li>📋 <strong>Exam Results</strong> — Matric, Inter, FBISE, Board Results</li>
            <li>🏛️ <strong>Government Schemes</strong> — BISP, Ehsaas, Punjab &amp; KPK Schemes</li>
            <li>🌟 <strong>Celebrity &amp; Entertainment News</strong></li>
            <li>🌍 <strong>USA News</strong> — For Pakistani community abroad</li>
          </ul>

          <h2 style={{ fontSize: '22px', margin: '32px 0 16px', color: 'var(--text-primary)' }}>
            Contact Us
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.8' }}>
            Have a news tip, partnership inquiry, or advertising question? We&apos;d love to hear
            from you.
          </p>
          <div
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              padding: '24px',
              borderRadius: '12px',
            }}
          >
            <p style={{ marginBottom: '8px' }}>
              📧 <strong>Email:</strong>{' '}
              <a href="mailto:admin@readinfo.org.pk" style={{ color: 'var(--accent)' }}>
                admin@readinfo.org.pk
              </a>
            </p>
            <p style={{ marginBottom: '8px' }}>
              🌐 <strong>Main Website:</strong>{' '}
              <a
                href="https://readinfo.org.pk"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--accent)' }}
              >
                readinfo.org.pk
              </a>
            </p>
            <p>
              🌐 <strong>Partner Site:</strong>{' '}
              <a
                href="https://readinfos.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--accent)' }}
              >
                readinfos.com
              </a>
            </p>
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
