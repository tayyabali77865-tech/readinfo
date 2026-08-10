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
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <Link href="/" className="logo">
            ReadInfo PK
          </Link>
          <nav>
            <ul className="nav-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/news?category=celebrity">Celebrity News</Link></li>
              <li><Link href="/news?category=crime">Crime News</Link></li>
              <li><Link href="/news?category=trending">Trending News</Link></li>
              <li><Link href="/news?category=insurance">Insurance</Link></li>
              <li><Link href="/news?category=usa">USA</Link></li>
              <li><Link href="/buy-adspace" style={{ color: 'var(--accent)', fontWeight: 'bold' }}>Buy Adspace</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo" style={{ fontSize: '18px' }}>
              ReadInfo PK
            </div>
            <p>
              Pakistan ki latest news, government schemes, jobs, results aur
              scholarships ki information — ek jagah pe.
            </p>
          </div>
          <div>
            <h3 className="footer-heading">Pages</h3>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li>
                <Link href="https://readinfo.org.pk/privacy-policy/" target="_blank" rel="noopener">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="https://readinfo.org.pk/disclaimer/" target="_blank" rel="noopener">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="footer-heading">Source</h3>
            <ul className="footer-links">
              <li>
                <Link href="https://readinfo.org.pk/" target="_blank" rel="noopener noreferrer">
                  ReadInfo.org.pk
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml">Sitemap</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} ReadInfo PK · Content sourced from{' '}
            <Link
              href="https://readinfo.org.pk/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent)' }}
            >
              readinfo.org.pk
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default MyApp;
