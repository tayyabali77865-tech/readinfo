import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getPaginatedPosts } from '../../lib/api';
import { NewsCard, Pagination, pageLink } from '../index';

const SITE_NAME = 'ReadInfo';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://readinfo-mu.vercel.app';

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

  const pageTitle = `Page ${currentPage} – ReadInfo | Latest Pakistan News, Jobs & Results`;
  const pageDesc = `Browse page ${currentPage} of ReadInfo — Pakistan's leading news portal. Latest breaking news, government schemes, jobs, scholarships, and exam results.`;
  const canonicalUrl = `${SITE_URL}/page/${currentPage}`;

  const schemaCollectionPage = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: pageTitle,
    description: pageDesc,
    url: canonicalUrl,
    inLanguage: 'en-PK',
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
  };

  return (
    <>
      <Head>
        {/* Primary SEO */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta
          name="keywords"
          content={`pakistan news page ${currentPage}, readinfo page ${currentPage}, latest pakistan news, breaking news pakistan, government jobs pakistan`}
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="author" content="ReadInfo" />

        {/* Pagination rel links */}
        {currentPage > 2 && (
          <link rel="prev" href={`${SITE_URL}${pageLink(currentPage - 1)}`} />
        )}
        {currentPage === 2 && <link rel="prev" href={SITE_URL} />}
        <link rel="next" href={`${SITE_URL}/page/${currentPage + 1}`} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:locale" content="en_PK" />
        {featured?.imageUrl && <meta property="og:image" content={featured.imageUrl} />}
        {featured?.imageUrl && <meta property="og:image:width" content="1200" />}
        {featured?.imageUrl && <meta property="og:image:height" content="628" />}
        {featured?.imageUrl && (
          <meta property="og:image:alt" content={`ReadInfo – Page ${currentPage}`} />
        )}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@readinfo" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        {featured?.imageUrl && <meta name="twitter:image" content={featured.imageUrl} />}

        {/* JSON-LD: CollectionPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaCollectionPage) }}
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
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: `Page ${currentPage}`,
                  item: canonicalUrl,
                },
              ],
            }),
          }}
        />
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
