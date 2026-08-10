const fs = require('fs');
const path = require('path');

// Target URLs
const BASE_URL_1 = 'https://readinfo.org.pk/wp-json/wp/v2';
const BASE_URL_2 = 'https://readinfos.com/wp-json/wp/v2';
const SITE_URL = 'https://readinfo-pk.vercel.app';

async function fetchFromSource(endpointUrl) {
  try {
    const res = await fetch(endpointUrl, {
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.error(`Error fetching from ${endpointUrl}:`, err.message);
    return [];
  }
}

async function generateSitemap() {
  console.log('Generating physical sitemap.xml...');

  // Fetch all posts slugs & modified dates
  const [data1, data2] = await Promise.all([
    fetchFromSource(`${BASE_URL_1}/posts?per_page=100&_fields=slug,date,modified&status=publish`),
    fetchFromSource(`${BASE_URL_2}/posts?per_page=100&_fields=slug,date,modified&status=publish`)
  ]);

  const posts = [...data1, ...data2];
  
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${SITE_URL}</loc>
    <changefreq>hourly</changefreq>
    <priority>1.0</priority>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
  <!-- Category Pages -->
  <url>
    <loc>${SITE_URL}/news?category=celebrity</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/news?category=crime</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/news?category=trending</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/news?category=insurance</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/news?category=usa</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
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

  const destPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(destPath, sitemapXml, 'utf8');
  console.log(`Sitemap generated successfully at ${destPath}! Total links: ${posts.length + 6}`);
}

generateSitemap().catch(console.error);
