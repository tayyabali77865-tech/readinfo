import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { getPostsByCategory } from '../lib/api';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-PK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function CategoryNews({ posts, category }) {
  const titleCategory = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Latest';

  return (
    <>
      <Head>
        <title>{titleCategory} News – ReadInfo PK</title>
        <meta name="description" content={`Read latest ${category} articles and news updates.`} />
      </Head>
      <div className="container" style={{ padding: '40px 0' }}>
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
            <p>We couldn't find any articles in the "{titleCategory}" category at this time.</p>
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
  
  // Fetch posts from readinfos.com dynamically on request time
  const posts = await getPostsByCategory(category.toLowerCase(), 12);
  
  return {
    props: {
      posts,
      category,
    },
  };
}
