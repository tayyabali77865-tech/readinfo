import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getPaginatedPosts } from '../lib/api';

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

export function pageLink(pg) {
  return pg === 1 ? '/' : `/page/${pg}`;
}

export default function HomePage({ posts, totalPages, currentPage }) {
  const carouselPosts = posts.slice(0, 3);
  const rest = posts.slice(3); // adjust so rest of grid doesn't duplicate carousel items
  const [carouselIdx, setCarouselIdx] = useState(0);

  useEffect(() => {
    if (carouselPosts.length <= 1) return;
    const timer = setInterval(() => {
      setCarouselIdx(idx => (idx + 1) % carouselPosts.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [carouselPosts.length]);

  const prevSlide = () => {
    setCarouselIdx(idx => (idx - 1 + carouselPosts.length) % carouselPosts.length);
  };
  const nextSlide = () => {
    setCarouselIdx(idx => (idx + 1) % carouselPosts.length);
  };

  const featured = carouselPosts[0]; // fallback metadata
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
        <title>{`${SITE_NAME} – Latest Pakistan News & Updates`}</title>
        <meta name="description" content={SITE_DESC} />
        <link rel="canonical" href={currentPage === 1 ? SITE_URL : `${SITE_URL}/page/${currentPage}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={`${SITE_NAME} – Latest Pakistan News`} />
        <meta property="og:description" content={SITE_DESC} />
        <meta property="og:url" content={SITE_URL} />
        {featured?.imageUrl && (
          <meta property="og:image" content={featured.imageUrl} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${SITE_NAME} – Latest Pakistan News`} />
        <meta name="twitter:description" content={SITE_DESC} />
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

      {/* Breaking News Ticker — rotates every 4s */}
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
            <p>Government schemes, jobs, results, scholarships — sab kuch ek jagah</p>
          </div>

          {/* Featured Carousel */}
          {carouselPosts.length > 0 && (
            <div className="carousel-container">
              {carouselPosts.length > 1 && (
                <>
                  <button className="carousel-arrow prev" onClick={prevSlide}>&lsaquo;</button>
                  <button className="carousel-arrow next" onClick={nextSlide}>&rsaquo;</button>
                </>
              )}
              
              <div 
                className="carousel-slides" 
                style={{ transform: `translateX(-${carouselIdx * 100}%)` }}
              >
                {carouselPosts.map((post) => (
                  <div key={post.id} className="carousel-slide">
                    <Link href={`/news/${post.slug}`} className="featured-post-slide">
                      <div className="featured-image-wrap">
                        {post.imageUrl ? (
                          <Image
                            src={post.imageUrl}
                            alt={post.title}
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
                          {post.categories?.[0] && ` • ${post.categories[0]}`}
                        </span>
                        <h2 className="featured-title">{post.title}</h2>
                        {post.excerpt && (
                          <p className="featured-excerpt">{post.excerpt}</p>
                        )}
                        <div className="featured-meta">
                          <span>📅 {formatDate(post.date)}</span>
                        </div>
                        <span className="featured-cta">Poora Parho →</span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              {carouselPosts.length > 1 && (
                <div className="carousel-dots">
                  {carouselPosts.map((_, i) => (
                    <button
                      key={i}
                      className={`carousel-dot${i === carouselIdx ? ' active' : ''}`}
                      onClick={() => setCarouselIdx(i)}
                    />
                  ))}
                </div>
              )}
            </div>
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

export function NewsCard({ post }) {
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
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
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

export function Pagination({ currentPage, totalPages }) {
  const pages = [];
  const maxVisible = 7;

  let start = 1;
  if (totalPages > maxVisible) {
    if (currentPage <= 4) {
      start = 1;
    } else if (currentPage >= totalPages - 3) {
      start = totalPages - maxVisible + 1;
    } else {
      start = currentPage - 3;
    }
  }
  for (let i = 0; i < Math.min(maxVisible, totalPages); i++) {
    pages.push(start + i);
  }

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <Link href={pageLink(currentPage - 1)} className="page-btn">←</Link>
      )}
      {pages.map((pg) => (
        <Link
          key={pg}
          href={pageLink(pg)}
          className={`page-btn${pg === currentPage ? ' active' : ''}`}
        >
          {pg}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link href={pageLink(currentPage + 1)} className="page-btn">→</Link>
      )}
    </div>
  );
}

export async function getStaticProps() {
  const { posts, totalPages, currentPage } = await getPaginatedPosts(1, 10);
  return {
    props: { posts, totalPages, currentPage },
    revalidate: 3600,
  };
}
