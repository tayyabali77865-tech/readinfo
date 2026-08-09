import { getAllPostsForSitemap } from '../lib/api';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://readinfo-pk.vercel.app';

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Homepage -->
  <url>
    <loc>${SITE_URL}</loc>
    <changefreq>hourly</changefreq>
    <priority>1.0</priority>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
  ${posts
    .map(
      (post) => `
  <url>
    <loc>${SITE_URL}/news/${post.slug}</loc>
    <lastmod>${new Date(post.modified || post.date).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join('')}
</urlset>`;
}

function SiteMap() {
  // getServerSideProps does the work
}

export async function getServerSideProps({ res }) {
  const posts = await getAllPostsForSitemap();

  const sitemap = generateSiteMap(posts);

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=86400'
  );
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default SiteMap;

