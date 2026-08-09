import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getPaginatedPosts } from '../../lib/api';
import { NewsCard, Pagination, pageLink } from '../index';

const SITE_NAME = 'ReadInfo PK';
const SITE_DESC = 'Pakistan ki latest news, government schemes, jobs, results aur scholarships — sabse pehle yahan.';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://readinfo-pk.vercel.app';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-PK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function PageN({ posts, totalPages, currentPage }) {
  const featured = posts[0];
  const rest = posts.slice(1);

  const tickerPosts = posts.slice(0, 8);
  const [tickerIdx, setTickerIdx] = useState(0);

  useEffect(() => {
    if (tickerPosts.length === 0) return;
    const timer = setInterval(() => {
      setTickerIdx(i => (i + 1) % tickerPosts.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [tickerPosts.length]);

  return (
    <>
      <Head>
        <title>{`Page ${currentPage} – ${SITE_NAME} – Latest Pakistan News`}</title>
        <meta name="description" content={`${SITE_DESC} — Page ${currentPage}`} />
        <link rel="canonical" href={`${SITE_URL}/page/${currentPage}`} />
        {currentPage > 1 && <link rel="prev" href={`${SITE_URL}${pageLink(currentPage - 1)}`} />}
        <link rel="next" href={`${SITE_URL}/page/${currentPage + 1}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Page ${currentPage} – ${SITE_NAME}`} />
        <meta property="og:description" content={SITE_DESC} />
        <meta property="og:url" content={`${SITE_URL}/page/${currentPage}`} />
        {featured?.imageUrl && <meta property="og:image" content={featured.imageUrl} />}
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* Breaking News Ticker */}
      {tickerPosts.length > 0 && (
        <div className="breaking-banner">
          <div className="container">
            <div className="breaking-inner">
              <span className="breaking-label">🔴 Latest</span>
              <div key={tickerIdx} className="breaking-ticker">
                {tickerPosts[tickerIdx]?.title}
              </div>
            </div>
          </div>
        </div>
      )}

      <main>
        <div className="container">
          <div className="page-hero">
            <h1>Pakistan Latest News &amp; Updates</h1>
            <p>Page {currentPage} — Government schemes, jobs, results, scholarships</p>
          </div>

          {/* Featured Post */}
          {featured && (
            <Link href={`/news/${featured.slug}`} className="featured-post">
              <div className="featured-image-wrap">
                {featured.imageUrl ? (
                  <Image
                    src={featured.imageUrl}
                    alt={featured.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                    sizes="(max-width: 768px) 100vw, 55vw"
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      minHeight: 300,
                      background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 60,
                    }}
                  >
                    📰
                  </div>
                )}
              </div>
              <div className="featured-body">
                <span className="featured-badge">
                  🔥 Featured
                  {featured.categories?.[0] && ` • ${featured.categories[0]}`}
                </span>
                <h2 className="featured-title">{featured.title}</h2>
                {featured.excerpt && (
                  <p className="featured-excerpt">{featured.excerpt}</p>
                )}
                <div className="featured-meta">
                  <span>📅 {formatDate(featured.date)}</span>
                </div>
                <span className="featured-cta">Poora Parho →</span>
              </div>
            </Link>
          )}

          {/* News Grid */}
          <div className="section">
            <div className="section-title">
              <div className="section-title-bar" />
              <h2>Latest News</h2>
            </div>
            <div className="news-grid">
              {rest.map((post) => (
                <NewsCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          )}
        </div>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  // Pre-generate pages 2–10, rest generated on-demand (fallback: blocking)
  const paths = Array.from({ length: 9 }, (_, i) => ({
    params: { page: String(i + 2) },
  }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const page = parseInt(params.page, 10);
  if (isNaN(page) || page < 2) {
    return { notFound: true };
  }

  const { posts, totalPages, currentPage } = await getPaginatedPosts(page, 10);

  return {
    props: { posts, totalPages, currentPage },
    revalidate: 3600,
  };
}
