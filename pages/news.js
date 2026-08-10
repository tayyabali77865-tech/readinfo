import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { getPostsByCategory } from '../lib/api';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://readinfo-mu.vercel.app';

// Per-category SEO metadata map
const CATEGORY_META = {
  celebrity: {
    title: 'Celebrity News Pakistan – ReadInfo | Latest Entertainment & Showbiz Updates',
    description:
      'Get the latest celebrity and showbiz news from Pakistan and around the world. Bollywood, Lollywood, TV drama stars, and entertainment updates — all on ReadInfo.',
    keywords:
      'celebrity news pakistan, lollywood news, bollywood news, entertainment pakistan, showbiz pakistan, readinfo celebrity, actress news, actor news pakistan',
  },
  crime: {
    title: 'Crime News Pakistan – ReadInfo | Latest Crime Reports & Breaking Updates',
    description:
      'Stay informed with the latest crime news from Pakistan. Breaking crime reports, police investigations, and public safety updates — updated daily on ReadInfo.',
    keywords:
      'crime news pakistan, crime reports pakistan, breaking crime news, police news pakistan, readinfo crime, latest crime updates',
  },
  trending: {
    title: 'Trending News Pakistan – ReadInfo | What\'s Viral & Hot Today',
    description:
      'Discover what\'s trending in Pakistan today. Viral news stories, social media trends, and top stories of the day — all curated and updated daily on ReadInfo.',
    keywords:
      'trending news pakistan, viral news pakistan, trending today pakistan, what is trending pakistan, readinfo trending, hot news today',
  },
  insurance: {
    title: 'Insurance News Pakistan – ReadInfo | Policies, Plans & Latest Schemes',
    description:
      'Latest insurance news, government health policies, and insurance schemes in Pakistan. Life, health, and vehicle insurance updates — all on ReadInfo.',
    keywords:
      'insurance pakistan, insurance news, health insurance pakistan, life insurance pakistan, vehicle insurance, readinfo insurance, Sehat card pakistan',
  },
  usa: {
    title: 'USA News in Urdu & English – ReadInfo | America Updates for Pakistanis',
    description:
      'Latest USA news for Pakistanis. American politics, US visa updates, green card news, Dollar rate, and more — in Urdu and English on ReadInfo.',
    keywords:
      'usa news urdu, america news pakistan, usa visa news, american news today, green card pakistan, dollar rate, readinfo usa, us news in urdu',
  },
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-PK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function CategoryNews({ posts, category }) {
  const slug = (category || '').toLowerCase();
  const meta = CATEGORY_META[slug] || {
    title: `${(category || 'Latest').charAt(0).toUpperCase() + (category || 'Latest').slice(1)} News – ReadInfo PK`,
    description: `Read the latest ${category || ''} news and articles on ReadInfo, Pakistan's leading news portal. Updated daily.`,
    keywords: `${category} news pakistan, readinfo ${category}, latest ${category} updates, pakistan news`,
  };

  const titleCategory = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : 'Latest';
  const canonicalUrl = `${SITE_URL}/news${category ? `?category=${encodeURIComponent(category)}` : ''}`;
  const featuredPost = posts?.[0];

  const schemaCollectionPage = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: meta.title,
    description: meta.description,
    url: canonicalUrl,
    inLanguage: 'en-PK',
    isPartOf: { '@type': 'WebSite', name: 'ReadInfo', url: SITE_URL },
    about: { '@type': 'Thing', name: `${titleCategory} News Pakistan` },
    publisher: {
      '@type': 'Organization',
      name: 'ReadInfo',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
  };

  const schemaBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: `${titleCategory} News`, item: canonicalUrl },
    ],
  };

  return (
    <>
      <Head>
        {/* Primary SEO */}
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="author" content="ReadInfo" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ReadInfo" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:locale" content="en_PK" />
        {featuredPost?.imageUrl && (
          <meta property="og:image" content={featuredPost.imageUrl} />
        )}
        {featuredPost?.imageUrl && (
          <meta property="og:image:width" content="1200" />
        )}
        {featuredPost?.imageUrl && (
          <meta property="og:image:height" content="628" />
        )}
        {featuredPost?.imageUrl && (
          <meta property="og:image:alt" content={`${titleCategory} News – ReadInfo`} />
        )}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@readinfo" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        {featuredPost?.imageUrl && (
          <meta name="twitter:image" content={featuredPost.imageUrl} />
        )}

        {/* JSON-LD: CollectionPage Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaCollectionPage) }}
        />
        {/* JSON-LD: BreadcrumbList */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }}
        />
      </Head>

      <div className="container" style={{ padding: '40px 0' }}>
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: '24px' }}>
          <Link href="/">🏠 Home</Link>
          <span>›</span>
          <span>{titleCategory} News</span>
        </nav>

        <h1 style={{ fontSize: '32px', marginBottom: '32px', textTransform: 'capitalize' }}>
          {titleCategory} News
        </h1>

        {posts && posts.length > 0 ? (
          <div className="news-grid">
            {posts.map((post) => (
              <Link key={post.id} href={`/news/${post.slug}`} className="news-card">
                <div className="card-image-wrap">
                  {post.imageUrl ? (
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      style={{ objectFit: 'contain', backgroundColor: '#f8fafc' }}
                      className="card-image"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="card-image-placeholder">📰</div>
                  )}
                </div>
                <div className="card-body">
                  <h3 className="card-title">{post.title}</h3>
                  {post.excerpt && <p className="card-excerpt">{post.excerpt}</p>}
                  <div className="card-footer">
                    <span className="card-date">📅 {formatDate(post.date)}</span>
                    <span className="read-more">Read more →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">😕</div>
            <h2>No articles found</h2>
            <p>We couldn&apos;t find any articles in the &ldquo;{titleCategory}&rdquo; category at this time.</p>
            <br />
            <Link href="/" className="featured-cta" style={{ display: 'inline-flex' }}>
              ← Back to Home
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { category = '' } = context.query;
  const posts = await getPostsByCategory(category.toLowerCase(), 12);
  return {
    props: {
      posts,
      category,
    },
  };
}
