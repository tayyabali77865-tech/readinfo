import Head from 'next/head';
import Link from 'next/link';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found – ReadInfo PK</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="container">
        <div className="empty-state" style={{ padding: '120px 20px' }}>
          <div className="empty-state-icon">🔍</div>
          <h2>Page Not Found</h2>
          <p style={{ marginBottom: 24 }}>
            Yeh page exist nahi karta ya hata diya gaya hai.
          </p>
          <Link href="/" className="featured-cta" style={{ display: 'inline-flex' }}>
            ← Wapas Home Par Jayein
          </Link>
        </div>
      </div>
    </>
  );
}
