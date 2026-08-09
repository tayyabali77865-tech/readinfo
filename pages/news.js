import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getFallbackPosts } from '../lib/api';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-PK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function CategoryNews() {
  const router = useRouter();
  const { category } = router.query;

  // Filter posts or load custom dummy updates if network blocked
  const posts = getFallbackPosts();
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
        
        <div className="news-grid">
          {posts.map((post) => (
            <Link key={post.id} href={`/news/${post.slug}`} className="news-card">
              <div className="card-image-wrap">
                {post.imageUrl ? (
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="card-image"
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
          ))}
        </div>
      </div>
    </>
  );
}
