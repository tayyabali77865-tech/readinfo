import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getPaginatedPosts } from '../lib/api';

const SITE_NAME = 'ReadInfo';
const SITE_DESC = 'Pakistan\'s latest news, government schemes, jobs, exam results, and scholarships — all in one place. Stay updated with ReadInfo.';
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
  const rest = posts; // include top 3 articles in the main grid section too
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
        <title>ReadInfo – Latest Pakistan News, Jobs, Results & Government Schemes 2026</title>
        <meta name="description" content="ReadInfo: Pakistan's #1 source for latest news, government jobs 2026, BISP, Ehsaas program, matric results, inter results, scholarships and breaking news updates." />
        <meta name="keywords" content="readinfo, readinfos, pakistan news, pakistan news today, breaking news pakistan, latest news, government jobs 2026, sarkari naukri, BISP, ehsaas, scholarships pakistan, matric result 2026, inter result 2026, FBISE result, celebrity news, crime news, trending pakistan, insurance pakistan" />
        <link rel="canonical" href={currentPage === 1 ? SITE_URL : `${SITE_URL}/page/${currentPage}`} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ReadInfo" />
        <meta property="og:title" content="ReadInfo – Latest Pakistan News, Jobs, Results & Government Schemes" />
        <meta property="og:description" content="Pakistan's #1 source for breaking news, government jobs, BISP, Ehsaas, scholarships, and exam results. Updated daily." />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:locale" content="en_PK" />
        {featured?.imageUrl && <meta property="og:image" content={featured.imageUrl} />}
        {featured?.imageUrl && <meta property="og:image:width" content="1200" />}
        {featured?.imageUrl && <meta property="og:image:height" content="630" />}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@readinfo" />
        <meta name="twitter:title" content="ReadInfo – Latest Pakistan News, Jobs & Results" />
        <meta name="twitter:description" content="Pakistan's #1 source for breaking news, government jobs, scholarships, and exam results." />
        {featured?.imageUrl && <meta name="twitter:image" content={featured.imageUrl} />}

        {/* JSON-LD: WebSite with SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'ReadInfo',
              alternateName: ['readinfo', 'ReadInfos', 'readinfos'],
              url: SITE_URL,
              description: 'Pakistan\'s latest news, government schemes, jobs, exam results, and scholarships.',
              inLanguage: 'en-PK',
              potentialAction: {
                '@type': 'SearchAction',
                target: `${SITE_URL}/news?category={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        {/* JSON-LD: BreadcrumbList */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
              ],
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
                            style={{ objectFit: 'contain', backgroundColor: '#f1f5f9' }}
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
                        <h2 className="featured-title">{post.title}</h2>
                        {post.excerpt && (
                          <p className="featured-excerpt">{post.excerpt}</p>
                        )}
                        <div className="featured-meta">
                          <span>📅 {formatDate(post.date)}</span>
                        </div>
                        <span className="featured-cta">View More →</span>
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
