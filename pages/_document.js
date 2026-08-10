import { Html, Head, Main, NextScript } from 'next/document';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://readinfo-mu.vercel.app';

export default function Document() {
  return (
    <Html lang="en-PK" dir="ltr">
      <Head>
        {/* Character encoding */}
        <meta charSet="utf-8" />

        {/* Global SEO – Indexing */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <meta name="bingbot" content="index, follow" />

        {/* Site-wide keywords */}
        <meta name="keywords" content="readinfo, ReadInfo, pakistan news, Pakistan latest news, Pakistan jobs 2026, government jobs Pakistan, BISP, Ehsaas program, scholarships Pakistan, results 2026, matric result, inter result, FBISE result, government schemes Pakistan, Punjab schemes, KPK schemes, jobs in Pakistan, breaking news Pakistan, Pakistan today, daily news Pakistan, crime news Pakistan, celebrity news Pakistan, trending Pakistan, insurance Pakistan, USA news Urdu, Urdu news" />

        {/* Author & publisher */}
        <meta name="author" content="ReadInfo" />
        <meta name="publisher" content="ReadInfo" />
        <meta name="copyright" content="ReadInfo" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="1 day" />
        <meta name="rating" content="general" />

        {/* Geo targeting for Pakistan */}
        <meta name="geo.region" content="PK" />
        <meta name="geo.country" content="Pakistan" />
        <meta name="ICBM" content="30.3753, 69.3451" />

        {/* Global OG */}
        <meta property="og:locale" content="en_PK" />
        <meta property="og:site_name" content="ReadInfo" />

        {/* JSON-LD: Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'NewsMediaOrganization',
              name: 'ReadInfo',
              alternateName: ['readinfo', 'ReadInfos', 'readinfos', 'ReadInfo Pakistan'],
              url: SITE_URL,
              logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/logo.png`,
                width: 512,
                height: 512,
              },
              description: "Pakistan's latest news, government schemes, jobs, results, and scholarships — all in one place.",
              sameAs: [
                'https://readinfo.org.pk',
                'https://readinfos.com',
              ],
              areaServed: 'PK',
              knowsAbout: ['Pakistan news', 'Government jobs Pakistan', 'BISP', 'Scholarships', 'Education results'],
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'admin@readinfo.org.pk',
                contactType: 'customer support',
                areaServed: 'PK',
                availableLanguage: ['English', 'Urdu'],
              },
              foundingDate: '2024',
              publishingPrinciples: `${SITE_URL}/privacy-policy`,
            }),
          }}
        />

        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />

        {/* DNS Prefetch for content sources */}
        <link rel="dns-prefetch" href="https://readinfo.org.pk" />
        <link rel="dns-prefetch" href="https://readinfos.com" />
        <link rel="preconnect" href="https://readinfo.org.pk" />
        <link rel="preconnect" href="https://readinfos.com" />

        {/* Google AdSense */}
        <meta name="google-adsense-account" content="ca-pub-2555027481119393" />
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2555027481119393" 
          crossOrigin="anonymous"
        ></script>

        {/* Favicon & App icons */}
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Apple mobile meta */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ReadInfo" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />

        {/* Theme color */}
        <meta name="theme-color" content="#ef4444" />
        <meta name="msapplication-TileColor" content="#ef4444" />
        <meta name="msapplication-navbutton-color" content="#ef4444" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
