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
  const carouselPosts = posts.slice(0, 3);
  const rest = posts;
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

  const featured = carouselPosts[0];
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

export async function getStaticPaths() {
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
