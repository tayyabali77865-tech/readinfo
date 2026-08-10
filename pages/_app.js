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
        <link rel="icon" href="/favicon.png" type="image/png" />
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
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="header" role="banner">
      <div className="container">
        <div className="header-inner">
          <Link href="/" className="logo" aria-label="ReadInfo – Home">
            ReadInfo
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Main navigation" className="desktop-nav">
            <ul className="nav-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/news?category=celebrity">Celebrity News</Link></li>
              <li><Link href="/news?category=crime">Crime News</Link></li>
              <li><Link href="/news?category=trending">Trending News</Link></li>
              <li><Link href="/news?category=insurance">Insurance</Link></li>
              <li><Link href="/news?category=usa">USA</Link></li>
            </ul>
          </nav>

          {/* Hamburger Menu Button */}
          <button 
            className="menu-toggle" 
            onClick={() => setIsOpen(!isOpen)} 
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          {/* Sidebar Mobile Navigation */}
          <div className={`mobile-sidebar ${isOpen ? 'active' : ''}`}>
            <div className="sidebar-header">
              <span className="logo">ReadInfo</span>
              <button className="close-btn" onClick={closeMenu} aria-label="Close menu">&times;</button>
            </div>
            <nav className="mobile-nav" aria-label="Mobile navigation">
              <ul className="mobile-nav-links">
                <li><Link href="/" onClick={closeMenu}>Home</Link></li>
                <li><Link href="/news?category=celebrity" onClick={closeMenu}>Celebrity News</Link></li>
                <li><Link href="/news?category=crime" onClick={closeMenu}>Crime News</Link></li>
                <li><Link href="/news?category=trending" onClick={closeMenu}>Trending News</Link></li>
                <li><Link href="/news?category=insurance" onClick={closeMenu}>Insurance</Link></li>
                <li><Link href="/news?category=usa" onClick={closeMenu}>USA</Link></li>
              </ul>
            </nav>
          </div>

          {/* Overlay background */}
          {isOpen && <div className="sidebar-overlay" onClick={closeMenu} />}
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
