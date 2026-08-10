import '../styles/globals.css';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handler = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
      {showTop && (
        <button
          className="back-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </>
  );
}

function Header() {
  return (
    <header className="header" role="banner">
      <div className="container">
        <div className="header-inner">
          <Link href="/" className="logo" aria-label="ReadInfo – Home">
            ReadInfo
          </Link>
          <nav aria-label="Main navigation">
            <ul className="nav-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/news?category=celebrity">Celebrity News</Link></li>
              <li><Link href="/news?category=crime">Crime News</Link></li>
              <li><Link href="/news?category=trending">Trending News</Link></li>
              <li><Link href="/news?category=insurance">Insurance</Link></li>
              <li><Link href="/news?category=usa">USA</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo" style={{ fontSize: '18px' }}>
              ReadInfo
            </div>
            <p>
              Pakistan&apos;s latest news, government schemes, jobs, exam results, and
              scholarships — all in one place. Stay updated with ReadInfo.
            </p>
          </div>

          {/* Navigation Links */}
          <div style={{ minWidth: '160px' }}>
            <p style={{ fontWeight: '600', marginBottom: '12px', color: 'var(--text-primary)' }}>
              Categories
            </p>
            <nav aria-label="Footer category navigation">
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2' }}>
                <li><Link href="/news?category=celebrity" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Celebrity News</Link></li>
                <li><Link href="/news?category=crime" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Crime News</Link></li>
                <li><Link href="/news?category=trending" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Trending News</Link></li>
                <li><Link href="/news?category=insurance" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Insurance</Link></li>
                <li><Link href="/news?category=usa" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>USA News</Link></li>
              </ul>
            </nav>
          </div>

          {/* Legal & Info Links */}
          <div style={{ minWidth: '160px' }}>
            <p style={{ fontWeight: '600', marginBottom: '12px', color: 'var(--text-primary)' }}>
              Information
            </p>
            <nav aria-label="Footer information navigation">
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2' }}>
                <li><Link href="/about" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>About Us</Link></li>
                <li><Link href="/privacy-policy" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Privacy Policy</Link></li>
                <li><Link href="/buy-adspace" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Advertise With Us</Link></li>
                <li>
                  <a
                    href="mailto:admin@readinfo.org.pk"
                    style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <Link href="/sitemap.xml" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                    Sitemap
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} ReadInfo | All Rights Reserved</p>
          <p style={{ fontSize: '12px', marginTop: '4px', opacity: 0.6 }}>
            Pakistan&apos;s trusted source for news, jobs &amp; results
          </p>
        </div>
      </div>
    </footer>
  );
}

export default MyApp;
