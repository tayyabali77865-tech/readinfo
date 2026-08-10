import Head from 'next/head';
import Link from 'next/link';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://readinfo-mu.vercel.app';

const PAGE_TITLE = 'Advertise With Us – Buy Ad Space on ReadInfo Pakistan';
const PAGE_DESCRIPTION =
  "Reach millions of Pakistani readers every month. Buy premium advertising space on ReadInfo — Pakistan's leading news portal. Header banners, sidebar ads, and in-article placements available at competitive rates.";
const CANONICAL_URL = `${SITE_URL}/buy-adspace`;

export default function BuyAdspace() {
  const schemaWebPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: CANONICAL_URL,
    inLanguage: 'en-PK',
    isPartOf: { '@type': 'WebSite', name: 'ReadInfo', url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'ReadInfo',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
  };

  const schemaBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Advertise With Us', item: CANONICAL_URL },
    ],
  };

  return (
    <>
      <Head>
        {/* Primary SEO */}
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <meta
          name="keywords"
          content="advertise readinfo, buy ad space pakistan, news portal advertising, digital advertising pakistan, readinfo ads, banner ads pakistan, sponsored content pakistan"
        />
        <link rel="canonical" href={CANONICAL_URL} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="ReadInfo" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ReadInfo" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:locale" content="en_PK" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@readinfo" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />

        {/* JSON-LD Schemas */}
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
            <span>Advertise With Us</span>
          </nav>

          <h1 style={{ fontSize: '32px', marginBottom: '24px', color: 'var(--text-primary)' }}>
            Advertise With Us
          </h1>

          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.8' }}>
            ReadInfo is Pakistan&apos;s leading digital news portal — covering breaking news,
            government schemes, jobs, scholarships, and exam results. Place your brand in front of
            a highly engaged, daily-active Pakistani audience.
          </p>

          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.8' }}>
            Our platform supports standard display advertising formats including header banners,
            sidebar placements, and responsive in-article units. We offer monthly and campaign-based
            packages suitable for all business sizes.
          </p>

          <div
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              padding: '24px',
              borderRadius: '12px',
            }}
          >
            <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Available Ad Slots</h2>
            <ul style={{ lineHeight: '2', color: 'var(--text-secondary)' }}>
              <li>
                <strong>Header Banner</strong> (728×90 px) — Maximum visibility, above-the-fold
              </li>
              <li>
                <strong>Sidebar Rectangle</strong> (300×250 px) — Targeted placement on all pages
              </li>
              <li>
                <strong>In-Article Banner</strong> (Responsive) — High engagement within content
              </li>
            </ul>

            <div
              style={{
                marginTop: '24px',
                paddingTop: '20px',
                borderTop: '1px solid var(--border)',
              }}
            >
              <p style={{ fontWeight: '600', marginBottom: '8px' }}>
                📧 Contact us to get started:
              </p>
              <a
                href="mailto:admin@readinfo.org.pk"
                style={{
                  color: 'var(--accent)',
                  fontSize: '18px',
                  fontWeight: '600',
                  textDecoration: 'none',
                }}
              >
                admin@readinfo.org.pk
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
