import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { getAllSlugs, getPostBySlug, getLatestPosts } from '../../lib/api';

const SITE_NAME = 'ReadInfo';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://readinfo-mu.vercel.app';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-PK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatDateISO(dateStr) {
  return new Date(dateStr).toISOString();
}

export default function ArticlePage({ post, related }) {
  const [copied, setCopied] = useState(false);

  if (!post) {
    return (
      <>
        <Head><title>Article Not Found – {SITE_NAME}</title></Head>
        <div className="container">
          <div className="empty-state">
            <div className="empty-state-icon">😕</div>
            <h2>Article not found</h2>
            <p>This article may have been removed.</p>
            <br />
            <Link href="/" className="featured-cta" style={{ display: 'inline-flex' }}>
              ← Back to Home
            </Link>
          </div>
        </div>
      </>
    );
  }

  const canonicalUrl = `${SITE_URL}/news/${post.slug}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(canonicalUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareWhatsApp = `https://wa.me/?text=${encodeURIComponent(post.title + ' ' + canonicalUrl)}`;
  const shareTwitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(canonicalUrl)}`;
  const shareFacebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`;

  const schemaArticle = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: post.excerpt,
    image: post.imageUrl ? [post.imageUrl] : undefined,
    datePublished: formatDateISO(post.date),
    dateModified: post.modified ? formatDateISO(post.modified) : formatDateISO(post.date),
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    url: canonicalUrl,
  };

  return (
    <>
      <Head>
        {/* Primary SEO */}
        <title>{`${post.title} – ReadInfo | Pakistan News, Jobs & Results`}</title>
        <meta name="description" content={post.excerpt ? `${post.excerpt.slice(0, 155)}...` : `${post.title} – Read full article on ReadInfo, Pakistan's top news source.`} />
        <meta name="keywords" content={`${post.title}, readinfo, readinfos, pakistan news, ${post.categories?.join(', ')}, breaking news pakistan, latest updates`} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <meta name="author" content="ReadInfo" />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="ReadInfo" />
        <meta property="og:title" content={`${post.title} – ReadInfo`} />
        <meta property="og:description" content={post.excerpt || post.title} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:locale" content="en_PK" />
        {post.imageUrl && <meta property="og:image" content={post.imageUrl} />}
        {post.imageUrl && <meta property="og:image:width" content="1200" />}
        {post.imageUrl && <meta property="og:image:height" content="628" />}
        <meta property="article:published_time" content={formatDateISO(post.date)} />
        {post.modified && <meta property="article:modified_time" content={formatDateISO(post.modified)} />}
        <meta property="article:publisher" content={SITE_URL} />
        {post.categories?.map((cat) => (
          <meta key={cat} property="article:section" content={cat} />
        ))}
        {post.categories?.map((cat) => (
          <meta key={`tag-${cat}`} property="article:tag" content={cat} />
        ))}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@readinfo" />
        <meta name="twitter:title" content={`${post.title} – ReadInfo`} />
        <meta name="twitter:description" content={post.excerpt || post.title} />
        {post.imageUrl && <meta name="twitter:image" content={post.imageUrl} />}

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaArticle) }}
        />

        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
                { '@type': 'ListItem', position: 2, name: post.categories?.[0] || 'News', item: `${SITE_URL}/news` },
                { '@type': 'ListItem', position: 3, name: post.title, item: canonicalUrl },
              ],
            }),
          }}
        />
      </Head>

      <main>
        <div className="container">
          {/* Breadcrumb */}
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">🏠 Home</Link>
            <span>›</span>
            {post.categories?.[0] && (
              <>
                <span>{post.categories[0]}</span>
                <span>›</span>
              </>
            )}
            <span>{post.title.slice(0, 50)}{post.title.length > 50 ? '...' : ''}</span>
          </nav>

          <div className="article-layout">
            {/* Main Article */}
            <article>
              <header className="article-header">

                <h1 className="article-title">{post.title}</h1>

                <div className="article-meta">
                  <div className="meta-item">📅 <time dateTime={formatDateISO(post.date)}>{formatDate(post.date)}</time></div>
                  {post.modified && post.modified !== post.date && (
                    <div className="meta-item">🔄 Updated: {formatDate(post.modified)}</div>
                  )}
                  <div className="meta-item">📰 {SITE_NAME}</div>
                </div>
              </header>

              {/* Featured Image */}
              {post.imageUrl && (
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  width={1200}
                  height={630}
                  className="article-featured-image"
                  priority
                  style={{ objectFit: 'cover' }}
                />
              )}

              {/* Article Content */}
              <div
                className="article-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Source Attribution */}
              <div className="source-box">
                <span>🔗</span>
                <span>
                  Original source:{' '}
                  <Link
                    href={post.link || `https://readinfo.org.pk/${post.slug}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    readinfo.org.pk
                  </Link>
                </span>
              </div>

              {/* Share Buttons */}
              <div className="share-section">
                <p className="share-title">Share this article:</p>
                <div className="share-buttons">
                  <Link href={shareWhatsApp} target="_blank" rel="noopener noreferrer" className="share-btn whatsapp">
                    📱 WhatsApp
                  </Link>
                  <Link href={shareFacebook} target="_blank" rel="noopener noreferrer" className="share-btn facebook">
                    📘 Facebook
                  </Link>
                  <Link href={shareTwitter} target="_blank" rel="noopener noreferrer" className="share-btn twitter">
                    🐦 Twitter
                  </Link>
                  <button onClick={handleCopy} className="share-btn copy">
                    {copied ? '✅ Copied!' : '🔗 Copy Link'}
                  </button>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="sidebar">
              <div className="sidebar-card">
                <div className="sidebar-title">Latest Articles</div>
                {related.map((item) => (
                  <Link key={item.id} href={`/news/${item.slug}`} className="sidebar-post">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        width={72}
                        height={54}
                        className="sidebar-thumb"
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <div className="sidebar-thumb-placeholder">📰</div>
                    )}
                    <div>
                      <p className="sidebar-post-title">{item.title}</p>
                      <p className="sidebar-post-date">{formatDate(item.date)}</p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Back to Home */}
              <Link href="/" className="featured-cta" style={{ justifyContent: 'center' }}>
                ← Back to Home
              </Link>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  // Build top 50 slugs at build time, rest on-demand
  const allSlugs = await getAllSlugs();
  const paths = allSlugs.slice(0, 50).map((slug) => ({ params: { slug } }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const [post, related] = await Promise.all([
    getPostBySlug(params.slug),
    getLatestPosts(6),
  ]);

  if (!post) {
    return { notFound: true };
  }

  return {
    props: { post, related: related.filter((r) => r.slug !== post.slug).slice(0, 5) },
    revalidate: 3600, // Auto-update every 1 hour
  };
}
