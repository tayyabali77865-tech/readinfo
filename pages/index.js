import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '../lib/api';

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

export default function HomePage({ posts, totalPages, currentPage }) {
  const featured = posts[0];
  const rest = posts.slice(1);

  const breakingTitles = posts.slice(0, 6).map((p) => p.title).join(' • ');

  return (
    <>
      <Head>
        <title>{`${SITE_NAME} – Latest Pakistan News & Updates`}</title>
        <meta name="description" content={SITE_DESC} />
        <link rel="canonical" href={SITE_URL} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={`${SITE_NAME} – Latest Pakistan News`} />
        <meta property="og:description" content={SITE_DESC} />
        <meta property="og:url" content={SITE_URL} />
        {featured?.imageUrl && (
          <meta property="og:image" content={featured.imageUrl} />
        )}
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${SITE_NAME} – Latest Pakistan News`} />
        <meta name="twitter:description" content={SITE_DESC} />
        {/* Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: SITE_NAME,
              url: SITE_URL,
              description: SITE_DESC,
              potentialAction: {
                '@type': 'SearchAction',
                target: `${SITE_URL}/?s={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </Head>

      {/* Breaking News Ticker */}
      {breakingTitles && (
        <div className="breaking-banner">
          <div className="container">
            <div className="breaking-inner">
              <span className="breaking-label">🔴 Latest</span>
              <div className="breaking-ticker">{breakingTitles}</div>
            </div>
          </div>
        </div>
      )}

      <main>
        <div className="container">
          <div className="page-hero">
            <h1>Pakistan Latest News & Updates</h1>
            <p>Government schemes, jobs, results, scholarships — sab kuch ek jagah</p>
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
                <span className="featured-cta">
                  Poora Parho →
                </span>
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
            <div className="pagination">
              {currentPage > 1 && (
                <Link
                  href={currentPage - 1 === 1 ? '/' : `/?page=${currentPage - 1}`}
                  className="page-btn"
                >
                  ←
                </Link>
              )}
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                const pg = i + 1;
                return (
                  <Link
                    key={pg}
                    href={pg === 1 ? '/' : `/?page=${pg}`}
                    className={`page-btn ${pg === currentPage ? 'active' : ''}`}
                  >
                    {pg}
                  </Link>
                );
              })}
              {currentPage < totalPages && (
                <Link href={`/?page=${currentPage + 1}`} className="page-btn">
                  →
                </Link>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

function NewsCard({ post }) {
  return (
    <Link href={`/news/${post.slug}`} className="news-card">
      <div className="card-image-wrap">
        {post.imageUrl ? (
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            style={{ objectFit: 'cover' }}
            className="card-image"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="card-image-placeholder">📰</div>
        )}
        {post.categories?.[0] && (
          <span className="card-category">{post.categories[0]}</span>
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
  );
}

export async function getStaticProps({ params }) {
  const page = 1;
  const { posts, totalPages } = await getAllPosts(page, 13);

  return {
    props: {
      posts,
      totalPages,
      currentPage: page,
    },
    revalidate: 3600, // Auto-update every 1 hour
  };
}
