import { getAllPostsForSitemap } from '../lib/api';

const SITE_URL = 'https://readinfo-mu.vercel.app';

function escapeXml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateSiteMap(posts) {
  const staticPages = [
    { loc: SITE_URL, changefreq: 'hourly', priority: '1.0', lastmod: new Date().toISOString() },
    { loc: `${SITE_URL}/about`, changefreq: 'monthly', priority: '0.6' },
    { loc: `${SITE_URL}/privacy-policy`, changefreq: 'monthly', priority: '0.5' },
    { loc: `${SITE_URL}/buy-adspace`, changefreq: 'monthly', priority: '0.6' },
  ];

  const staticXml = staticPages
    .map(
      (p) => `  <url>
    <loc>${escapeXml(p.loc)}</loc>
    ${p.lastmod ? `<lastmod>${p.lastmod}</lastmod>` : ''}
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
    )
    .join('\n');

  const newsXml = posts
    .map(
      (post) => `  <url>
    <loc>${escapeXml(`${SITE_URL}/news/${post.slug}`)}</loc>
    <lastmod>${new Date(post.modified || post.date).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticXml}
${newsXml}
</urlset>`;
}

function SiteMap() {
  // getServerSideProps handles the response
}

export async function getServerSideProps({ res }) {
  const posts = await getAllPostsForSitemap();
  const sitemap = generateSiteMap(posts);

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default SiteMap;
