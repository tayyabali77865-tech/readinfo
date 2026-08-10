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
            ReadInfo
          </Link>
          <nav>
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
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo" style={{ fontSize: '18px' }}>
              ReadInfo
            </div>
            <p>
              Get the latest news updates, career opportunities, government schemes, scholarships, and exam results in Pakistan.
            </p>
          </div>

        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} ReadInfo | All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default MyApp;
